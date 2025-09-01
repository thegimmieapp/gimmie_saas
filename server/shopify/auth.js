import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api'

function makeShopify() {
  const hostName = (process.env.SHOPIFY_APP_URL || '').replace(/^https?:\/\//,'')
  return shopifyApi({
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_API_SECRET,
    scopes: (process.env.SHOPIFY_SCOPES || '').split(',').map(s => s.trim()).filter(Boolean),
    hostName,
    isEmbeddedApp: false,
    apiVersion: LATEST_API_VERSION,
  })
}

export async function beginInstall(req, res) {
  try {
    const shop = (req.query.shop || '').toString()
    if (!shop) return res.status(400).send('Missing shop')
    const shopify = makeShopify()
    await shopify.auth.begin({
      shop,
      callbackPath: '/api/shopify/callback',
      isOnline: false,
      rawRequest: req,
      rawResponse: res,
    })
  } catch (e) {
    console.error('beginInstall error', e)
    res.status(500).send('Auth error')
  }
}

export async function oauthCallback(req, res, ctx) {
  try {
    const shopify = makeShopify()
    const { session } = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    })
    const { supabase } = ctx
    const shopDomain = session.shop
    const accessToken = session.accessToken

    let storeId = null
    {
      const { data: store } = await supabase.from('stores').select('id').eq('domain', shopDomain).maybeSingle()
      if (store?.id) {
        storeId = store.id
      } else {
        const { data: created, error } = await supabase.from('stores').insert({ name: shopDomain, domain: shopDomain }).select().single()
        if (error) throw error
        storeId = created.id
      }
    }
    {
      const { error } = await supabase.from('product_sources').upsert({
        store_id: storeId,
        kind: 'shopify',
        source_ref: { shop: shopDomain, accessToken, apiVersion: shopify.config.apiVersion }
      })
      if (error) throw error
    }

    const client = new shopify.clients.Rest({ session })
    const baseUrl = process.env.SHOPIFY_APP_URL || 'http://localhost:8787'
    const webhooks = [
      { topic: 'app/uninstalled', path: '/api/shopify/webhooks/app-uninstalled' },
      { topic: 'products/create', path: '/api/shopify/webhooks/products' },
      { topic: 'products/update', path: '/api/shopify/webhooks/products' },
      { topic: 'products/delete', path: '/api/shopify/webhooks/products' },
      { topic: 'orders/create',   path: '/api/shopify/webhooks/orders'   },
    ]
    for (const wh of webhooks) {
      try {
        await client.post({
          path: 'webhooks',
          data: { webhook: { topic: wh.topic, address: `${baseUrl}${wh.path}`, format: 'json' } },
          type: 'json'
        })
      } catch (e) {
        console.warn('Webhook register failed', wh.topic, e?.response?.body || e.message)
      }
    }

    res.status(200).send('Shop installed. You can close this window.')
  } catch (e) {
    console.error('oauthCallback error', e)
    res.status(500).send('OAuth callback error')
  }
}
