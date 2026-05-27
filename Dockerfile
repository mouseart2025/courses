# Multi-stage build for Astro Node.js server rendering
# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Enable pnpm via corepack (Node.js built-in package manager manager)
RUN corepack enable && corepack prepare pnpm@11.1.3 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

RUN rm -rf dist/ .astro/

# Build using Node.js adapter (generates dist/server/entry.mjs)
RUN pnpm build

# Stage 2: Runtime
FROM node:22-alpine

WORKDIR /app

# Enable pnpm in runtime image as well (needed for start script)
RUN corepack enable && corepack prepare pnpm@11.1.3 --activate

# Create non-root user for security (avoid running as root)
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./

RUN pnpm install --prod --frozen-lockfile

# Runtime environment
# HOST=0.0.0.0 makes the server accessible from outside the container
# PORT=3001 matches the exposed port
ENV HOST=0.0.0.0 \
    PORT=3001 \
    NODE_ENV=production

# Switch to non-root user
USER nodejs

# Expose port 3001 for incoming connections
EXPOSE 3001

# Health check (attempts to connect to localhost:3001 every 30s)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the Node server directly.
# No pnpm/corepack at runtime -> the container needs no network to boot,
# and isn't affected by corepack's per-user version resolution under USER nodejs.
CMD ["node", "dist/server/entry.mjs"]
