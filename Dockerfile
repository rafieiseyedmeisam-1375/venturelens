# Pin a verified registry digest at release acceptance.
FROM node:24.22.1-bookworm-slim AS base
WORKDIR /app
COPY LICENSE ./LICENSE
COPY docs/licenses ./licenses
ENV NEXT_TELEMETRY_DISABLED=1
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*

FROM base AS deps
COPY package.json package-lock.json .npmrc ./
RUN npm ci

FROM deps AS build
COPY . .
ENV DATABASE_URL=postgresql://build:build@127.0.0.1:5432/build?schema=venturelens
RUN npm run db:generate && npm run build && npm run worker:build

FROM build AS runtime-deps
RUN npm prune --omit=dev

FROM base AS migrate
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./prisma.config.ts
COPY --from=build /app/scripts/migrate.mjs ./scripts/migrate.mjs
USER node
ENTRYPOINT ["node", "scripts/migrate.mjs"]

FROM base AS worker
ENV NODE_ENV=production
COPY --from=runtime-deps --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
USER node
CMD ["node", "dist/worker/main.js"]

FROM base AS web
ENV NODE_ENV=production HOSTNAME=0.0.0.0 PORT=3000
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
USER node
EXPOSE 3000
CMD ["node", "server.js"]
