import express from 'express'
import { validate } from '../middleware/validation.js'
import { AffiliateClickSchema, AffiliateConfirmSchema } from '../validation/schemas.js'

export default function makeRouter(ctx) {
  const { supabase } = ctx
  const router = express.Router()

  router.post('/affiliate/click', validate(AffiliateClickSchema), async (req, res) => {
    try {
      const { storeId, productId, userId, source = 'widget', cookieId, sessionId } = req.body || {}
      if (!storeId || !productId) return res.status(400).json({ error: 'storeId & productId required' })
      const refToken = Math.random().toString(36).slice(2) + Date.now().toString(36)

      if (supabase) {
        await supabase.from('affiliate_clicks').insert({ store_id: storeId, product_id: productId, user_id: userId, source, ref_token: refToken, cookie_id: cookieId, session_id: sessionId })
      }

      res.setHeader('Set-Cookie', `gimmie_ref=${refToken}; Path=/; SameSite=None; Secure`)
      res.json({ refToken })
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  })

  router.post('/affiliate/confirm', validate(AffiliateConfirmSchema), async (req, res) => {
    try {
      const { storeId, retailerOrderId, totalCents, currency='USD', items=[], refToken } = req.body || {}
      if (!storeId || !retailerOrderId) return res.status(400).json({ error: 'storeId & retailerOrderId required' })
      if (!supabase) return res.status(500).json({ error: 'Supabase not configured' })

      let userId = null
      let clickId = null
      if (refToken) {
        const { data: click } = await supabase.from('affiliate_clicks').select('id,user_id').eq('ref_token', refToken).maybeSingle()
        userId = click?.user_id || null
        clickId = click?.id || null
      }

      const { data: order, error: oerr } = await supabase.from('orders').insert({
        store_id: storeId, user_id: userId, retailer_order_id: retailerOrderId,
        total_cents: totalCents, currency, status: 'created', placed_at: new Date().toISOString()
      }).select().single()
      if (oerr) throw oerr

      for (const it of items) {
        await supabase.from('order_items').insert({ order_id: order.id, product_id: it.productId || null, quantity: it.quantity || 1, price_cents: it.priceCents || 0 })
      }

      const commissionCents = Math.round((totalCents || 0) * 0.10)
      await supabase.from('commissions').insert({ store_id: storeId, user_id: userId, amount_cents: commissionCents, currency, order_id: order.id, click_id: clickId })

      res.json({ ok: true, orderId: order.id, commissionCents })
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  })

  return router
}
