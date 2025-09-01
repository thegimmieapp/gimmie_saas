import { Queue } from 'bullmq'
import IORedis from 'ioredis'

export function makeQueue(name='catalog') {
  const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379')
  return new Queue(name, { connection })
}
