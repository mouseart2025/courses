# AGENTS.md — AI Collaboration Guide

Code-style and patterns guide for AI agents working on 柴火创客 OPC 学院 (Chaihuo Maker Academy OPC Academy). For project architecture and command reference, read [CLAUDE.md](./CLAUDE.md) first; for visual design rules, read [docs/design-system/MASTER.md](./docs/design-system/MASTER.md). This file focuses on *how to write code* inside the conventions established there.

## Commands (quick reference)

```bash
pnpm install
pnpm dev       # :3001
pnpm check     # TypeScript validation — the only static check
pnpm build     # server output with prerendered /courses/m0..m5
```

No linter, no formatter, no test runner. `pnpm check` must pass before work is considered done.

## Project Structure

```
src/
├── components/          # Reusable Astro components
│   ├── Navbar.astro          # Site chrome
│   ├── Footer.astro
│   ├── HeroBanner.astro      # Page-level hero
│   ├── SectionHeader.astro   # Section title + eyebrow + subtitle
│   ├── LevelBadge.astro      # L1/L2/L3 pill
│   ├── ModuleCard.astro      # M-module card (white bg + tinted tile)
│   ├── ModuleOneLiner.astro  # Horizontal module row
│   ├── CourseMatrix.astro    # 6×3 table (M0–M5 × L1/L2/L3)
│   ├── TrackFlow.astro       # Track chip sequences
│   ├── ScenarioCard.astro    # Partnership scenarios
│   └── PartnershipCard.astro # Partnership forms A/B/C/D
├── layouts/
│   └── Layout.astro          # Shell + Preline init + Google Fonts
├── pages/
│   ├── index.astro           # Homepage
│   ├── paths.astro           # 选课指南 / course-combination guide
│   ├── about.astro
│   ├── contact.astro         # 3 scenarios × 4 forms
│   └── courses/
│       ├── index.astro       # Course modules + matrix overview
│       └── [slug].astro      # prerendered: m0, m1, …, m5
├── data/                     # TypeScript data (not content collections)
│   ├── modules.ts            # M0–M5 × L1/L2/L3 matrix
│   ├── tracks.ts             # 6 goal-oriented course combinations
│   └── partnerships.ts       # 3 scenarios + 4 partnership forms
├── content/
│   ├── config.ts             # Only 'partners' collection remains
│   └── partners/             # Logo grid for homepage
└── styles/
    ├── global.css            # Tailwind + Preline imports
    └── themes/theme.css      # Brand tokens + custom utilities
```

## TypeScript

- Strict mode (extends `astro/tsconfigs/strict`)
- Prefer `interface` over `type` for object shapes
- Define component `Props` interface in the Astro frontmatter; cast with `Astro.props as Props` when TypeScript flags the interface as unused

## Path Aliases

From `tsconfig.json`:

```
~/components/*  → src/components/*
~/layouts/*     → src/layouts/*
~/data          → src/data/index.ts
~/data/*        → src/data/*
~/styles/*      → src/styles/*
```

Existing files mostly use relative imports (e.g. `../../data/modules`). Either convention is fine — match the surrounding file.

## Astro Component Conventions

### Props pattern

```astro
---
interface Props {
  title: string;
  description?: string;
}
const { title, description = 'Default' } = Astro.props as Props;
---
```

### Conditional classes — use `class:list`

```astro
<a class:list={[
  'base text-sm',
  isActive ? 'text-brand-red' : 'text-gray-600',
]}>
```

### Accessibility defaults

- Every image needs `alt` (`alt=""` for decorative)
- Interactive elements need `aria-label` or visible text
- Collapsibles need `aria-expanded` / `aria-controls`
- Active nav needs `aria-current="page"`
- Use `.focus-ring` utility for focus-visible outlines (red 2px with white offset)

### Static prerender

For pages that should prerender at build time (currently only module detail):

```ts
export const prerender = true;
export async function getStaticPaths() {
  return modules.map((m) => ({ params: { slug: m.slug }, props: { module: m } }));
}
```

## Naming Conventions

- **Files**: `PascalCase.astro` for components, `camelCase.ts` for data / utilities
- **Variables**: camelCase (JS/TS)
- **CSS classes**: kebab-case
- **Types / Interfaces**: PascalCase with semantic names (`Module`, `ModuleCell`, `Track`, `PartnershipForm`)

## Chinese Text Handling

Chinese full-width quotes `""` `''` inside `.astro` frontmatter or inline JS expressions can trip the parser. Use template literals or escape:

```ts
// ✅ safe
const title = `获得柴火官方认证证书，并进入"柴火人才库"`;

// ❌ can break depending on context
const title = "获得"柴火人才库"";
```

Use Chinese punctuation (，。：、) for Chinese content; half-width punctuation only for code, numbers, or mixed English.

## Brand Colors

Defined as `--color-*` tokens in `@theme`; Tailwind v4 auto-generates `bg-*` / `text-*` / `border-*` utilities.

| Purpose | Variable | Hex | Tailwind |
|---------|----------|-----|----------|
| CTA red | `--color-brand-red` | `#d84144` | `bg-brand-red` |
| Red hover | `--color-brand-red-hover` | `#c13538` | `hover:bg-brand-red-hover` |
| Red tint (card bg) | `--color-brand-red-light` | `#fdeaea` | `bg-brand-red-light` |
| Primary yellow | `--color-brand-yellow` | `#f3d230` | `bg-brand-yellow` |
| Yellow tint (card bg) | `--color-brand-yellow-light` | `#fef9e7` | `bg-brand-yellow-light` |
| Yellow dark (text on tint) | `--color-brand-yellow-dark` | `#b8960a` | `text-brand-yellow-dark` |
| Primary text | `--color-brand-black` | `#1a1a1a` | `text-brand-black` |

**Color ratio — hard rule (per MASTER.md v2.2):** Yellow 45% · White 30% · Black 15% · Red 5% (+ other 5%). Saturated yellow is a *main color surface*, not an accent — every landing page must show one saturated-yellow surface **plus** one inverted-black surface. Caveat: full-width heroes use soft yellow `#fef9e7` / mid yellow `#fde68a`, not saturated `#f3d230` (which carries module cards, buttons, section flags, ≤8rem strips). Red stays ≤5%; never fill a wide section with `bg-brand-red`.

## Custom utilities (theme.css)

These are the custom classes you'll actually use in components:

- `.section-flag` — red 3px vertical bar prefix for section headings
- `.card-hairline` — 1px gray border + soft hover shadow (the baseline card)
- `.module-tile` — M-code badge; pair with `--red` / `--yellow` / `--dark` variant + optional `--sm` / `--lg` size
- `.level-badge` — L1/L2/L3 pill; pair with `--l1` / `--l2` / `--l3`
- `.focus-ring` — focus-visible outline
- `.highlight` — marker-style yellow underline background

## Preline UI

Initialized once in `Layout.astro`. When you add new Preline components:

- Wrap collapsibles with `hs-accordion` / `hs-collapse`
- Toggle buttons need `hs-collapse-toggle` class and `data-hs-collapse="#target-id"`
- Active state variants: `hs-accordion-active:*`, `hs-collapse-open:*`
- Never call `HSStaticMethods.autoInit()` yourself — `Layout.astro` does it inside the `astro:page-load` handler already

## Common patterns

### Fetch from the one remaining content collection

```astro
---
import { getCollection } from 'astro:content';
const partners = await getCollection('partners');
partners.sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
---
```

### Iterate modules / tracks / partnerships

```astro
---
import { modules, levels, levelMeta } from '../data/modules';
import { tracks, getTracksForModule } from '../data/tracks';
import { scenarios, partnershipForms, getFormsForScenario } from '../data/partnerships';
---
```

### Astro Icon — every icon must be pre-registered

```astro
<Icon name="lucide:arrow-right" class="w-4 h-4" />
```

If the icon is not listed in `src/data/icons.ts`'s `LUCIDE_ICONS` array, `pnpm dev` silently renders empty and `pnpm build` fails at prerender with `Unable to locate "lucide:xxx" icon!`. Add new icons there before using them; `astro.config.mjs` reads from that single source.

## Gotchas

1. **Chinese quotes** — template-literal in Astro frontmatter
2. **Preline view transitions** — re-init happens via `astro:page-load`, not `DOMContentLoaded`
3. **Icon registration** — update `src/data/icons.ts` when introducing new lucide icons
4. **Server output + per-page prerender** — only `courses/[slug]` is prerendered; other pages are SSR
5. **Module combination rule** — M0 is recommended as the common entry; M1–M5 are independently readable after that; M5 is the delivery capstone. Course combinations in `tracks.ts` do not always open with M0 or close with M5 (`from-basics` is M0-only, `demo-to-delivery` is M5-only)
6. **Design drift** — resist adding brutalist touches (2px black borders, offset hard shadows, large colored fill blocks, decorative geometry). Spec in `docs/design-system/MASTER.md` rules them out; the repo has regressed toward them once already and was reverted
