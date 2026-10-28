# VentureLens

Persian RTL startup due diligence for multiple evaluators in one shared workspace. VentureLens will combine source-linked evidence, six assessment domains, and human-reviewed investment opinions.

This repository is the installed development foundation, adapted from [mhp-nextjs-boilerplate](https://github.com/amirmhp98/mhp-nextjs-boilerplate/tree/a6228062889af58805fba519cd2c00331808893d). Login, administrator user management, and the app shell are present. Assessment workflows, parsers, storage integration, and AI processing are planned work, not completed features. See [implementation status](docs/implementation-status.md).

## Documentation

Start with [docs/README.md](docs/README.md), [PRD](docs/PRD.md), [technical specification](docs/technical-spec.md), and the user-supplied [design.md](design.md). Current product documents live in `docs/`; old root paths are navigation links.

## Local setup

Requires Node **24.22.1** and npm. A verified portable runtime is installed in this workspace under `.tools/` and intentionally excluded from Git. On this Windows machine, add it to the current terminal (no execution-policy change needed):

```powershell
$env:PATH = (Join-Path $PWD '.tools/node-v24.22.1-win-x64') + ';' + $env:PATH
npm.cmd ci
npm.cmd run db:generate
```

On another machine install Node from `.nvmrc`, then use the normal `npm` commands. Copy `.env.example` to `.env` if absent. The example contains only local development settings.

For a database-backed local session on this Windows workstation, keep this command running in one terminal:

```powershell
npm.cmd run db:up
```

It starts a local PostgreSQL 17 cluster on `127.0.0.1:5432` and stores its files in ignored `.local/postgres`. In a second terminal, add Node to `PATH` as above, then run:

```powershell
npm.cmd run db:deploy
```

Press Ctrl+C in the database terminal when finished. Docker is optional for local PostgreSQL; if installed later, `npm.cmd run db:up:docker` starts the Compose service instead. Use only one local database on port 5432 at a time.

Set `BOOTSTRAP_ADMIN_USERNAME`, `BOOTSTRAP_ADMIN_PASSWORD`, and `BOOTSTRAP_ADMIN_FULL_NAME` privately in `.env`, then run `npm.cmd run db:seed`. The password must contain at least 15 characters and no more than 72 UTF-8 bytes. Bootstrap refuses a nonempty account table. Remove the bootstrap values afterward and run `npm.cmd run dev`. This account is local only; production needs separate credentials.

For a local UI preview without PostgreSQL:

```powershell
npm.cmd run dev:preview
```

Preview uses a synthetic evaluator, binds to loopback, and does not enable account administration or create data. Normal development keeps authentication enabled. Production rejects the bypass.

## Supabase and Darkube

Supabase Free hosts PostgreSQL and private Storage; Darkube hosts the web and worker processes. Configure the dashboard's **session pooler, port 5432**, with separate runtime and migration credentials, verified TLS, and `schema=venturelens`. Follow [provisioning instructions](docs/development.md) and the [deployment runbook](docs/darkube-deployment.md). Do not run development migrations or resets against a live Supabase project.

The Dockerfile has `web`, `worker`, and `migrate` targets. Migrations run explicitly, never at web/worker boot. The worker currently checks DB connectivity only; durable processing is not implemented. Base-image digest pinning and actual Darkube/Supabase acceptance remain release checks.

## Checks

```powershell
npm.cmd run lint:all
npm.cmd test
npm.cmd run build:all
```

`npm.cmd run test:e2e` requires a migrated, bootstrapped test database, an existing production build, and installed Playwright Chromium. Configure `TEST_USERNAME`/`TEST_PASSWORD` for synthetic test accounts. CI sets these explicitly and uses disposable PostgreSQL.

Dependencies are pinned and necessary install scripts are approved by exact version. See the [dependency review](docs/dependency-review.md) for applied fixes and the outstanding Prisma CLI advisory.

## License and origin

Retain the upstream [MIT license](LICENSE). [Adoption record](docs/decisions/008-venturelens-foundation.md) records the pinned source and adaptations. Vazirmatn is bundled through its font package; DPSans assets have not been supplied. No MCI branding assets are included.
