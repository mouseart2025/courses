# AI Collaboration Rules

Repository entry point for coding agents (Claude Code, Codex, Gemini CLI).
Read this first; descend into `ARCHITECTURE.md` and `.claude/rules/*.md` as
work demands. This file is mirrored verbatim from `AGENTS.md` — keep them in
sync when editing.

## Scope

- Project is 柴火创客 OPC 学院 (Chaihuo Maker Academy) — a Chinese-language
  marketing / 招生 / 招商 site. **Not** a docs platform, **not** a CMS-backed
  blog.
- Source-of-truth files in this repo: `ARCHITECTURE.md` (repo map),
  `.claude/rules/*.md` (topical rules). Everything under `docs/` is local
  working material and is intentionally gitignored.

## Do

- Read `ARCHITECTURE.md` before any change that crosses the data layer
  (`src/data/*.ts`) and the page layer (`src/pages/`).
- Edit marketing copy by changing `src/data/*.ts` only — `/llms.txt` and
  Course JSON-LD auto-sync on next `pnpm build`. See
  `.claude/rules/llm-surfaces.md`.
- Follow `docs/DESIGN.md` (authoritative design system) for the
  黄 ≤3% / 白 ~52% / 黑 ~15% / 灰 ~25% / 红 ≤5% color ratio, the panel
  system, and button/card usage. `.claude/rules/styling.md` only points to it.
- Register new lucide icons in `src/data/icons.ts` before referencing them.
  See `.claude/rules/astro.md`.
- Use template literals when Chinese full-width quotes appear in `.astro`
  frontmatter or inline JS. See `.claude/rules/i18n-text.md`.

## Avoid

- Do not introduce a CMS, docs platform (Mintlify / Fern), or fetch course
  content from anywhere other than `src/data/*.ts`.
- Do not reintroduce removed Astro content collections (`courses`,
  `classic-courses`, `testimonials`) — they were retired with the M-matrix
  refactor.
- Do not hand-write `llms-full.txt` or add fake `hasCourseInstance`
  schedule/price data to the Course JSON-LD.
- Do not add brutalist visual touches (2px black borders, offset hard
  shadows, decorative geometry, wide red fills). The repo has drifted toward
  them once and was reverted.
- Do not commit AI process artifacts (`docs/` except `docs/DESIGN.md`,
  `.claude/` except `.claude/rules/`, `.superpowers/`). They are gitignored
  intentionally. `docs/DESIGN.md` is the one committed design-system doc.
- Do not put inline web forms anywhere — partnership intake is QR → external
  page, per project convention.

## Commands

```bash
pnpm install
pnpm dev       # :3001
pnpm check     # astro check — TypeScript / Astro validation
pnpm lint      # biome check src — TS/JS/JSON lint + format check
pnpm format    # biome format --write src
pnpm build     # server output + prerendered /courses/m0..m5 + /llms.txt
```

Design system: `docs/DESIGN.md` is authoritative; `/styleguide` renders all
tokens + components (run `pnpm dev`, open `/styleguide`).

## Tests

- No test runner exists. `pnpm check` (TypeScript) and `pnpm lint` (Biome)
  must pass before considering work done.
- After content edits, also run `pnpm build` and verify
  `dist/client/llms.txt` reflects the change and one
  `dist/client/courses/m*/index.html` still contains `application/ld+json`.

## Related Rules

- `ARCHITECTURE.md` — repo map, data flow, prerender split
- `.claude/rules/astro.md` — Astro conventions: props, prerender, head slot,
  Preline, icons, path aliases
- `.claude/rules/data-layer.md` — editing `src/data/*.ts`
- `.claude/rules/llm-surfaces.md` — `/llms.txt` + Course JSON-LD operational
  rules
- `docs/DESIGN.md` — **authoritative design system**: color tokens, ratio,
  panel/card/button usage, composition patterns, component shelf, motion,
  banned patterns
- `.claude/rules/styling.md` — thin pointer to `docs/DESIGN.md`
- `.claude/rules/i18n-text.md` — Chinese quote handling and punctuation
