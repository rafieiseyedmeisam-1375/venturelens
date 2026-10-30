# VentureLens documentation

## Current source of truth

| Document                                          | Purpose                                                    |
| ------------------------------------------------- | ---------------------------------------------------------- |
| [PRD](PRD.md)                                     | Product overview, planned model, roles, and roadmap        |
| [Product specification](product-spec.md)          | Detailed behavior and A01–A34 acceptance                   |
| [Technical specification](technical-spec.md)      | Target architecture and hosted acceptance                  |
| [Design reference](../design.md)                  | Original user-supplied visual system, unchanged            |
| [Design scope](design-scope.md)                   | Screens, interactions, and reference adaptations           |
| [Deployment runbook](darkube-deployment.md)       | Darkube + Supabase Free operations                         |
| [Development setup](development.md)               | Local setup, provisioning, migration, and process commands |
| [Implementation status](implementation-status.md) | What actually exists and what remains                      |
| [Decisions](decisions/README.md)                  | Upstream history and VentureLens decisions                 |

The latest user requirements take precedence. Product rules govern behavior, technical specifications govern implementation, and the design reference governs visual direction subject to accessibility and product scope. A specification is not proof of implementation.

## Development handoff

- [Implementation plan](implementation-plan.md): 10 phases and 42 tasks grounded in the existing repository.
- [Development readiness](development-readiness.md): resolved contradictions, explicit defaults, schema ownership and remaining activation evidence.
- [Rubric review packet](rubric-review.md): concrete candidate R0, with its explicit owner-approval state.
- [Decision 009](decisions/009-development-readiness.md): consolidation rationale and authorization boundaries.

## Audit and history

- [Boilerplate investigation](boilerplate-investigation.md): pinned-source findings.
- [Earlier technical proposal](tech-spec-boilerplate-draft.md): superseded, historical only.
- [Product v1.1](product-spec-v1.1.md): superseded by the current product specification.
- [Persian RTL checklist](rtl-fa-checklist.md): implementation review aid.
- [Dependency review](dependency-review.md): resolved versions, security updates, and the remaining Prisma CLI advisory.

Root-level legacy specification filenames link here for compatibility. Do not maintain two editable copies of a specification.
