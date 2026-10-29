# Development and provisioning

## Runtime

Use Node 24.22.1 (`.nvmrc`). This workstation has a portable checksum-verified copy in `.tools/node-v24.22.1-win-x64`; use the inline PATH assignment in the README to add it to the current terminal only. `.tools` is not committed or included in images. Other developers install their own Node runtime.

Run `npm ci`, copy `.env.example` to `.env`, and run `npm run db:generate`. No application install command provisions Supabase or deploys Darkube.

## Local database

On this Windows workstation, `npm run db:up` starts a foreground PostgreSQL 17.10 process on loopback port 5432 using the pinned `embedded-postgres` development package. Keep its terminal open; Ctrl+C stops it without deleting the ignored `.local/postgres` data. From another terminal, `npm run db:deploy` runs committed migrations using `MIGRATION_DATABASE_URL`. Docker remains an optional alternative through `npm run db:up:docker`; do not start both servers on the same port. Match the local PostgreSQL major to the actual Supabase project before hosted acceptance. `npm run db:migrate -- --name descriptive-name` is for local development migration authoring only; set its `DATABASE_URL` to the local DDL role, never a production URL.

Set the three `BOOTSTRAP_ADMIN_*` values privately, then run `npm run db:seed` once against an empty account table. Remove them afterward. Normal `npm run dev` needs the database; `npm run dev:preview` runs only the shell with a synthetic evaluator on loopback and no DB persistence.

## Supabase Free setup

1. Create/select the agreed project and region. Record the actual PostgreSQL version, limits, endpoint, and connectivity from Darkube.
2. Use a dedicated DDL/owner role for `venturelens` and a separate login role with only CONNECT, schema USAGE, and required table/sequence DML. Provision role passwords privately. Runtime must not own tables, have DDL rights, or BYPASSRLS privileges. The migration must run as the schema owner.
3. Exclude `venturelens` from Data API exposed schemas; revoke existing/default grants for PUBLIC, anon, and authenticated on app objects. Never reset Supabase-managed schemas. Verify API access is denied independently of app login.
4. Copy the SESSION pooler URLs (port 5432), selecting `schema=venturelens`, verified TLS, and `connection_limit=2` initially for runtime. Do not use transaction pooler URLs for migrations.
5. Apply the migration explicitly with the DDL role; apply/recheck runtime grants and default privileges for future objects. Bootstrap the first account separately. Database migrations do not create Supabase users or buckets.
6. Create private `originals` and `artifacts` buckets for the forthcoming storage adapter. S3 keys bypass Storage RLS across the project; do not send them to a browser or parser. Store credentials only after that adapter is implemented and tested.
7. Configure independent backups, quota monitoring, and recovery before confidential files. The full [runbook](darkube-deployment.md) remains binding.

No real project URL or credential has been committed. Application migrations have passed against local and disposable CI PostgreSQL; actual Supabase roles, grants, and connectivity remain unprovisioned.

## Processes and packaging

- Web: `npm run dev` locally; `npm run build` then `npm start` for local production checks.
- Worker: `npm run worker:dev`, or `npm run worker:build` then `npm run worker:start`. Currently connectivity/lifecycle scaffolding only; no job processing or paid calls.
- Images: `docker build --target web -t venturelens-web .`, similarly `worker` and `migrate`.
- Migrations: the `migrate` image takes `MIGRATION_DATABASE_URL`; web/worker receive only runtime credentials. No startup migration or automatic admin seed.
- Health: `/api/health/live` is process liveness; `/api/health/ready` checks application tables. `/api/health` remains a readiness alias.

## Tests

Unit tests mock Prisma and cannot validate real transactions. CI provisions disposable PostgreSQL, seeds synthetic credentials, builds the application, and runs Playwright against the production server. Local browser setup: `npx playwright install chromium`; set `TEST_USERNAME`/`TEST_PASSWORD` matching the isolated test account. Never point E2E user-management tests at production.

The Docker job loads the `web`, `worker`, and `migrate` images and runs `bash scripts/docker-smoke.sh` on Linux. It creates its own disposable PostgreSQL container and Docker network, with no host ports or cloud credentials. Checks cover non-root images, missing-schema readiness (503), applying committed migrations twice, ready web (200), worker connectivity with processing disabled, readiness loss while liveness remains healthy after database shutdown, and graceful web/worker termination. Cleanup removes only that run's containers, database volume, and network. This verifies packaging and lifecycle, not Supabase grants/TLS or assessment-job concurrency. To run it manually with Docker and Bash, first build all three targets with tags `venturelens-web:ci`, `venturelens-worker:ci`, and `venturelens-migrate:ci`.

Keep `.local/` (including local PostgreSQL data), `.env*`, `.tools/`, and `.git/` outside the Docker build context via `.dockerignore`.

The generic module generator was removed because it generated routes outside the authenticated shell and destructive hard-delete defaults. Add modules manually using Users as the structural reference and the product's domain rules.
