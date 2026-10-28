# VentureLens AI — Product Specification

**Version:** 1.1 (MVP)  
**Product:** VentureLens AI  
**Tagline:** From Startup Data to Investment Intelligence  
**Category:** AI-powered startup due diligence and investment assessment  
**Document language:** English  
**Application language:** Persian (RTL) by default  
**Status:** Implementation-ready product specification; domain scoring rubric subject to validation

---

## 1. Executive Summary

VentureLens AI is an evidence-based startup due diligence platform for venture capital funds, accelerators, startup studios, corporate venture capital teams, and investment analysts. Users create an assessment, upload a startup's pitch deck or other documents, optionally enter information manually, and receive a structured assessment across six domains:

1. Commercial Due Diligence
2. Product Due Diligence
3. Technology Due Diligence
4. Financial Due Diligence
5. Team & Organization Due Diligence
6. Legal Due Diligence

The platform extracts facts, maps source evidence, identifies strengths and risks, highlights missing or contradictory information, generates targeted follow-up questions, and produces a professional report. It **supports** investment judgment; it does not make autonomous investment decisions.

**Fundamental rule:** Every consequential finding must be linked to available evidence, or explicitly labeled as an inference, unknown, or unverified claim. Missing evidence must never be scored as poor performance by default.

## 2. Objectives and Non-Goals

### Objectives

- Reduce manual effort in preliminary startup screening and due diligence.
- Standardize assessment structure while preserving expert review.
- Make source evidence traceable to documents and pages/slides.
- Surface information gaps and contradictory claims before investment decisions.
- Produce readable, actionable Persian-language reports.
- Deliver a working local MVP that can be demonstrated using real documents and an actual AI API.

### MVP Non-Goals

- Autonomous investment approval/rejection or legally definitive advice.
- Multi-tenant organizations, subscription billing, and advanced access control.
- Founder collaboration portals and external CRM integrations.
- Autonomous market research or automatic verification of external claims.
- Full financial modeling, source-code audits, and legal compliance certification.
- Production deployment of confidential documents without authentication, authorization, encryption, retention policies, and security review.

## 3. Target Users and Jobs to Be Done

| Persona                           | Primary job                        | Desired outcome                                    |
| --------------------------------- | ---------------------------------- | -------------------------------------------------- |
| Investment Analyst (primary)      | Screen and assess startup evidence | Faster, consistent, source-linked analysis         |
| Investment Manager                | Review and challenge findings      | Clear risks, uncertainties, and next actions       |
| Accelerator / Startup Studio Team | Evaluate startup applications      | Structured comparison and information-gap tracking |
| Startup Founder (future)          | Respond to document requests       | Simple evidence submission, out of MVP             |

**Primary MVP scenario:** An analyst creates a startup record, uploads a PDF, PPTX, or XLSX document, reviews extracted facts, runs AI assessment, checks six-domain findings and risks, answers or flags information gaps, and exports a report.

## 4. Product Principles

1. **Evidence before scores:** Cite the source for each material claim.
2. **Unknown is not weak:** Distinguish absent evidence from negative evidence.
3. **Human-in-the-loop:** Users can review, correct, and challenge AI findings.
4. **One shared data model:** File extraction and manual entry feed the same assessment.
5. **Progressive disclosure:** Overview first; drill into criteria and citations as needed.
6. **Honest system states:** No fabricated data, progress, API results, or conclusions.
7. **Confidentiality by design:** Keep secrets server-side; treat startup documents as sensitive.
8. **Scope discipline:** A complete, reliable vertical slice beats many broken features.

## 5. Information Architecture

- **Workspace Dashboard:** Startup list, assessment statuses, recent activity, actual KPI counts.
- **Startups:** Create, view, edit, archive startup records.
- **Assessment Workspace:** Six-domain overview and detailed criteria.
- **Documents:** Upload, extraction status, extracted facts, source references.
- **Information Gaps:** Prioritized questions, required evidence, status tracking.
- **Risk Register:** Risks, severity, evidence, verification actions, status.
- **Reports:** Report preview, print/PDF export, assessment limitations.
- **Settings:** Theme, local environment status, model configuration information (no exposed secrets).

Navigation must not include empty or fake-functional pages. For the MVP, Documents, Gaps, Risks, and Reports can be tabs nested inside an individual startup assessment.

## 6. End-to-End User Journey

### 6.1 Entry and Dashboard

**Initial state:** Local single-workspace application; authentication is not required for the local MVP. Display brand, workspace title, theme toggle, “New Assessment” CTA, assessment list, and calculated counts for total startups, active assessments, completed assessments, and assessments requiring information.

**Empty-state copy (Persian):**

- Title: `اولین ارزیابی خود را آغاز کنید`
- Description: `یک استارتاپ اضافه کنید، مدارک آن را بارگذاری کنید و تحلیل هوشمند را آغاز کنید.`
- CTA: `ایجاد ارزیابی جدید`

Never show sample statistics as if they were real. Clearly label demo records.

### 6.2 Create Startup

**Required:** Startup name.  
**Optional:** Industry, website, **city**, funding stage, business model, short description.

**Location rule:** Ask for the startup's **city**, not country. All startups are assumed to operate in the same country for this MVP; do not display a country field in onboarding. The city must be an editable free-text field (Persian label: `شهر`).

Funding stage options: Pre-Seed, Seed, Series A, Series B, Growth.  
Business model options (strictly limited to these four): **B2B, B2C, B2B2C, B2G**. Do not show Marketplace, SaaS, Other, or any additional business-model options.

Keep onboarding short; avoid requiring fields extractable from the pitch deck.

- Primary CTA: `ایجاد و ادامه`
- Success toast: `پروژه ارزیابی با موفقیت ایجاد شد.`

Persist the startup and initial assessment.

### 6.3 Choose Input Method

Present two prominent options that can be combined later:

**A. Upload documents**

- Title: `بارگذاری اسناد استارتاپ`
- Description: `فایل‌های استارتاپ را بارگذاری کنید تا اطلاعات آن‌ها به‌صورت هوشمند استخراج و تحلیل شود.`
- **Required MVP formats:** PDF (`.pdf`), PowerPoint (`.pptx`), and Excel (`.xlsx`). Support all three in the upload UI, server validation, document parsing, and AI evidence pipeline.
- For Excel, extract workbook and worksheet names, cell values, and relevant table structures; retain **sheet name and cell/range references** for evidence traceability. Preserve numbers, dates, and formulas where feasible; distinguish cached/calculated values from formulas, and never invent a calculated value if it is unavailable.
- TXT is optional; `.xls` and `.xlsm` are not required for MVP. Do not claim support for unsupported file types.
- Drag-and-drop, file picker, validation, upload status, retry, delete.
- Display only formats that are actually supported.

**B. Enter information manually**

- Title: `ورود اطلاعات به‌صورت دستی`
- Description: `اطلاعات استارتاپ را در شش حوزه ارزیابی تکمیل کنید. هر بخش را می‌توانید بعداً نیز تکمیل کنید.`
- Present **six clearly separated domain sections**, each with its own sub-sections and structured questions. Use an accordion or stepper with progress indicators; on mobile, show one domain at a time.
- Each sub-section should ask for the **specific information required for assessment**, using appropriate field types (text, numeric, currency, date, percentage, multi-line explanation, and repeatable tables). The initial form schema should cover:

  **1. Commercial Due Diligence**
  - Market and target segments: target customer, geography, TAM/SAM/SOM estimates, methodology and sources.
  - Customer problem and demand: problem statement, customer validation, demand evidence.
  - Business and revenue model: monetization approach, pricing, revenue streams.
  - Competition and differentiation: key competitors, alternatives, competitive advantage.
  - Go-to-market and acquisition: channels, funnel, acquisition costs, sales cycle.
  - Traction and retention: customers, revenue trends, conversion, churn/retention, expansion.
  - Growth assumptions and commercial risks.

  **2. Product Due Diligence**
  - Value proposition and target use cases.
  - Product maturity: concept, MVP, launched, or scaling; key capabilities.
  - Problem-solution fit and product-market fit evidence.
  - User experience and usability research.
  - Product metrics: activation, engagement, retention, adoption, satisfaction.
  - Roadmap, prioritization, release cadence, and product differentiation.
  - Known product limitations and risks.

  **3. Technology Due Diligence**
  - System architecture and technology stack.
  - Hosting, infrastructure, deployment, and environments.
  - Scalability, reliability, performance, and observability.
  - Security practices, access controls, and incident history.
  - Code quality, testing, CI/CD, and engineering processes.
  - Technical debt, dependencies, third-party services, and vendor lock-in.
  - Technical team capabilities and known technical risks.

  **4. Financial Due Diligence**
  - Historical revenue by period and revenue stream.
  - Costs, gross margin, operating expenses, and profitability.
  - Cash balance, cash flow, burn rate, and runway.
  - Unit economics, including CAC/LTV where relevant.
  - Financial projections, assumptions, and scenarios.
  - Funding history, current funding needs, and use of funds.
  - Financial liabilities, concentration, and major financial risks.

  **5. Team & Organization Due Diligence**
  - Founders, experience, ownership of key functions, and founder-market fit.
  - Leadership and management structure.
  - Headcount, team composition, skills, and key vacancies.
  - Hiring, retention, incentives, and organizational processes.
  - Governance, decision-making, and execution track record.
  - Key-person dependencies and organizational risks.

  **6. Legal Due Diligence**
  - Company registration and corporate structure.
  - Shareholders, cap table, option pool, and outstanding equity rights.
  - Intellectual property ownership and licensing.
  - Material customer, supplier, investor, and partnership contracts.
  - Regulatory obligations, licenses, and compliance claims.
  - Employment/contractor agreements, confidentiality, and data protection.
  - Litigation, disputes, liabilities, and other legal risks.

- **All assessment fields must be optional for saving.** The user can save a partially completed domain or entire assessment even if no information is available for some fields. Never block Save, Save Draft, or Continue because an assessment answer is missing.
- Provide `ذخیره پیش‌نویس` (Save Draft), `ذخیره و ادامه` (Save & Continue), and `بعداً تکمیل می‌کنم` (Complete Later) actions. Save entered information persistently and restore it after refresh.
- For each question, distinguish **Answered**, **Not Provided**, and **Not Applicable** (with optional explanation). An empty answer is **Not Provided**, not zero, negative, or failed.
- Display per-domain and overall **information completeness** separately from due diligence scores. Completeness is based on required evidence/question coverage, not startup quality.
- At the end of manual entry, present a dedicated **Missing Information Summary** grouped by the six domains, including unanswered questions, missing documents/evidence, priority, and suggested follow-up actions. Include a `تکمیل اطلاعات` action to return directly to the relevant sub-section.
- Allow the user to proceed to AI assessment despite gaps. Mark unsupported criteria as **Not Assessable** and include missing information in the report and follow-up questions. Do not manufacture answers or penalize missing data with low scores.
- Domain forms must be schema-driven and reusable; avoid hardcoding each question into page components. The detailed criteria, evidence requirements, and scoring rules can be expanded later.
- Use autosave where practical and warn before discarding unsaved changes.

Both methods populate the same canonical startup facts and evidence model. Manual corrections take precedence over raw extraction but retain provenance.

### 6.4 Upload, Extract, Review

Processing stages: Uploading → Reading → Extracting → Mapping Evidence → Ready for Review.

Suggested Persian states:

- `در حال بارگذاری فایل...`
- `در حال استخراج اطلاعات از سند...`
- `اطلاعات شناسایی‌شده در حال دسته‌بندی است...`
- `استخراج اطلاعات تکمیل شد.`
- Error: `پردازش این فایل با مشکل مواجه شد. لطفاً فایل را بررسی کرده و دوباره تلاش کنید.`

Do not invent numeric progress; use honest stage-based indicators unless actual byte/job progress is available.

**Extraction review** shows extracted values (name, industry, product, customers, business model, traction, funding ask, team, technology, etc.), source document, page/slide number or Excel sheet/cell reference if available, verification status, and editable corrections. Unsupported scanned files must be flagged if OCR is not implemented.

### 6.5 Run AI Assessment

Before analysis, show document readiness and a clear `شروع تحلیل هوشمند` action. Analyze available evidence across all six domains; domains with inadequate evidence should still return gaps and “Not Assessable” states. Show per-stage status and partial success where possible. Preserve previously completed results if one stage fails.

### 6.6 Assessment Overview

Header: startup name, industry, funding stage, status, last update, run/re-run button.

Summary cards: domains assessed, evidence coverage, identified risks, unresolved information gaps.

Each of six domain cards displays icon, domain name, status, score or “Not Assessable,” coverage, risk count, and missing-item count.

Domain detail includes summary, criterion assessments, strengths, weaknesses, evidence references, risks, gaps, and targeted questions. Clicking evidence opens the original document and page/slide where technically feasible.

### 6.7 Manage Gaps and Risks

**Information gap fields:** title, domain, criterion, importance, required data, suggested document/metric, status. Statuses: Open, Information Provided, Under Review, Resolved. A submitted file does not automatically resolve a gap; the evidence must be evaluated.

**Risk fields:** ID, title, domain, severity, explanation, evidence, impact, verification action, status. Severity: Critical, High, Medium, Low, Undetermined. Status: Open, Under Review, Mitigated, Accepted. Allow filters and sorting.

### 6.8 Review and Export Report

Report sections:

1. Cover
2. Startup overview
3. Executive summary
4. Scope, evidence sufficiency, and limitations
5. Six-domain overview
6. Commercial assessment
7. Product assessment
8. Technology assessment
9. Financial assessment
10. Team & Organization assessment
11. Legal assessment
12. Key risks
13. Information gaps
14. Follow-up questions
15. Recommended next due diligence actions
16. Evidence references

Support professional print styling and PDF export. If native PDF rendering is unreliable, provide an accessible Print-to-PDF flow. Never fabricate report charts or scores.

## 7. Six-Domain Assessment Framework

Store domains, criteria, descriptions, and required evidence in versioned configuration or database records, **not** hardcoded UI components. Criteria below are an initial draft and must be replaceable when the investment team's rubric is finalized.

| Domain              | Initial criteria                                                                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Commercial          | Market size and attractiveness; target customers; customer problem/demand; business model; competitive landscape; GTM; acquisition; retention/revenue quality; growth potential; commercial risks |
| Product             | Value proposition; problem-solution fit; product-market fit evidence; product maturity; roadmap; UX; performance; differentiation; product analytics; product risks                               |
| Technology          | Architecture; stack; scalability; security; infrastructure; code quality; technical debt; engineering processes; technical team capability; technology risks                                      |
| Financial           | Revenue performance; revenue quality; cost structure; gross margin; profitability; cash flow; burn/runway; unit economics; forecasts; financial risks                                             |
| Team & Organization | Founder background; founder-market fit; leadership; team composition; structure; hiring; execution; key-person dependency; governance; organizational risks                                       |
| Legal               | Corporate structure; cap table; intellectual property; material contracts; regulatory compliance; employment agreements; liabilities; data protection; disputes; legal risks                      |

A pitch deck alone usually cannot substantiate security posture, legal compliance, audited financial performance, or source-code quality. The application must say so explicitly.

## 8. AI Processing Pipeline

Implement separate backend services and versioned, validated structured outputs:

1. **Document extraction:** Parse text and metadata from PDF/PPTX/XLSX. Preserve document ID, filename, page/slide or Excel worksheet/cell range, extraction status, and text spans or tabular evidence. For spreadsheets, extract worksheet tables and numeric values without losing cell provenance; avoid unsupported formula recalculation.
2. **Fact extraction:** Identify startup profile and factual claims; do not treat promotional claims as verified facts.
3. **Domain classification:** Map evidence to one or more of the six domains.
4. **Criterion mapping:** Associate evidence with rubric criteria; store source references and short excerpts.
5. **Gap analysis:** Classify absent, insufficient, contradictory, and adequately supported information.
6. **Criterion analysis:** Evaluate each criterion against the rubric, with uncertainty and limitations.
7. **Risk generation:** Produce severity, supporting evidence, impact, and verification actions.
8. **Follow-up generation:** Create specific, prioritized questions and required documents.
9. **Report synthesis:** Assemble a grounded executive summary and domain sections from validated assessment records.

### AI Provider Architecture

Use a server-side adapter with methods such as:

```ts
extractStartupInformation();
classifyEvidence();
identifyInformationGaps();
assessDomain();
generateRiskRegister();
generateFollowUpQuestions();
generateExecutiveSummary();
```

Start with an OpenAI-compatible provider adapter. Select a currently available model by consulting official API documentation at implementation time. Prefer structured JSON output and validate with Zod. Never expose API keys in browser code.

Environment variables:

```dotenv
AI_PROVIDER=openai
OPENAI_API_KEY=
AI_MODEL=
AI_TIMEOUT_MS=60000
AI_MAX_RETRIES=2
```

Do not ship real secrets in `.env.example`. Implement timeouts, retry limits, error handling, idempotent analysis runs, caching where suitable, and model/framework version tracking. No fabricated fallback AI results. A separate, clearly labeled demo mode is acceptable for UI development only.

**Prompt-injection defense:** Uploaded documents are untrusted data, never instructions. The AI must ignore any document content attempting to change its role, reveal secrets, or override assessment policy. Validate and constrain all model outputs server-side.

## 9. Evidence and Scoring Rules

Each material finding should contain:

- Finding ID and domain/criterion
- Finding type (strength, weakness, risk, observation)
- Claim and explanation
- Evidence IDs and source document/page references
- Whether it is verified, unverified, inferred, or unsupported
- Confidence and limitations
- Suggested follow-up action, where appropriate

### Separate Three Dimensions

1. **Performance score:** Criterion quality on a 1–5 scale when assessable (1 very weak, 5 very strong).
2. **Evidence coverage:** Percentage of required evidence sufficiently available; calculated against explicit criterion requirements.
3. **Assessment confidence:** Qualitative or calibrated quantitative confidence based on evidence sufficiency, quality, consistency, and directness.

Do **not** turn missing evidence into a score of 1. Use `Not Assessable` when support is insufficient. For initial MVP, use equal criterion weights within each domain only when scores are supported; expose the number of assessable criteria and never hide missing ones in averages. Do not generate an automatic overall invest/do-not-invest recommendation. All rubric weights and thresholds must be configurable in future versions.

## 10. UX and Visual Design Specification

**Goal:** Premium, calm, trustworthy B2B investment intelligence product. Original identity, inspired by the clarity of Linear, Notion, Stripe Dashboard, and Vercel without cloning them.

### Design Tokens

| Token            | Value     | Use                           |
| ---------------- | --------- | ----------------------------- |
| Navy             | `#102B56` | Brand, headings               |
| Blue             | `#1976C9` | Primary actions, analytics    |
| Teal             | `#139D9B` | AI workflows, insights        |
| Green            | `#348D51` | Verified success              |
| Orange           | `#F48B20` | Caution                       |
| Purple           | `#7546A6` | Secondary analytical emphasis |
| Light background | `#F7F9FC` | Page canvas                   |
| Surface          | `#FFFFFF` | Cards, panels                 |

- Use **Vazirmatn** for Persian text; ensure fonts load correctly and support Persian digits and punctuation.
- Default UI language Persian, with `dir="rtl"`. Keep code, URLs, and some technical labels LTR where necessary.
- Mobile-first, 8px spacing scale, ~12–16px card radius, subtle shadows, accessible contrast.
- Use consistent **Lucide SVG** icons, never emoji/text glyphs. Suggested mapping: Commercial `TrendingUp`; Product `Layers`; Technology `Cpu`; Financial `ChartPie`; Team `Users`; Legal `Scale`; AI `BrainCircuit`; Risk `TriangleAlert`.
- Avoid excessive gradients, glassmorphism, crowded cards, and decorative visual noise.
- Use meaningful skeletons, clear empty states, subtle transitions, and helpful microcopy.

### Responsive Behavior

- **<768px:** Single column, collapsible navigation or bottom navigation, touch-friendly controls, compact domain cards, accessible tables.
- **768–1023px:** Adaptive two-column layouts and collapsible sidebar.
- **≥1024px:** Right-side navigation, main analysis canvas, optional contextual evidence panel, richer tables and charts.
- Test at **375, 768, 1280, and 1440px**; no horizontal overflow, clipped Persian text, or overlapping content.

### Dark Mode

Provide Light / Dark / System settings, persist preference, use CSS variables/design tokens, ensure charts and dialogs work in both modes, and avoid hardcoded white surfaces. Light mode is the default.

### UI Messaging and States

All major workflows must have loading, empty, success, error, partial-success, and insufficient-evidence states.

| Situation             | Persian message                                                                  |
| --------------------- | -------------------------------------------------------------------------------- |
| No assessments        | `اولین ارزیابی خود را آغاز کنید`                                                 |
| Startup created       | `پروژه ارزیابی با موفقیت ایجاد شد.`                                              |
| Uploading             | `در حال بارگذاری فایل...`                                                        |
| Extracting            | `در حال استخراج اطلاعات از سند...`                                               |
| Classifying           | `اطلاعات شناسایی‌شده در حال دسته‌بندی است...`                                    |
| Extraction complete   | `استخراج اطلاعات تکمیل شد.`                                                      |
| Extraction error      | `پردازش این فایل با مشکل مواجه شد. لطفاً فایل را بررسی کرده و دوباره تلاش کنید.` |
| Missing API key       | `برای فعال‌سازی تحلیل هوشمند، ابتدا کلید API را در تنظیمات محیطی وارد کنید.`     |
| Insufficient evidence | `شواهد کافی برای امتیازدهی معتبر به این بخش وجود ندارد.`                         |
| Analysis failure      | `تحلیل کامل نشد. نتایج قبلی حفظ شده‌اند؛ می‌توانید دوباره تلاش کنید.`            |
| Unsaved changes       | `تغییرات ذخیره‌نشده دارید. آیا می‌خواهید خارج شوید؟`                             |

Use toast notifications for routine success; use confirmation dialogs for destructive actions. Buttons must perform real actions; never ship placeholder navigation without explicit labeling.

## 11. Suggested Technical Stack

**Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Lucide, React Router, TanStack Query, React Hook Form, Zod, Recharts.  
**Backend:** Node.js, TypeScript, Express or Fastify, REST API.  
**Persistence:** SQLite with Prisma for local MVP, with a migration path to PostgreSQL.  
**Document parsing:** Reliable PDF/PPTX/XLSX extraction libraries, preserving page/slide or worksheet/cell metadata.  
**AI:** Backend-only OpenAI API adapter with structured outputs and validation.  
**Reporting:** HTML print stylesheet and browser Print-to-PDF first; server PDF renderer only if needed.

Simplify the architecture where it reduces risk, but keep domain logic separate from UI.

```text
venturelens/
  apps/
    web/src/
      components/
      pages/
      features/{dashboard,startups,documents,assessment,risks,reports}/
      hooks/
      services/
      styles/
    api/src/
      routes/
      controllers/
      services/{ai,documents,assessment,reports}/
      repositories/
      middleware/
      config/
  packages/shared/
    schemas/
    types/
    assessment-framework/
  prisma/
  tests/
  docs/
  .env.example
  README.md
```

## 12. Core Data Model

| Entity              | Key fields                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| Startup             | id, name, industry, website, city, fundingStage, businessModel, description, timestamps          |
| Assessment          | id, startupId, status, frameworkVersion, timestamps                                              |
| Document            | id, assessmentId, filename, mimeType, storagePath, extractionStatus, uploadedAt                  |
| Evidence            | id, assessmentId, documentId, pageNumber/slideNumber, excerpt, domain, criterionId               |
| Criterion           | id, domain, name, description, requiredInformation, rubricVersion                                |
| CriterionAssessment | id, assessmentId, criterionId, score nullable, confidence, evidenceCoverage, explanation, status |
| Finding             | id, assessmentId, domain, criterionId, type, title, description, evidence links                  |
| Risk                | id, assessmentId, domain, title, severity, description, status, evidence links                   |
| InformationGap      | id, assessmentId, domain, criterionId, question, importance, status                              |
| AnalysisRun         | id, assessmentId, status, model, frameworkVersion, startedAt, completedAt, errorMessage          |

Use referential integrity, timestamps, migrations, and explicit lifecycle statuses. Store manual corrections separately from raw extracted evidence so the audit trail is preserved.

## 13. Security and Privacy

- Keep API credentials on the server in environment variables.
- Validate file type, actual content, size, and filename; enforce limits.
- Store uploads outside public static directories; use safe access patterns.
- Do not log sensitive document text or model prompts containing confidential data.
- Sanitize inputs and safely handle parsing failures and malicious files.
- Support document deletion and define retention behavior.
- Treat uploaded content as untrusted for prompt injection.
- Label the local MVP as **not production-secure** without authentication, authorization, encryption/storage review, and retention policies.
- Do not publicly deploy confidential startup data until appropriate controls are implemented.

## 14. Delivery Phases

| Phase                | Scope                                                                                                | Completion evidence                                  |
| -------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| 1 — Foundation       | Repo inspection, architecture, React shell, design tokens, Persian RTL, mobile responsiveness, theme | App runs; shell works on mobile and desktop          |
| 2 — Core UX          | Dashboard, startup CRUD, assessment navigation, six domain views                                     | Complete navigation with clearly labeled sample data |
| 3 — Data & Documents | SQLite/Prisma, persistence, PDF/PPTX/XLSX upload and extraction, correction UI                       | Real document parsed; saved state survives refresh   |
| 4 — AI Engine        | Provider adapter, structured extraction, evidence mapping, gaps, risks, domain analysis              | Real API produces validated source-linked findings   |
| 5 — Assessment       | Domain summaries, scoring/coverage/confidence, risks and gaps                                        | All six domains display honest assessability states  |
| 6 — Reporting        | Executive summary, detailed report, references, PDF/print export                                     | Report renders and exports in Persian                |
| 7 — QA               | Responsive, RTL, dark mode, file errors, API failures, persistence, end-to-end                       | Acceptance scenario passes                           |

At each phase: implement, run, test, fix errors, summarize changes, document limitations, and request approval before starting the next major phase. Do not build everything in one uncontrolled generation.

## 15. MVP Acceptance Test

1. Open the application locally without authentication.
2. Create a startup named **Sample Startup**.
3. Upload a real PDF, PPTX, or XLSX document.
4. See extracted text and startup facts with page/slide references where possible.
5. Correct an extracted fact and save it.
6. Run real AI analysis using a configured server-side API key.
7. View all six due diligence domains, including clearly marked unassessable criteria.
8. Inspect supporting evidence for a material finding.
9. View prioritized risks and missing information.
10. Generate a professional Persian report and export/print to PDF.
11. Create another startup using **city** (not country) and select a business model from only B2B, B2C, B2B2C, or B2G.
12. Open manual entry; navigate through all six domains and their sub-sections; enter only partial data; save and continue without blocking validation.
13. View the Missing Information Summary grouped by domain, return to a missing question, supply data, and verify the summary updates.
14. Upload an XLSX workbook and verify that extracted evidence identifies its worksheet and cell/range.
15. Refresh the browser and confirm that data persists.
16. Use the app in light/dark modes and on mobile.
17. Simulate an AI failure; confirm an honest error, preserved results, and retry option.
18. Confirm that no API secret appears in frontend source or network payloads.

## 16. Quality Bar and Anti-Patterns

**Avoid:** Generic AI dashboard styling; inconsistent Persian typography; broken RTL; fake scores; unsupported claims; placeholder buttons; invented progress; unvalidated model output; exposed secrets; huge unmaintainable components; silent failures; unexplained score aggregation.

**Prefer:** Thoughtful visual hierarchy; reusable components; explicit evidence references; useful empty/error states; transparent uncertainty; maintainable services; real persistence; and end-to-end working workflows.

## 17. Instructions to the Coding Agent (VS Code / Codex)

Act as a coordinated senior product and engineering team: product manager, UX/UI designer, frontend engineer, backend engineer, AI architect, VC due diligence specialist, and QA engineer.

**Do not start by coding the entire product.** First:

1. Inspect the existing repository and preserve useful work.
2. Read this specification in full.
3. Summarize architecture and trade-offs.
4. Create the page/navigation map and user journey.
5. Define the initial database schema and AI processing pipeline.
6. Produce a prioritized implementation backlog and identify risks.
7. Save the plan in `docs/implementation-plan.md`.
8. Begin **Phase 1 only** and validate it before advancing.

For each phase, report what was implemented, how to run and test it, known limitations, and the next proposed step. Fix build/runtime errors before claiming completion. Never misrepresent a mock, sample, or stub as a working AI feature.

**Final reminder:** VentureLens AI is an evidence-based investment assessment product, **not** a generic chatbot, pitch-deck summarizer, or automatic investment decision engine.
