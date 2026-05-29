# LLM-facing surfaces (`/llms.txt` + Course JSON-LD)

Two surfaces exist specifically for AI consumers:

- External crawlers — ChatGPT / Claude / Perplexity / 豆包 / Kimi when they
  index the site for AI search / recommendation.
- Future embedded chat bots ingesting the site as a knowledge source
  (Coze / Dify / etc.).

## Mapping

| Surface | Source file | Pulled from | Auto-syncs when |
|---|---|---|---|
| `/llms.txt` | `src/pages/llms.txt.ts` (prerendered) | `modules.ts` + `tracks.ts` + `partnerships.ts` + `levelMeta` | Any field change in those data files |
| `Course` JSON-LD in `/courses/m0..m5` `<head>` | `src/pages/courses/[slug].astro` | `Module` object (incl. `cells`, `capabilities`, `audience`) | Any module field change |

## Content edit rule

If you only change values in `src/data/*.ts` (title, oneLiner, outcomes,
durationDays, audience, etc.) → both surfaces auto-sync on next
`pnpm build`. **Do not** hand-edit `llms.txt.ts` or the JSON-LD
construction.

## When you DO edit the endpoint / JSON-LD code

- A new top-level data file appears (e.g. a new partnership taxonomy) → add
  a section to `llms.txt.ts`.
- A new field on `Module` / `Track` / etc. should be surfaced to AI →
  extend the relevant builder.
- The site URL changes → update `FALLBACK_SITE` in `llms.txt.ts` and the
  inline default in `src/pages/courses/[slug].astro` (both currently
  `https://opc.chaihuo.org`).
- New routes appear that AI should know about → add under `## Optional` in
  `llms.txt.ts`.

## Hard avoids

- No `llms-full.txt` — site is small enough that one `/llms.txt` is
  sufficient; fragmenting only duplicates maintenance.
- No `hasCourseInstance` with fake schedule/price data — Course JSON-LD
  should only ship structured facts we can stand behind.
- No docs-platform layer (Mintlify / Fern) — this is a marketing site, not
  a docs site.
- No per-page `.md` mirror files — site is too small to justify it.

## Verification after content change

```bash
pnpm build
head -30 dist/client/llms.txt
grep -l 'application/ld+json' dist/client/courses/m0/index.html
```

The first should show the updated content; the second should print the
file path (proving the JSON-LD script tag is present).
