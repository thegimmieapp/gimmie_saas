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

export async function syncFull({ supabase, storeId }) {
  const { data: src } = await supabase.from('product_sources').select('source_ref').eq('store_id', storeId).eq('kind','shopify').maybeSingle()
  if (!src?.source_ref?.shop || !src?.source_ref?.accessToken) return { ok: false, reason: 'no shopify source' }
  const shopify = makeShopify()
  const session = shopify.session.customAppSession(src.source_ref.shop, src.source_ref.accessToken)
  const client = new shopify.clients.Rest({ session })
  let pageInfo = null
  let imported = 0
  do {
    const resp = await client.get({ path: 'products', query: { limit: 250, page_info: pageInfo?.nextPage?.query?.page_info } })
    const products = resp?.body?.products || []
    for (const sp of products) {
      const mapped = {
        store_id: storeId,
        title: sp.title || '',
        description: sp.body_html || null,
        image_url: sp?.image?.src || sp?.images?.[0]?.src || null,
        price_cents: sp?.variants?.[0]?.price ? Math.round(parseFloat(sp.variants[0].price) * 100) : null,
        currency: 'USD',
        external_id: String(sp.id || ''),
        handle: sp.handle || null,
        vendor: sp.vendor || null,
        variant_count: Array.isArray(sp.variants) ? sp.variants.length : null,
        inventory_status: sp.status || null,
        tags: (sp.tags || '').split(',').map(s => s.trim()).filter(Boolean),
      }
      await supabase.from('products').upsert(mapped, { onConflict: 'store_id,external_id' })
      imported++
    }
    pageInfo = resp.pageInfo
  } while (pageInfo?.hasNextPage)

  return { ok: true, imported }
}

export async function syncDelta({ supabase, storeId, since }) {
  const { data: src } = await supabase.from('product_sources').select('source_ref').eq('store_id', storeId).eq('kind','shopify').maybeSingle()
  if (!src?.source_ref?.shop || !src?.source_ref?.accessToken) return { ok: false, reason: 'no shopify source' }
  const shopify = makeShopify()
  const session = shopify.session.customAppSession(src.source_ref.shop, src.source_ref.accessToken)
  const client = new shopify.clients.Rest({ session })
  const resp = await client.get({ path: 'products', query: { limit: 250, updated_at_min: since || new Date(Date.now()-86400000).toISOString() } })
  const products = resp?.body?.products || []
  let updated = 0
  for (const sp of products) {
    const mapped = {
      store_id: storeId,
      title: sp.title || '',
      description: sp.body_html || null,
      image_url: sp?.image?.src || sp?.images?.[0]?.src || null,
      price_cents: sp?.variants?.[0]?.price ? Math.round(parseFloat(sp.variants[0].price) * 100) : null,
      currency: 'USD',
      external_id: String(sp.id || ''),
      handle: sp.handle || null,
      vendor: sp.vendor || null,
      variant_count: Array.isArray(sp.variants) ? sp.variants.length : null,
      inventory_status: sp.status || null,
      tags: (sp.tags || '').split(',').map(s => s.trim()).filter(Boolean),
    }
    await supabase.from('products').upsert(mapped, { onConflict: 'store_id,external_id' })
    updated++
  }
  return { ok: true, updated }
}
