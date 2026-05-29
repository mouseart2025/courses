# Astro / TypeScript Conventions

## Props pattern

```astro
---
interface Props {
  title: string;
  description?: string;
}
const { title, description = 'Default' } = Astro.props as Props;
---
```

Cast `Astro.props as Props` when TypeScript flags the interface as unused.

## Conditional classes — use `class:list`

```astro
<a
  class:list={[
    'base text-sm',
    isActive ? 'text-brand-red' : 'text-gray-600',
  ]}
>
```

## Path aliases (from `tsconfig.json`)

```
~/components/*  → src/components/*
~/layouts/*     → src/layouts/*
~/data          → src/data/index.ts
~/data/*        → src/data/*
~/styles/*      → src/styles/*
```

Existing files mostly use relative imports. Either convention is fine —
match the surrounding file.

## Static prerender

```ts
export const prerender = true;
export async function getStaticPaths() {
  return modules.map((m) => ({ params: { slug: m.slug }, props: { module: m } }));
}
```

Applied to `/courses/[slug]` and `/llms.txt`. Everything else is SSR via
`output: 'server'`.

## `<head>` extras — use the named slot

`Layout.astro` exposes `<slot name="head" />` right before `</head>`. Pages
inject JSON-LD or extra meta with `<Fragment slot="head">` (or any element
with `slot="head"`):

```astro
<Layout title={...}>
  <script
    slot="head"
    type="application/ld+json"
    is:inline
    set:html={jsonLdSafe}
  />
  ...
</Layout>
```

When emitting JSON-LD via `set:html`, escape `<` to its unicode form so a
stray `</script>` in any data field cannot break out of the tag:

```ts
const jsonLdSafe = JSON.stringify(jsonLd).replace(/</g, '\\u003c');
```

## Lucide icons — register before use

```astro
<Icon name="lucide:arrow-right" class="w-4 h-4" />
```

Every icon must appear in `src/data/icons.ts`'s `LUCIDE_ICONS` array.
`pnpm dev` silently renders empty when an icon is missing; `pnpm build`
fails at the prerender step with `Unable to locate "lucide:xxx" icon!`.
`astro.config.mjs` reads from that single source — don't edit the config
directly when adding icons.

## Preline UI

Initialized once in `Layout.astro` inside the `astro:page-load` handler
(never `DOMContentLoaded` — Astro's ClientRouter swaps DOM between
navigations).

- Wrap collapsibles with `hs-accordion` / `hs-collapse`
- Toggle buttons need `hs-collapse-toggle` class + `data-hs-collapse="#id"`
- Active variants: `hs-accordion-active:*`, `hs-collapse-open:*`
- Never call `HSStaticMethods.autoInit()` yourself

## Accessibility defaults

- Every image needs `alt` (`alt=""` for decorative)
- Interactive elements need `aria-label` or visible text
- Collapsibles need `aria-expanded` / `aria-controls`
- Active nav needs `aria-current="page"`
- Use the `.focus-ring` utility for focus-visible outlines (red 2px with
  white offset)

## Naming

- Files: `PascalCase.astro` for components, `camelCase.ts` for data /
  utilities
- Variables: camelCase
- CSS classes: kebab-case
- Types / Interfaces: PascalCase with semantic names (`Module`,
  `ModuleCell`, `Track`, `PartnershipForm`)
