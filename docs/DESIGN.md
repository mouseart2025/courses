# 柴火创客学院 · 设计方案（Design System）

> **这是设计系统的唯一权威文档。** Token 值与 `src/styles/themes/theme.css` 的
> `@theme` 块逐一对齐；改 token 必须两边同步。本文不只记"用什么"，更记
> **"为什么、何时、怎么组合"** —— 给人和 AI 一个统一的设计北极星。
>
> 想快速看全貌：本地起 `pnpm dev` 打开 **`/styleguide`**（活货架，渲染所有
> token 与组件）。

---

## 0. 设计声音（North Star）

**专业 · 清晰 · 实战 · 可信赖 · 温暖而不花哨。**

气质 = **技术编辑风**：mono 小标（eyebrow）+ 粗黑无衬线大标题 + 红色竖条
（`.section-flag`）+ 大量留白 + hairline 分隔。冷静、可信、有工程感，但靠暖黄
点缀保留"创客"的温度。

**核心叙事**（贯穿所有文案与视觉）：

> 我们培养人掌握新技术整合能力，不是提供解决方案。

避免"我们提供 XXX 方案"的措辞与视觉暗示。

**历史教训**：本仓库曾漂移到 brutalist / 贴纸风（2px 黑边、硬阴影、装饰几何块、
大红铺面）并被回退。下方"禁用清单"就是防止复发。

---

## 1. 颜色系统

### 1.1 配色比例（硬指标）

**黄 ≤3% · 红 ≤5% · 黑 ~15% · 灰 ~25% · 白 ~52%。**

- 饱和黄 `#f3d230` 是**点缀识别色**（logo / L1 徽章 / M0 角标 / 关键按钮），
  **不是大面积底色**。需要"黄面"时用柔黄 `--color-brand-yellow-light`
  (`#fef9e7`)，且仅限 ≤8rem 高的窄条 / 卡片底。
- 红 `--color-brand-red` ≤5%，只用于 CTA、强调、destructive。**绝不**用
  `bg-brand-red` 铺满整段。
- 每个落地页应有一个**反转黑面**（`.panel-dark` / graphite）制造节奏对比。

### 1.2 品牌识别色

| 用途 | Token | Hex |
|---|---|---|
| CTA 红 | `--color-brand-red` | `#d84144` |
| 红 hover | `--color-brand-red-hover` | `#c13538` |
| 红 tint（仅 destructive 底） | `--color-brand-red-light` | `#fdeaea` |
| 主黄（识别色） | `--color-brand-yellow` | `#f3d230` |
| 黄 hover | `--color-brand-yellow-hover` | `#e5c420` |
| 柔黄 surface（唯一允许的黄面） | `--color-brand-yellow-light` | `#fef9e7` |
| 中黄（L2 行） | `--color-brand-yellow-mid` | `#fde68a` |
| 黄 dark（黄底上的文字） | `--color-brand-yellow-dark` | `#b8960a` |
| 主文本黑 | `--color-brand-black` | `#1a1a1a` |
| 黑 light | `--color-brand-black-light` | `#333333` |
| Graphite（反转面 / footer） | `--color-brand-graphite` | `#262626` |
| 白 | `--color-brand-white` | `#ffffff` |

### 1.3 中性灰阶（10 段，Arco Gray 谱系）

`--color-neutral-1`→`-10`：`#f7f8fa · #f2f3f5 · #e5e6eb · #c9cdd4 · #a9aeb8 ·
#86909c · #6b7785 · #4e5969 · #272e3b · 1d2129`

- 文本：标题 `neutral-10`、重要 `-9`、正文 `-8`、次要 `-7`、caption `-6`。
- 描边/分隔：`neutral-3`（hairline）。
- 替代底：`neutral-1`（section alt bg）。

### 1.4 语义 token（shadcn 风）

`--color-background #fff` · `--color-foreground #1d2129` · `--color-card #fff` ·
`--color-muted #f2f3f5` · `--color-muted-foreground #86909c` ·
`--color-border-subtle #e5e6eb` · `--color-surface #f7f8fa` ·
`--color-destructive #d84144`。

**Primary（v3.0 已切换为黑底白字 CTA）**：`--color-primary` = brand-black，
`--color-primary-foreground` = `#fff`，`--color-accent` = brand-red。

> Tailwind v4 会为每个 `--color-*` 自动生成 `bg-* / text-* / border-*`。
> **优先用 token 工具类，不要写裸 hex。**

### 1.5 画布用微暖白（不是纯白）

页面与卡片底统一用 `--color-background` / `--color-card` = **`#fbfaf6`**（微暖白），
纯白偏冷、偏"未样式化"。**全站不要再用 `bg-white`**（纯白）作面色 —— 用
`bg-background`（自动取暖白 token）。`--color-brand-white`（`#ffffff`）仅作"白墨"：
反转黑面上的文字、半透明叠加 `bg-white/xx` 等，保持纯白。

---

## 2. 圆角 · 阴影 · 动效

- **圆角**（v3.0 默认 8px，禁默认 16px+）：`--radius-sm 4 · -md 6 · -lg 8 ·
  -xl 14 · -card 8 · -chip 999`。卡片用 `-card`(8)，按钮用 `-md`(6)，胶囊用
  `-chip`。
- **阴影**（3 档，全部极淡 rgba 0.05–0.10）：`--shadow-xs · -sm-soft ·
  -md-soft`。hover 只允许微变到 `-xs`，**禁硬阴影/偏移阴影**。
- **动效**：时长 `--dur-fast 150 · -med 200 · -slow 300`，缓动
  `--ease-standard`。统一克制；详见 §6 与 `prefers-reduced-motion` 规则。

---

## 3. 字体与排版

- `--font-sans`：Inter（西文）→ Noto Sans SC / 思源黑（中文回退）。正文、UI、
  按钮、导航全用它。
- `--font-mono`：JetBrains Mono。用于 eyebrow 小标（`font-mono uppercase
  tracking-widest`）和代码/数字。
- `--font-display`：display 级大标题专用（见 §7 字体策略，迭代中）。
- 中文排版：正文 `line-height 1.75`，标题 `1.3`；中文用全角标点
  （，。：、！？），英文/数字用半角；中文破折号 `——`。
  详见 `.claude/rules/i18n-text.md`。

---

## 4. 组合范式（Composition Patterns）

AI 拼版面时**默认照这个来**，才不会"语法对但平庸"。

### 4.1 Section 节奏

```astro
<section class="py-20 md:py-24 px-4 sm:px-6 lg:px-8 [panel bg]">
  <div class="max-w-6xl mx-auto">
    <div class="max-w-3xl">
      <p class="text-xs font-mono font-semibold uppercase tracking-widest text-brand-red mb-3">EYEBROW</p>
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">标题</h2>
      <p class="mt-4 text-base md:text-lg text-neutral-8 leading-relaxed">引导句</p>
    </div>
    <!-- 内容网格：mt-10，hairline 分隔用 gap-px + bg 衬色 -->
  </div>
</section>
```

- 容器恒为 `max-w-6xl mx-auto` + `px-4 sm:px-6 lg:px-8`；文本块限 `max-w-3xl`。
- 段距恒为 `py-20 md:py-24`。
- eyebrow：亮面用 `text-brand-red`，暗面用 `text-brand-yellow`。
- **hairline 网格**：`grid gap-px bg-neutral-3`（暗面用 `bg-white/10`）+ 子项
  自身底色 → 形成 1px 细分隔，技术感的招牌手法。

### 4.2 Panel 三态（面系统）

页面靠交替 panel 制造节奏，**亮 → 暗 → 亮**：

| Panel | 何时用 |
|---|---|
| 白 / `panel-light` | 默认内容段 |
| 柔黄 `bg-brand-yellow-light` | 想"暖一下"的窄强调段（≤8rem） |
| 反转 `panel-dark`（graphite） | 每页至少一处，制造对比与可信厚重感 |

### 4.3 Hero 范式 + 招牌器件

- Hero 文本块左对齐、`max-w-3xl`，eyebrow → 大标题（可用 `.highlight` 给关键词
  描黄）→ 副题 → CTA 组。
- **招牌可信器件 = M0–M5 课程矩阵**。它是本站最独特的资产；hero / 课程页应让它
  可见，相当于 SaaS 站的"产品截图"，一眼传达"这是真课程体系"。
  实现：`HeroCourseMap.astro` + `HeroBanner` 的 `anchor` slot（首页 hero 用，
  其他页 hero 仍单栏文本）。

### 4.4 按钮（实际 v3.0 用法）

| 变体 | 亮面 | 暗面 |
|---|---|---|
| Primary（CTA） | `bg-brand-black text-white hover:bg-black` | `bg-brand-red text-white hover:bg-brand-red-hover` |
| Secondary | `bg-white border border-neutral-3 text-brand-black hover:border-brand-black/30` | `border border-white/30 text-white hover:bg-white/10` |

统一 `rounded-md`(6px) · `px-5 py-2.5` · `text-sm font-semibold` ·
`focus-ring` · 配 `lucide:arrow-right` 图标。

---

## 5. 组件货架（Active vs Deprecated）

**先复用，再造新的。** 下列为 `theme.css @layer utilities` 提供的现成件：

### Active

| Class | 用途 |
|---|---|
| `.panel-yellow` / `.panel-dark` / `.panel-light` | 面系统（段落/卡片底）；`+.panel-interactive` 加 hover 微变与 active 缩放 |
| `.card-hairline` | 带 1px `neutral-3` 边 + 极淡 hover 阴影的**内容卡**（与 panel 不同：panel 无边、用于大面，card-hairline 用于带边的小卡） |
| `.module-tile` | M 代码徽章；配 `--red`/`--yellow`/`--dark` + 可选 `--sm`/`--lg` |
| `.level-badge` | L1/L2/L3 胶囊；配 `--l1`/`--l2`/`--l3` |
| `.section-flag` | 标题前的红色竖条（5px） |
| `.nav-link` | 导航：hover/active 红色滑动下划线 |
| `.focus-ring` | focus-visible 焦点环（红 2px + 白偏移） |
| `.skip-link` | 跳到主内容 |
| `.highlight` | 关键词的黄色 marker 底 |
| `.noise-overlay` | 给饱和黄面/反转黑面加 2.5% 噪点纹理 |

> **panel vs card-hairline 怎么选**：整段/大块底色、需要黄或黑面 → 用 `panel-*`；
> 列表里带边框的内容卡片 → 用 `card-hairline`。二者都 active，职责不同。

### Deprecated / 不要用

- 任何 §8 禁用清单中的写法。

---

## 6. 动效规则

- 全站统一极克制：scroll-reveal（淡入 + 微上移）+ 个别微交互。
- 用 `data-reveal` 触发（IntersectionObserver，不引 AOS 等依赖）。
- **必须**在 `@media (prefers-reduced-motion: reduce)` 下禁用，且不依赖动效才
  可见的内容（reduce 时直接显示）。
- hover 只到 `--shadow-xs`；active 轻微 `scale(0.98)`。不堆砌、不炫技。

---

## 7. 字体策略

大标题用 display 字面制造层级对比，方向为**几何科技黑**（契合硬件/创客）。

- **Display = 得意黑 Smiley Sans**（倾斜几何工业体，OFL 免费商用）。自托管
  子集：`public/fonts/SmileySans-Oblique.subset.woff2`（仅站内用字，~95KB），
  `@font-face` 在 `theme.css`，`font-display: swap`，并在 `Layout.astro`
  `<link rel="preload">`（hero H1 常为 LCP）。
- Token：`--font-display: "Smiley Sans", Inter, "Noto Sans SC", sans-serif`
  （缺字优雅回退）。
- **仅用于 display 级大标题**：通过 `.font-display` 工具类应用。目前用在
  `HeroBanner` 的 H1（覆盖全部页面 hero）。section H2 保持思源黑 Bold —— 形成
  「display marquee → bold sans 段落」的层级，别全站滥用倾斜体。
- **改字符集后需重新子集**：站内新增大量生僻字时，用 `pyftsubset` 以全站文本
  为字符集重新生成（缺字会自动回退，不致破版）。

---

## 8. 禁用清单（Banned）

- 万物加 2px 黑边（brutalist）。
- 硬阴影 / 偏移阴影（贴纸风）。
- hero 里的装饰几何块。
- 宽幅红铺面（`bg-brand-red` 覆盖整段）。
- 大面积饱和黄底（黄是点缀，黄面只用柔黄 `-light` 且 ≤8rem）。
- token 体系外的裸 hex / 自造圆角。
- 纯白卡片不配 `card-hairline` / 不进 panel（看着像未样式化的裸 HTML）。

---

## 9. 改设计时的纪律

1. 改 token → `theme.css` 与本文**两边同步**。
2. 先用现有 token / 组件（§5 货架），再考虑新建。
3. 不写裸 hex、不造体系外圆角。
4. 动效尊重 `prefers-reduced-motion`。
5. 改完打开 `/styleguide` 自检，并跑 `pnpm check && pnpm build`。
6. 内容只改 `src/data/*.ts`（`/llms.txt` 与 Course JSON-LD 会自动同步）。
