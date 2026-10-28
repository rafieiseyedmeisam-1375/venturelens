# VentureLens AI — Product Specification

> **Hosted scope amendment — 2026-10-21:** The user has selected Dockerized application deployment on Hamravesh Darkube, **Supabase Free for database and object storage**, and **multiple authenticated evaluators in one shared workspace**. [Technical specification](technical-spec.md) §1 explicitly supersedes this document's earlier local-only, single-evaluator, no-login, and local-storage assumptions. Its product rules remain the baseline; proposed scoring policy still requires approval. Read historical operating-model statements below subject to this amendment.

**Version:** 1.4 — design consistency and usability clarification  
**Updated:** 2026-10-18  
**Product:** VentureLens AI  
**Tagline:** From Startup Data to Investment Intelligence  
**Category:** Evidence-based startup due diligence and investment assessment  
**Document language:** English  
**Application and report language:** Persian, RTL by default  
**Operating model:** One evaluator, local application, authorized confidential startup documents, external AI API  
**Status:** Product scope agreed; proposed rubric and operational defaults require validation before the relevant implementation or confidential-data pilot. This document does not claim that scoring is implementation-ready.  
**Authority:** This is the current specification. It supersedes `product-spec-v1.1.md`, which is retained as the historical baseline.

**Design companion:** [design-scope.md](design-scope.md) defines the concise screen, action, state, and journey inventory for design. This specification remains authoritative for product rules. Version 1.4 aligns content selection, assessment context, result states, and incomplete reports across both documents without adding screens or relaxing input immutability, evidence requirements, or human approval.

---

## 1. Product Purpose and Expected Outcome

VentureLens AI helps an evaluator assess a startup across six domains:

1. Commercial Due Diligence
2. Product Due Diligence
3. Technology Due Diligence
4. Financial Due Diligence
5. Team & Organization Due Diligence
6. Legal Due Diligence

The evaluator uploads documents, adds essential information, reviews extracted claims and evidence, and obtains domain assessments and an overall opinion. The output covers strengths, weaknesses, challenges, risks, information gaps, conflicting evidence, and recommended next actions. Each sufficiently supported domain receives a score on a 1–5 scale.

The AI also proposes an investment verdict: **Invest**, **Invest Subject to Conditions**, **Do Not Invest**, or **Insufficient Evidence**. The verdict is a draft until the human evaluator reviews and approves the final opinion. It is based solely on the six domains. There is no separate investor-fit, portfolio-fit, valuation-attractiveness, or deal-terms assessment.

The report must describe the verdict as a judgment based on the assessed startup evidence and the stated scope. It must not imply that a particular transaction, price, investor mandate, or legal conclusion has been validated. Funding needs, ownership, and financial obligations remain relevant within the existing Financial and Legal domains.

A provisional verdict is permitted when some domains are Not Assessable. Missing coverage must remain prominent, and human approval does not make missing evidence complete. An assessment can finish with substantial gaps; completion means that the available evidence and limitations have been reviewed, not that exhaustive due diligence has been performed.

### 1.1 Product outcomes

- Reduce effort to produce a reviewed, source-linked six-domain assessment.
- Make every consequential finding traceable or explicitly identify it as an inference, unverified claim, or information gap.
- Prevent missing evidence from becoming an adverse performance score.
- Preserve contradictory claims and show their consequences rather than silently selecting a preferred value.
- Produce a useful Persian report whose opinion, evidence limitations, and approval status are understandable outside the application.
- Preserve previous assessments when new documents or factual corrections arrive.

### 1.2 Scope of assurance

This is document-based decision support. It does not independently verify all startup statements, execute investments, certify legal compliance, perform source-code audits, or guarantee investment outcomes. A pitch deck does not by itself substantiate audited financial results, operating security controls, or ownership of all intellectual property.

## 2. Confirmed Product Decisions

These decisions were selected by the product owner during clarification. Proposed defaults elsewhere must not override them.

| ID  | Confirmed decision                                                                                                                                                                                                 |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| D01 | Assess all six domains and provide a comprehensive overall opinion covering strengths, weaknesses, challenges, risks, gaps, and next actions.                                                                      |
| D02 | The AI drafts an investment verdict with reasons; the human evaluator must approve the final opinion. Insufficient Evidence is a valid verdict.                                                                    |
| D03 | The opinion is based solely on the six domains; do not add investor-specific criteria or a separate deal evaluation.                                                                                               |
| D04 | Each assessable domain receives a numerical 1–5 score with evidence, explanations, and limitations.                                                                                                                |
| D05 | Keep the six domains consistent; adapt criteria applicability, evidence expectations, and scoring anchors to startup stage.                                                                                        |
| D06 | Develop the rubric for product-owner review and approval before implementing scoring. Do not let the AI invent its own scoring standards.                                                                          |
| D07 | A domain score requires minimum evidence coverage and assessable essential criteria. Otherwise display Not Assessable.                                                                                             |
| D08 | Allow a provisional investment verdict despite unassessable domains, with explicit limitations and human approval.                                                                                                 |
| D09 | Apply evidence-quality rules to extracted and manual claims; unsupported claims cannot satisfy requirements for stronger evidence.                                                                                 |
| D10 | For contradictory evidence, assess alternative scenarios and preserve the conflict until human review resolves it.                                                                                                 |
| D11 | New documents or factual corrections after analysis require a separate assessment created by the evaluator. Preserve the previous assessment and its input snapshot.                                               |
| D12 | A successor assessment copies prior documents and factual inputs, but generates fresh findings, scores, and an opinion requiring new approval.                                                                     |
| D13 | The MVP serves one evaluator using real confidential startup documents locally. Multiuser accounts are outside the first release.                                                                                  |
| D14 | An external AI API may process documents the evaluator is authorized to share, under defined data-handling rules.                                                                                                  |
| D15 | Retain PDF, PPTX, XLSX, essential manual inputs, evidence review, six-domain scoring, risks, gaps, draft verdicts, approval, and Persian reports. Defer extensive questionnaires, dark mode, and dashboard extras. |

### 2.1 Requirement labels

- **Confirmed:** An agreed product decision in the table above.
- **Baseline requirement:** A behavior needed to make the confirmed workflow coherent, reviewable, or reliable.
- **Proposed default:** A concrete recommendation, not a recorded user decision. It must be reviewed at the applicable validation gate in Section 21.
- **Deferred:** Outside the first release; do not expose placeholder controls for it.

## 3. Users, Operating Context, and Scope

### 3.1 Primary user

One evaluator creates assessments, reviews evidence and findings, and approves reports. The same person may perform both analysis and review; two-person approval is not required. Configure an evaluator display name for report attribution. Without individual accounts, that attribution is a local record, not independently authenticated identity.

The report may be read by an investment manager or committee outside the application. Report readers do not require application accounts in the MVP. Founders do not upload documents or respond through a portal.

### 3.2 Included in the first release

- Startup creation, editing, listing, and archival; multiple separately identified assessments per startup.
- PDF, PPTX, and XLSX ingestion, extraction review, provenance, and explicit unsupported-content warnings.
- Small, schema-driven manual forms across all six domains, with partial saving.
- Evidence quality, contradictions, scenario assessments, score eligibility, and information completeness.
- AI analysis, human finding review, risk/gap management, and final opinion approval.
- Assessment succession by copying previous documents and factual inputs.
- Persian report preview and browser Print-to-PDF, including clearly marked draft exports.
- Local persistence, recovery, deletion controls, and confidential-data safeguards appropriate to the operating mode.
- Responsive, accessible Persian RTL workflows in light mode.

### 3.3 Deferred or excluded

- Multiuser accounts, organizations, subscriptions, shared review assignments, and enterprise deployment.
- Investor mandates, portfolio matching, deal valuation, and an overall composite numerical score.
- Founder portals, CRM integrations, autonomous external research, and automatic verification of external claims.
- Source-code auditing, comprehensive financial modeling, legal certification, or autonomous investment action.
- Extensive domain questionnaires and elaborate repeatable manual tables.
- Dark mode, dashboard analytics beyond useful actual counts, decorative charts, and portfolio comparison/ranking.
- **Proposed default:** OCR, automatic chart interpretation, legacy `.xls`, macro-enabled `.xlsm`, TXT, and document format conversion are deferred. Required PDF/PPTX/XLSX support remains mandatory within the support contract in Section 7.

## 4. Core Concepts and Terminology

| Concept               | Meaning                                                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Startup               | The company record containing a sequence of assessments. Current profile edits do not rewrite historical assessment context.                     |
| Assessment            | One evaluation of a fixed input set, startup-context snapshot, and rubric version, with its own review and opinion.                              |
| Input snapshot        | Immutable documents, manual answers, claims, corrections, stage selection, and source mappings used by an analysis. Locked when analysis starts. |
| Source claim          | A statement attributed to a document or person; accurate extraction does not establish its truth.                                                |
| Evidence item         | A source passage, table, cell range, or attributed manual entry used to support or challenge a criterion.                                        |
| Extraction correction | Repair of a mismatch between the source and extracted representation. It does not alter the source or independently verify the claim.            |
| Analyst assertion     | A statement supplied by the evaluator, with attribution and date. It is not automatically stronger than document evidence.                       |
| Conflict              | Incompatible claims about the same subject, definition, scope, and period that cannot be reconciled from the available context.                  |
| Scenario              | An explicitly conditional analysis using one coherent alternative from a conflict. It is not a prediction or a confirmed fact.                   |
| Assessable criterion  | An applicable criterion whose minimum evidence-quality requirements are met under the approved rubric.                                           |
| Not Assessable        | Applicable, but insufficient usable evidence or context to score. This is not a low performance score.                                           |
| Not Applicable        | Excluded by a documented applicability rule or justified human review. It is not a substitute for missing evidence.                              |
| Approved opinion      | The evaluator's explicitly approved conclusion for a particular assessment and review revision.                                                  |
| Provisional opinion   | A conclusion limited by missing domain coverage or unresolved material conflicts, regardless of whether a human has approved it.                 |

Approval status, analysis completion, evidence sufficiency, and provisional status are independent dimensions.

## 5. Information Architecture and Primary Journey

### 5.1 Navigation

- **Workspace:** Startup list, search, new-startup action, assessment status, and actual counts.
- **Startup:** Profile, chronological assessment list, archive action, create or copy assessment.
- **Assessment tabs:** Overview, Documents & Inputs, Evidence & Conflicts, Domains, Risks & Gaps, Review & Report.
- **Settings:** Evaluator display name, local environment/provider readiness, configured operating jurisdiction and approved framework, data-sharing disclosure, storage/deletion information. Never display API secrets.

No empty navigation, simulated activity, invented statistics, or nonfunctional controls. Demo data and demo outputs must be conspicuously labeled and kept distinct from real records.

### 5.2 Create a startup

Required: startup name. Optional: industry, website, **city**, funding stage, business model, short description.

- Ask for city using an editable free-text field labeled `شهر`; do not add a country field to onboarding.
- Funding stage options: Pre-Seed, Seed, Series A, Series B, Growth. Funding stage and product maturity are distinct.
- The business-model selector must contain exactly **B2B, B2C, B2B2C, B2G**. Capture monetization and operating-model descriptions separately as optional text; do not add Marketplace, SaaS, or Other to the selector.
- Require only a nonblank name to create a startup and initial draft assessment. Allow similar names; warn about likely duplicates without silently merging records.
- Keep onboarding short. Extracted profile values are proposals to review, not automatic replacements for approved input.

### 5.3 Prepare inputs

1. Upload documents and/or enter essential manual information.
2. Show extraction progress, usable content, failures, and omitted content for each file.
3. Review extracted claims, source locations, numerical context, and material conflicts.
4. Confirm assessment stage when known. If stage is unknown, save and analyze available information, but withhold stage-dependent scores and explain the resulting limitations.
5. Show Questions Answered separately from Evidence Sufficiency, with prioritized gaps and a readiness preview. Missing answers do not block continuation.
6. Display the configured external provider, the content categories to be transmitted, and authorization confirmation. Reuse that authorization for retries of the same snapshot and provider configuration; material changes require a fresh confirmation.
7. Start analysis explicitly through the review-before-analysis panel in Section 5.6. Show the input set, anticipated limitations, external processing, budget information, and locking consequences before submission. Lock inputs only when a run is successfully queued; a rejected start request leaves the draft editable.

### 5.4 Analyze and review

1. Analyze all six domains, including explicit gaps for unsupported domains.
2. Present criterion findings, score eligibility, evidence coverage, confidence, and scenario alternatives.
3. Let the evaluator accept, challenge, reject, or annotate findings, and propose justified assessment edits.
4. Present a draft overall opinion, its investment verdict, limitations, conditions, and next actions.
5. Require explicit human review before marking the opinion Approved. Missing domains and material conflicts must be acknowledged; acknowledgement does not resolve them.
6. Preview and export a draft or approved Persian report with the correct status and scope.

### 5.5 New evidence or factual corrections

After an input snapshot is locked, **do not add new inputs or change factual values in that assessment**. Offer `ایجاد ارزیابی جدید از این نسخه` (Create new assessment from this version).

- Copy prior documents, manual factual inputs, source context, and extraction corrections into a new editable draft with its own ID and creation date.
- Let the evaluator add, remove, replace, or correct copied inputs before starting a new run.
- Retain factual provenance and original dates. Copied facts do not become newly corroborated because they were copied.
- Do not carry forward findings, scores, risk dispositions, review approvals, or the final opinion as active results. They remain available in the predecessor assessment for reference.
- Use the current approved rubric for the new assessment and disclose any rubric or stage change. Copies are not automatically comparable.
- Preserve copied content exclusions and assessment-specific legal context. In the copy preview and draft context panel, identify differences from current workspace/profile defaults; never silently replace copied context. Recheck authorization against the final input/provider scope before transmission.
- Keep the predecessor unchanged. Automatic reassessment and successful-run regeneration within the predecessor are excluded.

Use a prominent **Create corrected assessment** action beside locked factual fields and extraction-error notices. Show what will be copied and what will be generated fresh before creation. On success, open the new draft directly at the affected field/document and display **Copied from assessment [ID]** with an Open previous assessment link. Creating the draft makes no paid AI call. If creation fails, preserve the current screen and offer retry without creating duplicate drafts.

Previously reviewed findings, accepted risks, and approvals remain accessible in the predecessor, not silently inherited. Correcting a system extraction mistake follows the same successor rule; disclose any cost of fresh processing before the evaluator starts it. Never promise a free rerun without a provider/billing basis.

Resuming or retrying a failed stage on the identical snapshot is recovery, not a new assessment. Human review annotations on fixed inputs are permitted and versioned; changing source facts or supplying new evidence requires a successor.

### 5.6 Readiness preview and start confirmation

Keep preparation on Documents & Inputs; do not introduce another mandatory wizard or full page.

- Surface provider readiness on Workspace and Documents & Inputs early. Missing configuration links to Settings with an explicit return path. It must not block local input, saving, or access to existing reports.
- Show **Questions answered: X of Y applicable** separately from **Evidence sufficiency: preliminary / evaluated**. Do not label a fully answered form as a complete assessment.
- Show each domain's known missing essential evidence and available next actions. Until analysis validates quality and applicability, use **Needs review** or **Known gaps**, not promised scores or fabricated coverage. State that final eligibility may differ.
- Summarize files as **Uploaded**, **Reading**, **Usable content available**, **Partly readable**, or **Unreadable**, using actual parser outcomes. Never equate successful upload with complete reading. List omitted pages/slides/sheets and offer View omissions, Replace file, or Enter information manually; manual entry retains its evidence-quality limits.
- Bring consequential extracted values into a compact review queue: stage, financial amounts, currency/unit, period, and detected contradictions. Show the source next to each value. Let the evaluator review now or knowingly continue with unreviewed claims; do not require approval of every extracted fact.
- Before paid processing, show selected input scope, provider, estimated cost/time only when supported, and the configured spending limit. When an estimate is unavailable, say so and show the available limit instead of implying a free run. Each paid retry or draft-opinion synthesis also discloses possible additional usage, without repeating unchanged data-sharing authorization.
- Explain: **Starting saves a fixed version of these inputs. Corrections afterward create a new assessment with copied inputs. Cancelling processing does not unlock this version.**
- Offer **Back to inputs** and **Start analysis**. With evidence gaps, label the latter **Analyze available information** and explain that some domains may remain Not Assessable. Gaps alone are not start blockers.
- Block start only for execution prerequisites, such as missing provider configuration for a paid run, missing sharing authorization, failed saving, an active run, or exceeded hard limits. List the actual blocker and a direct recovery action; do not silently disable the button. Pending selected-file extraction must finish, or the evaluator can exclude that file explicitly before starting.
- Any external AI-assisted preparation before the main run must receive the same sharing and usage disclosure before its first transmission. The readiness preview must not secretly trigger paid analysis.

### 5.7 Assessment context without extra onboarding

Use one compact **Assessment context** panel on Documents & Inputs, with details expanded only when needed:

- Prefill the funding stage from the startup profile for a new assessment, or retain the predecessor's stage for a copy. Identify the origin and allow confirmation, correction, or **Unknown** before locking. Keep product maturity separate in Product inputs. Do not require a known stage to save or analyze available information.
- Show the applicable approved rubric version and operating jurisdiction, with a Settings link that returns to this panel. Place optional entity/contract jurisdiction exceptions in Legal inputs; show their presence in the context summary. Missing or unsupported context explains which conclusions must be withheld rather than blocking unrelated analysis.
- Show the selected context in the existing start panel. Freeze stage, jurisdiction context, and rubric identifiers with the input snapshot when the run is queued. Later profile or Settings changes never rewrite locked assessments or reports. If workspace defaults change while a draft is open, offer an explicit review of the change rather than silently replacing its values.
- After lock, these fields are read-only with **Create corrected assessment** beside them. Use the same successor flow as other factual corrections; do not introduce another setup wizard or require context confirmation again on an unchanged retry.

## 6. Essential Manual Inputs and Validation

Use six schema-driven sections. All answers are optional for saving. Offer `ذخیره پیش‌نویس`, `ذخیره و ادامه`, and `بعداً تکمیل می‌کنم`. Persist partial inputs and restore them after refresh.

### 6.1 Initial form boundary — proposed default

These concise fields replace the extensive v1.1 questionnaires. The framework may analyze additional information from documents without requiring matching manual forms.

| Domain              | Essential manual inputs                                                                                                                                         |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Commercial          | Target customer/problem; monetization and pricing description; traction summary with period; principal competitors/alternatives; sales or acquisition approach. |
| Product             | Primary use case; maturity (concept/MVP/launched/scaling); key capabilities; available adoption or retention evidence; main limitations and near-term roadmap.  |
| Technology          | Architecture/stack summary; critical dependencies; available security/reliability evidence; known incidents or constraints; engineering ownership.              |
| Financial           | Historical revenue summary; cash balance and as-of date; expenses/burn with period and definition; liabilities; funding need and intended use.                  |
| Team & Organization | Founders/key roles and commitment; relevant experience; headcount and critical vacancies; execution evidence; key-person dependencies.                          |
| Legal               | Entity/registration summary; ownership/cap-table summary; IP ownership claims; material obligations or disputes; available supporting documents.                |

Each section includes an optional additional-context field and references to supporting documents. Add compact reusable metric inputs only where needed; comprehensive questionnaires and financial statement editors are deferred.

### 6.2 Answer and save rules

- Distinguish Answered, Not Provided, Not Applicable, and Invalid Draft Value. An empty numeric field is not zero.
- A Not Applicable selection needs a reason or a matching rubric rule before it changes coverage denominators.
- Preserve invalid draft text so users do not lose work, show inline errors, and exclude invalid values from numerical analysis. Missing answers must never block Save or Continue.
- Show Saving, Saved, and Save Failed states. Warn before leaving with unpersisted edits and provide retry without losing entered text.
- Record author attribution and update time for manual entries. An unsourced manual claim retains its evidence limitations.
- After analysis begins, offer a successor assessment for factual edits instead of silently changing the locked inputs.

### 6.3 Metric contract

Whenever a numerical claim influences an assessment, store its original representation and, where applicable: metric definition, unit/currency, reporting period or as-of date, entity/customer scope, actual versus forecast, numerator/denominator, source, and normalization history.

- Do not compare monthly and annual values, bookings and revenue, or users and paying customers as if they were equivalent.
- Distinguish percentage from percentage points, aggregate from cohort retention, and gross from net burn.
- Require an explicit unit for monetary values. Do not silently treat rial and toman as equivalent or convert currencies without an explicit documented basis.
- Normalize Persian/Arabic/Latin digits for parsing while preserving the source value. Ambiguous dates or units become review items.
- Check impossible dates, mismatched periods, non-finite values, and inconsistent totals. Context-dependent negative values require interpretation rather than a blanket rejection.
- Model-generated arithmetic is not an authoritative calculation. Any derived metric must reference validated inputs, an explicit formula, units, and applicability conditions.

## 7. Document Support and Extraction Contract

PDF, PPTX, and XLSX must work end to end: UI, validation, storage, extraction, source navigation, and evidence mapping. The acceptance suite must exercise each format independently.

### 7.1 Proposed first-release support matrix

| Format | Required extraction                                                                              | Required locator                                     | Explicit limitation/fallback                                                                                                                                             |
| ------ | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| PDF    | Machine-readable text and supported tables, preserving reading context                           | Document ID, page, passage; table/row when available | Flag scanned pages, unreadable layouts, and image-only charts. Original document remains accessible; missing content does not count as extracted evidence.               |
| PPTX   | Slide text and supported tables, plus speaker notes when present                                 | Document ID, slide, shape/table or note locator      | Images, diagrams, animations, and embedded objects are not automatically interpreted. Disclose omissions.                                                                |
| XLSX   | Sheet names, typed cell values, supported table structure, formulas and cached values separately | Document ID, worksheet, cell or range                | No macro execution, external link retrieval, or formula recalculation. A missing or potentially stale cached result must not be invented or silently treated as current. |

- Reject password-protected, corrupt, spoofed, or unsupported files with an actionable explanation.
- Report partial extraction at page/slide/sheet level. Distinguish unreadable content from absent information.
- Preserve hidden-sheet/row metadata; display any included hidden content in the extraction review. External transmission must respect excluded-content choices made before locking the snapshot.
- Detect duplicate content by file fingerprint. Offer reuse or explicitly separate versions; uploading the same source twice must not increase confidence.
- Preserve immutable originals and source locations. Replacement before analysis produces a new input revision; replacement afterward requires a successor assessment.
- Keep source context around excerpts, including table headers, units, and qualifications.
- If exact navigation is unavailable, provide the original file, a human-readable locator, and the extracted passage. Do not invent page numbers or cell ranges.

### 7.2 Content selection and transmission preview

Keep selection inside the file list and source viewer on Documents & Inputs:

- Support excluding a whole file and selecting supported extracted units such as pages, slides, or worksheets. Show included hidden-sheet/row content explicitly. If a smaller unit cannot be isolated reliably, offer exclusion of its containing worksheet/file and explain the boundary; do not imply arbitrary text redaction is available.
- Distinguish **Included**, **Excluded by you**, and **Unreadable / not extracted**. Show the actual selected scope and any resulting gaps without requiring the evaluator to inspect every page. Excluded content is outside this assessment's analysis and external transmission scope, including derived excerpts or summaries; it cannot support a finding or count as satisfied evidence.
- Summarize included/excluded scope in the existing start panel, with **Review selection** returning to the relevant file. Any earlier external preparation must honor the same selection and authorization rules. Never transmit an original file containing excluded content as a fallback.
- Save selection with the draft, freeze it when queued, and preserve it when copying an assessment. Changing it after lock requires a successor. Exclusion does not erase the locally stored original; label that distinction and use the separate purge flow for erasure. Preserve selection and scroll position when returning from source review.

### 7.3 Proposed operational limits

Validate these defaults with representative documents before release; expose actual enforced limits in the upload UI.

| Limit                      | Proposed default                                       |
| -------------------------- | ------------------------------------------------------ |
| File size                  | 25 MB per file                                         |
| Assessment document set    | 20 files and 100 MB total                              |
| PDF/PPTX size              | 200 pages or slides per file                           |
| XLSX size                  | 20 worksheets and 100,000 populated cells per workbook |
| Active assessment analysis | One run at a time in the local workspace               |

Limit violations must be reported before external processing where possible. Never silently truncate input to meet a model context limit. Use explicit selection, chunking with coverage tracking, or an actionable limit error. Document archive expansion, parser memory, and decompression limits must also be bounded and validated by engineering.

## 8. Evidence Quality, Provenance, and Conflicts

### 8.1 Separate evidence dimensions

Do not use a single Verified flag to describe extraction accuracy, factual truth, and human approval.

| Dimension          | Required distinctions                                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------------------- |
| Origin             | Startup-provided document; attributed manual statement; supplied third-party artifact; derived calculation. |
| Extraction review  | Unreviewed; checked against source; corrected.                                                              |
| Corroboration      | Uncorroborated; corroborated by identified supporting evidence; contradicted; unresolved.                   |
| Interpretation     | Directly stated; calculated; inferred.                                                                      |
| Review disposition | Pending; accepted; edited; rejected, with reviewer attribution and rationale where applicable.              |

The system does not independently authenticate a document merely because it looks official. Corroboration requires identified supporting evidence and an explanation; copying the same claim across files is not independent support. Confidence must not be raised merely because an evaluator clicked Accept.

### 8.2 Evidence requirements

- Each criterion defines acceptable source types, minimum directness, applicable date/period, and required corroboration.
- Unverified claims may support attributed observations and targeted follow-up questions. They do not satisfy stronger evidence requirements by default.
- Supporting and contradicting evidence must both be linked to the affected claim/criterion.
- Preserve source origin, original document date when available, upload time, applicable period, and supersession relationships. Upload time is not the evidence's business date.
- All material findings need supporting evidence or an explicit inference/gap label. Inferences must identify their premises and limitations.
- Extracted claims and analyst assertions share one fact model, but manual entry has no automatic truth precedence.

### 8.3 Contradictory claims and scenario assessment

First check whether apparently conflicting figures use different periods, units, definitions, or scopes. Record reconciliations transparently. If disagreement remains, create a Conflict record.

For each material conflict:

1. Show all competing claims with source locators and evidence-quality information.
2. Define coherent alternatives without inventing compromise values or averaging the claims.
3. Assess the affected criteria, domain score eligibility, findings, and opinion implications under each alternative.
4. Keep unaffected findings common to the scenarios.
5. Display scenario-specific scores rather than one supposedly definitive score when the conflict changes the result. Each scenario must meet the same evidence thresholds; conditional use of a claim does not upgrade its evidence quality.
6. State what evidence or human judgment would resolve the conflict.

Present each conflict first as a compact summary: **What differs / Why it matters / What resolves it**. Show whether the alternatives change a domain score or the opinion. Expand only the affected criteria into a comparison; keep common findings in one place. Label alternatives by their source/assumption, with no preselected winner. **Keep unresolved** is an explicit valid review action; lack of resolution alone must not prevent an otherwise eligible provisional opinion from being approved.

**Proposed complexity boundary:** Analyze up to three alternatives per conflict and five material conflict groups in an assessment. Avoid an automatic Cartesian product of unrelated alternatives. Evaluate linked conflicts as coherent joint scenarios; if those cannot be represented within the boundary, show the conflict and withhold affected scores/verdicts with an explanation. Do not hide additional conflicts. The evaluator can create a narrower successor assessment or provide better evidence.

The evaluator may resolve a conflict using evidence already in the locked snapshot, recording rationale and a review revision. Retain alternative results and the original AI output. New factual evidence or a correction to a source value requires a successor assessment. An opinion may be approved while a conflict remains unresolved, but its provisional status and scenario implications must remain visible.

## 9. Six-Domain Framework and Proposed Rubric

### 9.1 Framework requirements

Store domains, criteria, applicability, stage anchors, acceptable evidence, essential flags, thresholds, and calculation rules in versioned configuration. Freeze the approved version for each assessment. A criterion has one primary domain; secondary references may link to other domains without counting the same criterion twice.

Each rubric entry must define:

- Stable ID, primary domain, question being assessed, and boundaries.
- Stage and business-context applicability; rule for Not Applicable.
- Required evidence items and their quality/freshness requirements.
- Which requirements and criteria are essential.
- Assessability rule and distinct anchors for scores 1, 2, 3, 4, and 5.
- Positive and adverse examples, treatment of conflicting evidence, and limitations.
- Permitted calculations and links to related criteria.

The following is a **proposed compact criterion catalog**, not an approved scoring rubric. Four criteria per domain keep the first release focused. Document analysis may identify additional risks and observations without adding new scored criteria.

| ID  | Criterion                                    | Evidence focus and assessment boundary                                                                                                                                                                                         |
| --- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| C1  | Customer problem and demonstrated demand     | Customer/problem definition, interviews or usage/purchase evidence appropriate to stage; distinguish interest, pilots, LOIs, and paid demand.                                                                                  |
| C2  | Market and competitive position              | Market estimates with methodology/source dates, alternatives, differentiation, and reachable segment. Unsupported market estimates remain claims.                                                                              |
| C3  | Revenue model and acquisition repeatability  | Pricing/monetization, acquisition channels, sales cycle, and funnel evidence; differentiate pipeline from completed sales.                                                                                                     |
| C4  | Commercial traction and durability           | Paying-customer trends, customer/channel concentration, renewals, expansion, and commercial retention with defined periods.                                                                                                    |
| P1  | Value proposition and use-case fit           | Product demonstration, user problem, use-case success, validation evidence; a feature list alone is insufficient.                                                                                                              |
| P2  | Product maturity and usability               | Available product, release state, usability findings, adoption barriers, and known limitations.                                                                                                                                |
| P3  | Adoption and sustained user value            | Activation, engagement, cohort behavior, satisfaction, and user retention with definitions. Commercial renewals remain primarily C4.                                                                                           |
| P4  | Roadmap and product execution                | Prioritization rationale, delivery evidence, feedback loops, product analytics, and material roadmap dependencies.                                                                                                             |
| T1  | Architecture and critical dependencies       | Architecture artifacts, deployment context, dependency ownership, scalability assumptions, vendor reliance.                                                                                                                    |
| T2  | Reliability and engineering execution        | Reliability/incident records, test and delivery evidence, observability, technical debt, and capacity relative to stage. No code-audit assurance.                                                                              |
| T3  | Security and data handling                   | Actual access-control, backup/recovery, security-review, and incident evidence; policies alone do not demonstrate operating effectiveness.                                                                                     |
| T4  | Technical capability and sustainability      | Engineering ownership, maintainability, critical skills, infrastructure economics, and dependency constraints. For AI products, include supplied model-evaluation, data-rights, model-dependency, and inference-cost evidence. |
| F1  | Financial performance and revenue quality    | Actual/forecast separation, revenue definitions, supporting statements, margin and cost structure, and reconciliation discrepancies.                                                                                           |
| F2  | Liquidity and financial obligations          | Dated cash position, usable versus restricted cash, expenses/burn, debt, contingent obligations, and runway inputs.                                                                                                            |
| F3  | Unit economics and operating sustainability  | Relevant acquisition/delivery costs, margins, retention assumptions, and economic evidence appropriate to stage; no fabricated LTV.                                                                                            |
| F4  | Forecast credibility and financing needs     | Assumptions, scenarios, historical forecast performance when available, funding need, and use of funds. No separate transaction valuation.                                                                                     |
| O1  | Founder capability and commitment            | Relevant demonstrated experience, full-time/part-time commitment, responsibilities, and execution evidence. No prestige-based shortcut.                                                                                        |
| O2  | Team coverage and key-person exposure        | Critical functions, vacancies, dependencies, succession/continuity, and skills aligned with the current plan.                                                                                                                  |
| O3  | Execution and management practices           | Delivery history, accountability, planning, hiring/retention, and decision-making evidence appropriate to team size.                                                                                                           |
| O4  | Governance and incentive alignment           | Governance practice, role clarity, founder alignment, and incentives; legal validity of ownership rights belongs to Legal.                                                                                                     |
| L1  | Entity and ownership position                | Entity records, cap table, outstanding equity rights, and relevant ownership inconsistencies.                                                                                                                                  |
| L2  | Intellectual property and usage rights       | IP assignments, licenses, contractor/founder contributions, and rights to essential data/technology.                                                                                                                           |
| L3  | Material contracts and obligations           | Customer/supplier/investor obligations, termination/change-of-control clauses where supplied, debt commitments, and disputes.                                                                                                  |
| L4  | Regulatory, employment, and data obligations | Applicable jurisdiction/context, supplied licenses and agreements, material exposure, and questions requiring specialist review. No certification of compliance.                                                               |

### 9.2 Stage expectations — proposed design

Use the confirmed funding stage as context, alongside product maturity and actual business evidence. Do not infer that funding stage proves traction. Where the stage is ambiguous, request confirmation or withhold affected scores.

| Stage    | Proposed expectation emphasis                                                                                                                                                                               |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pre-Seed | Problem validation, founder capability/commitment, prototype feasibility where relevant, basic ownership clarity, and a credible cash/use-of-funds picture. Historical scale metrics may be Not Applicable. |
| Seed     | Product usage or paid pilots as relevant, emerging adoption/retention evidence, delivery capability, early economic assumptions, and foundational legal/operational controls.                               |
| Series A | Evidence of repeatable demand, defined cohorts, increasingly measurable economics, operating reliability, and management capacity.                                                                          |
| Series B | Sustained growth quality, stronger controls, scaling reliability, organization coverage, and supported financial planning.                                                                                  |
| Growth   | Durable performance, mature operational evidence, material risk controls, governance, and financial resilience.                                                                                             |

These are rubric-design directions, not automatic requirements for every sector or business type. The rubric must justify applicability and evidence expectations rather than penalize legitimate stage differences.

### 9.3 Score anchor design — proposed

| Score | Intended interpretation when adequate evidence exists                                       |
| ----- | ------------------------------------------------------------------------------------------- |
| 1     | Evidence demonstrates a severe shortfall against the applicable stage expectation.          |
| 2     | Evidence demonstrates material weaknesses or inconsistent performance.                      |
| 3     | Evidence supports the defined baseline expectation, with manageable limitations.            |
| 4     | Evidence supports strong performance beyond the baseline, with limited material weaknesses. |
| 5     | Evidence supports exceptional performance against explicit, demanding criterion anchors.    |

These general descriptions are insufficient to ship scoring. Before scoring implementation, expand every scored criterion into stage-specific 1–5 anchors and expert-reviewed examples, including essential evidence and edge cases. Approve the initial supported rubric before any real score is presented as validated. Do not ask the model to fill unspecified scoring policy at runtime.

### 9.4 Legal context

Keep the city-only onboarding rule. Configure the initial operating jurisdiction at workspace/framework level rather than assuming it from Persian language. Permit relevant entity or contract jurisdiction exceptions as legal context. Until jurisdiction is established, withhold jurisdiction-dependent conclusions and show the gap. Selecting the initial jurisdiction and validating its legal evidence requirements remain pre-pilot decisions; the product must not invent local legal requirements.

Settings displays the configured jurisdiction, approved framework version, and whether jurisdiction-dependent scoring is supported, with guidance for updating the approved configuration. It is not a rubric editor or an arbitrary country selector that enables unvalidated legal scoring. Assessment context shows the value used by that assessment; Legal inputs allow an optional exception with its entity/contract scope and source or attribution. Unsupported exceptions remain explicit limitations. These values follow the snapshot and successor rules in Section 5.7.

## 10. Scoring, Coverage, Completeness, and Confidence

### 10.1 Distinct measures

- **Performance score:** Quality against the approved criterion anchors; 1–5 only when assessable.
- **Answer completeness:** Proportion of applicable essential form questions answered with usable values. It describes form completion, not evidence quality.
- **Evidence coverage:** Proportion of applicable rubric evidence requirements sufficiently supported at their specified quality level.
- **Confidence:** A reasoned statement about the assessment's evidential support, consistency, directness, and freshness. It is not a probability that the startup will succeed.

Show these measures separately and explain their denominators. An answered but uncorroborated field can increase answer completeness without increasing evidence coverage.

### 10.2 Proposed deterministic calculation rules

1. Each versioned criterion has explicit evidence requirements. A requirement is Satisfied, Insufficient, Missing, or Not Applicable.
2. Count only Satisfied requirements in coverage. Insufficient requirements contribute zero until their defined threshold is met; do not invent model-generated fractional coverage.
3. Exclude only justified Not Applicable requirements. Show exclusions and reasons.
4. Domain evidence coverage = satisfied applicable evidence requirements / all applicable evidence requirements × 100.
5. Overall evidence coverage uses those counts across the six domains, not an unweighted average of domain percentages.
6. If no evidence requirements are applicable, display Not Applicable and no percentage. If all scored criteria in a domain are justifiably inapplicable under the approved rubric, show Not Applicable instead of a domain score and retain the domain with its explanation. Missing evidence or unknown context cannot justify this label. If applicability is unresolved, mark coverage provisional and do not remove unresolved requirements merely to raise coverage.
7. A criterion score exists only when its assessability conditions are met; supported adverse evidence may produce a low score, while absent evidence produces Not Assessable.
8. **Proposed domain threshold:** at least 60% evidence coverage, all essential criteria assessable, and at least half of applicable scored criteria assessable. The approved rubric must define essential criteria by stage. These numbers require product-owner validation.
9. Once eligible, domain score = arithmetic mean of assessable applicable criterion scores, using equal weights and rounding to one decimal. Display assessable/applicable counts beside it. Do not hide missing criteria.
10. If a domain fails any eligibility condition, display Not Assessable with the specific unmet conditions. Retain supported criterion findings and scores in detail.
11. Apply the same rules separately to each conflict scenario. Do not average scenario scores together.
12. No overall numerical average across the six domains is required. Critical risks and missing domains must remain prominent independently of domain scores.

Form question applicability and rubric criterion applicability are related but not identical. Completing all essential manual fields does not guarantee that a domain can be scored.

### 10.3 Confidence — proposed qualitative labels

- **High:** Direct, current, coherent evidence meets the criterion's quality requirements, with meaningful corroboration where required and no unresolved material conflict.
- **Medium:** Assessability is met, but evidence has bounded limitations, limited independence, or moderate freshness concerns.
- **Low:** Material uncertainty remains; explain its cause. Low confidence must not override an assessability failure to permit a score.

Use no percentage confidence until a calibration method has been validated. A scenario may have strong conditional reasoning while the underlying disputed claim remains uncertain; label those separately.

### 10.4 Result presentation across screens and reports

Overview cards, domain details, and report summaries use the same distinctions:

- **Not analyzed / In progress:** No validated outcome exists yet. Show progress or the failed-stage recovery action; never substitute Not Assessable or zero for a technical failure.
- **Score:** Show the valid score, assessable/applicable criterion counts, coverage, and confidence with access to their explanations.
- **Not Assessable:** Show the unmet requirements and a contextual Add evidence action; supported criterion findings remain available.
- **Not Applicable:** Show the justified applicability reason and no score or coverage percentage where the denominator is empty. Keep all six domains visible.
- **Applicability needs review:** Mark affected coverage provisional, explain the unresolved context, and link to the relevant input or review item. Withhold affected scores until their eligibility is established; unaffected results remain usable.
- **Scenario-dependent:** Show a concise summary and Compare alternatives action. Expanded results identify each scenario by source/assumption with its own score or eligibility state; no default winning alternative or averaged score. A material unresolved conflict remains visible even if the alternatives produce the same score.

These are result presentations, not additional assessment lifecycle states. Show one primary result with relevant qualifiers and a plain-language reason; keep detailed denominators and evidence one click away. Coverage uncertainty, opinion provisional status, technical completion, and human approval remain distinct.

## 11. Findings, Risks, Gaps, and Human Review

### 11.1 Findings

Every finding has an ID, type (strength/weakness/challenge/observation/risk), primary domain and criterion, claim, explanation, evidence links or inference premises, scenario scope, limitations, confidence rationale, AI/human authorship, and review disposition.

The evaluator may accept, annotate, reject, or edit an interpretation. Keep the original AI output and the review revision. A human score change needs a reason and supporting evidence from the snapshot; it cannot bypass assessability or domain coverage rules. Rejected findings remain in review history and are excluded from approved report conclusions.

Edits to accepted findings, scores, conflict resolution, or the opinion invalidate any existing approval for the revised report. Preserve earlier approved report versions; do not silently overwrite them. Factual edits require a successor assessment.

Before saving a substantive edit to an approved revision, explain that the revised opinion will require approval again and that the previous approved report remains available. Offer **Save as review revision** and **Cancel**; merely opening an editor or cancelling it must not change approval. After saving, show the changed items from the review history and a direct **Update opinion → Review changes → Approve revision** path. This is a review-history list, not an additional automated assessment-comparison feature.

Recalculate affected domain aggregates deterministically after a permitted criterion review edit. Mark the draft opinion as requiring review whenever its supporting findings, risks, scores, or scenario selection change. Before approval, the evaluator must reconcile the opinion with those changes, either by editing it or requesting a new draft synthesis from the current reviewed records. This limited opinion synthesis uses the same locked inputs, preserves the prior draft, and does not rerun document or criterion analysis. Approval is blocked while the opinion is marked outdated.

### 11.2 Risks

Fields: ID, primary domain, related criteria, title, condition/cause, potential consequence, evidence, scenario scope, severity, likelihood explanation, uncertainty, verification or mitigation action, status, review rationale, timestamps.

Statuses: Open → Under Review → Mitigated / Accepted / Disproven / Superseded. Reopening requires a reason. Accepted means consciously acknowledged, not removed or reduced in severity. Mitigated requires evidence already in the assessment snapshot; a new mitigation document belongs in a successor assessment.

**Proposed severity anchors:**

- Critical: Supported exposure could fundamentally undermine viability, essential rights, or the basis for the overall opinion; requires explicit acknowledgement before approval.
- High: Material adverse impact requiring prioritized verification, conditions, or mitigation.
- Medium: Meaningful exposure with a bounded impact or scope.
- Low: Limited exposure unlikely by itself to alter the overall opinion.
- Undetermined: Evidence supports identifying a concern, but does not support assigning severity. Explain the missing information.

Record likelihood and impact rationale separately; do not fabricate numerical probabilities. An unknown is normally a gap, not proof of an adverse condition. It may warrant a clearly labeled uncertainty-related risk if its potential consequence is explained. Merge duplicate risk causes across domains, retaining cross-references and avoiding duplicated risk counts.

### 11.3 Information gaps

Fields: ID, domain/criterion, question, missing/insufficient/contradictory classification, required evidence, priority rationale, suggested source/document, status, linked evidence, and next action.

Statuses: Open → Information Provided → Under Review → Resolved, with Not Applicable and Superseded dispositions where justified. Uploading a file or entering an answer does not automatically resolve a gap; evidence must meet the relevant requirement. Material unresolved gaps remain in approved reports.

Group gaps by domain and prioritize those that could change assessability, risk severity, scenario selection, or the verdict. Link each item directly to its input section or evidence view. After snapshot lock, a Supply New Information action opens the successor-assessment flow; it must not modify the old inputs or automatically resolve the historical gap.

## 12. Overall Opinion and Approval

### 12.1 Required opinion content

- Scope and evidence as-of context.
- Synthesis across all six domains, including unassessable domains.
- Principal strengths, weaknesses, challenges, and material risks.
- Information gaps and unresolved conflicts, with scenario-dependent implications.
- Draft verdict and explicit reasoning tied to accepted domain findings.
- Conditions or next actions, with the evidence needed to address them.
- Reasons that could change the verdict.
- Provisional flag, limitations, and review/approval status.

### 12.2 Verdict meanings — proposed policy

| Verdict                      | Meaning within this product's six-domain scope                                                                                                                                           |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Invest                       | Available domain evidence supports a favorable investment opinion, subject to disclosed scope and any provisional limitations. This is not transaction execution or deal-price approval. |
| Invest Subject to Conditions | Favorable only if explicitly stated evidence, mitigation, or other domain-related conditions are satisfied.                                                                              |
| Do Not Invest                | Supported material weaknesses or risks warrant an unfavorable opinion, with the basis and any scenario dependence stated. Missing evidence alone is not a negative score.                |
| Insufficient Evidence        | The available evidence cannot support a defensible directional opinion, even provisionally. Explain what would enable one.                                                               |

Do not map average domain scores mechanically to a verdict. The approved opinion policy must consider material risks, evidence limitations, conflicts, and the interaction of findings. Missing domains do not automatically force Insufficient Evidence, but the AI must explain why any provisional direction remains defensible. An empty or unusable input set cannot support an Invest or Do Not Invest verdict.

### 12.3 Approval behavior

- AI opinions start in Draft. The evaluator can edit or reject the draft and record a rationale for changing its verdict.
- Final approval requires explicit action on the current report revision, reviewer attribution, timestamp, and acknowledgement of material limitations, critical risks, and unresolved scenario implications.
- Approval is allowed with unassessable domains when the analysis has successfully produced honest domain results and gaps. A processing failure is distinct from insufficient evidence.
- **Proposed default:** Reports with unresolved technical analysis failures may be exported only as Draft/Incomplete. Resume the same run or create a successor assessment to obtain an approvable complete synthesis. Keep this technical-completion label separate from Provisional evidence limitations; the export presentation is defined in Section 15.2.
- Preserve the AI draft, human changes, and approval record. The UI must distinguish an AI-generated suggestion from the human-approved opinion.
- Approved provisional opinions remain labeled Provisional. Approval does not remove information gaps or imply independent verification.
- Changing substantive review content creates a new review revision requiring approval. Historical approved exports remain identifiable.

### 12.4 Visible approval readiness

Keep a checklist beside the approval action, updated from real state. Each unmet prerequisite includes a reason and an action that opens the exact place to fix it.

| Readiness item                                                                 | Recovery action                                                                   |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| Analysis technically incomplete                                                | Open failed stage and retry, or export Draft/Incomplete.                          |
| Opinion outdated after review changes                                          | Open changed items; edit the opinion or request updated draft synthesis.          |
| Required verdict-change rationale missing                                      | Focus the rationale field.                                                        |
| Material limitations, critical risks, or unresolved conflicts not acknowledged | Open the relevant review summary and acknowledgement control.                     |
| Reviewer attribution missing                                                   | Enter evaluator display name in Settings, then return.                            |
| Save pending/failed or required output validation failed                       | Finish/retry saving or open the specific validation issue; preserve entered work. |

Do not require all gaps to be resolved or all domains to be scored. Those limitations remain visible and may require acknowledgement, but are not automatic approval blockers. Preserve prior acknowledgements unless their underlying material content changes.

Display independent labels throughout Overview, Review & Report, and exports: **Review: Draft / Needs reapproval / Approved** and **Evidence limitations: Provisional**, with the specific reason when applicable. Explain before approval that approval records the evaluator's judgment and does not remove missing evidence. Keep **Invest Subject to Conditions** as a verdict separate from the Provisional evidence label. Preview these exact labels before export.

## 13. Assessment and Processing States

### 13.1 Assessment lifecycle

| State               | Allowed behavior and transition                                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Draft               | Inputs are editable; save partial data; prepare and authorize analysis.                                                                               |
| Analyzing           | Inputs are locked; show stage status; allow cancellation; prevent duplicate runs.                                                                     |
| Analysis Incomplete | Preserve valid same-run outputs; show failed/cancelled stages; permit recovery on the same snapshot.                                                  |
| Ready for Review    | All stages have valid outcomes, including Not Assessable where evidence is lacking and justified Not Applicable results; review findings and opinion. |
| In Review           | Track review changes and acknowledgements; do not change input facts.                                                                                 |
| Approved            | Current opinion revision is approved; export final report; create a successor for new inputs.                                                         |

Archival is a separate visibility flag; it is not analysis completion or deletion. Editing substantive review content from Approved returns the current revision to In Review while preserving the historical approved revision. A cancelled run keeps the snapshot locked; create a successor to change inputs.

Dashboard completed count means assessments with a current Approved opinion, including approved provisional opinions. Show provisional and information-gap indicators independently. Do not equate AI processing completion with human completion.

### 13.2 Processing and recovery

Document states: Uploaded, Validating, Extracting, Ready, Partially Extracted, Failed, Rejected. Analysis job states: Queued, Running, Succeeded, Partially Failed, Failed, Cancelled.

- Use real byte progress or honest named stages; never invent progress percentages.
- Freeze input and rubric identifiers when queuing; only one active run per assessment.
- Disable repeated Run clicks and make server submissions idempotent.
- Persist completed stages and recover after browser refresh or application restart without silently triggering a new paid run.
- Retry only failed stages and any invalidated dependents on the same snapshot. Do not mix results from different snapshots, scenarios, or rubric versions.
- A cancelled request may already have incurred provider cost; explain this without promising remote cancellation or deletion.
- Empty inputs may return gaps and Insufficient Evidence without a paid call. A missing API key blocks external analysis but not local editing.
- Preserve structured error codes and safe user explanations; do not expose confidential prompt text in error details.

For each failure, show what failed, what remains saved, whether further processing may cost money, and the next action. Distinguish file correction, provider setup, quota/budget, temporary outage, and invalid AI output. Retry transient failures on the same snapshot; route factual fixes to a corrected assessment. Cancellation messaging must state that locked inputs remain fixed. Returning from Settings or retrying must restore the assessment context, not restart the journey.

## 14. AI Workflow and Output Contract

Use logically separated, versioned responsibilities. These are not a requirement for separate deployed services or one API call per stage.

1. Parse documents locally within the declared support contract.
2. Extract attributed claims and numerical context; preserve original evidence locators.
3. Normalize comparable facts and identify duplicates, contradictions, and unresolved context.
4. Map evidence to versioned domain criteria and evidence requirements.
5. Determine applicability, evidence gaps, and assessability under explicit policy.
6. Analyze criteria and conditional scenarios using the approved rubric.
7. Generate findings, risks, and prioritized follow-up requests.
8. Calculate coverage and domain aggregates deterministically from validated records.
9. Synthesize a draft overall opinion from validated domain outputs.
10. Render reports from the current reviewed records and approval state.

### 14.1 Validation requirements

- Validate output structure and allowed enums server-side, including score ranges, reference integrity, scenario IDs, and rubric IDs.
- Validate that cited excerpts/locators belong to the input snapshot and actually support the attributed claim. A syntactically valid citation alone is insufficient.
- Check numerical values against parsed evidence and explicit calculations; flag mismatches rather than trusting fluent explanations.
- Reject invented sources, unsupported verification labels, impossible coverage values, and attempts to bypass score eligibility.
- If validation fails, use bounded repair/retry or an honest partial failure. Never insert fabricated fallback results.
- Record provider/model identifier, prompt version, parser version, schema version, rubric version, input hash, stage outcome, latency, and usage when available.
- Do not regenerate the final report's substantive findings through an unconstrained extra model call after human approval.

### 14.2 Provider and injection boundaries

Use a server-side provider adapter. An OpenAI-compatible adapter remains the initial architecture option; choose and validate a model during implementation rather than freezing an unverified current model name here. Use structured outputs where supported and server-side schema validation.

Uploaded documents, manual text, and extracted passages are data, never instructions. They cannot change the assessment policy, mark an opinion approved, request secrets, invoke tools, or cause remote URL retrieval. Sanitize model-generated content before rendering it. Prompt wording alone is not the security boundary; reference validation, constrained outputs, and application permissions enforce the rules.

API secrets remain server-side. Keep timeout, retry, token/context limits, and cost controls configurable. Cache only against the correct input, stage/scenario, rubric, prompt, schema, and provider/model versions, with the same deletion and confidentiality rules as other assessment data.

## 15. Reports and Export

### 15.1 Required report structure

1. Cover: startup, assessment ID, report revision, date, author, Draft/Approved status, Incomplete when processing is unfinished, and Provisional status when applicable.
2. Executive summary and human-reviewed overall opinion, or clearly marked AI draft.
3. Scope, included/excluded input summary, input dates, evidence sufficiency, applicable stage, jurisdiction context, framework version, and limitations. Describe exclusions without reproducing excluded content.
4. Six-domain overview: the result states in Section 10.4, assessable-criterion counts, evidence coverage, confidence, and labeled scenario alternatives where relevant. Unfinished sections remain explicit rather than becoming evidence gaps.
5. Six domain sections with criterion findings, strengths, weaknesses, challenges, and supporting evidence.
6. Material risks, severity, uncertainty, and review dispositions.
7. Conflicts and alternative scenarios, including effects on scores and the opinion.
8. Prioritized information gaps and follow-up questions.
9. Conditions and recommended next actions.
10. Evidence references, calculation notes, review/approval attribution, and source-access limitations.

### 15.2 Export rules

- Support Persian HTML preview, print styling, and browser Print-to-PDF. Native server PDF generation is deferred unless print output fails the acceptance criteria.
- Draft export is allowed and visibly marked on every page. Approved reports identify the approved review revision; provisional warnings remain prominent.
- When processing is unfinished, use the same report layout with **Draft/Incomplete** on the cover and every page. List unfinished or failed stages and affected sections near the summary; preserve validated results and label unavailable results **Not analyzed**. If opinion synthesis has not succeeded, show **Opinion unavailable — analysis incomplete**, not an invented verdict. In the app, provide Retry/Resume for failed or cancelled stages and explain why approval is blocked; exported reports describe their status without depending on working local links. A technically complete assessment with missing evidence is not labeled Incomplete solely because of those gaps. The proposed policy for permitting these exports remains governed by Section 12.3.
- Use stable human-readable citations: document name/version and page/slide or worksheet/cell range. Manual evidence cites the attributed entry and date.
- Include necessary short excerpts and definitions so an external reader can understand the basis without a local browser session. Do not silently attach whole confidential documents.
- Explain that external recipients may need separately authorized access to source documents; local links are not portable evidence access.
- Preserve report versions and their associated snapshot/review identifiers. Do not regenerate an old report from current startup profile values.
- Ensure Persian shaping, selectable text, table wrapping, page breaks, repeated headings, and readable long citations. Never invent charts or populate missing scores with zero.

## 16. Security, Privacy, Retention, and Deletion

Real confidential startup documents are an intended MVP use case. Labeling the application local does not remove the need for baseline controls or external-processing disclosure.

### 16.1 Local access and storage

- Bind the app/API to loopback by default. Do not expose it on a LAN or public interface in the MVP.
- No multiuser login is required, but local API access must be restricted to the intended application session/origin; protect against cross-origin access and unintended local requests.
- Store uploads outside public static paths; use opaque identifiers, safe filenames, controlled download access, and path traversal prevention.
- Restrict filesystem access to the intended OS user. Define and validate the supported encryption-at-rest approach, including whether it relies on configured OS/disk encryption, before confidential pilot use.
- Keep credentials out of browser assets, source-controlled files, reports, and logs. Do not send the provider API key from the browser.
- Bound parser resources and disable macros, active content, and external-reference execution.

### 16.2 External AI processing

- Explain the selected provider and what will leave the computer before the first transmission for an input snapshot.
- Send only content needed for the assessment and necessary context; avoid full-document upload when selected text/tables suffice.
- Record the evaluator's confirmation that they are authorized to share the selected documents. This is not a claim that the software has legally verified that authority.
- Verify the actual provider/account data-use, retention, and deletion behavior before using confidential files. Do not promise zero retention or no training based solely on local configuration names.
- Do not log document bodies, prompts, sensitive responses, or confidential excerpts in routine diagnostic logs. Use IDs, safe error codes, timings, and usage figures instead.
- No mandatory redaction workflow is included in the selected MVP scope. The evaluator may prepare redacted inputs outside the app before upload.

### 16.3 Retention and deletion — proposed defaults

- Retain local assessments until the evaluator explicitly deletes them; display this policy and storage location. No undisclosed telemetry or automatic cloud backup.
- Delete temporary parser files after processing and remove expired abandoned temporary data on restart.
- Before analysis, deleting an input removes it from the draft and associated draft-derived content.
- Locked assessments preserve their sources during normal use. To remove a confidential source from history, provide a deliberate purge flow that identifies every affected assessment, report, and copied reference.
- Purging may delete affected assessments or mark retained records as evidence removed and non-reproducible. It must not leave confidential excerpts in caches, extracted claims, or locally retained report copies while claiming deletion succeeded.
- Shared source storage may be deduplicated, but ordinary removal from one draft must not corrupt another assessment. A global purge must disclose its full impact.
- Archive hides a record; it does not delete it. Confirm destructive actions and report completion or failures accurately.
- Label draft removal **Remove from this draft** and global erasure **Purge stored copies**. Place purge in the data-management controls, not as the ordinary file-list remove action. Preview affected files, assessments, stored report versions, and derived data before confirmation; state which historical results will become unavailable. A cancelled purge changes nothing. A partial failure lists what remains and offers retry; do not show a successful-deletion message until the promised scope is removed.
- Local deletion cannot recall exported copies or guarantee provider-side deletion. Explain those boundaries and any available provider-specific process.
- The normal immutability guarantee excludes explicit deletion/purge. Do not retain confidential content solely to preserve an audit history against an explicit deletion request.

## 17. UX, Localization, and Accessibility

### 17.1 Visual direction

Premium, calm, readable B2B analysis interface. Use progressive disclosure: overall findings first, then criterion analysis and source evidence. Dense financial and evidence data must remain legible.

| Token            | Value     | Use                                     |
| ---------------- | --------- | --------------------------------------- |
| Navy             | `#102B56` | Brand and headings                      |
| Blue             | `#1976C9` | Primary actions                         |
| Teal             | `#139D9B` | Analysis and information                |
| Green            | `#348D51` | Completed actions, with explicit labels |
| Orange           | `#F48B20` | Caution                                 |
| Purple           | `#7546A6` | Secondary analytical emphasis           |
| Light background | `#F7F9FC` | Canvas                                  |
| Surface          | `#FFFFFF` | Panels                                  |

**Visual amendment — 2026-10-22:** The palette above is historical. The user-supplied [design.md](../design.md) now governs visual direction and spacing, with adoption details in [design-scope.md](design-scope.md). Prefer its DPSans/DPSansEn typography when appropriate font assets are available, with locally packaged Vazirmatn as fallback. Retain Lucide SVG icons. Suggested domain icons: TrendingUp, Layers, Cpu, ChartPie, Users, Scale. Do not use color or a green badge to imply independent verification. Dark mode and theme toggles remain deferred; retain reusable design tokens and adapt extraction anomalies for readable, accessible UI.

### 17.2 Localization

- Persian UI and reports, `dir="rtl"`; URLs, code, cell references, and appropriate technical fragments use controlled LTR spans.
- **Proposed input-language scope:** Persian and English, including mixed documents. Preserve original excerpts; label any translated explanation and retain access to source wording.
- **Proposed date policy:** Persian-calendar UI display with explicit calendar labels and unambiguous stored timestamps; financial source periods retain their original calendar/context. Never guess an ambiguous source date.
- Accept Persian, Arabic, and Latin digits in structured inputs. Display units/currency next to values and retain the original representation for evidence review.
- Provide Persian errors that explain what failed, what remains saved, and what action is possible.

### 17.3 Responsive and accessible interactions

- Test at 375, 768, 1280, and 1440px. Keep page layout free of horizontal overflow; allow contained scrolling for genuinely wide source tables.
- Use a single-column flow on phones, collapsible navigation on smaller screens, and a right-side navigation/contextual evidence panel on desktop.
- Support keyboard navigation, visible focus, labeled inputs, readable contrast, screen-reader status announcements, and non-color status distinctions.
- Preserve the evaluator's position when opening evidence and returning to a finding.
- Show distinct Loading, Empty, Error, Partial, Insufficient Evidence, Provisional, Awaiting Review, and Approved states where relevant.
- Do not block Save because assessment answers are missing. Confirm destructive actions; use unobtrusive feedback for routine successful saves.

### 17.4 Core Persian copy

| Situation                      | Copy                                                                                    |
| ------------------------------ | --------------------------------------------------------------------------------------- |
| Empty workspace                | `اولین ارزیابی خود را آغاز کنید`                                                        |
| New assessment                 | `ایجاد ارزیابی جدید`                                                                    |
| Start analysis                 | `شروع تحلیل هوشمند`                                                                     |
| Extracting                     | `در حال استخراج اطلاعات از سند...`                                                      |
| Not assessable                 | `شواهد کافی برای امتیازدهی معتبر به این بخش وجود ندارد.`                                |
| Partial analysis failure       | `تحلیل کامل نشد. نتایج این اجرا حفظ شده‌اند؛ می‌توانید بخش ناموفق را دوباره اجرا کنید.` |
| Draft opinion                  | `نظر پیشنهادی هوش مصنوعی — در انتظار بررسی ارزیاب`                                      |
| Provisional evidence label     | `محدودیت شواهد — جزئیات را بررسی کنید`                                                  |
| Approve opinion                | `تأیید نظر نهایی`                                                                       |
| New inputs after analysis      | `برای افزودن یا اصلاح اطلاعات، ارزیابی جدیدی از این نسخه ایجاد کنید.`                   |
| Save failure                   | `ذخیره انجام نشد. اطلاعات واردشده حفظ شده است؛ دوباره تلاش کنید.`                       |
| Form progress                  | `پرسش‌های پاسخ‌داده‌شده`                                                                |
| Evidence status                | `کفایت شواهد`                                                                           |
| Assessment context             | `اطلاعات پایه این ارزیابی`                                                              |
| Unknown assessment stage       | `مرحله استارتاپ مشخص نیست`                                                              |
| Review transmission scope      | `بررسی اطلاعات ارسالی`                                                                  |
| Excluded content               | `از این تحلیل کنار گذاشته شده؛ اصل فایل همچنان ذخیره است`                               |
| Not applicable                 | `این معیار در این ارزیابی کاربرد ندارد`                                                 |
| Unresolved applicability       | `کاربرد این معیار نیاز به بررسی دارد`                                                   |
| Scenario-dependent result      | `نتیجه به سناریو بستگی دارد`                                                            |
| Not analyzed                   | `هنوز تحلیل نشده`                                                                       |
| Incomplete report              | `پیش‌نویس — تحلیل کامل نشده`                                                            |
| Incomplete opinion             | `نظر نهایی آماده نیست؛ تحلیل هنوز کامل نشده است`                                        |
| Correct locked inputs          | `ایجاد ارزیابی جدید برای اصلاح اطلاعات`                                                 |
| Start despite gaps             | `تحلیل اطلاعات موجود`                                                                   |
| Opinion needs another approval | `نسخه جدید نیاز به تأیید مجدد دارد.`                                                    |
| Remove draft input             | `حذف از این پیش‌نویس`                                                                   |
| Purge stored copies            | `پاک‌سازی نسخه‌های ذخیره‌شده`                                                           |

Validate terminology with the evaluator before final UI copy is frozen, particularly the distinction between a provisional opinion and an Invest Subject to Conditions verdict.

### 17.5 Action and recovery design rules

- Every blocked primary action has a visible explanation and a specific next step; never depend on a disabled-button tooltip alone.
- Every Not Assessable domain shows unmet requirements, prioritized evidence requests, available supported findings, and **Add evidence**. Before lock, that action opens inputs; after lock, it opens the successor flow at the relevant input.
- Warn immediately before a consequential transition, not repeatedly during ordinary navigation. Combine start, sharing, and input-lock explanations into one concise panel when their timing coincides.
- Use consistent labels for current draft, current approved revision, and previous assessment. Preserve scroll position, unsaved text, and navigation context when opening sources or Settings.
- Design recoverable errors and incomplete evidence as usable states, with available findings and draft export where permitted. Do not leave users at a dead-end error screen.

## 18. Reliability, Performance, and Product Success

### 18.1 Baseline operational behavior

- Persist input and review changes transactionally; browser refresh must not lose acknowledged saves.
- Keep local records readable when the external provider is unavailable. New AI analysis requires connectivity; do not silently switch providers.
- Handle timeout, rate limit, invalid output, connection loss, insufficient account quota, and parser failure distinctly.
- Show elapsed time and stage status, with honest cancellation/retry options.
- Record actual API usage and cost when available; label estimates. Do not fabricate price data or promise a fixed run cost without validated pricing/configuration.
- Define a visible per-run budget and request/context limits before pilot use. Stop cleanly at the configured limit and preserve completed stages.
- No automatic repeated paid processing after restart or unbounded repair loops.

### 18.2 Proposed performance targets

Validate on a declared reference machine, network, provider/model, and document set before treating these as service promises.

- Ordinary local lists, navigation, and persisted saves: p95 under 2 seconds.
- Progress/status feedback: visible within 2 seconds of starting an operation.
- Reference analysis: a 30-page text PDF, 20-slide PPTX, and three-sheet workbook totaling no more than 5,000 populated cells; target completion within 5 minutes under normal provider availability.
- Proposed external-call timeout: 60 seconds, at most two retries for retryable failures, within a proposed 10-minute run time budget. Revisit based on the selected model and measured workload.
- Interrupted/failed runs must retain completed validated outputs, even when the time target cannot be met.

### 18.3 Product success measures — proposed pilot targets

- At least 30% reduction in evaluator time to a reviewed report versus the same evaluator's manual baseline on comparable cases.
- Evaluator usefulness rating of at least 4/5 for evidence navigation and prioritized follow-up actions across the pilot set.
- Every material report finding has a valid supporting reference or an explicit inference/unknown label; no fabricated citations in the release evaluation set.
- No lost acknowledged saves, mixed-snapshot reports, false approval labels, or silent numerical/unit substitutions in acceptance testing.
- Track correction burden, abstention/Not Assessable frequency, missed material conflicts, and run cost alongside speed. Fast but unreliable reports do not meet the product goal.

These targets are proposed and require a representative evaluation set and baseline measurement. Do not display unmeasured targets as achieved results.

## 19. Conceptual Data Model and Technical Constraints

### 19.1 Product entities

| Entity                           | Required information/relationships                                                                                                                       |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Startup                          | Current profile, archive flag, ordered assessments.                                                                                                      |
| Assessment                       | Startup, predecessor assessment, stage/profile and jurisdiction-context snapshot, lifecycle, input snapshot, framework version, current review revision. |
| InputSnapshot                    | Locked document versions and content selections, manual answers, factual claims/corrections, authorization context, fingerprint, lock time.              |
| DocumentVersion                  | Original file, content fingerprint, format, original/source dates, extraction status, omissions, storage reference.                                      |
| AssessmentDocument               | Assessment-local inclusion/selection and source-version relationship; supports safe copies without cross-assessment mutation.                            |
| ManualAnswer                     | Question/schema version, raw/normalized values, answer state, source attribution, timestamps.                                                            |
| FactClaim                        | Subject/metric, raw and normalized values, unit/period/scope, origin, evidence, correction/supersession history.                                         |
| Evidence                         | Source document or manual entry, page/slide/sheet/cell/span locator, excerpt/context, evidence dimensions, applicable date.                              |
| EvidenceCriterionLink            | Many-to-many mapping, supporting/contradicting role, requirement satisfied, scenario scope.                                                              |
| Framework/Criterion              | Version, primary domain, applicability, stage anchors, evidence requirements, essential flags, threshold policy.                                         |
| Conflict/Scenario                | Competing claims, coherent alternatives, impacted criteria/opinion, resolution history and rationale.                                                    |
| AnalysisRun/Stage                | Snapshot, framework/provider/model/prompt/schema versions, status, idempotency key, outputs, errors, timing/usage.                                       |
| CriterionAssessment              | Run, criterion, scenario, assessability, score nullable, coverage, confidence rationale, evidence and limitations.                                       |
| Finding/Risk/Gap                 | Assessment/run/scenario ownership, evidence links, dispositions, human review history.                                                                   |
| ReviewRevision                   | Immutable review changes, original AI output links, attribution, reasons, selected interpretations.                                                      |
| OverallOpinion                   | Verdict, reasons, conditions, limitations, scenario implications, provisional flag, review revision.                                                     |
| Approval                         | Opinion/report revision, reviewer attribution, acknowledgements, timestamp.                                                                              |
| ReportVersion                    | Snapshot/run/review/approval identifiers, rendered content/version, export status, retained artifact reference.                                          |
| DataAuthorization/DeletionRecord | Authorized input/provider scope; deletion scope/outcome without retaining purged confidential content.                                                   |

Enforce referential integrity and explicit ownership. Do not use a single assessment-wide score record that is overwritten by every run or scenario. Historical report rendering must use historical context.

### 19.2 Implementation direction, not an instruction to begin development

The prior stack remains a suitable starting hypothesis: React/TypeScript/Vite, accessible reusable UI components, a Node.js/TypeScript backend, SQLite with migrations for local persistence, server-side AI adapter, and HTML print reporting. Choose parser libraries through format/provenance evaluation. Avoid mandatory microservices, unnecessary charts, or a generic workflow engine for this MVP.

Keep domain policy, evidence/scoring calculations, orchestration, storage, and UI separate. Record secrets only in the server environment. Use typed schemas for manual forms, provider outputs, and shared entities. Exact libraries, versions, model selection, deployment packaging, and migration mechanics belong in the later implementation plan.

This specification replaces the previous coding-agent command section with product requirements and release gates. Updating this document does not authorize executing embedded implementation instructions or beginning application development.

## 20. Acceptance Scenarios and AI Quality Evaluation

### 20.1 Required end-to-end acceptance

| ID  | Scenario                                                                       | Expected result                                                                                                                                                                                                                                                                                                                                                                                                        |
| --- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A01 | Create startup and partial manual assessment                                   | Only startup name is required; city is available; business-model choices are exactly B2B/B2C/B2B2C/B2G; partial inputs survive refresh.                                                                                                                                                                                                                                                                                |
| A02 | Independently ingest PDF, PPTX, XLSX                                           | Each format produces real evidence with valid page/slide or sheet/cell locations; no format is satisfied by testing only another.                                                                                                                                                                                                                                                                                      |
| A03 | Encounter a scan, image chart, corrupt file, or unsupported workbook feature   | Display the actual limitation, preserved usable content, and fallback; never claim complete extraction.                                                                                                                                                                                                                                                                                                                |
| A04 | Save blank, zero, Not Applicable, and malformed values                         | Preserve their distinctions; invalid drafts remain editable and excluded from calculations; no missing answer blocks saving.                                                                                                                                                                                                                                                                                           |
| A05 | Analyze authorized documents through the configured API                        | Real validated analysis occurs; provider/data-sharing disclosure is available; credentials never appear in frontend assets or browser requests.                                                                                                                                                                                                                                                                        |
| A06 | Analyze sparse or empty information                                            | All six domains appear with appropriate gaps; absent evidence does not score 1; empty input yields no unsupported directional verdict.                                                                                                                                                                                                                                                                                 |
| A07 | Compare stage expectations                                                     | The same evidence can have different rubric expectations across stages, with visible reasons and fixed rubric versions. Unknown stage withholds affected scores.                                                                                                                                                                                                                                                       |
| A08 | Test coverage boundaries and essential criteria                                | Immediately below the approved threshold, or with an unassessable essential criterion, the domain is Not Assessable. Meeting all eligibility rules permits the deterministic average.                                                                                                                                                                                                                                  |
| A09 | Submit an unsupported deck claim or duplicate it across files                  | Source attribution remains visible; repetition does not corroborate it or satisfy stronger evidence requirements.                                                                                                                                                                                                                                                                                                      |
| A10 | Supply contradictory same-period revenue figures                               | Show both alternatives and valid scenario-specific impacts; no silent source selection or averaged compromise.                                                                                                                                                                                                                                                                                                         |
| A11 | Have some unassessable domains but a defensible directional opinion            | AI may draft a provisional verdict; missing coverage remains explicit before and after human approval.                                                                                                                                                                                                                                                                                                                 |
| A12 | Challenge or edit a finding/opinion                                            | Preserve AI output and rationale; score edits cannot bypass evidence eligibility; final opinion requires explicit human approval.                                                                                                                                                                                                                                                                                      |
| A13 | Export before and after approval                                               | Draft/Approved and Provisional labels are correct; citations, Persian text, tables, and approval attribution render in PDF.                                                                                                                                                                                                                                                                                            |
| A14 | Add evidence or correct facts after analysis                                   | The old assessment stays unchanged; a successor copies documents and factual inputs but no active scores, findings, risk decisions, or approvals.                                                                                                                                                                                                                                                                      |
| A15 | Change current startup profile or rubric                                       | Historical snapshots and exports retain their original context/version. New assessments disclose changed context.                                                                                                                                                                                                                                                                                                      |
| A16 | Fail, cancel, restart, or double-submit a run                                  | No duplicate active analysis; validated same-snapshot outputs survive; recovery does not mix runs or automatically incur repeated calls.                                                                                                                                                                                                                                                                               |
| A17 | Resolve or retain a material conflict during review                            | Record rationale and review revision; unresolved scenario limitations remain visible; new evidence uses a successor assessment.                                                                                                                                                                                                                                                                                        |
| A18 | Mark a risk accepted or a gap resolved                                         | Acceptance does not hide the risk; gap resolution requires qualifying evidence; new uploads do not auto-resolve historical gaps.                                                                                                                                                                                                                                                                                       |
| A19 | Upload prompt-injection content or unsafe rendered text                        | Documents cannot change policy, reveal secrets, trigger remote actions, mark approval, or bypass validation.                                                                                                                                                                                                                                                                                                           |
| A20 | Purge a source shared across assessments                                       | Show affected scope and remove targeted local derived data/caches/artifacts; ordinary draft removal does not corrupt other records. Explain exported/provider-copy limits.                                                                                                                                                                                                                                             |
| A21 | Use the app at target widths and with a keyboard                               | Persian text and controls remain usable, focus is visible, statuses are accessible, and source-table scrolling is contained.                                                                                                                                                                                                                                                                                           |
| A22 | Exceed file, context, time, or cost limits                                     | Explain the limit and next action; do not silently truncate evidence or fabricate a completed assessment.                                                                                                                                                                                                                                                                                                              |
| A23 | Start with fully answered forms but weak evidence                              | Separate question completion from preliminary evidence sufficiency; preview known gaps without promising scores; allow analysis with honest limits.                                                                                                                                                                                                                                                                    |
| A24 | Upload partially readable content and review extracted financial values        | Show omissions and source-linked critical values before analysis; successful upload never implies full extraction; preparation makes no undisclosed paid call.                                                                                                                                                                                                                                                         |
| A25 | Start, cancel, and then correct a factual or extraction mistake                | Explain locking before start; cancellation preserves the snapshot; Create corrected assessment copies inputs and opens the exact field; disclose fresh-processing cost before a run.                                                                                                                                                                                                                                   |
| A26 | Copy a reviewed assessment                                                     | Preview inputs carried over and review work not inherited; new draft has a predecessor link and no active old findings/approval; duplicate creation is prevented on retry.                                                                                                                                                                                                                                             |
| A27 | Review unresolved conflicting claims                                           | See a common summary and only affected alternatives; no default winner; keeping a conflict unresolved permits provisional approval when other requirements are met.                                                                                                                                                                                                                                                    |
| A28 | Edit an approved finding and attempt approval again                            | Cancelled edit preserves approval; saving creates a review revision with visible changes; readiness checklist links to opinion update and reapproval; old approved report remains accessible.                                                                                                                                                                                                                          |
| A29 | Approve/export with missing domains or fix provider readiness                  | Approved and Provisional remain separate labels; unresolved gaps are not automatic blockers; provider/setup errors give a return path without losing saved work.                                                                                                                                                                                                                                                       |
| A30 | Remove a draft file, cancel a purge, or encounter partial purge failure        | Draft removal stays local to that draft; purge preview names affected history; cancellation is harmless; partial deletion reports remaining scope and recovery.                                                                                                                                                                                                                                                        |
| A31 | Exclude content, including hidden spreadsheet content, before processing       | Included/excluded/unreadable states are distinct; selection survives navigation and copying; excluded content and its derivatives never enter external requests or assessment results. Unsupported fine selection offers a containing-unit/file exclusion. The original remains locally stored until purge.                                                                                                            |
| A32 | Review stage and legal context, then change profile/workspace defaults         | New drafts identify context origins; copied drafts retain context and disclose rubric/default differences. Unknown stage or missing/unsupported jurisdiction withholds only affected conclusions. Locked assessments and reports retain their original context; factual changes use a successor.                                                                                                                       |
| A33 | Compare inapplicable, unresolved-applicability, and scenario-dependent results | Overview, detail, and export agree. Not Applicable has a justified reason and no artificial score; unresolved applicability never inflates coverage; alternatives are labeled without a default winner or averaged score. All six domains remain visible.                                                                                                                                                              |
| A34 | Export after a technical failure, then recover the run                         | Draft/Incomplete appears on every page with unfinished sections identified; validated results remain available and absent outcomes are not mislabeled Not Assessable. Approval links to recovery. After successful recovery and review, the current report reflects completion while historical incomplete exports remain identifiable. A completed sparse assessment does not receive the technical Incomplete label. |

### 20.2 AI evaluation set — proposed minimum

Build at least 12 expert-reviewed assessment cases spanning supported stages and formats. Include sparse evidence, supported adverse findings, contradictory metrics, repeated claims, missing formula caches, mixed-language sources, malicious instructions, and substantial evidence sufficient for scoring.

Evaluate extraction fidelity, numerical/unit preservation, citation entailment, missing/conflicting evidence detection, score eligibility, adherence to anchors, risk reasoning, opinion consistency, and abstention quality. Repeat representative cases to measure variability. The product owner must approve the reference judgments and acceptable variance before release; JSON validity alone is not an evaluation.

Blocking failures include fabricated citations, secrets or confidential content in unintended logs, treating missing data as poor performance, unsupported verification claims, silently resolving material conflicts, and finalizing an opinion without human approval. Other precision/recall and score-agreement thresholds must be established from the reviewed set rather than invented after observing results.

## 21. Validation Gates and Remaining Proposed Decisions

No further long clarification questionnaire is required. Use the concrete proposals in this specification for review, and resolve the following at the applicable gate.

| Priority | Item                             | Current proposal or unresolved detail                                                                                                     | Required gate                                                                        |
| -------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| P0       | Scoring rubric                   | Compact criterion catalog proposed; complete stage-specific 1–5 anchors, essential criteria, evidence quality/freshness, and examples.    | Product-owner approval before scoring implementation.                                |
| P0       | Coverage and aggregation         | Proposed 60% coverage, all essential criteria, at least half of applicable criteria, equal weights. Validate with realistic sparse cases. | Rubric approval.                                                                     |
| P0       | Opinion and risk policy          | Proposed verdict meanings and severity anchors; validate provisional verdicts and contradictory-scenario outcomes.                        | Before real assessment conclusions are accepted as product output.                   |
| P0       | Confidential-data controls       | Provider/account terms, local storage protection, authorization disclosure, access boundaries, retention/deletion.                        | Before the confidential-data pilot; unvalidated prototype uses redacted/sample data. |
| P0       | Jurisdiction                     | Initial jurisdiction and any relevant exceptions remain unspecified. Do not infer them from city or language.                             | Before jurisdiction-dependent Legal scoring.                                         |
| P1       | File and scenario limits         | Support matrix, no OCR, 25 MB/file, 20 files, scenario complexity boundary are proposed.                                                  | Parser/scenario feasibility and representative-document review.                      |
| P1       | Cost/time budgets                | Proposed time limits; monetary budget and selected model/provider configuration remain to be measured and set.                            | Before paid pilot runs.                                                              |
| P1       | Quality gates                    | Proposed 12-case evaluation set and zero blocking failures; expert agreement/variance targets need approval.                              | Before pilot acceptance.                                                             |
| P1       | Essential forms and localization | Proposed field subset, input languages, calendar policy, and final opinion wording.                                                       | UX review before form/report implementation is finalized.                            |
| P2       | Product success targets          | Proposed time savings and usefulness targets require a measured baseline.                                                                 | Pilot planning.                                                                      |

The product owner approves policy; engineering validates feasibility and implements the approved rules. Technical choices cannot silently weaken evidence, approval, confidentiality, or immutability requirements. If a proposed default fails validation, update the specification and decision log before relying on a different behavior.

## 22. Delivery Sequence and Definition of Done

This sequence guides later implementation; it is not an instruction to start coding as part of this document update.

1. Validate the compact rubric, evidence rules, opinion policy, and evaluation examples.
2. Confirm local confidential-data operating controls and document support limits using nonconfidential fixtures.
3. Build persistence, startup/assessment lifecycle, essential forms, and all three document extraction paths.
4. Implement evidence provenance, claim conflicts, scenarios, score eligibility, and deterministic aggregation.
5. Integrate bounded AI analysis and recovery; evaluate real outputs against reviewed cases.
6. Complete finding review, final-opinion approval, successor assessments, and report versioning.
7. Validate Persian export, accessibility, operational limits, deletion, and confidential-data readiness.
8. Run the focused pilot and measure product outcomes before expanding scope.

The MVP is complete when the approved policy is represented faithfully, all applicable acceptance scenarios pass, blocking quality/security failures are resolved, the evaluator can produce and approve a traceable Persian report using real authorized inputs, and a successor assessment can incorporate new information without rewriting history. Deferred features are not required for completion.

## 23. Change History

### 23.1 Version 1.4 — design consistency and usability

- Mapped content inclusion/exclusion and hidden-content review to existing input and source controls; selections persist through locking and copying and govern analysis and transmission.
- Added a compact assessment-context panel and explicit Settings/Legal placement for jurisdiction, with stage confirmation, version visibility, and preserved historical context.
- Aligned overview, detail, and report presentation for applicability, scenario alternatives, and unfinished processing.
- Defined Draft/Incomplete report presentation and recovery separately from evidence limitations, retaining the existing policy validation gate.
- Added acceptance scenarios A31–A34 and synchronized the design inventory without adding screens, mandatory wizards, or repeated confirmations.

### 23.2 Version 1.3 — usability and recovery

- Added early readiness checks, distinct Questions Answered/Evidence Sufficiency labels, extraction-omission previews, and critical-value review.
- Defined one concise start confirmation covering data sharing, possible cost, and input locking; no undisclosed paid preparation.
- Added Create corrected assessment with copied inputs, direct field navigation, and a link to prior review work.
- Simplified conflict presentation while preserving alternative scenarios and the option to keep a conflict unresolved.
- Added explicit approval readiness, edit-impact warnings, review-change lists, and an update/reapproval path.
- Separated Approved from Provisional across screens and exports; clarified file removal versus global purge.
- Added recovery acceptance scenarios and the concise design companion `design-scope.md`.

### 23.3 Version 1.2 — changes from v1.1

- Added comprehensive overall opinions and draft investment verdicts with mandatory human approval; removed the old prohibition on any generated investment recommendation.
- Restricted verdict scope to the existing six domains, without investor-fit or deal-terms expansion.
- Added stage-adaptive scoring, evidence eligibility, scenario-specific assessment, and explicit proposed rubric approval gates.
- Replaced manual-value precedence with provenance, evidence-quality rules, and conflict scenarios.
- Replaced normal reruns on changed inputs with separate successor assessments that copy documents and factual inputs only.
- Made real confidential single-user local use and authorized external processing explicit, with corresponding product controls.
- Reduced manual forms, deferred dark mode/dashboard extras, and retained PDF/PPTX/XLSX and Persian reporting.
- Defined lifecycle, review, provisional/approval distinctions, report versions, conceptual data ownership, and acceptance scenarios.
- Removed the claim of immediate implementation readiness and separated remaining proposed defaults from confirmed decisions.
- Removed embedded instructions to start coding; implementation planning and development remain separate work.
