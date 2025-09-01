import express from 'express'
import { validate } from '../middleware/validation.js'
import { WidgetSessionSchema, WidgetUpgradeSchema } from '../validation/schemas.js'

export default function makeRouter(ctx) {
  const { supabase } = ctx
  const router = express.Router()

  router.post('/widget/session', validate(WidgetSessionSchema), async (req, res) => {
    try {
      const { storeId, sessionToken } = req.body || {}
      if (!storeId) return res.status(400).json({ error: 'storeId required' })
      const token = sessionToken || (Math.random().toString(36).slice(2) + Date.now().toString(36))

      if (!supabase) return res.json({ sessionToken: token, isAuthenticated: false })

      const { data: existing } = await supabase.from('widget_sessions').select('id, user_id, is_authenticated').eq('session_token', token).maybeSingle()
      if (!existing) {
        await supabase.from('widget_sessions').insert({ store_id: storeId, session_token: token, is_authenticated: false })
      }
      res.json({ sessionToken: token, isAuthenticated: existing?.is_authenticated || false })
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  })

  router.post('/widget/upgrade', validate(WidgetUpgradeSchema), async (req, res) => {
    try {
      const { sessionToken, userId } = req.body || {}
      if (!sessionToken || !userId) return res.status(400).json({ error: 'sessionToken & userId required' })
      if (!supabase) return res.status(500).json({ error: 'Supabase not configured' })
      await supabase.from('widget_sessions').update({ user_id: userId, is_authenticated: true, last_seen_at: new Date().toISOString() }).eq('session_token', sessionToken)
      res.json({ ok: true })
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  })

  return router
}
