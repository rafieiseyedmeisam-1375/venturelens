# VentureLens — Product Requirements Overview

**Status:** Development foundation installed; product features remain planned unless listed in [implementation status](implementation-status.md). Detailed acceptance is in [product-spec.md](product-spec.md).

## What it is

VentureLens helps a small shared team evaluate startups from authorized PDF, PPTX, XLSX, and manual inputs. It preserves evidence and conflicts, assesses Commercial, Product, Technology, Financial, Team & Organization, and Legal domains, and prepares a Persian opinion/report for explicit human review. There is no overall numerical investment score.

## Users

Multiple authenticated evaluators share one workspace and can view all workspace evidence, review assessments, and approve an exact opinion revision. Administrators also manage accounts, global settings, and workspace-wide purge. No public signup, founder portal, tenant switcher, or automatic external report sharing.

## Data model

**Implemented:** User and Session from the starter, in the `venturelens` PostgreSQL schema.

**Planned:** Workspace, Startup, Assessment, immutable source/extraction versions, input snapshots, source selections, facts/evidence, rubric versions, conflicts/scenarios, durable runs/jobs, provider attempts/budgets, review revisions, approvals, reports, audit events, and resumable deletion. See the [technical entity inventory](technical-spec.md#6-persistence-model).

## Infrastructure and design

Darkube runs Dockerized Next.js web and Node worker processes; Supabase Free supplies PostgreSQL and private S3-compatible Storage. Prisma and existing cookie sessions remain. Persian RTL/light-only visual direction follows [design.md](../design.md), adapted through [design scope](design-scope.md). No Supabase Auth migration is implied.

## Roadmap

1. Complete hosted authentication safeguards and real-database integration validation.
2. Startup/draft collaboration, explicit revision conflicts, private upload storage and quotas.
3. PDF/PPTX/XLSX extraction with locators, omissions, and selected-content lineage.
4. Approved rubric, immutable snapshots, durable jobs, deterministic calculations.
5. Bounded AI calls, cost ledger, structured validation, evaluation cases.
6. Collaborative review/approval, immutable reports, purge, and restore drill.

Framework anchors, provider selection/budgets, and actual cloud configuration remain explicit gates. Do not fabricate scores, completed workflows, or deployment evidence to fill missing implementation.

## Development handoff

Use the [implementation plan](implementation-plan.md) and [development readiness contract](development-readiness.md). Development starts with synthetic AI fixtures, paid execution disabled and jurisdiction not configured; these are explicit defaults, not missing startup prerequisites. [Rubric candidate R0](rubric-review.md) supplies a concrete scoring-policy review package; its approval status is recorded there. Actual cloud, provider, recovery and expert-quality evidence is required before enabling the corresponding live capability.
