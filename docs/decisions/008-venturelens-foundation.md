# 008 — Adopt the starter as the VentureLens development foundation

**Date:** 2026-10-22. **Status:** Accepted setup decision; hosted acceptance remains pending.

Source: [amirmhp98/mhp-nextjs-boilerplate](https://github.com/amirmhp98/mhp-nextjs-boilerplate/tree/a6228062889af58805fba519cd2c00331808893d), commit `a6228062889af58805fba519cd2c00331808893d`.

Performed the relevant setup steps natively on Windows: adopt the application/tooling, name the package, select Persian, write product context, install the lockfile, generate Prisma, and replace template-specific CI/documentation. Did not execute the shell script's deletion of Git history, automatic commit, issue-tracker setup, or default-password seed.

Keep cookie auth/Users because the confirmed product has multiple evaluators. Remove gallery navigation, dark theme, English UI dictionary, unrelated agent integrations, and generic destructive module generation. Keep reusable UI components and Persian utilities because their feature needs are not yet fully implemented.

Persistence uses Supabase Free; Dockerized processes target Darkube. Prisma app objects use `venturelens`; migrations are an explicit one-off step. Worker packaging is established without pretending queue processing exists. Upstream ADRs 001–007 are historical context; current specs and this decision supersede conflicting template assumptions.

The original user-supplied `design.md` stays at the repository root unchanged. Application tokens implement its light direction with readable text and independently meaningful status colors; Vazirmatn is used until suitable DPSans assets are available.
