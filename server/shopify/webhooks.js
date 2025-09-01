import crypto from 'crypto'

async function isKnownShop(supabase, shopDomain) {
  if (!supabase || !shopDomain) return false
  const { data: store } = await supabase.from('stores').select('id').eq('domain', shopDomain).maybeSingle()
  if (!store?.id) return false
  const { data: src } = await supabase.from('product_sources').select('id').eq('store_id', store.id).eq('kind','shopify').maybeSingle()
  return !!src?.id
}

function verifyShopifyWebhook(req, secret) {
  const hmacHeader = req.get('X-Shopify-Hmac-Sha256') || ''
  const digest = crypto.createHmac('sha256', secret).update(req.rawBody).digest('base64')
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(hmacHeader))
}

function mapProduct(shopifyProduct) {
  const firstImage = shopifyProduct?.image?.src || shopifyProduct?.images?.[0]?.src || null
  const firstVariant = shopifyProduct?.variants?.[0]
  const priceCents = firstVariant?.price ? Math.round(parseFloat(firstVariant.price) * 100) : null
  const tags = (shopifyProduct?.tags || '').split(',').map(s => s.trim()).filter(Boolean)
  return {
    title: shopifyProduct?.title || '',
    description: shopifyProduct?.body_html || null,
    image_url: firstImage,
    price_cents: priceCents,
    currency: 'USD',
    external_id: String(shopifyProduct?.id || ''),
    handle: shopifyProduct?.handle || null,
    vendor: shopifyProduct?.vendor || null,
    variant_count: Array.isArray(shopifyProduct?.variants) ? shopifyProduct.variants.length : null,
    inventory_status: shopifyProduct?.status || null,
    tags,
  }
}

export async function productWebhook(req, res, ctx) {
  const secret = process.env.SHOPIFY_API_SECRET
  try {
    if (!verifyShopifyWebhook(req, secret)) {
      return res.status(401).send('Invalid HMAC')
    }
    const topic = (req.get('X-Shopify-Topic') || '').toLowerCase()
    const shop = req.get('X-Shopify-Shop-Domain')
    const payload = JSON.parse(req.rawBody.toString('utf8'))

    const { supabase } = ctx
    const known = await isKnownShop(supabase, shop)
    if (!known) return res.status(403).send('Unknown shop')

    const { data: store } = await supabase.from('stores').select('id').eq('domain', shop).maybeSingle()
    if (!store?.id) return res.status(200).send('No store row; ignoring')

    if (topic.includes('delete')) {
      const externalId = String(payload?.id || '')
      await supabase.from('products').delete().eq('store_id', store.id).eq('external_id', externalId)
      return res.status(200).send('Deleted')
    }

    const mapped = mapProduct(payload)
    mapped.store_id = store.id
    const { error } = await supabase.from('products').upsert(mapped, { onConflict: 'store_id,external_id' })
    if (error) {
      console.error('Product upsert error', error)
      return res.status(500).send('Upsert error')
    }
    res.status(200).send('OK')
  } catch (e) {
    console.error('productWebhook error', e)
    res.status(500).send('Webhook error')
  }
}

export async function orderWebhook(req, res, ctx) {
  const secret = process.env.SHOPIFY_API_SECRET
  try {
    if (!verifyShopifyWebhook(req, secret)) {
      return res.status(401).send('Invalid HMAC')
    }
    const shop = req.get('X-Shopify-Shop-Domain')
    const payload = JSON.parse(req.rawBody.toString('utf8'))
    const { supabase } = ctx

    const known = await isKnownShop(supabase, shop)
    if (!known) return res.status(403).send('Unknown shop')

    const { data: store } = await supabase.from('stores').select('id').eq('domain', shop).maybeSingle()
    if (!store?.id) return res.status(200).send('No store row; ignoring')

    let refToken = null
    const notes = payload?.note_attributes || []
    const noteGref = notes.find(n => (n.name || n.key) === 'gref' || (n.name || n.key) === 'ref_token')
    if (noteGref?.value) refToken = String(noteGref.value)
    if (!refToken && typeof payload?.landing_site === 'string') {
      const qs = payload.landing_site.split('?')[1] || ''
      for (const part of qs.split('&')) {
        const [k, v] = part.split('=')
        if (k === 'gref') { refToken = decodeURIComponent(v || ''); break }
      }
    }

    let userId = null, clickId = null
    if (refToken) {
      const { data: click } = await supabase.from('affiliate_clicks').select('id,user_id').eq('ref_token', refToken).maybeSingle()
      userId = click?.user_id || null
      clickId = click?.id || null
    }

    const totalCents = payload?.total_price ? Math.round(parseFloat(payload.total_price) * 100) : 0
    const currency = payload?.currency || 'USD'
    const retailerOrderId = String(payload?.id || payload?.name || '')

    const { data: order, error: oerr } = await supabase.from('orders').insert({
      store_id: store.id, user_id: userId, retailer_order_id: retailerOrderId,
      total_cents: totalCents, currency, status: payload?.financial_status || 'created',
      placed_at: payload?.created_at || new Date().toISOString()
    }).select().single()
    if (oerr) {
      console.error('Order insert error', oerr)
      return res.status(500).send('Order error')
    }

    const items = payload?.line_items || []
    for (const it of items) {
      let productId = null
      const ext = String(it.product_id || '')
      if (ext) {
        const { data: p } = await supabase.from('products').select('id').eq('store_id', store.id).eq('external_id', ext).maybeSingle()
        productId = p?.id || null
      }
      const priceCents = it?.price ? Math.round(parseFloat(it.price) * 100) : 0
      await supabase.from('order_items').insert({
        order_id: order.id, product_id: productId, quantity: it?.quantity || 1, price_cents: priceCents
      })
    }

    const commissionCents = Math.round(totalCents * 0.10)
    await supabase.from('commissions').insert({ store_id: store.id, user_id: userId, amount_cents: commissionCents, currency, order_id: order.id, click_id: clickId })

    res.status(200).send('OK')
  } catch (e) {
    console.error('orderWebhook error', e)
    res.status(500).send('Webhook error')
  }
}

export async function appUninstalled(req, res, ctx) {
  const secret = process.env.SHOPIFY_API_SECRET
  try {
    if (!verifyShopifyWebhook(req, secret)) {
      return res.status(401).send('Invalid HMAC')
    }
    const shop = req.get('X-Shopify-Shop-Domain')
    const { supabase } = ctx
    const known = await isKnownShop(supabase, shop)
    if (!known) return res.status(403).send('Unknown shop')
    const { data: store } = await supabase.from('stores').select('id').eq('domain', shop).maybeSingle()
    if (store?.id) {
      await supabase.from('product_sources').delete().eq('store_id', store.id).eq('kind','shopify')
    }
    res.status(200).send('OK')
  } catch (e) {
    console.error('appUninstalled error', e)
    res.status(500).send('Webhook error')
  }
}
