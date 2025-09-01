import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import bodyParser from 'body-parser'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import OpenAI from 'openai'

import { makeAuthMiddleware } from './middleware/auth.js'
import { makeRoleChecker } from './middleware/authz.js'
import { makeAllowlistMiddleware } from './middleware/allowlist.js'
import { makeSearchMultiLimiter } from './middleware/rlfSearchMulti.js'

import makeWidgetRouter from './routes/widget.js'
import makeSearchRouter from './routes/search.js'
import makeAffiliateRouter from './routes/affiliate.js'
import makeEventsRouter from './routes/events.js'
import makeAnalyticsRouter from './routes/analytics.js'
import makeCatalogRouter from './routes/catalog.js'

// Shopify
import { beginInstall, oauthCallback } from './shopify/auth.js'
import { productWebhook, orderWebhook, appUninstalled } from './shopify/webhooks.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8787

app.use(helmet({ contentSecurityPolicy: false }))
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || true, credentials: true }))
app.use(express.json({ limit: '10mb' }))
app.use(morgan('dev'))
app.set('trust proxy', 1)

if (process.env.ENFORCE_HTTPS === '1') {
  app.use((req, res, next) => {
    const proto = req.get('x-forwarded-proto') || req.protocol
    if (proto !== 'https') return res.redirect(301, 'https://' + req.get('host') + req.originalUrl)
    next()
  })
}

// Global limiter
const globalLimiter = rateLimit({ windowMs: 5 * 60 * 1000, max: 300, standardHeaders: true, legacyHeaders: false })
app.use(globalLimiter)

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = (supabaseUrl && supabaseServiceRoleKey) ? createSupabaseClient(supabaseUrl, supabaseServiceRoleKey) : null
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null

// Auth & roles
const authMiddleware = makeAuthMiddleware(supabase)
const roles = makeRoleChecker(supabase)
app.use(authMiddleware)

// Rate limiters
const storeSearchLimiter = makeSearchMultiLimiter({ redisUrl: process.env.REDIS_URL, roles })
const clickLimiter = rateLimit({ windowMs: 60 * 1000, max: 60 })

// Health
app.get('/api/health', (_req, res) => res.json({ ok: true, time: new Date().toISOString() }))

// Shopify OAuth
app.get('/api/shopify/install', (req, res) => beginInstall(req, res))
app.get('/api/shopify/callback', (req, res) => oauthCallback(req, res, { supabase }))

// Webhooks (raw body + allowlist)
const rawJson = bodyParser.raw({ type: 'application/json' })
const allowlist = makeAllowlistMiddleware()
app.post('/api/shopify/webhooks/products', allowlist, rawJson, (req, res) => productWebhook(req, res, { supabase }))
app.post('/api/shopify/webhooks/orders', allowlist, rawJson, (req, res) => orderWebhook(req, res, { supabase }))
app.post('/api/shopify/webhooks/app-uninstalled', allowlist, rawJson, (req, res) => appUninstalled(req, res, { supabase }))

// API Routers
const ctx = { supabase, openai, roles }
app.use('/api', makeWidgetRouter(ctx))
app.use('/api', storeSearchLimiter, makeSearchRouter(ctx))
app.use('/api', clickLimiter, makeAffiliateRouter(ctx))
app.use('/api', makeEventsRouter(ctx))
app.use('/api', makeAnalyticsRouter(ctx))
app.use('/api', makeCatalogRouter(ctx))

app.listen(port, () => console.log(`API server listening on http://localhost:${port}`))
