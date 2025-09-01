# syntax=docker/dockerfile:1

# ---------- Base ----------
FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=production     PNPM_HOME=/usr/local/share/pnpm
RUN apk add --no-cache python3 make g++ git libc6-compat  && corepack enable

# ---------- Dependencies ----------
FROM base AS deps
COPY package.json package-lock.json* pnpm-lock.yaml* ./
# Prefer pnpm if present; fallback to npm
RUN if [ -f pnpm-lock.yaml ]; then corepack prepare pnpm@latest --activate && pnpm install --frozen-lockfile;     elif [ -f package-lock.json ]; then npm ci;     else npm install; fi

# ---------- Build (widget, etc.) ----------
FROM deps AS build
COPY . .
# Build the embeddable widget if configured
RUN if grep -q "build:widget" package.json; then       if command -v pnpm >/dev/null 2>&1; then pnpm run build:widget;       else npm run build:widget; fi;     else echo "No widget build script; skipping"; fi

# ---------- Runtime ----------
FROM base AS runtime
WORKDIR /app
# Create non-root user
RUN addgroup -S nodegrp && adduser -S nodeuser -G nodegrp
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app .

# Security hardening
ENV PORT=8787
EXPOSE 8787

# Healthcheck: ping /api/health
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=5   CMD wget -qO- http://127.0.0.1:${PORT}/api/health || exit 1

USER nodeuser

# Default command runs API server
CMD ["node", "server/index.js"]
