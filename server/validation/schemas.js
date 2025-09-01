import { z } from 'zod'

export const SearchAiSchema = z.object({
  body: z.object({
    query: z.string().min(2),
    storeId: z.string().uuid().optional(),
    limit: z.number().int().min(1).max(50).optional(),
    profileHints: z.record(z.any()).optional()
  }),
  query: z.any(),
  params: z.any(),
})

export const WidgetSessionSchema = z.object({
  body: z.object({
    storeId: z.string().uuid(),
    sessionToken: z.string().optional()
  }),
  query: z.any(), params: z.any()
})

export const WidgetUpgradeSchema = z.object({
  body: z.object({
    sessionToken: z.string().min(8),
    userId: z.string().uuid()
  }),
  query: z.any(), params: z.any()
})

export const AffiliateClickSchema = z.object({
  body: z.object({
    storeId: z.string().uuid(),
    productId: z.string().uuid(),
    userId: z.string().uuid().nullable().optional(),
    source: z.string().optional(),
    cookieId: z.string().optional(),
    sessionId: z.string().uuid().nullable().optional()
  }),
  query: z.any(), params: z.any()
})

export const AffiliateConfirmSchema = z.object({
  body: z.object({
    storeId: z.string().uuid(),
    retailerOrderId: z.string().min(1),
    totalCents: z.number().int().nonnegative().optional(),
    currency: z.string().length(3).optional(),
    refToken: z.string().optional(),
    items: z.array(z.object({
      productId: z.string().uuid().optional(),
      quantity: z.number().int().min(1).optional(),
      priceCents: z.number().int().nonnegative().optional(),
    })).optional()
  }),
  query: z.any(), params: z.any()
})

export const TrackEventSchema = z.object({
  body: z.object({
    storeId: z.string().uuid().nullable().optional(),
    name: z.string().min(2),
    props: z.record(z.any()).optional(),
    sessionId: z.string().uuid().nullable().optional(),
    userId: z.string().uuid().nullable().optional()
  }),
  query: z.any(), params: z.any()
})

export const AnalyticsOverviewSchema = z.object({
  body: z.any(),
  params: z.any(),
  query: z.object({
    storeId: z.string().uuid()
  })
})

export const CatalogSyncSchema = z.object({
  body: z.object({
    storeId: z.string().uuid(),
    type: z.enum(['full','delta','csv']).optional()
  }),
  query: z.any(), params: z.any()
})
