import express from 'express'
import { validate } from '../middleware/validation.js'
import { SearchAiSchema } from '../validation/schemas.js'

export default function makeRouter(ctx) {
  const { supabase, openai } = ctx
  const router = express.Router()

  router.post('/search/ai', validate(SearchAiSchema), async (req, res) => {
    try {
      const { query, storeId, limit = 12, profileHints = {} } = req.body || {}
      if (!query) return res.status(400).json({ error: 'query required' })

      let candidates = []
      if (supabase && storeId) {
        const { data, error } = await supabase.from('products')
          .select('id, title, description, image_url, price_cents, tags, external_url')
          .eq('store_id', storeId).limit(100)
        if (error) throw error
        candidates = data || []
      }

      if (!openai) return res.json({ products: candidates.slice(0, limit), reason: 'OpenAI not configured; returning top items.' })

      const prompt = [
        { role: 'system', content: 'You rank products for gift suitability. Respond with JSON array of product IDs only.' },
        { role: 'user', content: `Query: ${query}\nProfileHints: ${JSON.stringify(profileHints)}\nCandidates: ${JSON.stringify(candidates.map(c => ({id:c.id,title:c.title,tags:c.tags,price:c.price_cents})))}\nReturn: ["id1","id2",...] up to ${limit}.` }
      ]
      const out = await openai.chat.completions.create({ model: 'gpt-4o-mini', messages: prompt, temperature: 0.2 })
      let rankedIds = []
      try { rankedIds = JSON.parse(out.choices?.[0]?.message?.content || '[]') } catch {}
      const ranked = rankedIds.length ? rankedIds.map(id => candidates.find(c => c.id == id)).filter(Boolean) : candidates.slice(0, limit)
      res.json({ products: ranked, reason: 'LLM ranking applied' })
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  })

  return router
}
