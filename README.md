# Base44 App


This app was created automatically by Base44.
It's a Vite+React app that communicates with the Base44 API.

## Running the app

```bash
npm install
npm run dev
```

## Building the app

```bash
npm run build
```

For more information and support, please contact Base44 support at app@base44.com.
## Quickstart (Self-Managed)

1) Copy `.env.example` → `.env` and fill values.
2) Install deps: `npm install`
3) Run both backend + frontend: `npm run dev`
   - Frontend: http://localhost:5173
   - Backend:  http://localhost:8787
4) Create Supabase tables per `MIGRATION.md`.


### Admin seed (creates demo user + attaches store ownership)

Requires environment variables on the server:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (Server-side key)

Run (default values shown):
```bash
npm run seed:admin
# or customize:
node server/scripts/seedAdmin.js --email you@example.com --password "StrongPass!1" --storeDomain demo.gimmie.ai
```

### Role-based RLS
Run SQL add-on after the main schema:
- `supabase_roles.sql`

Create an admin user and assign role:
```bash
npm run seed:admin                       # default role=admin
npm run seed:admin:staff                 # creates staff user
# or custom:
node server/scripts/seedAdmin.js --email you@example.com --password "StrongPass!1" --storeDomain demo.gimmie.ai --role admin
```


## Widget build & embed

Build the retailer widget JS:
```bash
npm run build:widget
# output: public/widget/gimmie-widget.js
```

Embed on a retailer site:
```html
<script defer src="https://YOUR-CDN/widget/gimmie-widget.js"
        data-store-id="STORE_UUID"
        data-api-base="https://api.yourdomain.com"></script>
```

The widget auto-initializes from the script tag and sends events to `/api/track/event`. Clicks call `/api/affiliate/click`.

## Production notes (added)
- Public base URL: set `SHOPIFY_APP_URL=https://api.gimmie.ai` for OAuth + webhooks.
- HTTPS: `ENFORCE_HTTPS=1` behind a proxy/CDN.
- CORS allowlist via `CORS_ORIGIN`.
- Shopify webhooks protected by **HMAC**, **known-shop check**, and optional **IP allowlist**.
- Distributed rate limits (Redis): per **store**, **user**, and **IP** (stricter for anonymous).
- Background worker (BullMQ): `npm run worker` processes `catalog` sync jobs.

## Widget build
```bash
npm run build:widget
# -> public/widget/gimmie-widget.js
```
Embed:
```html
<script defer src="https://YOUR-CDN/widget/gimmie-widget.js"
        data-store-id="STORE_UUID"
        data-api-base="https://api.yourdomain.com"></script>
```
