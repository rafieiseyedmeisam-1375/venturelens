# VentureLens — Darkube + Supabase Deployment and Operations Runbook

**Version:** 1.1 · **Date:** 2026-10-21  
**Authority:** Companion to [technical-spec.md](technical-spec.md), especially §§5, 9–10, and 14–18.  
**Scope:** Dockerized web, worker, and migration workloads on Darkube; Supabase Free PostgreSQL and Storage; multiple authenticated evaluators sharing one workspace.  
**Status:** Implementation and operational requirements. Images, commands, health routes, backup automation, and deployment checks described here must be implemented and demonstrated; this document is not evidence of an existing deployment.

## 1. What the platform documentation establishes

| Capability                             | Verified documentation                                                                                                              | VentureLens consequence                                                                                            |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Docker image deployment                | [Image source settings](https://docs.hamravesh.com/products/darkube/create/docker-image/intro/)                                     | Deploy immutable web/worker images. Private registry access may require Hamravesh support configuration.           |
| Separate worker application            | [Getting started](https://docs.hamravesh.com/products/darkube/getting-started) demonstrates a web application and a separate worker | Use two apps with independently assigned commands and resources.                                                   |
| Command, port, HTTP readiness settings | [General application settings](https://docs.hamravesh.com/products/darkube/create/docker-image/settings/general)                    | Configure the web listener and relative readiness path; verify actual worker probe support.                        |
| Supabase Free capacity                 | [Plan details](https://supabase.com/pricing)                                                                                        | 500 MB DB, 1 GB files, 5 GB uncached plus separately accounted cached egress; track actual usage and idle pausing. |
| IPv4-compatible PostgreSQL             | [Connection modes](https://supabase.com/docs/guides/database/connecting-to-postgres)                                                | Use Supavisor session mode on port 5432 from Darkube; verify TLS and connectivity.                                 |
| Supabase S3 API                        | [S3 authentication](https://supabase.com/docs/guides/storage/s3/authentication)                                                     | Private buckets accessed only by servers; generated S3 keys bypass RLS across the project.                         |
| Object-size bound                      | [Storage limits](https://supabase.com/docs/guides/storage/uploads/file-limits)                                                      | Free's global maximum is 50 MB; preserve 25 MB originals and chunk generated artifacts.                            |
| Free recovery model                    | [Backup guidance](https://supabase.com/docs/guides/platform/backups)                                                                | Operate our own off-project logical exports and object backups; no included PITR assumption.                       |

Documentation does not establish every capability of the selected accounts. Do not assume direct Kubernetes access, arbitrary manifests, Jobs/CronJobs, network policies, read-only roots, configurable termination grace, a particular ingress limit, secret masking, or a managed alerting service on Darkube. Do not assume private networking between providers, paid Supabase backup features, or AWS IAM feature parity. Record each requirement as verified, provided by an alternative control, or unresolved.

## 2. Environment and ownership record

Create a release-controlled record containing these values before provisioning production:

| Value                   | Required record                                                                                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Environment             | Separate production/staging Supabase projects and Darkube namespaces when account allowance permits; otherwise local synthetic staging, never shared production test data |
| Region/cluster          | Chosen Darkube location, Supabase project region, backup location, measured cross-provider connectivity                                                                   |
| Application identifiers | Web and worker app IDs; environment/namespace; production canonical HTTPS origin                                                                                          |
| Registry                | Private repository, image pull credentials, approved builder/publisher, digest visibility                                                                                 |
| Database                | Actual Supabase Postgres major, session-pooler host, TLS trust, connection ceiling, runtime and migration roles                                                           |
| Object storage          | Endpoint, region/signing configuration, bucket names, private-access evidence, key rotation owner                                                                         |
| AI                      | Approved adapter/model and account, network eligibility, data terms, budget currency/caps                                                                                 |
| Recovery                | Backup schedule/retention, independent purge journal location, recovery credentials, operator                                                                             |
| Operations              | Deployment owner, incident owner, alert destination, maintenance and restore procedure                                                                                    |

These are configuration inputs rather than reasons to postpone application development. Production and confidential-data gates remain enforced while foundation work uses synthetic fixtures.

Use private `originals` and `artifacts` buckets in the production Supabase project, and separate buckets/keys in an independent staging project if available. Free's active-project allowance may already be used by other work; use local synthetic integration services when a second project is unavailable. Do not use one bucket per startup. Separate buckets/prefixes do not isolate generated S3 keys within a project. Recovery copies and the purge journal must live outside the production project with independent credentials and access controls.

## 3. Docker deliverables

Implementation must add a multi-stage `Dockerfile`, `.dockerignore`, documented build scripts, a compiled worker entrypoint, a migration launcher, health endpoints, and a local development Compose configuration. The starter's existing Docker/Compose files are inputs to revise, not production-ready assets for this architecture.

| Target    | Planned process                                    | Runtime rights                                                                                |
| --------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `web`     | `node server.js` from Next standalone output       | Runtime DB, private object access, session configuration; no AI key or migration credential   |
| `worker`  | `node dist/worker/main.js`                         | Runtime DB, private objects, AI key, bounded scratch; no schema DDL                           |
| `migrate` | Bundled, version-matched Prisma migration launcher | Short-lived session-mode or verified direct DB connection with DDL rights; no public listener |

Build all three from one commit and committed lockfile. Pin Node 24's tested patch and glibc image digest; record architecture and Prisma engine compatibility. Use `npm ci`, explicit Prisma generation, and no network downloads at process startup. Worker compilation must resolve aliases and copy parser/runtime assets without relying on Next's file tracing.

Run with a non-root UID and exec-form entrypoint. Explicitly identify writable cache and scratch paths. Do not copy developer `.env` files, real startup documents, backups, `.research`, test traces, Git history, or deployment credentials into any image. Run image/secret scans against the final targets, including build layers and published metadata. Production service credentials are not required for a build.

Build identity and Server Action key handling must follow the tested Next.js version. A supplied action encryption key is embedded in server build output; a secret build mount does not make that resulting artifact public-safe. Use private image distribution and the same web artifact across replicas. Do not place secrets in `NEXT_PUBLIC_*`. [Next.js self-hosting](https://nextjs.org/docs/app/guides/self-hosting).

Record image digests, source commit, dependency lock hash, migration set, schema compatibility range, SBOM, validation results, and report/prompt/parser versions in the release record. A mutable `latest` tag is not a release identity. Local Compose port bindings must remain loopback-only; production containers listen on the interface reached by Darkube.

## 4. Initial Darkube settings

The following are starting capacity estimates for the small-team workload in the technical specification, not measured minimums or a price quotation. Adjust after fixture and load tests.

| Setting           | Web app                                           | Worker app                                                   |
| ----------------- | ------------------------------------------------- | ------------------------------------------------------------ |
| Replicas          | 1 initially                                       | 1 initially; DB fencing remains required                     |
| CPU/memory target | 1 vCPU / 1 GiB                                    | 2 vCPU / 2 GiB total container memory                        |
| Command           | Image entrypoint: `node server.js`                | Image entrypoint: `node dist/worker/main.js`                 |
| Bind address      | `0.0.0.0`                                         | No public business listener                                  |
| Service port      | 3000                                              | Private health port only if needed/supported                 |
| Public ingress    | Canonical HTTPS domain                            | None                                                         |
| Readiness         | `/api/health/ready`                               | Scheduler/DB readiness via supported private probe mechanism |
| Liveness          | `/api/health/live`, if independently configurable | Process health, independent of provider availability         |
| Durable volume    | None required                                     | None required                                                |
| Scratch           | Small bounded upload/cache needs                  | Initial 1 GiB budget; cleanup on completion and restart      |
| AI credential     | Absent                                            | Present only after provider approval                         |

The worker memory limit includes the parent scheduler and its parser child. Set a lower parser-specific ceiling to preserve scheduler/heartbeat headroom; exceeding the limit must yield a visible extraction failure or recoverable lease expiry. Validate the largest supported XLSX/PDF/PPTX and decompression limits within that envelope. A shared-process memory failure must never create a successful result.

Use a separate build worker with adequate memory; an initial 2 vCPU / 4 GiB estimate requires measurement and is not a runtime requirement. Supabase Free supplies shared database compute; remove the earlier dedicated DB sizing/purchase assumption. Keep small connection pools and verify query/load behavior within actual free resources. This is not an HA deployment or an uptime guarantee.

Readiness requires a compatible schema and short successful DB query. It must not fail merely because the AI provider is unavailable. Missing AI configuration disables paid work while allowing preparation, extraction, saved-work review, and operational cleanup. Health responses contain no credentials, source content, stack traces, or internal endpoint inventory.

## 5. Ingress and private connectivity validation

1. Map the canonical domain and validate TLS issuance/renewal. Redirect HTTP to HTTPS and validate the trusted proxy/forwarded-host chain before enabling secure-cookie and origin enforcement.
2. Verify request limits support a 25,000,000-byte file plus multipart overhead. Initial requested ingress allowance: at least 30,000,000 bytes and 180 seconds for upload transfer. Test these through the actual public hostname.
3. Separate upload requests from Server Actions; increasing the starter's 2 MB Server Action limit is not the document-upload design.
4. Verify authenticated streamed downloads, PDF byte-range behavior, timeouts, interrupted-transfer cleanup, and unauthorized range requests. Do not redirect users to public bucket URLs.
5. Verify outbound PostgreSQL TLS from both Darkube apps to the Supabase session-pooler host on port 5432, including certificate/hostname verification. Test custom-role usernames from the dashboard; direct endpoints require verified IPv6 connectivity on Free.
6. Test Supabase Storage and AI outbound HTTPS from the processes that need them. Verify certificates, approved destinations, latency, and regional/account eligibility. There is no same-provider private-network exception.
7. Verify a worker app can run without public ingress. If Darkube requires a service port, use an authenticated or strictly private health-only endpoint; never expose the job control interface.

If the plan cannot satisfy upload size/timeouts, implement a reviewed private multipart-transfer design with revocation and orphan cleanup, or select a compatible ingress configuration before promising 25 MB support. Do not silently lower the user-visible limit or make confidential uploads public.

## 6. Database provisioning and migrations

Create the Supabase Free project in the selected region. Record its actual PostgreSQL major and use that major in local/CI and backup tooling; validate Prisma 6 compatibility. Provision a dedicated unexposed `venturelens` schema and separate least-privilege runtime and migration roles. Runtime processes cannot create/drop schema objects. Revoke application-schema grants from API-facing roles and PUBLIC, including default privileges. Never reset or migrate Supabase-managed schemas. Seed versioned reference data through explicit, repeatable release steps.

Review the starter's initial migration/schema search path before first application migration so its User/Session tables and enums are created in `venturelens`, not accidentally exposed through `public`. Keep Prisma's schema selection and generated SQL consistent, and test a clean project plus an upgrade. Do not use `db push` or whole-project schema reset as a hosted deployment step.

Start with Prisma `connection_limit=2` per long-lived process and Supavisor session mode; budget web/worker overlap, migration, backup, and provider-managed connections below the actual limits. Job claiming uses short transactions and row locks, never a transaction held over provider I/O. Use a separate DDL-role session-mode URL for migrations, or direct mode after IPv6 verification. Do not migrate through transaction pooling. Current Supabase examples may target a newer Prisma major; implement the pinned Prisma 6 schema/launcher configuration deliberately. [Prisma connection guidance](https://supabase.com/docs/guides/database/prisma).

Run the migration image exactly once per release through a supported one-off process, controlled CI runner, or operator-controlled terminal with verified Supabase TLS access. Confirm execution and exit-status capture in staging; Kubernetes Jobs are not assumed. Restrict the temporary DDL credential to that process and capture sanitized results. The launcher maps `MIGRATION_DATABASE_URL` into the migration tool's datasource configuration; it must never leak into the web/worker environment.

Migration sequence:

1. Capture a valid backup/recovery reference and migration preflight results.
2. Pause new analyses and schema-sensitive writes as required; drain or checkpoint current work.
3. Acquire a database-backed migration serialization guard using the session/direct migration connection and verify the starting migration set.
4. Run the bundled version-matched migration command; retain sanitized exit status and migration IDs.
5. Validate schema constraints/reference data and compatibility with the proposed app versions.
6. Deploy matched web and worker releases, run smoke checks, and explicitly resume work.

Never run migrations on every container restart. Prefer expand/contract schema changes; remove old columns only after all readers/writers have migrated. A failed migration does not authorize `reset`, destructive repair, or an automatic down migration.

Bootstrap the first administrator through a short-lived command with temporary secret input. Remove bootstrap credentials from platform configuration immediately afterward. Require password change at first login. No default password, open registration, or production `SKIP_AUTH` is permitted. Keep at least one active administrator through transactionally enforced account changes.

## 7. Object storage and secret handling

Keep every original, extraction artifact, and retained report private. Generated Supabase S3 credentials are project-wide and bypass RLS. The browser receives authenticated VentureLens responses, not these credentials or public object URLs. Configure no permissive browser Storage policies; retain custom application authentication. Project S3 credentials must never reach parser children, client bundles, or logs. Independent backup credentials must not be the production S3 key.

Copy S3 endpoint, region, and keys from Supabase settings; use the documented storage endpoint and tested path-style configuration. Verify signing, TLS, bounded streaming/multipart upload, checksums, ranges, missing-key responses, and size limits. Keep buckets private and test anonymous access outside the environment. Use opaque object keys. Set originals to 25 MB and artifacts to the chosen chunk bound (initially 20 MB); set the project global limit high enough for both, within Free's ceiling. [S3 compatibility](https://supabase.com/docs/guides/storage/s3/compatibility).

Use append-only, content-hashed object references for immutable snapshots; updates create new keys. Do not overwrite a blob referenced by a historical report. Supabase does not implement S3 object versioning, so application history uses distinct keys/manifests and deletion recovery uses independent backups. Upload reservations, DB finalization, and orphan reconciliation handle the lack of a cross-system DB/S3 transaction.

Verify data protection and recovery-key handling for Supabase DB/Storage and the independent backup destination before confidential onboarding. If protection is insufficient, application encryption is a separate implementation gate. Do not assume AWS SSE/KMS or bucket lifecycle APIs. Delete through supported Storage/S3 APIs, not direct SQL removal of `storage.objects` metadata, which is not deletion of the underlying file bytes. [Storage schema responsibilities](https://supabase.com/docs/guides/storage/schema/design).

Assign secrets by process role as specified in technical-spec §16. Store production runtime credentials in access-controlled platform configuration after verifying exposure/masking behavior. Restrict who can read app settings, execute terminals, pull images, and view logs. Use independent CI publishing credentials and deployment credentials.

Rotation procedure: issue the replacement credential → deploy/update only affected processes → verify with synthetic operations → revoke the old credential → record the rotation. Coordinate DB pool restarts and S3 transfers. AI key rotation must not replay ambiguous paid requests. Session-signing/encryption changes and authentication compromise require explicit session invalidation. Protect the HMAC throttle pepper independently from account passwords.

## 8. Worker shutdown and retry safety

Configure the longest practical graceful shutdown period supported by the plan and measure it; aim for at least 90 seconds to accommodate the initial 60-second provider timeout plus cleanup. Correctness must also survive immediate termination.

On SIGTERM, stop claiming jobs, keep heartbeats during safe completion, checkpoint local work, and exit before the platform deadline. Each publication verifies the current lease/fence, assessment revision, and purge epoch. A stale process cannot publish after another worker claims its job.

The lease/heartbeat defaults are 90/10 seconds for active jobs. Poll every two seconds during work and back off to 30 seconds after repeated empty polls; show Queued while awaiting dispatch. Use PostgreSQL time for lease comparisons. Do not hold a DB transaction open during parsing, object transfer, or AI execution. A paused/restricted Supabase project stops claims and new paid dispatch; polling must not be treated as a guarantee against pausing.

If termination occurs after provider dispatch and before a recorded result, mark the outcome unknown when the lease is reconciled. Retain the budget reservation; do not automatically replay a potentially billed request. Reconcile through provider request IDs/idempotency if supported, otherwise require an explicit new authorized attempt. A transport timeout does not establish that the provider performed no work.

Container-local scratch is disposable. Cleanup can remove only resolved paths inside the dedicated scratch root. Interrupted uploads and orphaned objects are reconciled without deleting blobs referenced by a committed snapshot.

## 9. CI, promotion, and rollback

CI must run locked installation, formatting/lint/RTL checks, type checks, critical domain/service tests, real-Postgres integrity tests, parser fixtures, storage integration, production-build browser tests, and image/security checks relevant to the release. Use synthetic evidence. Never provide production credentials to untrusted pull-request jobs.

Publish private images only after checks pass. Promote the same tested digests to staging, then production; do not rebuild an allegedly identical release with different dependency resolution. Record deployment authorization and operational ownership through the team's chosen release process. Do not enable ungated production auto-deploy on every push.

For each production release:

1. Confirm approved product/provider configuration, compatibility, recovery readiness, and no unresolved blocking test.
2. Enter the required maintenance mode and pause new paid dispatch.
3. Reconcile/drain work and execute the migration sequence if necessary.
4. Update web/worker image references and role-specific configuration.
5. Confirm readiness, release identity, and the smoke checks below.
6. Resume dispatch and observe queue/error/resource metrics through the agreed monitoring window.

Rollback application digests only when the previous release supports the current schema and configuration. Otherwise keep maintenance mode and apply a forward fix. Database restoration is a separate incident procedure with declared data loss, object reconciliation, purge replay, and session revocation; it is not an automatic rollback step.

Stale browsers must receive a clear reload/re-authentication recovery path with unsaved form text preserved in memory. Never automatically replay a paid run, approval, or purge after deployment errors.

## 10. Backups, deletion, and restore

Initial targets are DB and blob RPO ≤24 hours with daily independent backups, and RTO ≤one business day subject to service accessibility and a successful drill. **Recoverability of a complete assessment is limited by its least-recoverable required component.** The earlier 15-minute DB RPO/four-hour RTO is withdrawn for this Free baseline; there is no included PITR or end-to-end availability guarantee.

Implement a scheduled daily logical database export and incremental immutable-object backup to an encrypted, independently controlled destination outside the production Supabase project. Proposed retention remains 30 days, subject to owner policy and destination capacity. Supabase Free is not the backup service. Prefer an existing secure destination; any new paid service requires an explicit cost decision. A container's disposable filesystem or another bucket in the same project is insufficient independent recovery storage.

Use version-matched PostgreSQL export/restore tooling with a consistent data snapshot, including application schema, data, required grants/reference data, and migration history. Do not assume a default CLI invocation includes data or role definitions. Record bucket/settings configuration separately and restore object bytes through supported Storage APIs. Avoid overwriting provider-managed `auth`/`storage` schemas with a generic full-instance restore. Validate new runtime credentials and permissions after recovery.

A recovery manifest records DB export snapshot time, release/schema version, referenced immutable blob keys/hashes/chunks, backup completion, and purge-journal checkpoint. Verify required objects before declaring a recoverable backup. Object backup must preserve a consistent recoverable set; ongoing writes and deletions require reconciliation rather than trusting backup-job completion alone. Daily database exports and incremental object transfers consume egress; measure and budget them before claiming the schedule fits Free.

The purge journal must survive restoration of the primary DB and must not be writable through ordinary evaluator credentials. Record minimal scoped identifiers/epochs without confidential excerpts. Coordinate journal durability with access revocation: a purge cannot be reported recoverably complete until its independent tombstone is durable. A journal outage leaves deletion pending and must alert the operator.

Distinguish operational Storage deletion, independent backup retention, and external provider retention. Do not carry over Hamravesh's former bucket-deletion assumptions to Supabase. Verify deletion through supported APIs and application access tests; report residual retention separately. Never delete a whole Supabase project as an ordinary source-purge operation.

Restore drill, before confidential pilot and quarterly:

1. Restore into an isolated application environment and clean Supabase project (or a compatible local recovery environment if the free project allowance is exhausted), with public application ingress and paid dispatch disabled. Local recovery alone is not proof of restored cloud Storage behavior.
2. Restore DB and all required blobs from a verified manifest; validate hashes and missing references.
3. Obtain the independent purge journal, replay all relevant tombstones, and remove resurrected content before enabling access.
4. Revoke restored sessions; reconcile account deactivations and security changes that occurred after the recovery point.
5. Mark interrupted/ambiguous provider attempts for reconciliation; do not auto-replay restored queued jobs.
6. Verify schema compatibility, shared-workspace permissions, immutable report labels/hashes, and representative evidence links.
7. Record actual lost-data interval and restoration duration; obtain cutover authorization through the incident process.
8. Change production configuration/domain routing, verify health, then explicitly resume processing.

If the purge journal is missing or cannot be trusted, the restore must remain isolated. If backup erasure is contractually required faster than the provider's retention mechanisms allow, redesign before accepting that requirement.

## 11. Deployment acceptance record

Run against the actual staging hostname and plan. Record release, environment, tester, timestamp, result, and supporting sanitized evidence for each item.

| Check                      | Required observation                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------- |
| Private image distribution | Production-equivalent app pulls the approved private digest; unauthorized pull fails              |
| Runtime separation         | Web has no AI/DDL secret; worker has no public business ingress; migrator is short-lived          |
| Anonymous access           | Every sensitive page/API/action/file/range/print route denies access; bucket remains private      |
| Role enforcement           | Evaluator can assess/review/approve; cannot manage users/config or globally purge                 |
| Sessions                   | Secure cookies, idle/absolute expiry, reset/deactivation race, final-admin protection             |
| Collaboration              | Competing saves/start/approval produce version conflict or one committed winner without lost work |
| Upload                     | 25 MB fixture passes actual ingress; oversized/aborted/malicious package fails safely             |
| Worker                     | Restart during extraction recovers; restart after paid dispatch produces reconciliation state     |
| Provider exclusion         | Excluded units and derivatives are absent from captured synthetic outbound payloads               |
| Persistence                | Replace both containers; documents, snapshots, approvals, and reports remain available            |
| Purge                      | Concurrent job cannot republish removed content; partial failures are visible and retryable       |
| Restore                    | Restore predating purge cannot expose purged data or auto-replay paid work                        |
| Migration/rollback         | One-time migration, compatible rollback, and incompatible rollback prevention demonstrated        |
| Persian reporting          | Long RTL report prints with readable tables, source locators, and required status on every page   |
| Observability              | No secret/evidence leakage; alerts reach the assigned operator; backups report age/failure        |
| Resource limits            | Reference and maximum fixtures stay within accepted bounds or fail without corrupted state        |

A checked document is not deployment acceptance. Retain measured evidence and address every critical failure before pilot access. The complete business and hosted acceptance cases are A01–A34 and H01–H17 in the main specification.

### Free-tier operational checks

- Record dashboard usage and quota scope for DB, Storage, uncached/cached transfer, and active projects. Include existing organization usage where allowances are shared; do not assign the same free allowance independently to staging and production without verification.
- Warn at 70%, review expansion at 85%, and reserve headroom before 95% for writes, uploads, and derivative generation. Account for delayed metrics and concurrent reservations. Free capacity is a ceiling, not a reason to erase approved history.
- Estimate monthly outbound volume from actual database-export sizes, unique object backup bytes, worker reads, report/source downloads, and polling. A 200 MB daily dump alone is approximately 6 GB over 30 days before compression/other traffic; therefore a daily recovery policy does not automatically fit Free at every database size. Measure actual billed transfer and resolve budget conflicts before expansion.
- On quota failure or pausing, expose a safe unavailable state and alert the operator; preserve committed data and do not automatically replay paid jobs. Resuming a project may need provider-console action. Do not create artificial keep-alive traffic or promise polling prevents pausing.
- Rehearse private Storage access, blocked Data API access, small pool limits, artifact chunking, and restore on the actual Supabase project. No browser or parser receives project S3 credentials.
- If capacity/recovery/availability needs exceed Free, prepare a measured upgrade or migration proposal for the owner. Do not enable paid compute, PITR, IPv4 add-ons, or a plan upgrade automatically.

## 12. Account-specific questions to resolve during provisioning

- Can this account pull the selected private registry, and who can access image layers and app settings?
- Which Darkube cluster and Supabase region provide acceptable PostgreSQL/HTTPS connectivity, latency, and account eligibility?
- What upload size/timeouts, trusted-proxy headers, termination grace, private probes, and isolation controls are available?
- How are runtime secrets and Supabase DB/object data protected, and who can access provider control panels and independent recovery copies?
- Which Supabase Storage transfer/delete APIs and chunk sizes pass tests, and which account quotas are shared with other projects?
- What supported mechanism runs a one-off session-mode migration with verified TLS and captures its exit status?
- Which independent backup destination and scheduler provide daily recovery within the transfer budget, and what restoration time is measured?

Resolve these with the actual provider consoles, support documentation, and synthetic staging checks. Do not substitute generic Kubernetes or AWS behavior for evidence about Darkube and Supabase Free.
