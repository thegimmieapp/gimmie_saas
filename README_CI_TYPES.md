# Shared Types CI Check

This repository enforces using `src/shared/types.ts` for core API types:
- Product, SearchRequest, SearchResponse, AffiliateClick, Profile

CI runs `npm run check:shared-types` which fails if those types are re-defined
anywhere else. Import them instead, e.g.:

```ts
import type { Product, SearchRequest, SearchResponse } from '../../src/shared/types'
```
