FROM oven/bun:1 AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM alpine:3.20

WORKDIR /srv

COPY --from=builder /app/out ./

EXPOSE 5171

CMD ["busybox", "httpd", "-f", "-p", "5171", "-h", "/srv"]
