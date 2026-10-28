# Dependency review — 2026-10-23

The application starts from upstream commit `a6228062889af58805fba519cd2c00331808893d`, then applies compatible security updates. Direct dependency versions are exact in `package.json`; `package-lock.json` records transitive versions and integrity hashes. Use `npm ci`.

Validated runtime: Node 24.22.1, npm 11.19.1. Main resolved versions: Next.js / eslint-config-next 16.4.3, React 19.3.0, TypeScript 6.0.3, Tailwind 4.3.3, Prisma/client 6.19.3, Vitest / coverage-v8 5.0.3, Playwright 1.63.0, and Vazirmatn 5.3.0. The historical source investigation describes the original starter versions.

The npm advisory check after updates reports **three high-severity package findings, zero moderate, zero critical**. All three refer to one dependency chain in development/migration tooling: `prisma → @prisma/config → deepmerge-ts` ([GHSA-ggr8-5vv4-36mx](https://github.com/advisories/GHSA-ggr8-5vv4-36mx)). Recursive object graphs can exhaust the stack. Our Prisma configuration is trusted repository code, but the advisory remains unresolved. Do not load user-controlled Prisma configuration.

npm proposes Prisma 7.10.1 as a breaking upgrade. That requires a separately reviewed ORM migration and real-database regression checks; it has not been forced during starter setup. Resolve or explicitly review this finding before hosted acceptance. The migration/build image contains development tooling and therefore includes this dependency. An audit result is time-specific and does not establish overall application security.

The npm install-script allowlist approves only the installed versions of Prisma client/engines/CLI, esbuild, and unrs-resolver. Review scripts and refresh version-specific approvals when upgrading. No global script approval is enabled.

On 2026-10-28, `embedded-postgres@17.10.0-beta.17` was added as a development dependency to run local PostgreSQL without Docker. Its Windows binary package has a version-specific install-script approval and is excluded from production images. The 2026-10-23 audit numbers above precede this addition; run a fresh audit before release decisions.

See [third-party notices](licenses/README.md) and [implementation status](implementation-status.md) for licenses and validation boundaries.
