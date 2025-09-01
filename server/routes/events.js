import express from 'express'
import { validate } from '../middleware/validation.js'
import { TrackEventSchema } from '../validation/schemas.js'

export default function makeRouter(ctx) {
  const { supabase } = ctx
  const router = express.Router()

  router.post('/track/event', validate(TrackEventSchema), async (req, res) => {
    try {
      const { storeId=null, name, props={}, sessionId=null, userId=null } = req.body || {}
      if (!name) return res.status(400).json({ error: 'name required' })
      if (!supabase) return res.json({ ok: true, note: 'No DB configured' })

      await supabase.from('events').insert({ store_id: storeId, user_id: userId, session_id: sessionId, name, props })
      res.json({ ok: true })
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  })

  return router
}
