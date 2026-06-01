# Content Data Layer

All marketing content lives in `src/data/*.ts`. There is no CMS, no
markdown content collection for course/track/partnership data, no remote
fetch. Architecture / data flow: see `ARCHITECTURE.md`.

## Files

| File | Owns |
|---|---|
| `src/data/modules.ts` | M0–M5 modules + L1/L2/L3 cells per module |
| `src/data/tracks.ts` | 3 goal-oriented course directions |
| `src/data/partnerships.ts` | 3 scenarios + 4 sales-form kits (3 × 4 IA) |
| `src/data/site.ts` | Hero / CTA / about / FAQ copy, ecosystem cards, homepage strips |
| `src/data/icons.ts` | Lucide icon registry (single source for `astro-icon`) |
| `src/data/index.ts` | Barrel re-export |

## Iteration patterns

```astro
---
import { modules, levels, levelMeta } from '../data/modules';
import { tracks, getTracksForModule } from '../data/tracks';
import {
  scenarios,
  partnershipForms,
  getFormsForScenario,
  getScenariosForForm,
} from '../data/partnerships';
---
```

## Editing rules

- **Module combination rule** — M0 is the zero-base flagship entry; M1–M5
  are five independently readable industry directions. M0 is layered A/B/C
  by hardware platform (mapped onto the L1/L2/L3 rows); M5's L3 is 开发中
  (`durationDays: 0`). Tracks are 3 goal directions (`make-with-ai` M0,
  `build-ai-products` M2·M4, `solutions` M1·M3·M5) — they group by goal, not
  a fixed `M0 → … → M5` sequence. Use `goal` and `tagline` on each Track to
  surface intent.
- **Bidirectional cross-references** — scenario `applicableForms` ↔ form
  `suitableScenarios` are mirrored. Keep them consistent when editing
  either side.
- **Don't reintroduce removed collections** — `courses` /
  `classic-courses` / `testimonials` content collections were retired with
  the matrix refactor. The only Astro content collection that remains is
  `partners` (homepage logo grid).
- **No inline forms** — partnership intake is QR → external page. Don't
  add `<form>` elements or contact-form components.

## Side effects when editing

Edits to `modules.ts` / `tracks.ts` / `partnerships.ts` also propagate to:

- `/llms.txt` (auto-regenerated on `pnpm build`)
- Course JSON-LD on `/courses/m0..m5` `<head>`

See `.claude/rules/llm-surfaces.md` for the full mapping and the rule on
when to hand-edit the endpoint vs. let it auto-sync.

## Verification

```bash
pnpm check          # TypeScript validation
pnpm build          # confirms prerender + llms.txt regeneration
```
