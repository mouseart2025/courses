# Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-architect the Chaihuo OPC Academy site per `docs/superpowers/specs/2026-05-28-site-redesign-design.md` — homepage stops behaving like the courses/contact pages, the M0–M5 × L1–L3 matrix becomes the unambiguous main map, tracks become goal-oriented (not identity-based), and the visual language shifts from "many cards" toward path/matrix/strip structures.

**Architecture:** All structured content stays in `src/data/*.ts`. Page-level recomposition happens in `src/pages/*.astro`. Each page section is its own component under `src/components/sections/<page>/`. New homepage sections replace old identity-coded ones; courses page gains an axis legend and downscales its cards explorer; module detail pages surface a "real problem" line and a "deliverables" strip from extended module data.

**Tech Stack:** Astro 6 (server output) · Tailwind CSS v4 · astro-icon (lucide) · Preline UI v4 · TypeScript strict mode. No test runner — `pnpm check` (TypeScript) and `pnpm build` (prerender / icon registration) are the static gates; `pnpm dev` for manual visual verification.

**Branch:** Stay on `feat/course-matrix-refactor` (where the spec was committed). Pre-existing dirty files (`Footer.astro`, `Navbar.astro`, `Layout.astro`, `public/favicon.svg`) are **out of scope** — do not sweep them into redesign commits.

---

## Verification model (read once, apply per task)

This repo has no test runner. Each task verifies via:

1. `pnpm check` — TypeScript validation. Must pass.
2. `pnpm build` — full prerender. Required for tasks touching icons, dynamic routes, or data types. Catches missing icon registrations.
3. Manual `pnpm dev` visit — listed per task ("Visit `/path` and confirm X").

Treat steps that say "Run `pnpm check`" as TDD's red/green: expected output is `0 errors`. Anything else is a fail to fix before moving on.

**Icon registration gotcha:** New lucide icons must be added to `src/data/icons.ts` in the `LUCIDE_ICONS` array — this file is the **single source of truth** consumed by both `astro.config.mjs` (build-time bundler include list) and `IconName` (TypeScript type). New icons in this plan: `lightbulb`, `thermometer`, `wifi`, `camera`, `speaker`, `file-text` (already present), `map` (already present), `compass` (already present), `layers-3`, `rocket`, `package`, `hand-helping`. Tasks that introduce them register them in the same commit. (Note: the original plan said to edit `astro.config.mjs` — that's incorrect; the config already pulls from `src/data/icons.ts`. Task 3 already added: `lightbulb`, `thermometer`, `wifi`, `camera`, `speaker`, `rocket`, `package`, `hand-helping`.)

---

## File map

**Data (3 files modified, 0 created):**
- `src/data/tracks.ts` — rewrite to 5 goal-based tracks
- `src/data/modules.ts` — add `realProblem`, `deliverables` fields + content
- `src/data/site.ts` — add `homeFamiliarObjects`, `homeMapLegend`, `homeOutcomes`; flip `homeFinalCta` primary; remove `homeValueStatement`

**Components (4 created, 4 deleted, 3 modified):**
- Create: `src/components/sections/home/HomeFamiliarObjects.astro`
- Create: `src/components/sections/home/HomeMapPreview.astro`
- Create: `src/components/sections/home/HomeGoalPaths.astro`
- Create: `src/components/sections/home/HomeOutcomes.astro`
- Create: `src/components/sections/courses/CourseAxisLegend.astro`
- Delete: `src/components/sections/home/HomeScenarios.astro` (identity-based, spec rejects)
- Delete: `src/components/sections/home/HomeValueStatement.astro` (closed brand slogan, spec rejects)
- Delete: `src/components/sections/home/HomeModuleGrid.astro` (replaced by HomeMapPreview)
- Delete: `src/components/sections/contact/ContactInlineFormSection.astro` (violates `partnership-form-via-qr` memory rule)
- Modify: `src/components/sections/courses/CourseModulesExplorer.astro` (downscale to secondary)
- Modify: `src/components/sections/courses/LearningTracksSection.astro` (consume goal-based tracks, update copy)
- Modify: `src/components/sections/courses/CourseDetailHero.astro` (add realProblem line)
- Modify: `src/components/sections/courses/CourseDetailPanels.astro` (or new sibling) for deliverables strip

**Pages (3 modified):**
- `src/pages/index.astro` — full recomposition
- `src/pages/courses/index.astro` — add axis legend, reorder, downscale
- `src/pages/contact.astro` — remove inline form import + render

**Config + docs (2 modified):**
- `astro.config.mjs` — register new lucide icons
- `CLAUDE.md` — update tracks count (4 → 5), drop M0→M5 invariant, refresh page composition notes

---

## Task 1: Rewrite `tracks.ts` to 5 goal-oriented tracks

The current four tracks are organized by **identity** ("面向集成商", "面向农业", "面向安防", "面向文旅"). Spec requires reorganization by **goal**. The CLAUDE.md invariant "always start with M0 and end with M5" is dropped: a "从硬件基础开始" track is M0-centric only; a "把 demo 变成可交付项目" track is M5-centric.

**Files:**
- Modify: `src/data/tracks.ts`

- [ ] **Step 1: Replace tracks array**

Rewrite `src/data/tracks.ts` to:

```ts
import type { ModuleId } from './modules';

export interface Track {
  id: string;
  name: string;
  goal: string;
  tagline: string;
  moduleIds: ModuleId[];
  description: string;
  accent: 'red' | 'yellow';
}

export const tracks: Track[] = [
  {
    id: 'from-basics',
    name: '从硬件基础开始',
    goal: '建立硬件直觉与动手自信',
    tagline: 'M0',
    moduleIds: ['m0'],
    description:
      '没碰过电烙铁也没关系。从点亮第一颗 LED、读第一个传感器开始，建立后续所有方向都用得上的硬件直觉。',
    accent: 'red',
  },
  {
    id: 'smart-space',
    name: '搭建一个可运行的智能空间',
    goal: '把异构设备拧成可编排整体',
    tagline: 'M0 → M1 → M5',
    moduleIds: ['m0', 'm1', 'm5'],
    description:
      '从硬件基础到 Home Assistant 生态，再到落地交付——一条把空间设备、协议、自动化拧成可运行系统的完整路径。',
    accent: 'yellow',
  },
  {
    id: 'field-iot',
    name: '做远距物联或传感网络',
    goal: '无公网覆盖也能拉起一张传感网',
    tagline: 'M0 → M2 → M5',
    moduleIds: ['m0', 'm2', 'm5'],
    description:
      'LoRa 点对点、Meshtastic 自组网、TTN 接入——野外、农业、城市监测、应急通信场景下都跑得通的传感网交付能力。',
    accent: 'yellow',
  },
  {
    id: 'edge-vision',
    name: '把视觉 AI 放到边缘设备上',
    goal: '让摄像头自己思考',
    tagline: 'M0 → M3 → M5',
    moduleIds: ['m0', 'm3', 'm5'],
    description:
      '从预训练模型推理到自训练数据集，再到边缘集群生产部署。把"会看的摄像头"做成真能上线的产品。',
    accent: 'yellow',
  },
  {
    id: 'demo-to-delivery',
    name: '把 demo 变成可交付项目',
    goal: '系统集成与交付能力',
    tagline: 'M5（可与任一方向组合）',
    moduleIds: ['m5'],
    description:
      'POC → Pilot → 规模化复制。需求拆解、技术选型、现场部署、验收培训、SOP 编写，覆盖独立交付者到团队管理者的完整动作。',
    accent: 'yellow',
  },
];

export const getTracksForModule = (id: ModuleId): Track[] =>
  tracks.filter((t) => t.moduleIds.includes(id));
```

- [ ] **Step 2: TypeScript check**

Run: `pnpm check`
Expected: 0 errors. `Track` now has a `goal` field — any consumers that destructured `tagline` only still work; any new consumer can read `goal`.

- [ ] **Step 3: Commit**

```bash
git add src/data/tracks.ts
git commit -m "$(cat <<'EOF'
refactor(tracks): switch from identity-based to 5 goal-oriented tracks

Per site redesign spec — tracks now describe what you want to build,
not who you are. M0→...→M5 invariant dropped: from-basics is M0-only,
demo-to-delivery is M5-only.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Extend `modules.ts` with `realProblem` + `deliverables`

Spec module-detail-page requirement: "这个模块解决什么真实问题" and "可用结果，例如 demo、POC、部署方案、客户演示、验收材料、交付文档、可复制方案". Add both as module-level fields and fill in concrete content.

**Files:**
- Modify: `src/data/modules.ts`

- [ ] **Step 1: Extend `Module` interface**

Edit `src/data/modules.ts` to add two fields to the `Module` interface (insert after `audience`):

```ts
export interface Module {
  id: ModuleId;
  slug: string;
  code: string;
  title: string;
  subtitle: string;
  oneLiner: string;
  realProblem: string;
  illustration: string;
  coreHardware: string[];
  capabilities: string[];
  audience: string[];
  deliverables: string[];
  accent: 'red' | 'yellow';
  cells: Record<LevelId, ModuleCell>;
}
```

- [ ] **Step 2: Fill content for each module**

For each module in the `modules` array, insert `realProblem` (after `oneLiner`) and `deliverables` (after `audience`):

```ts
// M0
realProblem:
  '硬件世界没有"快速上手"按钮。读不懂电路图、烫不好焊点、调不通串口——所有后续模块都会卡在同一道槛上。',
deliverables: [
  '可运行的 LED / 传感器 demo',
  '硬件作品集（含调试视频）',
  '面包板到 PCB 的进阶路线图',
],

// M1
realProblem:
  '空间里有 Zigbee 灯、Matter 插座、HomeKit 摄像头、Shelly 开关——每个 App 各管一摊，没有人能编排"整套场景"。',
deliverables: [
  'Home Assistant 部署文档',
  '跨协议自动化场景包',
  '可交付给客户的运维 Dashboard',
],

// M2
realProblem:
  '野外、地下、跨厂区——没 Wi-Fi 没 4G 也得让数据回得来。',
deliverables: [
  'LoRa / Mesh 组网方案',
  'TTN / 自建网关部署文档',
  '低功耗节点选型与续航测试报告',
],

// M3
realProblem:
  '摄像头每天产生 TB 级视频，真正有用的事件只占 0.1%——但传统方案要么云端贵、要么延迟高。',
deliverables: [
  '边缘推理 demo + 性能指标报告',
  '自训练模型 + 数据集',
  '多路接入 + 远程升级的生产级部署方案',
],

// M4
realProblem:
  '展厅、文旅、零售场景想"让空间能对话"——但买现成方案被锁死，自研又跨不过语音 + LLM + 硬件的多重门槛。',
deliverables: [
  '本地语音唤醒 + Agent demo',
  'RAG 接入本地知识库的实施方案',
  '空间级部署 + 可运营后台',
],

// M5
realProblem:
  'demo 跑通不等于项目能交付。需求拆解、选型、验收、SOP、培训——每一步都可能让一个技术上"可行"的方案卡死在合同上。',
deliverables: [
  '需求文档与技术选型矩阵',
  'POC → Pilot 交付报告',
  '可复制 SOP + 客户培训材料',
],
```

- [ ] **Step 3: TypeScript check**

Run: `pnpm check`
Expected: 0 errors. If any consumer reads `module` without these fields, the strict checker will flag it — that consumer should be updated in Task 12, but the type itself must compile here.

- [ ] **Step 4: Commit**

```bash
git add src/data/modules.ts
git commit -m "$(cat <<'EOF'
feat(modules): add realProblem and deliverables fields

Spec module-detail-page requirement: each module must surface the
real problem it solves and what concrete deliverables come out.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Restructure `site.ts` — new home data, flip CTA, remove value statement

Add data for the new homepage sections. Remove `homeValueStatement` (closed-brand slogan, spec rejects). Flip `homeFinalCta` so "view course map" is primary, "contact" secondary (spec § 首页: 'with "查看课程地图" as primary CTA, contact as secondary entry').

**Files:**
- Modify: `src/data/site.ts`

- [ ] **Step 1: Remove `homeValueStatement` export + interface**

Delete the `HomeValueStatement` interface and the `homeValueStatement` constant from `src/data/site.ts`.

- [ ] **Step 2: Add new types and data**

`IconName` is already imported at the top of `site.ts` — do not re-import. Insert after the existing `FaqItem` interface:

```ts
export interface FamiliarObject {
  icon: IconName;
  label: string;
  hint: string;
  moduleHint: string;
}

export interface MapLegend {
  axisX: { label: string; description: string };
  axisY: { label: string; description: string };
  anchors: { code: string; role: string }[];
  note: string;
}

export interface OutcomeItem {
  icon: IconName;
  label: string;
  description: string;
}
```

Insert after the existing `homeFinalCta` constant:

```ts
export const homeFamiliarObjects: FamiliarObject[] = [
  {
    icon: 'lucide:lightbulb',
    label: 'LED 与按键',
    hint: '从这里开始动手',
    moduleHint: 'M0 · L1',
  },
  {
    icon: 'lucide:thermometer',
    label: '传感器套件',
    hint: '让设备感知物理世界',
    moduleHint: 'M0 · L2',
  },
  {
    icon: 'lucide:wifi',
    label: '网关 / 协议',
    hint: '把异构设备拧成系统',
    moduleHint: 'M1 / M2',
  },
  {
    icon: 'lucide:camera',
    label: '摄像头 / 边缘 AI',
    hint: '让摄像头自己思考',
    moduleHint: 'M3',
  },
  {
    icon: 'lucide:speaker',
    label: '空间设备 / Agent',
    hint: '让空间能对话',
    moduleHint: 'M4',
  },
  {
    icon: 'lucide:file-text',
    label: '交付文档 / SOP',
    hint: '从 demo 到可签合同',
    moduleHint: 'M5',
  },
];

export const homeMapLegend: MapLegend = {
  axisX: {
    label: '横轴 · M0–M5',
    description: '当前课程方向。M0 是基础起点，M1–M4 是可独立深入的技术方向，M5 是行业交付整合。',
  },
  axisY: {
    label: '纵轴 · L1 / L2 / L3',
    description: '学习与阅读深度。L1 跑通 demo，L2 独立完成小项目，L3 形成可交付能力。',
  },
  anchors: [
    { code: 'M0', role: '通用起点' },
    { code: 'M1–M4', role: '可独立深入的技术方向' },
    { code: 'M5', role: '行业交付整合' },
  ],
  note: '可以按方向、深度或目标自由组合——不必从头到尾线性学习。这是当前版本的课程地图，未来会随技术发展继续扩展。',
};

export const homeOutcomes: OutcomeItem[] = [
  {
    icon: 'lucide:rocket',
    label: '可运行的系统 demo',
    description: '不是 PPT 截图，是能现场点亮、能联调、能交给客户演示的真实系统。',
  },
  {
    icon: 'lucide:package',
    label: 'POC 与现场部署',
    description: '从需求拆解到 Pilot 上线，覆盖一个完整项目从想法到运行的全流程。',
  },
  {
    icon: 'lucide:file-text',
    label: '交付文档与 SOP',
    description: '验收材料、运维手册、可复制方案——让项目可以被签合同、被复制、被维护。',
  },
  {
    icon: 'lucide:hand-helping',
    label: '组织级能力沉淀',
    description: '把课程引入团队后留下的不是几个人，而是一个能持续承接项目的工程能力。',
  },
];
```

- [ ] **Step 3: Flip `homeFinalCta` primary/secondary**

Replace the existing `homeFinalCta` constant with:

```ts
export const homeFinalCta: FinalCta = {
  eyebrow: 'NEXT STEP',
  title: '看完地图，再决定从哪里进入',
  description:
    '可以从基础开始、按方向选模块、按目标拼路径，也可以直接谈把课程引入你的组织。下一步在你手里。',
  primary: { label: '查看课程地图', href: '/courses' },
  secondary: { label: '聊聊合作', href: '/contact' },
};
```

- [ ] **Step 4: TypeScript check**

Run: `pnpm check`
Expected: errors will flag `HomeValueStatement` consumers (the deleted `HomeValueStatement.astro` and `index.astro` import). Those are addressed in Task 8 — for now `pnpm check` will fail on those two files. **Accept this** and proceed; do not commit yet.

(If you want a clean commit here: temporarily comment out the `HomeValueStatement` import and prop in `index.astro`. But the cleaner path is to commit data + page in one logical step. Pick one and note it in the commit.)

- [ ] **Step 5: Commit (data only — page recomposition follows in Task 8)**

Stage only `src/data/site.ts`:

```bash
git add src/data/site.ts
git commit -m "$(cat <<'EOF'
feat(site-data): add familiar-objects, map legend, outcomes; flip home CTA

New homepage section content. homeValueStatement removed (closed-brand
slogan, spec rejects). homeFinalCta primary now "view course map",
contact demoted to secondary per spec § 首页.

Note: index.astro still imports the deleted homeValueStatement — fixed
in next commit (home recomposition).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Create `HomeFamiliarObjects.astro`

Open from real tech objects (LED, sensor, gateway, camera, spatial device, delivery doc) — spec § 首页 step 2. Strip / tile layout, not deep cards.

**Files:**
- Create: `src/components/sections/home/HomeFamiliarObjects.astro`
- Modify: `src/data/icons.ts` (only if any icon not already registered)

- [ ] **Step 1: Verify icons are registered**

The icons this component needs (`lightbulb`, `thermometer`, `wifi`, `camera`, `speaker`, `file-text`) should already be in `src/data/icons.ts` after Task 3. Open the file and confirm. If any are missing, add them to the `LUCIDE_ICONS` array (don't touch `astro.config.mjs` — it auto-derives from `icons.ts`).

- [ ] **Step 2: Create component**

Write `src/components/sections/home/HomeFamiliarObjects.astro`:

```astro
---
import { Icon } from 'astro-icon/components';
import SectionHeader from '../../SectionHeader.astro';
import type { FamiliarObject } from '../../../data/site';

interface Props {
  objects: FamiliarObject[];
}

const { objects } = Astro.props as Props;
---

<section class="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
  <div class="max-w-7xl mx-auto">
    <SectionHeader
      eyebrow="Familiar Entry Points"
      title="从你已经认识的东西开始"
      subtitle="LED、传感器、网关、摄像头、空间设备、交付文档——这些物件你可能见过、用过、或听说过。它们背后是一张更完整的课程地图。"
    />
    <ul class="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-brand-black/10 border-2 border-brand-black rounded-2xl overflow-hidden">
      {objects.map((o) => (
        <li class="bg-white p-5 md:p-6 flex flex-col gap-3 transition-colors hover:bg-brand-yellow-light">
          <Icon name={o.icon} class="w-7 h-7 text-brand-red" />
          <div>
            <p class="text-sm font-black text-brand-black leading-tight">{o.label}</p>
            <p class="mt-1 text-xs text-gray-600 leading-relaxed">{o.hint}</p>
          </div>
          <span class="mt-auto inline-block text-[10px] font-mono font-bold tracking-widest uppercase text-brand-black/60">
            {o.moduleHint}
          </span>
        </li>
      ))}
    </ul>
  </div>
</section>
```

- [ ] **Step 3: Verify build resolves icons**

Run: `pnpm build`
Expected: success. If `Unable to locate "lucide:xxx" icon!`, go back to Step 1 and add the missing name.

- [ ] **Step 4: Commit**

```bash
git add astro.config.mjs src/components/sections/home/HomeFamiliarObjects.astro
git commit -m "$(cat <<'EOF'
feat(home): add HomeFamiliarObjects section

Spec § 首页 step 2 — open from real tech objects, not from identity tags.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Create `HomeMapPreview.astro`

Show the M0–M5 × L1–L3 read-the-map preview without rendering the full matrix. Spec § 首页 step 3: "Briefly surface M0–M5 and L1–L3, but only explain 'how to read this map'".

**Files:**
- Create: `src/components/sections/home/HomeMapPreview.astro`

- [ ] **Step 1: Create component**

Write `src/components/sections/home/HomeMapPreview.astro`:

```astro
---
import { Icon } from 'astro-icon/components';
import SectionHeader from '../../SectionHeader.astro';
import type { MapLegend } from '../../../data/site';
import { modules } from '../../../data/modules';

interface Props {
  legend: MapLegend;
}

const { legend } = Astro.props as Props;
---

<section class="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-brand-yellow-light noise-overlay border-t border-b border-brand-black/10">
  <div class="max-w-6xl mx-auto">
    <SectionHeader
      eyebrow="How To Read The Map"
      title="一张二维课程地图：横轴选方向，纵轴选深度"
      subtitle="不需要从头到尾线性学。下面是这张图的读法，完整矩阵在课程体系页。"
    />

    <div class="mt-10 grid md:grid-cols-[1.4fr_1fr] gap-10 items-start">
      <div class="bg-white border-2 border-brand-black rounded-2xl p-6 md:p-8 shadow-sm">
        <div class="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-brand-black/60 mb-4">
          <Icon name="lucide:map" class="w-4 h-4 text-brand-red" />
          COURSE MAP · 2026
        </div>

        <div class="grid grid-cols-6 gap-2">
          {modules.map((m) => (
            <div class="flex flex-col items-center gap-2">
              <span class:list={[
                'module-tile font-mono w-full text-center',
                m.id === 'm0' ? 'module-tile--red' : 'module-tile--dark',
              ]}>
                {m.code}
              </span>
              <span class="text-[10px] text-brand-black/60 text-center leading-tight">{m.subtitle}</span>
            </div>
          ))}
        </div>

        <div class="mt-6 flex items-stretch gap-2">
          {['L1', 'L2', 'L3'].map((lvl, i) => (
            <div class:list={[
              'flex-1 border-2 border-brand-black rounded-lg px-3 py-3 text-center font-mono font-bold text-xs',
              i === 0 ? 'bg-white' : i === 1 ? 'bg-brand-yellow-light' : 'bg-brand-yellow',
            ]}>
              <span class="block text-brand-black">{lvl}</span>
              <span class="block text-[10px] mt-1 text-brand-black/60 font-sans font-normal">
                {i === 0 ? '跑通 demo' : i === 1 ? '独立完成' : '可交付'}
              </span>
            </div>
          ))}
        </div>

        <p class="mt-6 text-xs leading-relaxed text-gray-600">{legend.note}</p>
      </div>

      <ul class="space-y-5">
        <li>
          <p class="text-xs font-mono font-bold uppercase tracking-widest text-brand-red">{legend.axisX.label}</p>
          <p class="mt-1 text-sm leading-relaxed text-brand-black">{legend.axisX.description}</p>
        </li>
        <li>
          <p class="text-xs font-mono font-bold uppercase tracking-widest text-brand-red">{legend.axisY.label}</p>
          <p class="mt-1 text-sm leading-relaxed text-brand-black">{legend.axisY.description}</p>
        </li>
        <li>
          <p class="text-xs font-mono font-bold uppercase tracking-widest text-brand-red">锚点 · Anchors</p>
          <ul class="mt-2 space-y-1.5 text-sm text-brand-black">
            {legend.anchors.map((a) => (
              <li class="flex items-baseline gap-2">
                <span class="font-mono font-black w-14 shrink-0 text-brand-red">{a.code}</span>
                <span>{a.role}</span>
              </li>
            ))}
          </ul>
        </li>

        <a
          href="/courses"
          class="focus-ring inline-flex items-center gap-2 mt-2 text-sm font-bold text-brand-black hover:text-brand-red transition-colors"
        >
          查看完整 M0–M5 × L1/L2/L3 矩阵
          <Icon name="lucide:arrow-right" class="w-4 h-4" />
        </a>
      </ul>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify build**

Run: `pnpm build`
Expected: success.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/home/HomeMapPreview.astro
git commit -m "$(cat <<'EOF'
feat(home): add HomeMapPreview section

Spec § 首页 step 3 — surface M0–M5 + L1/L2/L3 read-the-map preview
without rendering the full matrix.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Create `HomeGoalPaths.astro` (replaces `HomeScenarios`)

Goal-oriented path entries. Spec § 路径入口 — by goal, not identity. Reads from `tracks.ts` (now goal-based after Task 1).

**Files:**
- Create: `src/components/sections/home/HomeGoalPaths.astro`

- [ ] **Step 1: Create component**

Write `src/components/sections/home/HomeGoalPaths.astro`:

```astro
---
import { Icon } from 'astro-icon/components';
import SectionHeader from '../../SectionHeader.astro';
import type { Track } from '../../../data/tracks';
import { modules } from '../../../data/modules';

interface Props {
  tracks: Track[];
}

const { tracks } = Astro.props as Props;
const codeOf = (id: string) => modules.find((m) => m.id === id)?.code ?? id;
---

<section class="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
  <div class="max-w-6xl mx-auto">
    <SectionHeader
      eyebrow="Open Reading Paths"
      title="按目标进入，而不是按身份"
      subtitle="高校老师、集成商工程师、企业团队、独立交付者、学生——都可以在下面找到属于自己的入口。我们不替你贴标签。"
    />

    <ul class="mt-10 divide-y-2 divide-brand-black/10 border-y-2 border-brand-black/10">
      {tracks.map((t) => (
        <li>
          <a
            href={`/courses#track-${t.id}`}
            class="focus-ring group block py-6 md:py-7 transition-colors hover:bg-brand-yellow-light"
          >
            <div class="grid grid-cols-1 md:grid-cols-[1.5fr_2fr_auto] gap-4 md:gap-8 items-start md:items-center">
              <div>
                <p class="text-xs font-mono font-bold uppercase tracking-widest text-brand-red mb-1">
                  {t.tagline}
                </p>
                <h3 class="text-xl md:text-2xl font-black text-brand-black leading-tight">
                  {t.name}
                </h3>
                <p class="mt-1 text-sm text-brand-black/70">{t.goal}</p>
              </div>

              <p class="text-sm leading-relaxed text-gray-700">{t.description}</p>

              <div class="flex items-center gap-2 self-end md:self-auto">
                {t.moduleIds.map((id, i) => (
                  <>
                    {i > 0 && <Icon name="lucide:arrow-right" class="w-3.5 h-3.5 text-brand-black/40" />}
                    <span class="module-tile module-tile--dark font-mono text-xs px-2 py-1">
                      {codeOf(id)}
                    </span>
                  </>
                ))}
                <Icon name="lucide:arrow-right" class="ml-2 w-5 h-5 text-brand-black/30 group-hover:text-brand-red group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  </div>
</section>
```

- [ ] **Step 2: Verify build**

Run: `pnpm build`
Expected: success.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/home/HomeGoalPaths.astro
git commit -m "$(cat <<'EOF'
feat(home): add HomeGoalPaths section

Spec § 路径入口 — goal-oriented path entries. Replaces identity-coded
HomeScenarios (removed in next home recomposition commit).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Create `HomeOutcomes.astro`

Show what students/orgs walk away with. Spec § 首页 step 5: "可落地能力结果，例如系统搭建、POC、调试、部署、文档、交付". Strip / list layout, not card grid.

**Files:**
- Create: `src/components/sections/home/HomeOutcomes.astro`

- [ ] **Step 1: Create component**

Write `src/components/sections/home/HomeOutcomes.astro`:

```astro
---
import { Icon } from 'astro-icon/components';
import SectionHeader from '../../SectionHeader.astro';
import type { OutcomeItem } from '../../../data/site';

interface Props {
  outcomes: OutcomeItem[];
}

const { outcomes } = Astro.props as Props;
---

<section class="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-brand-black text-white noise-overlay">
  <div class="max-w-6xl mx-auto">
    <SectionHeader
      eyebrow="Landable Outcomes"
      title="学完拿走的不只是知识，是可交付的东西"
      subtitle="我们不承诺"学完能赚钱"。但每一条路径走完，你都会带走可以被现场点亮、被签合同、被复制的产出物。"
      onDark
    />

    <ul class="mt-10 grid md:grid-cols-2 gap-px bg-white/10 border-2 border-white/20 rounded-2xl overflow-hidden">
      {outcomes.map((o) => (
        <li class="bg-brand-black p-6 md:p-8 flex gap-5">
          <div class="shrink-0 w-12 h-12 rounded-lg bg-brand-yellow text-brand-black flex items-center justify-center">
            <Icon name={o.icon} class="w-6 h-6" />
          </div>
          <div>
            <p class="text-lg font-black text-white">{o.label}</p>
            <p class="mt-2 text-sm leading-relaxed text-white/70">{o.description}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
</section>
```

- [ ] **Step 2: Check `SectionHeader` supports `onDark`**

Read `src/components/SectionHeader.astro`. If it does not accept an `onDark` prop, add it (and the corresponding text-color swap). If you'd rather not extend that component, drop the `onDark` prop and inline the dark-mode classes here. Pick the smaller change.

- [ ] **Step 3: Verify build**

Run: `pnpm build`
Expected: success.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/home/HomeOutcomes.astro src/components/SectionHeader.astro
git commit -m "$(cat <<'EOF'
feat(home): add HomeOutcomes section

Spec § 首页 step 5 — landable capability outcomes. Dark inverted
surface fills the spec § 视觉语言 black accent requirement.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: Recompose `index.astro` + delete orphaned home components

Wire up the new home flow: Hero → FamiliarObjects → MapPreview → GoalPaths → Outcomes → Partners → FinalCta.

**Files:**
- Modify: `src/pages/index.astro`
- Delete: `src/components/sections/home/HomeScenarios.astro`
- Delete: `src/components/sections/home/HomeValueStatement.astro`
- Delete: `src/components/sections/home/HomeModuleGrid.astro`

- [ ] **Step 1: Rewrite `src/pages/index.astro`**

```astro
---
import { getCollection } from 'astro:content';
import HeroBanner from '../components/HeroBanner.astro';
import Layout from '../layouts/Layout.astro';
import FinalCtaSection from '../components/sections/FinalCtaSection.astro';
import HomeFamiliarObjects from '../components/sections/home/HomeFamiliarObjects.astro';
import HomeGoalPaths from '../components/sections/home/HomeGoalPaths.astro';
import HomeMapPreview from '../components/sections/home/HomeMapPreview.astro';
import HomeOutcomes from '../components/sections/home/HomeOutcomes.astro';
import PartnerLogoGrid from '../components/sections/home/PartnerLogoGrid.astro';
import {
  homeFamiliarObjects,
  homeFinalCta,
  homeMapLegend,
  homeOutcomes,
} from '../data/site';
import { tracks } from '../data/tracks';

const partners = await getCollection('partners');
partners.sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
---

<Layout title="首页">
  <HeroBanner
    eyebrow="2026 课程地图 · M0 + M1–M5"
    title="从第一次点亮 LED，到独立交付智能系统"
    subtitle="柴火创客 OPC 学院"
    description="这是一张课程地图，不是一份课程清单。横着选方向，竖着选深度，按自己的目标拼路径。"
    ctas={[
      { label: '查看课程地图', href: '/courses', variant: 'primary' },
      { label: '聊聊合作', href: '/contact', variant: 'secondary' },
    ]}
  >
    <Fragment slot="title">
      从第一次点亮 LED，到<span class="highlight">独立交付智能系统</span>
    </Fragment>
  </HeroBanner>

  <HomeFamiliarObjects objects={homeFamiliarObjects} />
  <HomeMapPreview legend={homeMapLegend} />
  <HomeGoalPaths tracks={tracks} />
  <HomeOutcomes outcomes={homeOutcomes} />
  <PartnerLogoGrid partners={partners} />
  <FinalCtaSection cta={homeFinalCta} bordered headingSize="xl" />
</Layout>
```

- [ ] **Step 2: Delete orphaned components**

```bash
rm src/components/sections/home/HomeScenarios.astro
rm src/components/sections/home/HomeValueStatement.astro
rm src/components/sections/home/HomeModuleGrid.astro
```

- [ ] **Step 3: TypeScript + build check**

Run: `pnpm check && pnpm build`
Expected: 0 errors, build succeeds.

- [ ] **Step 4: Manual visual review**

Run: `pnpm dev`
Visit: `http://localhost:3001/`
Confirm in order:
1. Hero — open span "LED → 智能系统" with primary "查看课程地图" + secondary "聊聊合作"
2. FamiliarObjects — 6-tile strip (LED / 传感器 / 网关 / 摄像头 / 空间设备 / 交付文档)
3. MapPreview — M0–M5 chips + L1/L2/L3 strip + axis legend column
4. GoalPaths — 5 goal-named rows (从硬件基础 / 智能空间 / 远距物联 / 视觉 AI / demo→交付)
5. Outcomes — dark section, 2x2 grid
6. Partners — existing logos
7. Final CTA — primary "查看课程地图", secondary "聊聊合作"

No "高校 · 集成商 · 企业" trio anywhere on the homepage. No "我们不只是提供解决方案" slogan section.

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.astro src/components/sections/home/
git commit -m "$(cat <<'EOF'
feat(home): recompose homepage per redesign spec

Flow: Hero → familiar objects → map preview → goal paths → outcomes
→ partners → CTA. Removed HomeScenarios (identity-coded),
HomeValueStatement (closed brand slogan), HomeModuleGrid (full matrix
no longer belongs on home — spec § 首页).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: Create `CourseAxisLegend.astro` and add to courses page

Spec § 课程体系页: make the axes' meaning unambiguous. M0 = start, M1–M4 = independent technical directions, M5 = vertical delivery integration. L1/L2/L3 = depth, not difficulty alone.

**Files:**
- Create: `src/components/sections/courses/CourseAxisLegend.astro`
- Modify: `src/pages/courses/index.astro`

- [ ] **Step 1: Create the legend component**

Write `src/components/sections/courses/CourseAxisLegend.astro`:

```astro
---
import { Icon } from 'astro-icon/components';
import SectionHeader from '../../SectionHeader.astro';
import { homeMapLegend } from '../../../data/site';

const { axisX, axisY, anchors, note } = homeMapLegend;
---

<section class="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-brand-black/10">
  <div class="max-w-6xl mx-auto">
    <SectionHeader
      eyebrow="How To Read This Map"
      title="先读懂坐标，再选课"
      subtitle="这张图不是课程清单——它是一张能让你按方向、按深度、按目标自由组合的课程地图。"
    />

    <div class="mt-10 grid md:grid-cols-2 gap-6">
      <div class="border-2 border-brand-black rounded-2xl p-6 bg-brand-yellow-light">
        <p class="text-xs font-mono font-bold uppercase tracking-widest text-brand-red mb-3">{axisX.label}</p>
        <p class="text-sm leading-relaxed text-brand-black">{axisX.description}</p>
        <ul class="mt-4 space-y-2 text-sm">
          {anchors.map((a) => (
            <li class="flex items-baseline gap-3">
              <span class="font-mono font-black text-brand-red w-14 shrink-0">{a.code}</span>
              <span class="text-brand-black">{a.role}</span>
            </li>
          ))}
        </ul>
      </div>
      <div class="border-2 border-brand-black rounded-2xl p-6 bg-white">
        <p class="text-xs font-mono font-bold uppercase tracking-widest text-brand-red mb-3">{axisY.label}</p>
        <p class="text-sm leading-relaxed text-brand-black">{axisY.description}</p>
        <ul class="mt-4 space-y-2 text-sm font-mono">
          <li class="flex items-baseline gap-3"><span class="font-black text-brand-red w-14 shrink-0">L1</span><span class="text-brand-black">跑通 demo，理解原理</span></li>
          <li class="flex items-baseline gap-3"><span class="font-black text-brand-red w-14 shrink-0">L2</span><span class="text-brand-black">独立完成小项目</span></li>
          <li class="flex items-baseline gap-3"><span class="font-black text-brand-red w-14 shrink-0">L3</span><span class="text-brand-black">可交付的系统能力</span></li>
        </ul>
      </div>
    </div>

    <p class="mt-6 text-xs leading-relaxed text-gray-600 flex items-start gap-2">
      <Icon name="lucide:compass" class="w-4 h-4 text-brand-red mt-0.5 shrink-0" />
      <span>{note}</span>
    </p>
  </div>
</section>
```

- [ ] **Step 2: Wire into `src/pages/courses/index.astro`**

Insert `CourseAxisLegend` directly after the hero, before `CourseMatrixSection`:

```astro
---
import HeroBanner from '../../components/HeroBanner.astro';
import Layout from '../../layouts/Layout.astro';
import FinalCtaSection from '../../components/sections/FinalCtaSection.astro';
import CourseAxisLegend from '../../components/sections/courses/CourseAxisLegend.astro';
import CourseMatrixSection from '../../components/sections/courses/CourseMatrixSection.astro';
import CourseModulesExplorer from '../../components/sections/courses/CourseModulesExplorer.astro';
import LearningTracksSection from '../../components/sections/courses/LearningTracksSection.astro';
import { modules } from '../../data/modules';
import { coursesFinalCta } from '../../data/site';
---

<Layout title="课程体系">
  <HeroBanner
    panel="yellow-soft"
    eyebrow="2026 课程地图 · M0 + M1–M5"
    title="一张地图，看清 6 个方向 × 3 种深度"
    description="不必从头到尾线性学。选方向、选深度、选目标——三种组合方式都能拼出属于自己的路径。"
  />

  <CourseAxisLegend />
  <CourseMatrixSection />
  <LearningTracksSection />
  <CourseModulesExplorer modules={modules} />
  <FinalCtaSection cta={coursesFinalCta} />

  <script>
    import '../../scripts/courseViewToggle';
  </script>
</Layout>
```

Note the order change: `LearningTracksSection` moved **above** `CourseModulesExplorer` (spec: paths primary, cards secondary).

- [ ] **Step 3: Build check**

Run: `pnpm build`
Expected: success.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/courses/CourseAxisLegend.astro src/pages/courses/index.astro
git commit -m "$(cat <<'EOF'
feat(courses): add axis legend; reorder paths above explorer

Spec § 课程体系页 — axes need explicit explanation; paths are primary,
cards-explorer is secondary aid.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 10: Update `LearningTracksSection` for goal-based tracks

The section already consumes `tracks.ts`. With Task 1's rewrite the data is correct, but copy and rendering may need adjustment: show `goal` field, accept that some tracks have 1 module (no arrow chain).

**Files:**
- Modify: `src/components/sections/courses/LearningTracksSection.astro`

- [ ] **Step 1: Read current implementation**

Read `src/components/sections/courses/LearningTracksSection.astro`. Identify:
- Section header copy that still implies identity (e.g., "为不同角色定制的学习路径").
- Whether `TrackFlow.astro` (the module-chain renderer) breaks on a 1-module track.

- [ ] **Step 2: Update header copy + show goal**

Rewrite the section header copy to be goal-oriented. Sample replacement (adapt to existing markup structure):

```astro
<SectionHeader
  eyebrow="Goal-Oriented Paths"
  title="按目标拼路径，五种典型走法"
  subtitle="不按身份划分——这五条路径覆盖了大多数学习者真正想要达成的目标。每一条都给出推荐模块顺序。"
/>
```

For each track render, surface the new `goal` field above or alongside `tagline`:

```astro
<p class="text-xs font-mono font-bold uppercase tracking-widest text-brand-red">{track.tagline}</p>
<h3 class="text-xl md:text-2xl font-black text-brand-black mt-1">{track.name}</h3>
<p class="text-sm text-brand-black/70 mt-1">{track.goal}</p>
<p class="text-sm text-gray-700 mt-3">{track.description}</p>
```

Add anchor IDs on each track block: `id={`track-${track.id}`}` so `HomeGoalPaths` links into them.

- [ ] **Step 3: Handle 1-module tracks**

If `TrackFlow.astro` always renders arrows between modules, ensure single-module tracks (`from-basics`, `demo-to-delivery`) render without a trailing arrow or empty state. Either:
- Check `moduleIds.length > 1` before rendering chain UI, or
- Add a graceful fallback "聚焦于 {code}" badge.

Pick whichever requires the smaller edit and matches existing markup.

- [ ] **Step 4: Build check**

Run: `pnpm build`
Expected: success, all 6 module pages still prerender.

- [ ] **Step 5: Manual review**

Visit `http://localhost:3001/courses` — `LearningTracksSection` should show 5 goal-named cards with no identity language ("面向集成商" etc.). Anchor links from homepage `#track-smart-space` etc. should scroll into view.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/courses/LearningTracksSection.astro
git commit -m "$(cat <<'EOF'
feat(courses): surface track goals, anchor IDs, handle 1-module paths

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 11: Downscale `CourseModulesExplorer`

Spec § 课程体系页: "矩阵和路径为主，卡片只作解释辅助". The explorer is now positioned below paths (Task 9 reordered). Lower its visual weight: default to compact list view, smaller header, less yellow flooding.

**Files:**
- Modify: `src/components/sections/courses/CourseModulesExplorer.astro`
- Modify: `src/scripts/courseViewToggle` (if needed — to flip default)

- [ ] **Step 1: Default to list view**

In `CourseModulesExplorer.astro`:
- Swap the `hidden` attribute: put it on `#wrapper-card-view`, remove from `#wrapper-list-view`.
- Swap the button active states: `btn-list-view` gets `bg-brand-black text-white`, `btn-card-view` gets the muted style.
- Swap `aria-pressed`: `true` on `btn-list-view`, `false` on `btn-card-view`.

- [ ] **Step 2: Tone down visuals**

Change the section wrapper:
```astro
<section class="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-brand-black/10">
```
(Was `py-14 md:py-20` and `bg-brand-yellow-light` — yellow surface load belongs to the matrix above, not here.)

Demote the header from h2/section-flag to a smaller treatment:
```astro
<div>
  <p class="text-xs font-mono font-bold uppercase tracking-widest text-brand-red mb-2">Module Reference</p>
  <h2 class="text-2xl md:text-3xl font-black text-brand-black">六个模块的速查卡</h2>
  <p class="mt-3 text-sm md:text-base text-gray-600 max-w-2xl">想看每个模块的硬件、能力、受众？这里是详细参考。</p>
</div>
```

- [ ] **Step 3: Check toggle script**

Open `src/scripts/courseViewToggle.ts` (or `.js`). If it asserts a starting state (assumes card view is the default `aria-pressed=true`), update it so it doesn't fight the new default. Initial state should be: list view visible, list button pressed.

- [ ] **Step 4: Build + manual review**

Run: `pnpm build`
Visit: `http://localhost:3001/courses`
Confirm: page now reads matrix → tracks → list-view module reference → CTA. The page no longer "stacks two yellow card walls" in a row.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/courses/CourseModulesExplorer.astro src/scripts/courseViewToggle*
git commit -m "$(cat <<'EOF'
refactor(courses): downscale module explorer to secondary reference

Spec § 课程体系页 — matrix and paths are primary, cards are aid only.
Default to compact list view, lower visual weight, drop yellow surface.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 12: Surface `realProblem` + `deliverables` on module detail pages

Two insertion points:
- `CourseDetailHero` — add a `realProblem` paragraph below the `oneLiner`.
- A new section block — render `deliverables` as a strip (chip list) between `CourseLearningLadder` and `CourseAudienceSection`.

**Files:**
- Modify: `src/components/sections/courses/CourseDetailHero.astro`
- Create: `src/components/sections/courses/CourseDeliverables.astro`
- Modify: `src/pages/courses/[slug].astro`

- [ ] **Step 1: Add `realProblem` to hero**

In `CourseDetailHero.astro`, after the `<p>` showing `module.oneLiner` (around line 43–45), insert:

```astro
<div class="mt-6 border-l-4 border-brand-red bg-white/70 backdrop-blur-sm px-4 py-3 max-w-2xl rounded-r-lg">
  <p class="text-xs font-mono font-bold uppercase tracking-widest text-brand-red mb-1">这个模块解决什么</p>
  <p class="text-sm leading-relaxed text-brand-black">{module.realProblem}</p>
</div>
```

- [ ] **Step 2: Create `CourseDeliverables.astro`**

Write `src/components/sections/courses/CourseDeliverables.astro`:

```astro
---
import { Icon } from 'astro-icon/components';
import type { Module } from '../../../data/modules';

interface Props {
  module: Module;
}

const { module } = Astro.props as Props;
---

<section class="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-brand-black text-white noise-overlay">
  <div class="max-w-6xl mx-auto">
    <div class="flex items-center gap-3 mb-6">
      <Icon name="lucide:package" class="w-6 h-6 text-brand-yellow" />
      <p class="text-xs font-mono font-bold uppercase tracking-widest text-brand-yellow">Deliverables</p>
    </div>
    <h2 class="text-3xl md:text-4xl font-black text-white tracking-tight">学完拿走什么</h2>
    <p class="mt-3 text-sm md:text-base text-white/70 max-w-3xl leading-relaxed">
      不是一堆 demo，而是可以被现场点亮、被客户验收、被团队复制的产出物。
    </p>

    <ul class="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border-2 border-white/20 rounded-2xl overflow-hidden">
      {module.deliverables.map((d) => (
        <li class="bg-brand-black p-5 flex items-start gap-3">
          <Icon name="lucide:check" class="w-5 h-5 text-brand-yellow shrink-0 mt-0.5" />
          <span class="text-sm font-bold text-white leading-relaxed">{d}</span>
        </li>
      ))}
    </ul>
  </div>
</section>
```

- [ ] **Step 3: Wire into `[slug].astro`**

In `src/pages/courses/[slug].astro`, import and slot `CourseDeliverables` between `CourseLearningLadder` and `CourseAudienceSection`:

```astro
import CourseDeliverables from '../../components/sections/courses/CourseDeliverables.astro';
// ...
<CourseDetailHero module={module} totalDays={totalDays} />
<CourseDetailPanels module={module} />
<CourseLearningLadder module={module} />
<CourseDeliverables module={module} />
<CourseAudienceSection module={module} />
<CourseRelatedTracks relatedTracks={relatedTracks} />
<FinalCtaSection cta={courseDetailCta} bordered />
```

- [ ] **Step 4: Build all 6 module pages**

Run: `pnpm build`
Expected: build succeeds, output includes `/courses/m0/index.html` through `/courses/m5/index.html`.

- [ ] **Step 5: Manual review**

Visit each module page (`/courses/m0` … `/courses/m5`):
1. Hero shows red-bordered "这个模块解决什么" block with the `realProblem` text.
2. New dark "Deliverables" section appears after the ladder, before audience.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/courses/CourseDetailHero.astro src/components/sections/courses/CourseDeliverables.astro src/pages/courses/[slug].astro
git commit -m "$(cat <<'EOF'
feat(module-detail): surface real problem and deliverables

Spec § 模块详情页 — every module must answer "what real problem" and
"what concrete deliverables" come out.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 13: Remove `ContactInlineFormSection`

The inline form violates the `partnership-form-via-qr` memory rule: Chaihuo contact/partnership forms must be QR → external page, never inline web forms. This task removes the inline form section that was added when the spec was still being drafted.

**Files:**
- Modify: `src/pages/contact.astro`
- Delete: `src/components/sections/contact/ContactInlineFormSection.astro`
- Modify: `src/scripts/contactPage` (if it only existed for the inline form)

- [ ] **Step 1: Edit `contact.astro`**

Remove the `ContactInlineFormSection` import and render. Also check whether `scripts/contactPage` is still needed for any other contact-page interactivity (FAQ accordion, scroll-to-form anchors). If it was inline-form-specific, drop the `<script>` import too.

```astro
---
import HeroBanner from '../components/HeroBanner.astro';
import Layout from '../layouts/Layout.astro';
import ContactFaqSection from '../components/sections/contact/ContactFaqSection.astro';
import ContactFormsSection from '../components/sections/contact/ContactFormsSection.astro';
import ContactScenariosSection from '../components/sections/contact/ContactScenariosSection.astro';
import { partnershipForms, scenarios } from '../data/partnerships';
import { contactFaqs } from '../data/site';
---

<Layout title="合作咨询">
  <HeroBanner
    panel="yellow-soft"
    eyebrow="合作咨询"
    title="3 类合作场景 · 4 种合作形态，总有一款对齐你的目标"
    description="告诉我们你是谁、想做什么，我们给出清晰的合作路径与交付标准。"
  >
    <Fragment slot="title">
      3 类合作场景 · 4 种合作形态<br />总有一款对齐你的目标
    </Fragment>
  </HeroBanner>

  <ContactScenariosSection scenarios={scenarios} />
  <ContactFormsSection partnershipForms={partnershipForms} />
  <ContactFaqSection faqs={contactFaqs} />
</Layout>
```

(Keep the `<script>` import only if `contactPage` still does useful work after the inline-form removal.)

- [ ] **Step 2: Delete the inline form component**

```bash
rm src/components/sections/contact/ContactInlineFormSection.astro
```

If `src/scripts/contactPage*` was inline-form-only, also `rm` it.

- [ ] **Step 3: Build check + manual review**

Run: `pnpm build`
Visit: `http://localhost:3001/contact` — page should render scenarios → forms → faqs. No inline form box at the bottom. The `ContactFormsSection` cards should already have QR + external link CTAs (verify); if any card still implies "fill out form below", treat that copy as a follow-up patch.

- [ ] **Step 4: Commit**

```bash
git add src/pages/contact.astro src/components/sections/contact/
git commit -m "$(cat <<'EOF'
fix(contact): remove inline form section

Partnership forms must be QR → external page only (chaihuo memory rule).
Inline web form is a regression introduced before that rule was codified.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 14: Update `CLAUDE.md`; final sweep

Bring CLAUDE.md in line with the new structure: 5 goal-based tracks (was 4 identity-based), homepage section list, removed components. Also do a final read-through of every redesigned page to catch remaining identity language or stray references.

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update `CLAUDE.md` Architecture section**

Edit the **Two-dimensional course matrix** section:
- Change "Four curated **Tracks**" → "Five goal-oriented **Tracks**".
- Replace "wire `M0 → Mx → M5` sequences for typical roles" with "wire module sequences keyed to common learning goals (from hardware basics, smart space, field IoT, edge vision, demo-to-delivery)".

Edit the **Reusable components** list:
- Replace `HeroBanner` line with the same — still page-level hero.
- Remove references to deleted components if any line names them.
- Add new component categories under home/courses/module sections if helpful (optional).

Edit the **Gotchas** section:
- Change "**M-module prerequisite rule** — M0 is the universal entry point; M1–M5 are independent after that. The 4 Tracks in `src/data/tracks.ts` always start with M0 and end with M5." to: "**M-module prerequisite rule** — M0 is recommended as the universal entry point; M1–M5 are independent after that. The 5 goal-oriented tracks in `src/data/tracks.ts` do **not** all follow `M0 → … → M5` (the `from-basics` track is M0-only, `demo-to-delivery` is M5-only)."

- [ ] **Step 2: Final visual sweep**

Run `pnpm dev` and walk through every page. For each, check the spec's hard "avoid" list:
- No "高校/集成商/企业" trio on homepage.
- No closed-brand slogans ("不是…而是…").
- No section calling M0–M5 "the academy's complete course offering".
- No marketing CTA stack ("立即/抢先" etc.).
- No inline web form on /contact.

If anything slips through, fix and amend the most recent relevant commit (or add a small follow-up commit).

- [ ] **Step 3: Final TypeScript + build**

Run: `pnpm check && pnpm build`
Expected: 0 errors, all 6 module pages prerender, full site builds.

- [ ] **Step 4: Commit `CLAUDE.md` update**

`CLAUDE.md` is in `.gitignore` (along with `docs/`) but the team commits these with `-f` (see commits `034603c`, the spec commit, and the plan commit). Follow the same pattern:

```bash
git add -f CLAUDE.md
git commit -m "$(cat <<'EOF'
docs: update CLAUDE.md for goal-based tracks + redesigned home

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Post-completion checklist

After Task 14:

- [ ] `pnpm check` — 0 errors
- [ ] `pnpm build` — full prerender succeeds, 6 module pages output
- [ ] Manual walk-through of `/`, `/courses`, `/courses/m0` through `/courses/m5`, `/contact`, `/about`
- [ ] Pre-existing dirty files (`Footer.astro`, `Navbar.astro`, `Layout.astro`, `public/favicon.svg`) are **untouched** by these commits — confirm with `git status` that they're still showing as modified/untracked from the original snapshot.
- [ ] Commit history reads as a focused redesign series, not a sweep.
