# Stage 1: Base image
FROM node:20-alpine AS base

# Stage 2: Install dependencies
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on package-lock.json
COPY package.json package-lock.json ./
RUN npm ci

# Stage 3: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js telemetry is disabled during the build
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Stage 4: Production server
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Create the .next cache directory with correct permissions
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy the build artifacts and necessary files
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Copy all config files (next.config.ts, tsconfig.json, etc.) because standalone mode isn't explicitly configured and they may be requested
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/tsconfig.json ./

USER nextjs

EXPOSE 3000

ENV PORT=3000
# set hostname to 0.0.0.0
ENV HOSTNAME="0.0.0.0"

CMD ["npm", "start"]
