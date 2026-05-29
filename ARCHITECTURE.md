# OPC Academy Architecture Map

A small Chinese-language marketing site for 柴火创客 OPC 学院 (Chaihuo Maker
Academy OPC Academy). Built on Astro 6 with a strict TypeScript data layer
driving every page.

**Ecosystem context** — OPC Academy is the technical-enablement arm of the
柴火创客 ecosystem (Seeed Studio + 柴火创客空间, founded 2011). Core
positioning: **培养人掌握新技术整合能力**, not "提供解决方案".

## System Surfaces

- `src/pages/` — route entrypoints. Mostly SSR (per `output: 'server'`), with
  `/courses/[slug]` and `/llms.txt` prerendered.
- `src/components/` — reusable Astro components (chrome + composite cards).
- `src/components/sections/` — page-level sections introduced in the 2026
  redesign (home, paths, courses, courses/[slug], contact, about).
- `src/layouts/Layout.astro` — HTML shell + Preline init + Google Fonts +
  `<slot name="head" />` for per-page extras (JSON-LD, extra meta).
- `src/data/*.ts` — typed data layer; **single source of truth for all
  marketing content**.
- `src/content/partners/` — only remaining Astro content collection
  (homepage logo grid). `src/content.config.ts` declares its schema via the
  `glob` loader per Astro 6.
- `src/styles/` — Tailwind v4 + brand tokens (`themes/theme.css`).

## Course Matrix (Two-Dimensional)

The product is an **M0–M5 × L1/L2/L3** matrix:

- **Horizontal**: 6 modules
  - M0 硬件基础与万物启蒙 — universal prerequisite
  - M1 设备互联与智能管控 — Home Assistant 生态
  - M2 远距无线与物联组网 — LoRa / Mesh
  - M3 视觉 AI 与边缘推理 — Edge Vision AI
  - M4 空间智能与交互体验 — Spatial AI Agent
  - M5 行业场景与交付整合 — Vertical Delivery
- **Vertical**: 3 learning depths — L1 跑通 / L2 独立小项目 / L3 可交付能力
- **6 goal-oriented course combinations** (`src/data/tracks.ts`):
  `from-basics` (M0-only), `smart-space` (M0→M1→M5),
  `field-iot` (M0→M2→M5), `edge-vision` (M0→M3→M5),
  `spatial-agent` (M0→M4→M5), `demo-to-delivery` (M5-only).

M0 is the recommended entry; M1–M5 are independently readable. Tracks no
longer all follow `M0 → … → M5`.

## Partnership IA (3 × 4)

`src/data/partnerships.ts`:

- **3 scenarios**: `university` / `integrator` / `enterprise`
- **4 forms**: `A` 标准课程授权 · `B` 联合课程共建 · `C` 企业定制内训 ·
  `D` 战略联合交付
- Each scenario cross-links to applicable forms via `applicableForms`
  (anchor `#form-{code}` on `/contact`).
- Intake is **QR code → external page** per project convention. No inline
  web forms anywhere.

## Data Flow

Edits flow in exactly one direction:

```
src/data/{modules,tracks,partnerships,site,icons}.ts   (source of truth)
        │
        ├──► src/pages/courses/[slug].astro      (prerendered HTML + Course JSON-LD)
        ├──► src/pages/courses/index.astro       (SSR overview)
        ├──► src/pages/paths.astro               (SSR — track flow)
        ├──► src/pages/contact.astro             (SSR — 3 × 4 partnership grid)
        ├──► src/pages/index.astro               (SSR homepage)
        ├──► src/pages/about.astro               (SSR)
        └──► src/pages/llms.txt.ts               (prerendered AI surface)
```

`/llms.txt` and per-module Course JSON-LD auto-sync from this data layer.
Operational rules live in `.claude/rules/llm-surfaces.md`.

## Prerender Boundary

`output: 'server'` with `@astrojs/node` standalone adapter. Static prerender
is opt-in per page (`export const prerender = true`):

| Route | Mode | Build artifact |
|---|---|---|
| `/courses/m0..m5` | Prerendered | `dist/client/courses/m*/index.html` |
| `/llms.txt` | Prerendered | `dist/client/llms.txt` |
| `/` `/courses` `/paths` `/contact` `/about` `/404` | SSR | server entrypoint |

## Tech Stack

- Astro 6 + `@astrojs/node` (standalone)
- Tailwind CSS v4 via `@tailwindcss/vite`
- Preline UI v4 (collapse / accordion only)
- `astro-icon` + `@iconify-json/lucide`
- TypeScript strict (`astro/tsconfigs/strict`)

## TypeScript Path Aliases

```
~/components/*  → src/components/*
~/layouts/*     → src/layouts/*
~/data          → src/data/index.ts
~/data/*        → src/data/*
~/styles/*      → src/styles/*
```

Existing files mostly use relative imports. Either convention is fine —
match the surrounding file.

## Pointers

- Astro / TS conventions: `.claude/rules/astro.md`
- Content edits: `.claude/rules/data-layer.md`
- AI-facing surfaces: `.claude/rules/llm-surfaces.md`
- Visual rules: `.claude/rules/styling.md`
- Chinese text rules: `.claude/rules/i18n-text.md`
