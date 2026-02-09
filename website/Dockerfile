FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

# --- Dependencies ---
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# --- Build ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build args become env vars at build time
ARG DATABASE_URL
ARG PAYLOAD_SECRET
ARG NEXT_PUBLIC_SERVER_URL
ARG RESEND_API_KEY

ENV DATABASE_URL=${DATABASE_URL}
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
ENV RESEND_API_KEY=${RESEND_API_KEY}
ENV NODE_ENV=production

RUN pnpm build

# --- Runner ---
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Media uploads directory
RUN mkdir -p /app/public/media && chown -R nextjs:nodejs /app/public/media

# Entrypoint script to fix volume permissions at startup
RUN printf '#!/bin/sh\nchown -R nextjs:nodejs /app/public/media 2>/dev/null || true\nexec su-exec nextjs node server.js\n' > /app/entrypoint.sh && \
    chmod +x /app/entrypoint.sh

RUN apk add --no-cache su-exec

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["/app/entrypoint.sh"]
