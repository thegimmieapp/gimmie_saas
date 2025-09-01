// server/middleware/rlfSearchMulti.js
import { RateLimiterRedis } from 'rate-limiter-flexible'
import IORedis from 'ioredis'

function makeLimiter({ client, keyPrefix, points, duration, blockDuration }) {
  return new RateLimiterRedis({
    storeClient: client,
    keyPrefix,
    points,
    duration,
    blockDuration,
    insuranceLimiter: { points, duration },
  })
}

export function makeSearchMultiLimiter({ redisUrl, roles }) {
  const client = new IORedis(redisUrl || process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: 1,
    enableReadyCheck: true,
    lazyConnect: false,
  })

  const storePoints = parseInt(process.env.SEARCH_LIMIT_POINTS || '120', 10)
  const storeDuration = parseInt(process.env.SEARCH_LIMIT_DURATION || '60', 10)
  const storeBlock = parseInt(process.env.SEARCH_LIMIT_BLOCK_DURATION || '60', 10)

  const userPoints = parseInt(process.env.USER_LIMIT_POINTS || '90', 10)
  const userDuration = parseInt(process.env.USER_LIMIT_DURATION || '60', 10)
  const userBlock = parseInt(process.env.USER_LIMIT_BLOCK_DURATION || '60', 10)

  const anonIpPoints = parseInt(process.env.ANON_IP_LIMIT_POINTS || '60', 10)
  const anonIpDuration = parseInt(process.env.ANON_IP_LIMIT_DURATION || '60', 10)
  const anonIpBlock = parseInt(process.env.ANON_IP_LIMIT_BLOCK_DURATION || '120', 10)

  const authIpPoints = parseInt(process.env.AUTH_IP_LIMIT_POINTS || process.env.ANON_IP_LIMIT_POINTS || '80', 10)
  const authIpDuration = parseInt(process.env.AUTH_IP_LIMIT_DURATION || process.env.ANON_IP_LIMIT_DURATION || '60', 10)
  const authIpBlock = parseInt(process.env.AUTH_IP_LIMIT_BLOCK_DURATION || process.env.ANON_IP_LIMIT_BLOCK_DURATION || '90', 10)

  const storeLimiter = makeLimiter({ client, keyPrefix: 'rlf:search:store', points: storePoints, duration: storeDuration, blockDuration: storeBlock })
  const userLimiter  = makeLimiter({ client, keyPrefix: 'rlf:search:user',  points: userPoints,  duration: userDuration,  blockDuration: userBlock  })
  const ipLimiterAnon = makeLimiter({ client, keyPrefix: 'rlf:search:ip:anon', points: anonIpPoints, duration: anonIpDuration, blockDuration: anonIpBlock })
  const ipLimiterAuth = makeLimiter({ client, keyPrefix: 'rlf:search:ip:auth', points: authIpPoints, duration: authIpDuration, blockDuration: authIpBlock })

  return async function searchMultiLimiter(req, res, next) {
    try {
      const uid = req.user?.id
      const isAdmin = roles && uid ? await roles.hasPlatformRole(uid, 'admin') : false
      if (isAdmin) return next()

      const ip = (req.headers['cf-connecting-ip'] || req.ip || '').toString() || 'unknown'
      const storeId = (req.body && req.body.storeId) || (req.query && req.query.storeId) || null
      const isAuth = !!uid

      const tasks = []
      if (storeId) tasks.push(storeLimiter.consume(storeId, 1))
      if (isAuth) {
        tasks.push(userLimiter.consume(uid, 1))
        tasks.push(ipLimiterAuth.consume(`auth:${ip}`, 1))
      } else {
        tasks.push(ipLimiterAnon.consume(`anon:${ip}`, 1))
      }

      const results = await Promise.all(tasks)
      const remaining = Math.min(...results.map(r => r.remainingPoints))
      res.setHeader('X-RateLimit-Remaining', String(remaining))
      res.setHeader('X-RateLimit-Policy', `store=${storePoints}/${storeDuration}s; user=${userPoints}/${userDuration}s; ipAuth=${authIpPoints}/${authIpDuration}s; ipAnon=${anonIpPoints}/${anonIpDuration}s`)
      return next()
    } catch (e) {
      if (e && e.msBeforeNext) {
        const retry = Math.ceil(e.msBeforeNext / 1000)
        res.setHeader('Retry-After', String(retry))
        res.setHeader('X-RateLimit-Remaining', '0')
        return res.status(429).json({ error: 'Too Many Requests', retryAfterSeconds: retry })
      }
      return next()
    }
  }
}
