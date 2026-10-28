# VentureLens — Boilerplate Investigation and Specification Impact

> **Scope update — 2026-10-21:** The source audit below remains evidence about the pinned boilerplate. The user subsequently selected Darkube hosting and multiple authenticated evaluators in a shared workspace. [Technical specification](technical-spec.md) supersedes adoption recommendations that remove accounts, assume one evaluator, or use local durable storage; retain and harden authentication and use private cloud persistence instead.

**Review date:** 2026-10-21  
**Repository:** amirmhp98/mhp-nextjs-boilerplate  
**Reviewed commit:** `a6228062889af58805fba519cd2c00331808893d` (2026-09-15)  
**Product baseline:** `product-spec.md` v1.4, with `design-scope.md`; v1.1 is historical.  
**Status:** Source audit and proposed adoption decisions. This is not a runtime certification or an instruction to begin application development.

## 1. Recommendation

Use this repository as VentureLens's application foundation, with an explicit adaptation phase. Its strongest contributions are a coherent Next.js structure, locally owned RTL components, typed Persian messages, reusable forms, database migration tooling, and test/CI scaffolding. These are useful matches for the product.

Adoption substantially changes the implementation direction in product-spec Section 19.2: replace the Vite frontend and separately described Node backend with a Next.js application, and preferably retain the starter's Prisma/PostgreSQL persistence. PostgreSQL adds an operational dependency compared with SQLite; it is a recommendation for minimizing divergence from this starter, not a requirement of due diligence or single-user software.

The six-domain assessment, evidence rules, confidential local operation, immutable snapshots, successor assessments, human approval, and Persian reports remain authoritative. The template must conform to those requirements. Its user-management screens and dark mode do not become product requirements merely because they are available.

The starter does **not** implement VentureLens's document or assessment engine. There is no credible basis for saying the product is mostly complete, or for attaching a percentage or time saving to adoption before the missing systems are estimated.

The companion [proposed technical addendum](tech-spec-boilerplate-draft.md) translates these findings into an implementation contract and replacement wording for Section 19.2. The authoritative product and design documents have not been changed by this review.

## 2. What was actually inspected

The public repository was downloaded at a fixed commit into `.research/`. Inspection covered README, AGENTS.md, CLAUDE.md, the product-reference template, all seven architecture decision records, the Persian checklist, package manifest and relevant lockfile entries, the full application file inventory, schema/migration, auth and user-management implementations, error/environment/logging helpers, locale/formatting/normalization, representative UI/layout components, module generator, lint rules, test setup and suites, CI, Docker packaging, and setup script.

This workspace contains a product specification and design scope, but no separate existing technical-spec file or application implementation. No connected document session was available. The comparison therefore uses the technical constraints in the authoritative product specification, especially Sections 7, 13–19, 20–22.

**Verification limits:** Node, npm, Git, Bash, and Docker were not available through this session's command lookup. No dependency installation, build, lint, unit suite, browser suite, or Docker execution was performed. GitHub Actions execution history could not be retrieved through the web tool. CI configuration is evidence of intended checks, not proof that this commit passes them. Package security advisories, installability, and font redistribution rights were not independently certified. The setup script was read, not run.

The downloaded archive's SHA-256 is `9E89AD41942FE496D5C9DB9F746C392C652A0187D5E8814568D82FDDD9873066`. The commit metadata is in `.research/upstream-commit.json`.

## 3. The actual stack and what ships

These are versions recorded in the reviewed lockfile, not recommendations to install the latest release:

| Area               | Observed implementation                                                      | VentureLens implication                                                           |
| ------------------ | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Application        | Next.js 16.3.5 App Router; standalone build; React Compiler enabled          | One web application with server-rendered reads and interactive client components  |
| React / TypeScript | React and React DOM 19.3.0; TypeScript 6.0.3                                 | Retain typed React development; replace Vite-specific assumptions                 |
| UI                 | Tailwind 4.3.3; 37 local UI files; Radix/shadcn-style wrappers; Lucide       | Useful primitives and RTL behavior, not completed VentureLens screens             |
| Forms              | React Hook Form; Zod 4.6.5 in lockfile                                       | Share form schemas, while adding draft-save rules specific to VentureLens         |
| Persistence        | Prisma/client 6.19.3; PostgreSQL; Compose uses Postgres 16 Alpine            | Retain migrations and relational persistence; add the entire domain model         |
| Authentication     | Custom username/password; bcrypt; hashed cookie-session tokens; ADMIN/USER   | Implemented, but conflicts with the selected no-login MVP                         |
| Localization       | Fixed Persian or English UI profile; typed `t()`/`tp()`; Intl; Jalali picker | Strong fit for Persian UI; source-language/currency handling needs separate rules |
| Testing            | Vitest 5.0.0; Playwright 1.63.0; 13 unit-test files and four e2e spec files  | Reusable infrastructure; existing coverage concerns the starter                   |
| Operations         | Pino, validated env, health route, Docker, GitHub Actions, Renovate          | Useful foundations; local confidential-data packaging remains to be designed      |

The manifest allows Node `>=22`, while `.nvmrc` uses `lts/*` and Docker uses `node:lts-slim`. This is not a fixed runtime baseline. Adopt a tested Node version and container reference deliberately. [Manifest][package], [lockfile][lock], [Next configuration][next-config], [Dockerfile][dockerfile].

The Prisma schema has exactly **User and Session** models. The only existing business services are authentication and user management. There is no Startup, Assessment, Document, Evidence, AnalysisRun, ReviewRevision, or ReportVersion implementation. [Schema][schema], [user service][user-service].

## 4. Architecture: sound foundation, important boundaries

### Request and data flow

The reference flow is:

```text
Server page → access guard → service → Prisma → database
Client form → Server Action → access guard → Zod → service → database
                                                   ↓
                                     revalidatePath → ActionResult
```

Pages read through services. Actions own Next.js-specific request behavior, validation, and cache invalidation. Services own business behavior. Client components receive selected data or call actions. The UI wrapper directory isolates direct primitive imports. These are useful conventions for a small application and should survive adoption. [Services ADR][adr-services], [actions][user-actions], [layering rules][eslint].

However, “framework-free” means services do not directly import Next.js or React; it does not mean they are pure functions. They import Prisma, environment state, translations, and other services. VentureLens should put deterministic scoring, eligibility, numerical checks, and snapshot fingerprinting in a separate pure domain layer. Services can then orchestrate persistence and policy without hiding scoring inside database mutations.

There is also a worker integration issue: the Prisma and environment modules import `server-only`, and unit tests explicitly mock that package to permit execution outside the React server environment. A plain Node worker must not be assumed to import those modules unchanged. Provide worker-compatible environment/database adapters and keep the Next-specific import guard at the web boundary. Validate a real worker launch early. [Prisma helper][prisma], [test setup][test-setup].

### Enforcement is useful but less complete than the prose

- ESLint recognizes server-capable files by filename, not by proving their execution context. Its list includes `error.tsx`, and a page/layout can also be authored as a client component. Keep framework build checks and explicit server/client boundary review.
- The written table says `lib/**` must not import services, but the lint rule does not prohibit it; `lib/auth.ts` intentionally imports the auth service. Document this exception instead of calling the dependency graph fully enforced.
- Restricted imports match particular alias patterns. They are not a general dependency-graph validator, and every forbidden behavior is not statically prevented.
- The RTL script scans TS/TSX/JS/JSX text for specific utilities/imports/root-layout markers. It does not prove accessibility, inspect every CSS rule, or verify report printing.

These are limits of the guardrails, not evidence that the layering has no value. Extend both rules and documentation when adding domain, worker, parser, and storage boundaries. [ESLint][eslint], [RTL scanner][rtl-script], [auth helper][auth].

## 5. Concrete conflicts and adoption work

### 5.1 No-login local product versus account-based starter

VentureLens D13 and design scope exclude multiuser/login screens. The starter requires login in its app layout and individual pages/actions, shows account/role/logout controls, and exposes admin user management.

`SKIP_AUTH=true` returns a mock admin, and environment validation rejects it in production. It is a UI development shortcut, not an implementation of VentureLens's local access policy. It also does not turn real persistence operations into a database-free application. [Auth helper][auth], [environment validation][env].

The existing credential implementation has useful protections: 32-byte random session tokens, SHA-256 token hashes in the database, bcrypt with 12 rounds, expiry and active-user checks, and five failed logins per username per 15-minute window. The throttle is in process memory and resets with the process. Password reset writes the new hash and then revokes sessions in separate operations; a failure between them can leave prior sessions valid. If account authentication is retained for a later release, review atomic revocation and concurrent session creation instead of assuming this small reference module completes the security design. [Authentication service][auth-service], [user service][user-service].

**Recommendation:** replace the account-facing shell and guards with a deliberately designed local application session. Keep evaluator display-name attribution separate from authenticated identity, as Section 3.1 requires. The local guard must protect document reads, downloads, mutations, job controls, and report access. Remove unused user-management routes/actions and account controls from the shipped product; hiding navigation alone is insufficient.

The starter's instruction to keep the Users module is a template convention. VentureLens's established scope takes precedence. Preserve its implementation as a reference if useful, then make Startup the maintained example for future modules. Retaining login instead would require an explicit product-scope change.

### 5.2 Network binding does not meet the local-only requirement

Compose publishes `3000:3000` and `5432:5432` without host-IP restriction; it uses default `postgres/postgres` database credentials. Docker documents that publishing without a host address exposes ports on host interfaces by default. The Docker server listens on `0.0.0.0` inside the container. [Compose][compose], [Docker port publishing](https://docs.docker.com/engine/network/port-publishing/).

**Recommendation:** publish the web port only on `127.0.0.1`; keep Postgres private on the Compose network or bind its development-only host port to loopback. Use per-install credentials. For direct Node execution, explicitly bind the web server to loopback. Container-internal binding and host-port binding are different controls: the former can remain `0.0.0.0` when host exposure is restricted. [Next CLI hostname option](https://nextjs.org/docs/app/api-reference/cli/next).

The proxy excludes **all `/api/` paths**, not only health. Every new upload, download, status, and cancellation route therefore needs its own access checks. Framework Server Action origin checks also do not replace access control on route handlers or local session design. [Proxy][proxy], [Next security guidance](https://nextjs.org/docs/app/guides/data-security).

### 5.3 Uploads and extraction are absent, and the action limit is too small

The starter has no upload endpoint, private file store, PDF/PPTX/XLSX parser, content-selection model, or source viewer. `next.config.ts` caps Server Action bodies at **2 MB**; VentureLens proposes **25 MB per file** and **100 MB per assessment**. [Next configuration][next-config], [starter capability inventory][agents].

**Recommendation:** use dedicated Node-runtime upload/download handlers with byte-count enforcement and bounded streaming, rather than sending complete document sets through generic form actions. Enforce file and assessment totals, allowed formats, signatures, decompression/resource limits, storage paths, and access checks. A multipart route is not automatically memory-bounded merely because it is a route handler. Treat the 2 MB setting as an action limit, not a universal upload limit. [Server Action configuration](https://nextjs.org/docs/app/api-reference/config/next-config-js/serverActions).

Parsing must preserve page/slide/sheet/cell locations, formulas versus cached values, notes and hidden-content flags, omissions, and content selection. No library selection is justified by the boilerplate: evaluate candidate parsers against all three format contracts and representative Persian/English documents.

### 5.4 CRUD services do not provide durable analysis

No job runner, stage table, persisted checkpoint, lease, retry policy, cancellation implementation, or external model adapter exists. The generator's create/list/delete pattern cannot satisfy product-spec Section 13.

**Recommendation:** one local worker process, using the same codebase and a durable database-backed job model. A short start action validates readiness and atomically freezes the snapshot and queues work. The worker records stage outcomes and the UI polls stored status. This does not require Redis, a distributed microservice platform, or a generic workflow engine.

The database transaction must cover the lock-and-enqueue transition. It cannot make an external provider call exactly once. An interrupted call with uncertain billing/completion needs explicit reconciliation or retry disclosure; silently submitting another paid request would violate the recovery contract.

### 5.5 Persian UI is a strong match; financial semantics need replacement

The starter provides centralized direction, logical spacing, directional overlays, `<Ltr>` isolation, Persian digit handling, Jalali display/picking, and typed message keys. Keep these. One Persian UI dictionary can still display English source documents; document language is independent of UI language. [Locale][locale], [formatters][format], [RTL checklist][rtl-doc].

`formatCurrency` takes a number, divides it by the profile's divisor, and labels it in the profile currency. The Persian profile assumes IRR converted to toman by division by ten. That is unsafe as the default for startup financial evidence: an XLSX cell might already be in toman, USD, or millions of a declared unit. Its argument name also says “minor units,” while the USD profile applies no cents-to-dollars division. Define VentureLens's own explicit amount/currency/scale contract.

**Recommendation:** store raw text, exact normalized decimal, currency, scale/unit, period/calendar, and provenance separately. Use decimal-safe calculations and serialize explicit values across server/client boundaries. Format currency from the metric metadata, never infer it from Persian UI. A UI calendar likewise must not rewrite a source's reporting period or infer legal jurisdiction. [Currency implementation][format], [profile defaults][locale].

`normalizeInput` converts digits and characters and removes some marks/spacing. Keep it for a derived searchable/normalized value, but preserve original excerpts and manual input verbatim alongside it. Applying the template's blanket normalize-before-storage rule to the only stored copy would destroy evidence fidelity. [Normalization helper][persian].

### 5.6 Light mode, font, and routes require adaptation

The root layout defaults to dark mode, injects a saved-theme script, and loads **Yekan Bakh**. The header has a theme toggle. VentureLens specifies **light mode and Vazirmatn**. Replace the font and corresponding CSS/helper references, apply the VentureLens palette, remove theme switching and account chrome, and test RTL/print after the change. Font redistribution rights for the bundled font were not established by this review. [Root layout][layout], [header][header].

Preserve the agreed nine screens and assessment tabs. Sidebar reuse does not justify extra dashboard pages, a components page in the user journey, or admin screens. Evidence tables, conflict comparison, source viewers, asynchronous state presentation, and printable reports still need product-specific work. No print CSS or report implementation was found in the source search.

### 5.7 The generator is a reference, not a correct VentureLens feature factory

`new-module.mjs` generates `src/app/${plural}/page.tsx`, outside `src/app/(app)/`. Generated pages call the access guard, but do **not** inherit the app-group sidebar/header/provider layout. Fix its destination before relying on it. [Generator][scaffold].

It also generates hard deletion, required-name validation, unpaginated lists, and placeholder strings. Those are unsuitable defaults for locked assessments, shared source files, optional manual answers, and purge semantics. Separate ordinary draft removal, archival, and global purge; generate lifecycle-aware service stubs instead of copying delete behavior into every entity.

### 5.8 Errors and logs need domain-aware changes

`ServiceError` carries a code, but `fromError()` returns only its message. `ActionResult` exposes no stable error code or retry classification. Add typed codes and safe recovery information for missing provider configuration, extraction failure, locked snapshots, stale revisions, budget limits, invalid citations, and purge failures. Do not make the UI infer recovery from translated prose. [Action result][action-result].

Pino redacts selected password/token/header paths; unexpected errors are logged as full error objects. This is not a confidential-document logging policy. Parser/provider exceptions may contain sensitive bodies or excerpts outside those paths. Use safe structured error projections, allowlisted diagnostic metadata, and tests for leakage. Keep query logging disabled for confidential operation. The environment comment calls query logging development-only, but the actual Prisma configuration enables it whenever its flag is true. [Logger][logger], [Prisma][prisma].

### 5.9 Persistence and deployment need more than schema additions

The database contains only account/session data, and Compose persists only the database volume. Add private storage for immutable originals, temporary parser output, and retained report artifacts. Define ownership/permissions, configured at-rest protection, cleanup, backup/restore, and deletion across database records and files.

Prisma migrations are committed and Docker runs `migrate deploy` before starting. Keep that discipline, but validate migration failure behavior and recovery against populated VentureLens data. Do not treat the existing cascade from User to Session as a domain deletion policy. [Schema][schema], [Dockerfile][dockerfile], [entrypoint][entrypoint].

The supplied health endpoint tests the database only. It says nothing about storage writability, worker heartbeat, parser availability, or provider configuration. Add separate readiness information while preserving local editing when an AI provider is unavailable. A temporary provider outage should not prevent the application from serving saved work.

## 6. Documentation, maintenance, and testing assessment

The documentation is unusually concrete for a small starter: the README describes adoption, AGENTS.md maps included and missing capabilities, seven ADRs explain design choices, and the Persian checklist covers layout and localization. The “first feature” process correctly discourages inventing product requirements from a template. [README][readme], [ADRs][adrs], [agent contract][agents].

For VentureLens, populate its PRD from the current v1.4 specification instead of reopening a requirements interview or copying the obsolete v1.1 instructions. Establish a clear hierarchy: product spec → design scope → technical spec → engineering conventions. Record deviations from cookie-account auth, currency assumptions, and the default theme in new ADRs. Do not let a second abbreviated PRD become a contradictory source of product policy.

The CI file defines lint/typecheck/format, coverage, builds, real-Postgres browser tests, setup smoke tests for both locales, and Docker build plus a health smoke test. This is useful infrastructure. Setup removes template-only and second-locale jobs for adopted projects. [CI][ci].

The actual coverage gates are 60% statements, 55% branches, and 60% functions. Unit tests mock Prisma, environment, logger, framework APIs, and `server-only`; they do not establish transactional integrity or worker-runtime compatibility. Browser tests cover auth/users, headers/health, and locale geometry on the home/gallery pages. The configured browser project is desktop Chromium; there is no full VentureLens breakpoint/accessibility/print matrix or screenshot-baseline suite. [Vitest configuration][vitest], [Playwright configuration][playwright], [locale tests][locale-tests].

Add real-database tests for snapshot locking, concurrent start requests, retries, successor ownership, approval invalidation, and shared-source purge. Add parser fixtures for each format, provenance/selection tests, cost-boundary tests, restart recovery, and the existing A01–A34 acceptance scenarios. Test financial semantics and incomplete-report labels independently of broad coverage percentages.

Playwright captures a trace on retry and CI uploads failure reports. Use synthetic/redacted documents for automated tests; traces and screenshots are another copy of confidential data if real documents are used. This matters for purge and retention. [Playwright][playwright], [CI][ci].

The repository declares MIT licensing and separate licenses for vendored skills. Retain upstream notices and inspect asset licenses during adoption; this review is not a legal clearance. `.npmrc` disables install-time audits, runtime versions float, and Docker defaults to an alternate Prisma binary mirror. Add an explicit dependency/advisory review and document the package/binary sources actually used. These observations do not establish that any dependency is vulnerable. [License][license], [Dockerfile][dockerfile], [npm settings][npmrc].

Agent configuration is development tooling, not an AI analysis implementation. `.mcp.json` defines development MCP servers, some using `@latest`; `.claude/` contains workflow skills. Neither implements VentureLens's provider adapter, document analysis, or privacy policy. Retain only tools the project actually uses and avoid providing confidential fixtures to development tools without an appropriate boundary.

`setup.sh` requires a Unix-like toolchain, rewrites files, deletes `.git` and `.beads`, installs dependencies, makes a new commit, and deletes itself. Run it only in an isolated future adoption directory after preserving upstream provenance. It is not a harmless initializer to run over this existing documentation workspace. On Windows, document a tested WSL/Git Bash path or provide a reviewed PowerShell equivalent; the current `reinstall` script also uses Unix `rm -rf`. [Setup script][setup].

## 7. Exact impact on the current specification

| Existing section               | Proposed change                                                                                                                      | Product behavior affected?                                 |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| §19.2 Implementation direction | Next.js App Router, React/TypeScript, Tailwind/local UI, Prisma/PostgreSQL; local worker and private file store                      | Technical implementation changes                           |
| §19.1 Data entities            | Map existing entities to relations/constraints; add implementation-level job attempts/leases and local settings/session where needed | Existing history and integrity rules become enforceable    |
| §16.1 Local access             | Explicit loopback bindings, private DB, local application session, route guards                                                      | Enforces the existing local-only scope                     |
| §7 Documents                   | Route-handler upload contract, private storage, parser adapters, byte/resource limits                                                | Preserves all three formats and provenance                 |
| §13 Processing                 | Durable job execution, atomic snapshot/queue transition, idempotency, restart reconciliation                                         | Implements already-required recovery                       |
| §14 AI workflow                | Worker-safe provider adapter, validated structured outputs, code-based scoring, versioned cache keys                                 | No relaxation of evidence or approval policy               |
| §6 Manual inputs               | Raw draft persistence versus validated analytical values; optional answers; decimal/currency metadata                                | Prevents generic required-field forms from blocking saving |
| §17 UI/localization            | Keep Persian profile/RTL; replace dark/Yekan defaults with light/Vazirmatn; separate source metadata from locale                     | Keeps the agreed design                                    |
| §15 Reports                    | Dedicated revision-aware print view; retained versions and labels; no extra AI regeneration on export                                | Implements the existing report contract                    |
| §18 Reliability                | Worker/storage readiness, bounded memory, safe structured errors, installation/restore behavior                                      | Makes operational targets testable                         |
| §20 Acceptance                 | Keep A01–A34; add framework-boundary, local-access, DB concurrency, restart, and print tests                                         | Adds implementation verification                           |
| §21 Gates                      | Add platform-adoption gate: baseline install/build/test, runtime and DB packaging, local guard, logging, fonts                       | Existing rubric/provider-policy gates remain               |
| §22 Delivery                   | Add foundation adaptation before product modules; parser feasibility in parallel with policy review where independent                | Changes sequencing, not scope                              |
| `design-scope.md`              | No new screens; retain nine-screen inventory and light-only/no-login exclusions                                                      | No expansion needed                                        |

## 8. Adoption order and expected effort distribution

1. Preserve the commit and current product documents; initialize an isolated project in Persian mode; establish the tested Node/database/runtime baseline.
2. Adapt the local session, network exposure, shell, theme/font, generator, error contract, documentation, and private storage. Demonstrate that the production build can run locally under the chosen model.
3. Implement startup/draft persistence and separately evaluate PDF, PPTX, and XLSX extraction/provenance using nonconfidential fixtures.
4. Build immutable snapshots, content-selection scope, persisted jobs, cancellation/recovery, and explicit versioning before adding paid analysis.
5. Implement the approved rubric and deterministic calculations, bounded provider integration, citation validation, and scenario handling.
6. Complete review revisions, approval, successor assessments, versioned Persian reports, and purge/restore behavior.
7. Run the product acceptance and AI evaluation suites, then the confidential-data pilot gates.

**Work genuinely saved:** application layout and primitives, RTL conventions, message infrastructure, form patterns, environment/config scaffolding, database tooling, and CI/test setup.

**Work added by adoption:** replacing account/dark-mode defaults, PostgreSQL packaging, worker-safe infrastructure boundaries, adapting generator/lint/error conventions, and maintaining the fork.

**Main work still outstanding:** the document/evidence/analysis/review/report system. That work remains the dominant product-specific engineering task.

<!-- Source links are pinned to the reviewed commit rather than moving main. -->

[package]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/package.json
[lock]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/package-lock.json
[schema]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/prisma/schema.prisma
[next-config]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/next.config.ts
[dockerfile]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/Dockerfile
[compose]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/docker-compose.yml
[entrypoint]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/docker-entrypoint.sh
[user-service]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/src/services/user.service.ts
[user-actions]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/src/actions/user.actions.ts
[auth]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/src/lib/auth.ts
[auth-service]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/src/services/auth.service.ts
[env]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/src/lib/env.ts
[proxy]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/src/proxy.ts
[eslint]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/eslint.config.mjs
[rtl-script]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/scripts/rtl-smoke-check.mjs
[prisma]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/src/lib/prisma.ts
[test-setup]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/src/__tests__/setup.ts
[locale]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/src/lib/locale.ts
[format]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/src/lib/format.ts
[persian]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/src/lib/persian.ts
[rtl-doc]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/docs/rtl-fa-checklist.md
[layout]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/src/app/layout.tsx
[header]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/src/components/layout/Header.tsx
[scaffold]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/scripts/new-module.mjs
[action-result]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/src/lib/action-result.ts
[logger]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/src/lib/logger.ts
[ci]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/.github/workflows/ci.yml
[vitest]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/vitest.config.mts
[playwright]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/e2e/playwright.config.ts
[locale-tests]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/e2e/locale.spec.ts
[readme]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/README.md
[agents]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/AGENTS.md
[adrs]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/tree/a6228062889af58805fba519cd2c00331808893d/docs/decisions
[adr-services]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/docs/decisions/001-services-layer.md
[license]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/LICENSE
[npmrc]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/.npmrc
[setup]: https://github.com/amirmhp98/mhp-nextjs-boilerplate/blob/a6228062889af58805fba519cd2c00331808893d/setup.sh
