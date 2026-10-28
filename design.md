---
version: alpha
name: Mci
description: |
  Hamrah Aval's design system embodies a modern, tech-forward telecommunications
  brand with a strong emphasis on clarity, accessibility, and digital
  confidence. The visual language combines deep, energetic blues with bold
  accents of orange, creating a striking contrast that conveys innovation and
  reliability. The design favors clean, right-angled geometry—sharp corners and
  flat surfaces dominate—giving the interface a contemporary, no-nonsense
  quality. Typography is substantial and hierarchical, with generous vertical
  rhythm that guides the eye through content. Photography is immersive and
  human-centric, featuring real people engaging with technology, reinforced by
  glowing, neon-like accents that suggest connectivity and energy. The overall
  mood is professional yet approachable, positioning the brand as a trusted,
  forward-thinking service provider in the Iranian telecommunications market.
source:
  url: "https://mci.ir/"
  pagesAnalyzed: 1
  extractedAt: 2026-10-22
  tokensMeasured: true
colors:
  primary: "#0095DA"
  canvas: "#F1F1F1"
  surface-alt: "#FFFFFF"
  ink: "#333333"
  body: "#666666"
  muted: "#FFFFFF"
  neutral-1: "#010101"
typography:
  display-lg:
    fontFamily: DPSans
    fontSize: 45px
    fontWeight: 700
    lineHeight: 1.33
    letterSpacing: 0px
  display-md:
    fontFamily: DPSans
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: 0px
  heading-sm:
    fontFamily: DPSans
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.75
    letterSpacing: 0px
  heading-xs:
    fontFamily: DPSans
    fontSize: 15px
    fontWeight: 500
    lineHeight: 4.87
    letterSpacing: 0px
  body-xl:
    fontFamily: DPSans
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.75
    letterSpacing: 0px
  body-xl-tight:
    fontFamily: DPSans
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: 0px
  body-lg:
    fontFamily: DPSans
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.43
    letterSpacing: 0px
  body-md:
    fontFamily: DPSans
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.86
    letterSpacing: 0px
  body-md-tight:
    fontFamily: DPSans
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: 0px
  body-sm:
    fontFamily: DPSans
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: 0px
  button:
    fontFamily: DPSans
    fontSize: 0px
    fontWeight: 400
    lineHeight: 0px
    letterSpacing: 0px
  caption-md:
    fontFamily: DPSans
    fontSize: 12px
    fontWeight: 300
    lineHeight: 1.43
    letterSpacing: 0px
  caption-md-strong:
    fontFamily: DPSans
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.83
    letterSpacing: 0px
  caption-md-loose:
    fontFamily: DpSans
    fontSize: 12px
    fontWeight: 700
    lineHeight: 2.33
    letterSpacing: 0px
  caption-sm:
    fontFamily: DPSans
    fontSize: 11px
    fontWeight: 400
    lineHeight: 2
    letterSpacing: 0px
  caption-sm-strong:
    fontFamily: DPSans
    fontSize: 11px
    fontWeight: 700
    lineHeight: 1.43
    letterSpacing: 0px
  caption-xs:
    fontFamily: DPSans
    fontSize: 1px
    fontWeight: 500
    lineHeight: 1.43
    letterSpacing: 0px
rounded:
  none: 0px
  xs: 4px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 20px
  lg: 24px
  xl: 28px
  xxl: 32px
  xxxl: 36px
  section: 52px
  band: 72px
shadows:
  sm: "rgba(0, 0, 0, 0.2) 0px 7px 16px 0px"
elevationStrategy: single-tier
themes:
  derived: dark   # the other theme is the site's measured palette
  light:
    bg: "#F1F1F1"
    surface: "#FFFFFF"
    surfaceRaised: "#F7F7F7"
    text: "#333333"
    textMuted: "#666666"
    border: "#DADADA"
    accent: "#0087C6"
    accentFg: "#000000"
    focusRing: "#0095DA"
    elevation: shadow
  dark:
    bg: "#091116"
    surface: "#181F24"
    surfaceRaised: "#242B30"
    text: "#F5FBFE"
    textMuted: "#9BA2A6"
    border: "#30373B"
    accent: "#0095DA"
    accentFg: "#0B0B0C"
    focusRing: "#0095DA"
    elevation: "border+surface"
components:
  button-secondary:
    typography: "{typography.caption-md}"
    textColor: "{colors.body}"
    border: "1px solid rgb(243, 243, 243)"
    height: 49.1406px
    padding: "15px 20px 15px 20px"
    backgroundColor: "{colors.surface-alt}"
  button-secondary-sm:
    typography: "{typography.caption-md}"
    textColor: "{colors.body}"
    height: 48.1406px
    padding: "15px 20px 15px 20px"
    backgroundColor: "{colors.surface-alt}"
  button-primary:
    textColor: "{colors.muted}"
    height: 40px
    padding: "0px 20px 0px 20px"
    fontSize: 15px
    fontFamily: DPSans
    fontWeight: 700
    lineHeight: 2.67
    backgroundColor: "{colors.primary}"
  button-filled:
    textColor: "{colors.muted}"
    height: 28px
    padding: "0px 25px 0px 25px"
    fontSize: 15px
    fontFamily: DPSans
    fontWeight: 700
    lineHeight: 2
    rounded: "{rounded.xs}"
    backgroundColor: "rgba(0, 0, 0, 0.2)"
  button-primary-sm:
    textColor: "{colors.muted}"
    height: 28px
    padding: "0px 10px 0px 10px"
    fontSize: 15px
    fontFamily: DPSans
    fontWeight: 500
    lineHeight: 2
    backgroundColor: "{colors.primary}"
  button-filled-lg:
    textColor: "{colors.muted}"
    height: 30px
    padding: "0px 13px 0px 13px"
    fontSize: 13px
    boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 5px 0px"
    fontFamily: DPSans
    fontWeight: 500
    lineHeight: 2.31
    rounded: "{rounded.xs}"
    backgroundColor: "rgb(255, 79, 0)"
  badge-icon:
    typography: "{typography.body-sm}"
    textColor: "{colors.ink}"
    height: 30px
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 0px 4px 0px"
    rounded: "{rounded.xs}"
    backgroundColor: "{colors.surface-alt}"
  footer:
    typography: "{typography.body-sm}"
    textColor: "{colors.ink}"
  link:
    typography: "{typography.body-sm}"
    textColor: "{colors.muted}"
    padding: "35px 0px 0px 0px"
    backgroundColor: "rgb(255, 79, 0)"
  link-sm:
    typography: "{typography.body-sm}"
    textColor: "{colors.ink}"
    padding: "0px 20px 0px 20px"
    backgroundColor: "{colors.primary}"
states:
  link-hover:
    target: link
    state: hover
    textColor: "rgb(35, 82, 124)"
    textDecoration: underline
  link-focus:
    target: link
    state: focus
    outline: "-webkit-focus-ring-color auto 5px"
    outlineColor: -webkit-focus-ring-color
    outlineWidth: 5px
  other-hover:
    target: other
    state: hover
    backgroundColor: "rgb(245, 245, 245)"
  input-focus:
    target: input
    state: focus
    outline: "-webkit-focus-ring-color auto 5px"
    outlineColor: -webkit-focus-ring-color
    outlineWidth: 5px
  other-focus:
    target: other
    state: focus
    boxShadow: "rgba(0, 0, 0, 0.075) 0px 1px 1px inset, rgba(102, 175, 233, 0.6) 0px 0px 8px"
    borderColor: "rgb(102, 175, 233)"
  button-active:
    target: button
    state: active
    outline: "-webkit-focus-ring-color auto 5px"
    outlineColor: -webkit-focus-ring-color
    outlineWidth: 5px
  button-hover:
    target: button
    state: hover
    textColor: "{colors.ink}"
    textDecoration: none
  button-focus:
    target: button
    state: focus
    textColor: "{colors.ink}"
    borderColor: "rgb(140, 140, 140)"
    backgroundColor: "rgb(230, 229, 229)"
breakpoints:
  - width: 375
    containerWidth: 355
    gridColumns: 8
    navLinksVisible: 0
    menuToggleVisible: false
    headingPx: 0
    bodyPx: 13
    sectionPaddingX: 0
  - width: 768
    containerWidth: 750
    gridColumns: 8
    navLinksVisible: 0
    menuToggleVisible: false
    headingPx: 0
    bodyPx: 13
    sectionPaddingX: 0
  - width: 1024
    containerWidth: 970
    gridColumns: 8
    navLinksVisible: 120
    menuToggleVisible: false
    headingPx: 16
    bodyPx: 13
    sectionPaddingX: 0
  - width: 1280
    containerWidth: 1170
    gridColumns: 6
    navLinksVisible: 120
    menuToggleVisible: false
    headingPx: 16
    bodyPx: 13
    sectionPaddingX: 0
  - width: 1440
    containerWidth: 1170
    gridColumns: 6
    navLinksVisible: 120
    menuToggleVisible: false
    headingPx: 16
    bodyPx: 13
    sectionPaddingX: 0
coverage:
  statesFound: 61
  gradientsFound: 0
  rolesUnassigned: 1
  archetypesUnnamed: 0
  archetypesDetected: 0
  responsiveMeasured: true
  stylesheetsBlocked: false
  semanticRampDeclared: false
---

# Design System Inspired by Hamrah Aval (MCI)

## 1. Visual Theme & Atmosphere

Hamrah Aval's design system embodies a modern, tech-forward telecommunications brand with a strong emphasis on clarity, accessibility, and digital confidence. The visual language combines deep, energetic blues with bold accents of orange, creating a striking contrast that conveys innovation and reliability. The design favors clean, right-angled geometry—sharp corners and flat surfaces dominate—giving the interface a contemporary, no-nonsense quality. Typography is substantial and hierarchical, with generous vertical rhythm that guides the eye through content. Photography is immersive and human-centric, featuring real people engaging with technology, reinforced by glowing, neon-like accents that suggest connectivity and energy. The overall mood is professional yet approachable, positioning the brand as a trusted, forward-thinking service provider in the Iranian telecommunications market.

**Key Characteristics**
- Deep blues and vibrant orange create maximum contrast and brand recognition
- Sharp, rectilinear design with no rounded transitions on primary interactive elements
- Generous whitespace and clear visual hierarchy prioritize readability
- Human-centered imagery with tech-inspired lighting effects
- Single-tier shadow strategy emphasizes flat, modern aesthetics
- RTL-ready layout supporting Persian language and user base
- Responsive design that maintains visual hierarchy across all viewport sizes

## 2. Color Palette & Roles

### Primary
- **Brand Accent** (`{colors.primary}` — `#0095DA`): Primary call-to-action buttons, active link states, brand highlights, and interactive accent elements. Used to draw attention and signal actionable items throughout the interface.

### Interactive
- **Primary CTA** (`{colors.primary}` — `#0095DA`): Filled buttons and primary navigation links; drives user actions and conversions.

### Neutral Scale
- **Canvas** (`{colors.canvas}` — `#F1F1F1`): Default page background and neutral section bands; provides breathing room between content areas.
- **Surface Alt** (`{colors.surface-alt}` — `#FFFFFF`): Alternating section backgrounds and card surfaces; ensures contrast when layered over canvas.
- **Ink** (`{colors.ink}` — `#333333`): Primary text for headings and dominant content; ensures legibility and hierarchy.
- **Body** (`{colors.body}` — `#666666`): Secondary body copy and descriptive text; provides visual distinction from primary text while maintaining readability.
- **Neutral Base** (`{colors.neutral-1}` — `#010101`): Decorative use in graphical elements and deep backgrounds; not assigned a primary semantic role in the extracted data.

## 3. Typography Rules

### Font Family
**Primary Font:** DPSans (weight range: 300–700)
Fallback stack: `DPSans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

**Secondary Font:** DPSansEn (for English numerals and Latin script within Persian content)

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|---|---|---|---|---|---|---|
| Display Large | DPSans | 45px | 700 | 1.33 | 0px | Hero headlines; used sparingly at page top |
| Display Medium | DPSans | 40px | 700 | 1.25 | 0px | Major section headers |
| Heading Small | DPSans | 16px | 500 | 1.75 | 0px | Subsection headers and card titles |
| Body Extra Large | DPSans | 20px | 500 | 1.75 | 0px | Feature highlights; emphasized body text |
| Body Extra Large (Tight) | DPSans | 20px | 500 | 1.45 | 0px | Feature highlights with reduced leading |
| Body Large | DPSans | 15px | 500 | 1.43 | 0px | Button labels and prominent UI text |
| Heading Extra Small | DPSans | 15px | 500 | 4.87 | 0px | Utility labels; very tight leading for UI |
| Body Medium | DPSans | 14px | 400 | 1.86 | 0px | Primary body copy and descriptive text |
| Body Medium (Tight) | DPSans | 14px | 400 | 1.43 | 0px | Body copy with reduced leading |
| Body Small | DPSans | 13px | 400 | 1.43 | 0px | Secondary text, links, and captions |
| Caption Medium | DPSans | 12px | 300 | 1.43 | 0px | Fine print and metadata |
| Caption Medium (Strong) | DPSans | 12px | 400 | 1.83 | 0px | Emphasized captions with heavier weight |
| Caption Medium (Loose) | DPSans | 12px | 700 | 2.33 | 0px | Bold captions with generous leading |
| Caption Small | DPSans | 11px | 400 | 2.0 | 0px | Minimal labels and utility text |
| Caption Small (Strong) | DPSans | 11px | 700 | 1.43 | 0px | Bold minimal labels |
| Button | DPSans | 0px | 400 | 0px | 0px | Derived from button element; actual size varies by button variant |

### Principles
- **Hierarchy through weight and size:** Display and heading roles use bold weights (500–700) to anchor sections; body text uses regular weight (400) or light (300) for breathing room.
- **Generous leading:** Body copy uses line-height 1.75–1.86 for comfortable reading; utility and label text uses tighter leading (1.43–2.0) to maintain compact UI density.
- **Persian-first typesetting:** DPSans is optimized for Farsi, with DPSansEn handling numerals and Latin within Persian paragraphs.
- **No decorative tracking:** Letter-spacing is 0px across all roles, preserving the font's native metrics and readability.
- **Consistent font family:** All text uses DPSans variants; no serif or display font alternatives in the measured system.

## 4. Component Stylings

### Buttons

**Primary**
- Background: `{colors.primary}` (`#0095DA`)
- Text color: `#FFFFFF`
- Font: DPSans, 15px, weight 700
- Padding: `0px 20px`
- Height: 40px
- Border: none
- Border radius: `{rounded.none}` (0px)
- Box shadow: none
- Line height: 40px

**Primary Small**
- Background: `{colors.primary}` (`#0095DA`)
- Text color: `#FFFFFF`
- Font: DPSans, 15px, weight 500
- Padding: `0px 10px`
- Height: 28px
- Border: none
- Border radius: `{rounded.none}` (0px)
- Box shadow: none
- Line height: 30px

**Secondary**
- Background: `{colors.surface-alt}` (`#FFFFFF`)
- Text color: `#666666`
- Font: DPSans, 12px, weight 300
- Padding: `15px 20px`
- Height: 49.14px
- Border: 1px solid `#F3F3F3`
- Border radius: `{rounded.none}` (0px)
- Box shadow: none
- Line height: 17.14px

**Secondary Small**
- Background: `{colors.surface-alt}` (`#FFFFFF`)
- Text color: `#666666`
- Font: DPSans, 12px, weight 300
- Padding: `15px 20px`
- Height: 48.14px
- Border: none
- Border radius: `{rounded.none}` (0px)
- Box shadow: none
- Line height: 17.14px

**Filled**
- Background: `rgba(0, 0, 0, 0.2)`
- Text color: `#FFFFFF`
- Font: DPSans, 15px, weight 700
- Padding: `0px 25px`
- Height: 28px
- Border: none
- Border radius: `{rounded.xs}` (4px)
- Box shadow: none
- Line height: 30px

**Filled Large**
- Background: `#FF4F00` (orange)
- Text color: `#FFFFFF`
- Font: DPSans, 13px, weight 500
- Padding: `0px 13px`
- Height: 30px
- Border: none
- Border radius: `{rounded.xs}` (4px)
- Box shadow: `rgba(0, 0, 0, 0.2) 0px 2px 5px 0px`
- Line height: 30px

### Cards & Containers

**Link Container (Orange)**
- Background: `#FF4F00`
- Text color: `#FFFFFF`
- Font: DPSans, 13px, weight 400
- Padding: `35px 0px 0px 0px` (top padding for top-aligned content)
- Border: none
- Border radius: `{rounded.none}` (0px)
- Box shadow: none
- Line height: 18.57px
- Used for promotional and feature highlight cards with orange accent.

**Link Container Small (Blue)**
- Background: `{colors.primary}` (`#0095DA`)
- Text color: `{colors.ink}` (`#333333`)
- Font: DPSans, 13px, weight 400
- Padding: `0px 20px`
- Border: none
- Border radius: `{rounded.none}` (0px)
- Box shadow: none
- Line height: 18.57px
- Used for secondary link cards and feature tiles.

### Inputs & Forms

**Input Focus State**
- Border color: `rgb(102, 175, 233)`
- Box shadow: `rgba(0, 0, 0, 0.075) 0px 1px 1px inset, rgba(102, 175, 233, 0.6) 0px 0px 8px`
- Outline: `-webkit-focus-ring-color auto 5px`

**Input Hover State** (generic)
- Background: `rgb(245, 245, 245)`
- Smooth transition applied.

### Navigation

**Nav Link Default**
- Text color: `#FFFFFF`
- Font: DPSans, 13px, weight 400
- Line height: 18.57px
- Underline: none

**Nav Link Hover**
- Text color: `rgb(35, 82, 124)`
- Text decoration: underline
- Smooth transition applied.

**Nav Link Focus**
- Outline: `-webkit-focus-ring-color auto 5px`

### Badges

**Icon Badge**
- Background: `{colors.surface-alt}` (`#FFFFFF`)
- Text color: `{colors.ink}` (`#333333`)
- Font: DPSans, 13px, weight 400
- Width: 30px
- Height: 30px
- Padding: 0px
- Border: none
- Border radius: `{rounded.xs}` (4px)
- Box shadow: `rgba(0, 0, 0, 0.35) 0px 0px 4px 0px`
- Used for small icon indicators and utility badges.

### Footer

**Footer Default**
- Background: transparent
- Text color: `{colors.ink}` (`#333333`)
- Font: DPSans, 13px, weight 400
- Line height: 18.57px
- Width: 1440px (max container width)
- Padding: 0px
- Border: none
- Box shadow: none

## 5. Layout Principles

### Spacing System

**Base Unit:** 4px (`{spacing.xxs}`)

**Full Scale:**
- `{spacing.xxs}` = 4px (micro-spacing between tightly grouped elements)
- `{spacing.xs}` = 8px (tight grouping and fine padding)
- `{spacing.sm}` = 12px (compact spacing in UI elements)
- `{spacing.md}` = 20px (standard padding and margins)
- `{spacing.lg}` = 24px (comfortable breathing room)
- `{spacing.xl}` = 28px (generous padding on major containers)
- `{spacing.xxl}` = 32px (large vertical spacing between sections)
- `{spacing.xxxl}` = 36px (major layout spacing)
- `{spacing.section}` = 52px (vertical space between content sections)
- `{spacing.band}` = 72px (vertical space between full-width bands/stripes)

**Usage Context:**
- Micro (`xxs`–`sm`): Padding within buttons, badges, and form inputs.
- Standard (`md`–`lg`): Card padding, list item spacing, and default margins.
- Section (`xxxl`–`section`): Space between major content blocks on a page.
- Band (`band`): Vertical margins separating full-width hero sections and alternating backgrounds.

### Grid & Container

**Maximum Container Width:** 1170px (measured at 1280px+ viewports)

**Column Strategy:** 6 columns at desktop (1280px+), 8 columns at tablet and below. Grid provides flexible layout foundations for cards, tiles, and multi-column layouts.

**Section Padding:** 0px horizontal padding at mobile (content spans full width); padding applied via outer container margins at desktop.

### Whitespace Philosophy

The design embraces generous whitespace to enhance readability and visual focus. Section bands alternate between canvas (`{colors.canvas}`) and surface (`{colors.surface-alt}`) to define spatial zones without visual borders. Vertical rhythm is maintained through consistent use of `{spacing.section}` and `{spacing.band}` between major sections. Padding within components follows the scale (20–32px for large containers, 12–20px for compact elements), ensuring consistent optical weight and breathing room.

### Border Radius Scale

- `{rounded.none}` = 0px: Primary buttons, images, overlays, and the majority of card containers. Sharp, modern aesthetic aligned with the brand's rectilinear design language.
- `{rounded.xs}` = 4px: Filled button variants, badges, and small accent elements. Minimal rounding provides subtle softening without departing from the sharp design direction.

### Border Widths

- **Thin (1px):** Used sparingly on secondary buttons and input borders (e.g., `1px solid #F3F3F3` on secondary buttons).
- **No medium or thick borders observed** in the extracted component data; the system favors flat, borderless design with color contrast defining boundaries.

## 6. Depth & Elevation

The design system employs a **color-blocking elevation strategy** rather than progressive shadow layering. Depth is created primarily through surface color changes (canvas, surface, and accent colors) and selective application of flat, single-tier shadows.

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow | Primary buttons, cards, images, and most UI elements |
| Elevated (Dropdown) | `rgba(0, 0, 0, 0.2) 0px 7px 16px 0px` | Dropdown menus, popovers, and overlays requiring subtle lift |
| Accent Shadow (Badge) | `rgba(0, 0, 0, 0.35) 0px 0px 4px 0px` | Icon badges and small floating elements |
| Micro Shadow (Button) | `rgba(0, 0, 0, 0.2) 0px 2px 5px 0px` | Filled button variants with soft depth |
| Inset Focus | `rgba(0, 0, 0, 0.075) 0px 1px 1px inset` | Focus states on inputs and interactive elements |

**Shadow Philosophy:** The system uses minimal shadow application. The primary dropdown shadow (`rgba(0, 0, 0, 0.2) 0px 7px 16px 0px`) is the most pronounced, creating clear visual separation for floating UI. All other shadows are micro-scale, serving as gentle depth cues rather than dramatic elevation markers. This restraint aligns with the flat, modern aesthetic and prevents visual clutter across the interface.

### Opacity Levels

The extraction identified opacity values in interactive states and overlay fills:
- **20% opacity:** Used in overlay backgrounds (e.g., dark overlays on images, `rgba(0, 0, 0, 0.2)`).
- **35% opacity:** Used in badge shadows for subtle depth (`rgba(0, 0, 0, 0.35)`).
- **7.5% opacity:** Used in inset input shadows for refined focus effects (`rgba(0, 0, 0, 0.075)`).
- **Full opacity (100%):** Standard for all text, solid backgrounds, and primary UI elements.

### Z-index / Layering

| Layer | Z-index Values | Use |
|---|---|---|
| Base | 1, 2, 4, 5 | Default page content, stacked content areas |
| Sticky | 998, 999 | Sticky navigation, persistent headers, fixed UI bars |
| Toast / Modal | 999999, 2147483647 | Notifications, modals, and highest-priority overlays |

The stacking strategy is minimal and intentional: base content layers are separated by small z-index increments (1–5) to manage component stacking without creating a complex scale. Sticky elements are reserved z-index `999` for reliable fixed positioning of headers and navigation. Toast notifications and modals jump to `999999` or higher to ensure they always appear above all other content.

## 7. Do's and Don'ts

### Do
- **Use sharp corners (`{rounded.none}`)** on primary buttons, cards, and images to maintain the brand's modern, rectilinear aesthetic.
- **Apply generous spacing** between sections using `{spacing.section}` (52px) and `{spacing.band}` (72px) to maintain visual breathing room.
- **Leverage the primary blue (`{colors.primary}` — `#0095DA`)** for all primary CTAs, active states, and brand highlights; it is the visual anchor of the interface.
- **Maintain the typography hierarchy** by reserving bold weights (700) for display and headings, regular weight (400) for body, and light weight (300) for captions and utility text.
- **Alternate section backgrounds** between canvas (`#F1F1F1`) and surface (`#FFFFFF`) to define spatial zones without borders.
- **Support Persian (Farsi) typography** by using DPSans as the primary font family; include DPSansEn for numerals and English content.
- **Test responsive layouts** at the measured breakpoints (375px, 768px, 1024px, 1280px, 1440px) to ensure visual consistency.
- **Use color contrast** to define boundaries between elements; rely on color-blocking rather than borders.

### Don't
- **Do not add excessive border-radius** to interactive elements; the system uses 0px for most components and `{rounded.xs}` (4px) only for filled buttons and badges.
- **Do not invent new colors** or gradients; the palette is limited to the six extracted colors plus the orange accent (`#FF4F00`) for specific components.
- **Do not apply layered shadows** for depth; use the single-tier shadow approach (`rgba(0, 0, 0, 0.2) 0px 7px 16px 0px` for dropdowns, minimal shadows for badges).
- **Do not use serif fonts** or display typefaces; all text must use DPSans or DPSansEn.
- **Do not apply letter-spacing** outside the 0px standard; negative or positive tracking is not part of the system.
- **Do not collapse section bands** on mobile; maintain vertical rhythm and spacing even at narrow viewports.
- **Do not mix left-to-right and right-to-left text** without proper `dir="rtl"` markup; ensure Persian content flows correctly.
- **Do not create new button variants** beyond primary, secondary, and filled; if a new button style is needed, reference an existing variant and adjust only color or size.

## 8. Responsive Behavior

### Breakpoints

| Viewport | Container Width | Grid Columns | Nav Links Visible | Heading Size | Body Size | Section Padding X |
|---|---|---|---|---|---|---|
| 375px | 355px | 8 | No | 0px | 13px | 0px |
| 768px | 750px | 8 | No | 0px | 13px | 0px |
| 1024px | 970px | 8 | 120px | 16px | 13px | 0px |
| 1280px | 1170px | 6 | 120px | 16px | 13px | 0px |
| 1440px | 1170px | 6 | 120px | 16px | 13px | 0px |

**Key Transitions:**
- **375px → 768px:** Container grows from 355px to 750px; grid maintains 8 columns; no menu toggle appears.
- **768px → 1024px:** Container grows from 750px to 970px; grid remains 8 columns; nav link area expands to 120px; heading size increases to 16px.
- **1024px → 1280px:** Container grows from 970px to 1170px; grid shifts from 8 to 6 columns; heading and nav dimensions remain stable.
- **1280px → 1440px:** Container width caps at 1170px; all other dimensions remain constant; layout becomes centered with margins.

### Touch Targets

Interactive elements (buttons, links, form inputs) maintain a minimum touch target of **28–30px in height** to ensure comfortable interaction on mobile devices. Buttons are padded generously (`{spacing.md}` or `20px` on sides) to prevent accidental adjacent taps. Icon badges are 30px × 30px, meeting mobile accessibility standards.

### Collapsing Strategy

- **Typography:** Heading sizes remain 0px at 375px and 768px, enlarging to 16px at 1024px and above; body text stays 13px across all breakpoints.
- **Grid:** Columns shift from 8 at mobile/tablet to 6 at desktop (1280px+), allowing larger cards and tiles to breathe on wide screens.
- **Container:** Max width caps at 1170px; on 1440px+ the container is centered with symmetric margins.
- **Navigation:** Nav link visibility area grows from `No` (mobile/tablet) to `120px` (1024px+), indicating horizontal space reserved for navigation links.
- **Section Padding:** Horizontal padding remains 0px across all breakpoints; padding is managed via container margins and inner element padding, not by changing section padding.
- **Spacing:** Vertical spacing (section and band) remains consistent across breakpoints to preserve rhythm and section separation.

## 9. Agent Prompt Guide

### Quick Color Reference

Use these colors for their documented semantic roles:
- **Primary CTA:** Brand Accent (`{colors.primary}` — `#0095DA`) — All primary buttons, active links, and brand highlights.
- **Background (Page):** Canvas (`{colors.canvas}` — `#F1F1F1`) — Default page background and neutral section bands.
- **Background (Card/Surface):** Surface Alt (`{colors.surface-alt}` — `#FFFFFF`) — Alternating card backgrounds and content surfaces.
- **Heading Text:** Ink (`{colors.ink}` — `#333333`) — Primary headings and dominant text.
- **Body Text:** Body (`{colors.body}` — `#666666`) — Secondary body copy and descriptive text.
- **Decorative/Accent:** Neutral Base (`{colors.neutral-1}` — `#010101`) — Deep blacks in graphics; no primary semantic role assigned.
- **Orange Accent** (`#FF4F00`) — Used exclusively in filled buttons (Filled Large variant) and orange feature cards for high-visibility CTAs.

### Iteration Guide

1. **Sharp Design Language:** Buttons and primary containers use `{rounded.none}` (0px border-radius). Only filled buttons and badges use `{rounded.xs}` (4px). Never add border-radius beyond these two values.

2. **Typography Hierarchy:** Display/heading text uses DPSans weight 700 or 500; body uses weight 400; captions and utilities use weight 300. Font size follows the measured hierarchy table exactly; do not interpolate intermediate sizes.

3. **Color Blocking over Shadows:** Use section background alternation (canvas/surface) to define spatial zones. Apply shadows only for dropdowns (`rgba(0, 0, 0, 0.2) 0px 7px 16px 0px`) and small accents; most UI is flat.

4. **Spacing Scale:** Use the 10-step spacing scale (`xxs` through `band`) consistently. Default padding is `{spacing.md}` (20px); section separators are `{spacing.section}` (52px) vertically.

5. **Button Variants:** Implement primary, secondary, and filled button variants exactly as specified. Primary buttons are blue (`#0095DA`), text white, 40px tall, weight 700. Secondary buttons are white with subtle border, 49px tall, weight 300. Filled buttons are 28–30px tall with rounded corners and optional shadow.

6. **Responsive Breakpoints:** Design for 375px, 768px, 1024px, 1280px, and 1440px viewports. Grid columns: 8 at mobile/tablet, 6 at desktop. Container max-width: 1170px at 1280px+. Heading size increases to 16px at 1024px; body text remains 13px.

7. **Persian Typography:** Use DPSans for all Farsi text; include DPSansEn for numerals and English. Ensure RTL support via `dir="rtl"` markup. No letter-spacing overrides; rely on font metrics.

8. **Focus and Interaction States:** Implement focus states with `outline: -webkit-focus-ring-color auto 5px` or custom box-shadow (e.g., `rgba(102, 175, 233, 0.6) 0px 0px 8px`). Hover states adjust text decoration (underline for links) or background color (lighter gray for buttons).

9. **Z-index Management:** Keep base content z-index between 1–5. Sticky elements: z-index 998–999. Modals/toasts: z-index 999999 or 2147483647. Do not create intermediate values.

10. **Container Sizing:** Max content width is 1170px (measured at 1280px+). Section padding-x is always 0px; manage margins via container margins, not section padding. Align all content to the 6-column grid at desktop, 8-column at tablet/mobile.

## 10. Known Gaps

- **No semantic status colors found:** The extraction did not identify error, success, warning, or info colors in the site's markup. If status messaging is needed, one must be defined outside this system or the brand does not currently expose a semantic color ramp.
- **No gradients or decorative meshes:** The site uses solid color fills exclusively. No gradient or mesh overlay data was captured; background effects (glowing, neon-like) on hero images are photographic, not CSS-generated.
- **1 unassigned color:** `{colors.neutral-1}` (`#010101`) has no documented semantic role; it appears in decorative/graphical contexts only.
- **Limited interaction state data:** Hover and focus states for links and buttons were extracted from stylesheets, but disabled, loading, and error states were not observed. Active/pressed states for buttons are documented; apply with caution as the site may not ship full coverage.
- **No dark mode:** The extraction analyzed one visual theme only. A dark-mode or alternate theme was not detected or measured.
- **Single-page extraction:** This system is based on analysis of the homepage and immediate secondary sections. Surfaces behind authentication, account dashboards, or deep product pages were not visited and may expose additional component patterns or color roles.
- **Typography edge cases:** The `{typography.button}` role measured as 0px font-size and 0px line-height, indicating it is not a distinct typographic scale but rather a placeholder. Actual button text size is determined by button variant (12–15px depending on variant).
- **No border or stroke width variants:** Beyond the 1px border on secondary buttons, no multi-tier border-width scale was extracted. The system favors color contrast over visible borders.
- **Breakpoint behaviors for specific components:** The responsive table shows overall container and grid changes, but individual component collapse patterns (e.g., when cards stack, when navigation shifts to drawer) are not granularly documented; assume mobile-first stacking with grid column unwrapping at small viewports.

---

*This design system document was generated from an extraction of https://mci.ir/ and represents the visual and interactive patterns observable in the homepage and primary content sections. For implementation, reference the token IDs and specific CSS values provided throughout this document. An AI coding assistant should be able to build functional, brand-accurate UI from these specifications alone.*