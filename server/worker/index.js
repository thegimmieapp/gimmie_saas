import { Worker, QueueEvents } from 'bullmq'
import IORedis from 'ioredis'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { syncFull, syncDelta } from '../shopify/sync.js'

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379')
const queueName = 'catalog'
const events = new QueueEvents(queueName, { connection })

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = (supabaseUrl && supabaseServiceRoleKey) ? createSupabaseClient(supabaseUrl, supabaseServiceRoleKey) : null

const worker = new Worker(queueName, async (job) => {
  const { type, storeId, since } = job.data || {}
  if (!supabase) throw new Error('Supabase not configured')
  if (type === 'full') {
    return await syncFull({ supabase, storeId })
  } else if (type === 'delta') {
    return await syncDelta({ supabase, storeId, since })
  } else {
    return { ok: true, note: 'noop' }
  }
}, { connection })

events.on('completed', ({ jobId }) => console.log(`[catalog] completed ${jobId}`))
events.on('failed', ({ jobId, failedReason }) => console.error(`[catalog] failed ${jobId}`, failedReason))

console.log('Catalog worker running')
