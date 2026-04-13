FROM node:20.19.2-alpine

WORKDIR /app

# Copy package files and install all dependencies
COPY package.json package-lock.json* ./
# Skip husky git hooks setup (no .git dir in Docker)
ENV HUSKY=0
RUN npm install

# Copy source code
COPY . .

# Generate Prisma Client (schema lives at gateways/prisma/schema.prisma)
RUN npx prisma generate --schema gateways/prisma/schema.prisma

# Build frontend (outputs to web/dist)
RUN node node_modules/vite/bin/vite.js build --config web/vite.config.ts

# Expose port
EXPOSE 3001

# Use tsx (esbuild-powered) instead of ts-node — ~10x faster startup, no recompilation overhead
# Handles tsconfig path aliases natively
ENV NODE_OPTIONS="--max-old-space-size=512 --dns-result-order=ipv4first"
CMD ["npx", "tsx", "--tsconfig", "tsconfig.app.json", "gateways/src/index.ts"]
