# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

柴火创客学院 (Chaihuo Maker Academy) course website — Chinese-language AIoT training platform.

**生态背景：** 柴火创客学院是柴火创客生态的技术赋能平台，背靠 Seeed Studio（全球开源硬件领导者）和柴火创客空间（2011 年成立，中国创客先驱）。核心叙事——**"我们培养人掌握新技术整合能力"，不是"我们提供解决方案"。**

## Commands

```bash
pnpm install
pnpm dev       # dev server on :3001
pnpm build     # production build (server output + prerender)
pnpm preview   # preview built server on :3001
pnpm start     # run production server: HOST=0.0.0.0 PORT=3001
pnpm check     # astro check (TypeScript validation)
```

No test runner / linter / formatter is configured. `pnpm check` is the only static validation — run it before considering work done.

## Tech Stack

- **Astro 6** with `output: 'server'` + `@astrojs/node` adapter (standalone mode)
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin
- **Preline UI v4** for interactive primitives (collapse / accordion)
- **astro-icon** with the `@iconify-json/lucide` set
- **TypeScript** strict mode (`astro/tsconfigs/strict`)

## Architecture

### Two-dimensional course matrix

The product is a **M0–M5 × L1/L2/L3 matrix** — six modules (horizontal axis) × three levels (vertical axis). Every module except M0 is independently selectable; M0 is the universal prerequisite.

Modules (`src/data/modules.ts`):

| Code | Title | Subtitle | Accent |
|------|-------|----------|--------|
| M0 | 硬件基础与万物启蒙 | Hardware Foundation | red |
| M1 | 设备互联与智能管控 | Home Assistant 生态 | yellow |
| M2 | 远距无线与物联组网 | LoRa / Mesh Network | yellow |
| M3 | 视觉 AI 与边缘推理 | Edge Vision AI | yellow |
| M4 | 空间智能与交互体验 | Spatial AI Agent | yellow |
| M5 | 行业场景与交付整合 | Vertical Delivery | yellow |

Each module carries three `ModuleCell` objects (one per level) with `title`, `subtitle`, `durationDays`, `outcomes[]`. Five goal-oriented **Tracks** (`src/data/tracks.ts`) wire module sequences keyed to common learning goals: `from-basics` (M0-only entry), `smart-space` (M0→M1→M5), `field-iot` (M0→M2→M5), `edge-vision` (M0→M3→M5), `demo-to-delivery` (M5-only delivery focus).

### Partnership IA (3 × 4)

Contact page is built from `src/data/partnerships.ts`:

- **3 Scenarios** — `university` · `integrator` · `enterprise`
- **4 Forms** — `A` 标准课程授权 · `B` 联合课程共建 · `C` 企业定制内训 · `D` 战略联合交付

Each `Scenario.applicableForms` cross-links to Forms (anchor `#form-{code}`) so visitors flow Step 1 (pick scenario) → Step 2 (pick form). The contact page has no inline web form — Chaihuo partnership intake goes through QR code → external page per project convention (see `PartnershipCard.astro`).

### Data layer is TypeScript, not content collections

All structured content lives in `src/data/*.ts` — not in `src/content/`. The only remaining Astro content collection is `partners` (homepage logo grid). `src/content.config.ts` declares just that one schema (loaded via the `glob` loader from `astro/loaders`, per Astro 6's removal of legacy content collections). Previous `courses` / `classic-courses` / `testimonials` collections were removed when the matrix replaced the old five-course flat structure — do **not** reintroduce them.

### Dynamic module pages

`src/pages/courses/[slug].astro` has `export const prerender = true` and builds the 6 static pages from `modules` via `getStaticPaths`. Build output includes `/courses/m0..m5/index.html`.

### Reusable components

Composite components built on top of a small base set:

- `SectionHeader`, `LevelBadge` — base
- `ModuleCard`, `ModuleOneLiner`, `CourseMatrix`, `TrackFlow` — module-domain
- `ScenarioCard`, `PartnershipCard` — partnership-domain
- `HeroBanner` — page-level hero (used by homepage)
- `Navbar`, `Footer` — chrome

There is no `src/components/ui/` primitive folder anymore — the old `Card.astro` and `HeroBackground.astro` were removed in the matrix refactor.

#### Page sections (introduced by 2026 redesign)

- Home sections: `HomeFamiliarObjects`, `HomeMapPreview`, `HomeGoalPaths`, `HomeOutcomes`, `PartnerLogoGrid`
- Courses sections: `CourseAxisLegend`, `CourseMatrixSection`, `LearningTracksSection`, `CourseModulesExplorer`
- Module-detail sections: `CourseDetailHero`, `CourseDetailPanels`, `CourseLearningLadder`, `CourseDeliverables`, `CourseAudienceSection`, `CourseRelatedTracks`
- Contact sections: `ContactScenariosSection`, `ContactFormsSection`, `ContactFaqSection`
- About sections: `AboutEcosystemSection`, `AboutValuesSection`, `AboutStatsSection`

## Styling System

### Source of truth

**`docs/design-system/MASTER.md`** is the authoritative visual spec. `docs/design-system/QUICK-REFERENCE.md` is the dev-speed cheatsheet. When a styling judgment call is ambiguous, read MASTER.md before improvising — this codebase has been bitten by drift toward brutalist / sticker aesthetics that the spec explicitly rules out.

**Brand tone:** 专业、清晰、实战、可信赖、**温暖而不花哨**。 No offset hard shadows, no 2px black borders on everything, no decorative geometric blocks in heroes.

### Color ratio: 黄 45% / 白 30% / 黑 15% / 红 5%（+ 其他 5%）

Per MASTER.md v2.2 — **饱和黄是主色面，不是点缀**。 Saturated yellow `#f3d230` is a main color surface, not a 15% accent. Caveat: large full-width heroes use soft yellow `#fef9e7` / mid yellow `#fde68a`; reserve saturated `#f3d230` for medium-area accents (module cards, buttons, section flags, ≤8rem strips). Every landing page (`/`, `/courses`, `/contact`) must show one saturated-yellow surface + one inverted-black surface.

Card backgrounds follow the spec's three categories:
- `bg-brand-yellow-light` (#fef9e7) — standard content card
- `bg-brand-red-light` (#fdeaea) — emphasis / recommended card
- `bg-gray-50` — neutral / alternate section

Buttons: Primary = red fill white text; Secondary = yellow fill black text; Ghost = gray-300 border white bg.

### Theme tokens

Declared in `src/styles/themes/theme.css` inside `@theme` — Tailwind v4 auto-generates `bg-*` / `text-*` / `border-*` utilities for every `--color-*` token. Custom utilities (`.section-flag`, `.card-hairline`, `.module-tile`, `.level-badge`, `.focus-ring`, `.highlight`) live in the same file under `@layer utilities`.

### Icons

Every lucide icon used anywhere in the codebase **must** be declared in `astro.config.mjs` under `icon({ include: { lucide: [...] } })`. Missing icons fail at the prerender step of `pnpm build` with `Unable to locate "lucide:xxx" icon!`. When adding a new icon, update the list there first.

## Preline Integration

Initialized once in `src/layouts/Layout.astro`:

```ts
import 'preline/preline';
document.addEventListener('astro:page-load', () => {
  window.HSStaticMethods?.autoInit();
});
```

The `astro:page-load` listener is required because Astro's view transitions swap DOM between navigations. Preline components use `hs-*` classes and `data-hs-*` attributes (e.g., `hs-collapse-toggle`, `data-hs-collapse`, `hs-accordion`).

## TS Path Aliases

From `tsconfig.json`:

```
~/components/*  → src/components/*
~/layouts/*     → src/layouts/*
~/data          → src/data/index.ts
~/data/*        → src/data/*
~/styles/*      → src/styles/*
```

Existing pages and components still use relative imports (`../../data/modules`); both work. When creating new files, either convention is acceptable — stay consistent within a file.

## Gotchas

- **Chinese quotation marks `""`** inside `.astro` frontmatter or inline JS expressions must use template literals or escaping — raw double-quote strings break the parser. Component scripts and data files are fine with them as plain string literals.
- **Preline + Astro view transitions** — always re-init inside `astro:page-load`, never in a top-level `DOMContentLoaded`.
- **`astro-icon` registration** — new lucide icons go in `src/data/icons.ts` (`LUCIDE_ICONS` array). This is the single source of truth: it feeds both `IconName` (the TS type) and `astro.config.mjs`'s `icon({ include: { lucide: [...] } })`. Don't edit `astro.config.mjs` directly.
- **`output: 'server'`** — static prerender is opt-in per-page via `export const prerender = true`. The 6 `/courses/m0..m5` pages are prerendered; everything else runs as server routes.
- **M-module prerequisite rule** — M0 is recommended as the universal entry point; M1–M5 are independent after that. The 5 goal-oriented tracks in `src/data/tracks.ts` no longer all follow `M0 → … → M5` — `from-basics` is M0-only and `demo-to-delivery` is M5-only. Use `goal` and `tagline` on each Track to surface the intent.
- **Design system is prescriptive** — stick to the 3 card variants, 3 button variants, brand-color utilities, and `rounded-2xl` (16px) / `rounded-lg` (8px) radii from MASTER.md. Avoid inventing new visual tokens.

## Design source-of-truth

The 2026 redesign was implemented per `docs/superpowers/specs/2026-05-28-site-redesign-design.md` (spec) and `docs/superpowers/plans/2026-05-28-site-redesign-implementation.md` (14-task implementation plan). Both files are gitignored but committed with `git add -f`.
