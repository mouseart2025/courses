# Styling

**设计系统的唯一权威是 [`docs/DESIGN.md`](../../docs/DESIGN.md)。**

那里有：配色比例硬指标、token 权威表（与 `src/styles/themes/theme.css`
`@theme` 同源）、组合范式、组件货架（active vs deprecated）、按钮/卡片用法、
动效规则、禁用清单、改设计时的纪律。

本文件不再重复这些内容，以避免文档与代码 / 文档与文档之间漂移。改任何视觉相关
的东西前，先读 `docs/DESIGN.md`；改 token 时 `theme.css` 与 `docs/DESIGN.md`
两边同步。

快速看全貌：`pnpm dev` 后打开 `/styleguide`（渲染所有 token 与组件的活货架）。
