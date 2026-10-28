# Persian and RTL checklist

VentureLens has one Persian, RTL, light UI. src/lib/locale.ts defines the UI calendar, numerals, timezone, and direction. English locale utilities support explicit source formatting and tests, not a second UI language.

- Keep lang, dir, and the root DirectionProvider wired to the locale profile.
- Use locally bundled Vazirmatn until licensed DPSans assets are supplied. Follow design.md and the design scope.
- Read UI strings with t() / tp() from src/messages/fa.ts.
- Import primitives through UiComponents or components/ui, not directly from third-party packages.
- Use logical CSS utilities and overlay sides. Mirror directional icons only.
- Wrap Latin identifiers, URLs, and code with Ltr; use dir="auto" for free text. Preserve keyboard access, labels, visible focus, and readable contrast.
- Normalize only fields whose validation contract permits it. Never modify raw evidence, document text, or source financial values. Store original currency and calendar independently of the UI locale.
- Use formatting helpers with explicit currency/calendar overrides for source values. The UI default of toman never authorizes converting an unknown amount or relabeling another currency.
- Reuse calendar components with explicit calendar props when needed.

Run npm run lint:all. The RTL smoke check detects physical utility classes, physical overlay sides, forbidden primitive imports, and missing root direction wiring.

Check the login and application shell at desktop and mobile widths: no horizontal overflow, right-side navigation, mixed-direction input, focus, and keyboard navigation. e2e/locale.spec.ts checks the authenticated home shell against a real test database. The upstream component gallery has been removed.
