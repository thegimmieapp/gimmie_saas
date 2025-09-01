import express from 'express'
import { validate } from '../middleware/validation.js'
import { CatalogSyncSchema } from '../validation/schemas.js'
import { makeQueue } from '../worker/queue.js'

export default function makeRouter(ctx) {
  const { supabase, roles } = ctx
  const router = express.Router()

  router.post('/catalog/sync', validate(CatalogSyncSchema), async (req, res) => {
    try {
      const { storeId, type='full' } = req.body || {}
      if (!storeId) return res.status(400).json({ error: 'storeId required' })

      if (!req.user) return res.status(401).json({ error: 'Not authenticated' })
      const isMember = await roles.isStoreMember(req.user.id, storeId)
      const isAdmin = await roles.hasPlatformRole(req.user.id, 'admin')
      if (!isMember && !isAdmin) return res.status(403).json({ error: 'Forbidden' })

      if (!supabase) return res.status(500).json({ error: 'Supabase not configured' })

      const { data, error } = await supabase.from('catalog_jobs').insert({ store_id: storeId, type, status: 'queued', started_at: new Date().toISOString() }).select().single()
      if (error) throw error

      try {
        const q = makeQueue('catalog')
        await q.add('sync', { type, storeId })
      } catch (e) {
        console.warn('Queue enqueue failed', e.message)
      }

      res.json({ jobId: data.id, status: data.status })
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  })

  router.get('/catalog/status', async (req, res) => {
    try {
      const { jobId } = req.query
      if (!jobId) return res.status(400).json({ error: 'jobId required' })
      if (!supabase) return res.json({ status: 'unknown' })
      const { data, error } = await supabase.from('catalog_jobs').select('*').eq('id', jobId).single()
      if (error) throw error
      res.json({ status: data.status, startedAt: data.started_at, finishedAt: data.finished_at, log: data.log })
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  })

  return router
}
