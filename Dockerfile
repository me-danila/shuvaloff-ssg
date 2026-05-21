# syntax=docker/dockerfile:1
FROM oven/bun:1 AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN --mount=type=cache,target=/root/.bun \
    bun install --frozen-lockfile
COPY . .
ENV NODE_OPTIONS="--max-old-space-size=3072" \
    SHARP_CONCURRENCY=6
RUN --mount=type=cache,target=/app/.next \
    --mount=type=cache,target=/app/public/nextImageExportOptimizer \
    --mount=type=cache,target=/app/public/next-image-export-optimizer-hashes.json \
    --mount=type=cache,target=/app/remoteImagesForOptimization \
    bun run build

FROM busybox:1.36.1-musl
WORKDIR /srv
COPY --from=builder /app/out ./
EXPOSE 5171
CMD ["httpd", "-f", "-p", "5171", "-h", "/srv"]