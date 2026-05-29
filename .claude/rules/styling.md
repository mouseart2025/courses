# Styling

Self-contained visual rules. The brand voice is **专业、清晰、实战、可信赖、
温暖而不花哨**. The repo has drifted toward brutalist / sticker aesthetics
once and was reverted — these rules exist to prevent that recurrence.

## Color ratio (hard rule)

**黄 45% · 白 30% · 黑 15% · 红 5%（+ 其他 5%）**

- Saturated yellow `#f3d230` is a **main color surface**, not an accent.
- Every landing page (`/`, `/courses`, `/contact`) must show one
  saturated-yellow surface **plus** one inverted-black surface.
- Wide full-width heroes use soft yellow `#fef9e7` or mid yellow `#fde68a`
  — reserve saturated `#f3d230` for medium-area surfaces (module cards,
  buttons, section flags, strips ≤ 8rem).
- Red stays ≤ 5%. **Never** fill a wide section with `bg-brand-red`.

## Brand color tokens

Defined in `src/styles/themes/theme.css` under `@theme`. Tailwind v4
auto-generates `bg-*` / `text-*` / `border-*` utilities for every
`--color-*` token.

| Purpose | Token | Hex | Tailwind |
|---|---|---|---|
| CTA red | `--color-brand-red` | `#d84144` | `bg-brand-red` |
| Red hover | `--color-brand-red-hover` | `#c13538` | `hover:bg-brand-red-hover` |
| Red tint (card bg) | `--color-brand-red-light` | `#fdeaea` | `bg-brand-red-light` |
| Primary yellow | `--color-brand-yellow` | `#f3d230` | `bg-brand-yellow` |
| Yellow tint (card bg) | `--color-brand-yellow-light` | `#fef9e7` | `bg-brand-yellow-light` |
| Yellow mid (hero) | — | `#fde68a` | `bg-amber-200` (when needed) |
| Yellow dark (text on tint) | `--color-brand-yellow-dark` | `#b8960a` | `text-brand-yellow-dark` |
| Primary text | `--color-brand-black` | `#1a1a1a` | `text-brand-black` |

Don't invent new color tokens outside the `@theme` block.

## Card variants (3 only)

| Variant | Background | Use for |
|---|---|---|
| Standard | `bg-brand-yellow-light` | Default content card |
| Emphasis | `bg-brand-red-light` | Recommended / highlighted card |
| Neutral | `bg-gray-50` | Alternate-section card |

Pair with `card-hairline` for the 1px gray border + soft hover shadow.

## Button variants (3 only)

| Variant | Style |
|---|---|
| Primary | Red fill, white text (`bg-brand-red text-white hover:bg-brand-red-hover`) |
| Secondary | Yellow fill, black text (`bg-brand-yellow text-brand-black`) |
| Ghost | White bg, gray-300 border (`bg-white border border-gray-300`) |

## Radii (2 only)

- `rounded-2xl` (16px) — cards, large surfaces
- `rounded-lg` (8px) — buttons, small chips

Don't invent new radii.

## Custom utilities (`theme.css` `@layer utilities`)

| Class | Purpose |
|---|---|
| `.section-flag` | Red 3px vertical bar prefix for section headings |
| `.card-hairline` | 1px gray border + soft hover shadow (baseline card) |
| `.module-tile` | M-code badge; pair with `--red` / `--yellow` / `--dark` variant + optional `--sm` / `--lg` size |
| `.level-badge` | L1/L2/L3 pill; pair with `--l1` / `--l2` / `--l3` |
| `.focus-ring` | Focus-visible outline (red 2px with white offset) |
| `.highlight` | Marker-style yellow underline background |

## Banned patterns

- 2px black borders on everything (brutalist)
- Offset hard shadows (sticker aesthetic)
- Decorative geometric blocks in heroes
- Wide red fills (`bg-brand-red` covering a full section)
- New ad-hoc color values or radii outside the token system
- Pure-white card backgrounds without a `card-hairline` (looks like
  unstyled HTML)
