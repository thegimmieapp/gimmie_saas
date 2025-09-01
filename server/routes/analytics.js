import express from 'express'
import { validate } from '../middleware/validation.js'
import { AnalyticsOverviewSchema } from '../validation/schemas.js'

export default function makeRouter(ctx) {
  const { supabase, roles } = ctx
  const router = express.Router()

  router.get('/analytics/overview', validate(AnalyticsOverviewSchema), async (req, res) => {
    try {
      const storeId = req.query.storeId
      if (!storeId) return res.status(400).json({ error: 'storeId required' })

      if (!req.user) return res.status(401).json({ error: 'Not authenticated' })
      const isMember = await roles.isStoreMember(req.user.id, storeId)
      const isAdmin = await roles.hasPlatformRole(req.user.id, 'admin')
      if (!isMember && !isAdmin) return res.status(403).json({ error: 'Forbidden' })

      if (!supabase) return res.json({ revenueCents: 0, orders: 0, clicks: 0, conversions: 0 })

      const [{ data: orders }, { data: clicks }] = await Promise.all([
        supabase.from('orders').select('total_cents').eq('store_id', storeId),
        supabase.from('affiliate_clicks').select('id').eq('store_id', storeId)
      ])
      const revenueCents = (orders || []).reduce((a, b) => a + (b.total_cents || 0), 0)
      const overview = { revenueCents, orders: orders?.length || 0, clicks: clicks?.length || 0, conversions: orders?.length || 0 }
      res.json(overview)
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  })

  return router
}
