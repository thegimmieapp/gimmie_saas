# Dockerized Local (Prod-like) Setup

This runs the API and background worker with Redis, similar to production.
Supabase and OpenAI remain external (set via `.env`).

## Files
- `Dockerfile` — multi-stage build; builds widget if `build:widget` exists
- `docker-compose.yml` — services: `api`, `worker`, `redis`
- `.dockerignore` — keeps the image small

## Quickstart
```bash
# 1) ensure .env is present in project root
cp .env.example .env
# fill SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY, SHOPIFY_*, etc.

# 2) build & run
docker compose up --build

# 3) test
curl http://localhost:8787/api/health
```

## Notes
- Local HTTPS is disabled (`ENFORCE_HTTPS=0`). In production behind a proxy/CDN, set `ENFORCE_HTTPS=1`.
- Redis is internal to the compose network; workers and API share it for rate limits & BullMQ.
- The `worker` uses the same image but different command: `npm run worker`.
- If you need a separate `Dockerfile.worker`, you can split images later.
