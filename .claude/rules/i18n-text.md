# Chinese Text Handling

## Quote escaping

Chinese full-width quotes `""` `''` inside `.astro` frontmatter or inline
JS expressions can trip the parser. Use template literals or escape:

```ts
// ✅ safe — template literal
const title = `获得柴火官方认证证书，并进入"柴火人才库"`;

// ❌ can break depending on surrounding context
const title = "获得"柴火人才库"";
```

Plain string literals in `.ts` data files (e.g. `src/data/modules.ts`) are
fine — the constraint is specifically `.astro` frontmatter and inline JS
expressions inside `.astro` templates.

## Punctuation

- Use Chinese punctuation (，。：、！？) for Chinese content.
- Use half-width punctuation only for code, numbers, or mixed-English
  contexts.
- Em-dash: `——` in Chinese, `—` in English.
- Mid-dot for list/series: ` · ` (with surrounding spaces).

## Brand naming (be consistent)

| Surface | Use |
|---|---|
| Chrome (Navbar / Footer / `<title>`) | 柴火创客学院 |
| Formal copy (about, hero subtitles, llms.txt heading) | 柴火创客 OPC 学院 |
| Ecosystem reference | 柴火创客生态（Seeed Studio + 柴火创客空间） |

## Core narrative

> 我们培养人掌握新技术整合能力，不是提供解决方案。

Keep this framing across hero, about, partnership, and llms.txt copy.
Avoid "我们提供 XXX 方案" phrasing — that contradicts the brand position.
