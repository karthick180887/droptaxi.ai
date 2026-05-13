FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
# libc6-compat keeps native binaries (sharp, swc) happy on Alpine.
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js telemetry — off in builds and runtime
ENV NEXT_TELEMETRY_DISABLED 1

# NEXT_PUBLIC_* env vars must be ARGs so they're baked into the client bundle
# at build time. Server-only secrets are NOT here; they come from
# `envFrom: secretRef` in k8s-deployment.yaml at runtime.
ARG NEXT_PUBLIC_SITE_URL=https://droptaxi.ai
ARG NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=""
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=$NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Alpine-compatible non-root user (matches bharatonewaytaxi convention)
RUN addgroup -g 1001 -S nodejs
RUN adduser -S -u 1001 -G nodejs nextjs

# Copy public/ if it exists — droptaxi has public/images/
COPY --from=builder /app/public* ./public/

# Pre-create .next so the nextjs user owns the prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Standalone build output (next.config.ts already sets output: "standalone")
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
