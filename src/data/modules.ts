export type ModuleId = 'm0' | 'm1' | 'm2' | 'm3' | 'm4' | 'm5' | 'm6';
export type LevelId = 'L1' | 'L2' | 'L3';

export interface ModuleCell {
  title: string;
  subtitle: string;
  durationDays: number;
  outcomes: string[];
  comingSoon?: boolean;
}

/** 一条 hero 速览事实（难度 / 时长 / 排课形态…）。 */
export interface ModuleFact {
  label: string;
  value: string;
}

/** 一件课程硬件：名称 + 一句话速览 + 图文说明。 */
export interface HardwareItem {
  name: string;
  /** 一句话速览（卡片副标题）。 */
  note: string;
  /** 详细介绍（卡片正文）。 */
  description: string;
  image: string;
  imageAlt: string;
}

/** 课程所需硬件的图文介绍区块（M1–M6 使用；M0 用 kits/hardwareList）。 */
export interface HardwareIntro {
  /** 区块主标题。缺省时用通用标题「课程所需硬件」。 */
  title?: string;
  subtitle?: string;
  items: HardwareItem[];
  /** 区块底部的配件备注（屏幕 / 电源 / 路由器等通用配件）。 */
  note?: string;
}

/** 一张能力卡：标题 + 展开说明。`capabilities` 的长文形态。 */
export interface Capability {
  title: string;
  body: string;
}

/** 一项交付物：标题 + 展开说明。`deliverables` 的长文形态。 */
export interface Deliverable {
  title: string;
  body: string;
}

/** 工具链接力的一段（如 Codecraft → aily-blockly 的前半程 / 后半程）。 */
export interface ToolchainStage {
  name: string;
  meta: string;
  steps: string[];
  /** 柔黄底强调这一段（全站唯一允许的黄面，见 docs/DESIGN.md §1.1）。 */
  highlight?: boolean;
}

export interface Toolchain {
  stages: ToolchainStage[];
  /** 两段之间的转折点，渲染为反转黑面窄条。 */
  hinge: { title: string; body: string };
  note?: string;
}

/** 一套子套件（M0-A / B / C）。 */
export interface Kit {
  code: string;
  title: string;
  hardware: string;
  body: string;
  image: string;
  imageAlt: string;
}

/** 备料池：套件之外可自由取用的模块。 */
export interface KitPool {
  title: string;
  body: string;
}

/** 覆盖深度：完整 / 精简 / 不含 / 比完整版更深。 */
export type Coverage = 'full' | 'part' | 'none' | 'plus';

/** 一个教学模块（10 模块骨架的一行）。 */
export interface CurriculumItem {
  no: string;
  title: string;
  detail: string;
  tool: string;
  /** 各排课形态对该模块的覆盖深度，键为 Format['id']。 */
  coverage: Record<string, Coverage>;
  /** 关键转折点，行内高亮。 */
  hinge?: boolean;
}

/** 一种排课形态（周课 / 课后 / 集训 / 马拉松 / 体验课…）。 */
export interface Format {
  id: string;
  name: string;
  meta: string;
  shortName: string;
  shortMeta: string;
}

/** 形态所属的层（完整版 / 马拉松版 / 体验课）。 */
export interface Tier {
  title: string;
  /** Final Project 的交付程度。 */
  finalProject: { label: string; included: boolean };
  summary: string;
  rows: { title: string; meta: string; body: string }[];
  footnote: string;
}

/** 「写给老师」：底座 + 可改写的口子 + 作者引言。 */
export interface TeacherNotes {
  heading: string;
  /** heading 中需要黄色下划线强调的片段，必须是 heading 的子串。 */
  emphasis?: string;
  intro: string;
  openings: { no: string; title: string; body: string }[];
  quote: { text: string; cite: string };
}

export interface Module {
  id: ModuleId;
  slug: string;
  code: string;
  title: string;
  subtitle: string;
  oneLiner: string;
  /** oneLiner 中需要黄色下划线强调的片段，必须是 oneLiner 的子串。 */
  oneLinerEmphasis?: string;
  realProblem: string;
  illustration: string;
  difficulty: string;
  duration: string;
  prerequisite?: string;
  scenarios: string[];
  painPoints: string[];
  techStack: string[];
  coreHardware: string[];
  capabilities: string[];
  audience: string[];
  deliverables: string[];
  accent: 'red' | 'yellow';
  cells: Record<LevelId, ModuleCell>;

  // ── 以下为可选深度内容 ─────────────────────────────────────────
  // 目前只有 M0 提供。字段缺席时 /courses/[slug] 直接跳过对应区块，
  // M1–M6 无需改动。将来任一模块想要同样的深度，填上即可。

  /** hero 速览条。缺省时不渲染。 */
  facts?: ModuleFact[];
  /** 核心硬件的图文清单（hero 侧栏）。 */
  hardwareList?: { key: string; name: string; note: string }[];
  /** M1–M6 课程所需硬件的图文介绍区块。 */
  hardwareIntro?: HardwareIntro;
  /** 能力卡长文版。存在时取代 `capabilities` 的短语渲染。 */
  capabilityCards?: Capability[];
  /** 能力卡下方的补充说明块。 */
  capabilityCallout?: string;
  /** 工具链接力。 */
  toolchain?: Toolchain;
  /** 子套件 + 备料池。 */
  kits?: { items: Kit[]; pool: KitPool };
  /** 10 模块骨架 × 排课形态矩阵。与 `formats` 成对出现。 */
  curriculum?: { items: CurriculumItem[]; callout?: string };
  /** 排课形态定义 + 分层详情。 */
  formats?: { items: Format[]; tiers: Tier[]; callouts?: string[]; warnings?: string[] };
  /** 交付物长文版。存在时取代 `deliverables` 的短语渲染。 */
  deliverableCards?: Deliverable[];
  /** 交付物区块的前言。 */
  deliverablesIntro?: string;
  /** 写给老师。 */
  teacherNotes?: TeacherNotes;
  /** 能力边界与合规约束。 */
  complianceBoundary?: {
    principles?: string[];
    applicable: string[];
    notApplicable: string[];
  };
}

export const modules: Module[] = [
  {
    id: 'm0',
    slug: 'm0',
    code: 'M0',
    title: '零基础智能硬件入门',
    subtitle: '告别编程门槛，用中文告诉 AI 做什么，零基础也能做出智能硬件作品',
    oneLiner:
      '用中文告诉 AI 你想做什么，AI 写代码、编译、烧录。零编程基础，也能做出属于自己的智能硬件作品。',
    oneLinerEmphasis: '零编程基础',
    realProblem:
      '学生不会写代码、合格师资极少、从创意到原型总是断层——硬件启蒙卡在"先学会编程"这道伪门槛上。M0 把门槛拆掉，让想象力重新成为真正的难题。',
    illustration: '/illustrations/m0.png',
    difficulty: '入门',
    duration: '半天起 · 完整版 16–20 小时',
    prerequisite: '无',
    scenarios: [
      '高校通识课',
      '创客训练营',
      'K12 课后服务 / 四点半课堂',
      '科技节 · 双创周',
      '教师工作坊',
      '企业创新体验',
      '柴火基地车巡游',
    ],
    painPoints: ['学生不会写代码', '合格师资极少', '创意到原型断层'],
    techStack: ['Codecraft', 'aily-blockly', 'Grove · Wio Terminal · XIAO', 'BMAD', 'NLHD 教材'],
    coreHardware: ['Grove 套件', 'Wio Terminal', 'XIAO ESP32S3 Sense'],
    capabilities: [
      'AI 辅助编程 5 大法则',
      '感知→逻辑→输出 心智模型',
      'BMAD 五角色项目工作流',
      'SenseCraft AI 无代码模型部署',
    ],
    audience: ['零基础学生', '高校通识课教师', '创客训练营学员', '企业创新体验人员'],
    deliverables: [
      '第一个可运行的智能硬件原型',
      '一个有结构的完整项目（如智能番茄钟）',
      '边缘 AI 图像分类 demo',
    ],
    accent: 'red',
    // M0 按硬件平台分层（A: Grove / B: Wio Terminal / C: XIAO），映射到矩阵的 L1/L2/L3 三行。
    cells: {
      L1: {
        title: 'A · 感知',
        subtitle: 'Grove × Codecraft',
        durationDays: 1,
        outcomes: [
          '用 Grove 套件在 Codecraft 完成第一个可运行原型',
          '建立「感知→逻辑→输出」心智模型',
          '掌握 AI 辅助编程 5 大法则',
        ],
      },
      L2: {
        title: 'B · 交互',
        subtitle: 'Wio Terminal × BMAD',
        durationDays: 1,
        outcomes: [
          '用 Wio Terminal 彩屏实现人机交互界面',
          '以 BMAD 五角色工作流完成有结构的完整项目',
          '交付如智能番茄钟等可演示作品',
        ],
      },
      L3: {
        title: 'C · 视觉',
        subtitle: 'XIAO ESP32S3 Sense',
        durationDays: 1,
        outcomes: [
          '用 XIAO 摄像头实现图像分类与边缘 AI 推理',
          '体验 SenseCraft AI 无代码模型部署',
          '理解边缘视觉的基本流程',
        ],
      },
    },

    facts: [
      { label: '难度', value: '入门' },
      { label: '时长', value: '完整版 16–20 小时' },
      { label: '最短形态', value: '半天 2 小时' },
      { label: '排课形态', value: '3 层 6 种' },
      { label: '硬件平台', value: 'A/B/C 三层 · Grove / Wio Terminal / XIAO' },
      { label: 'AI 编程', value: 'Codecraft 云端 + aily-blockly 本地' },
    ],

    hardwareList: [
      { key: 'A', name: 'Grove Beginner Kit', note: '11 模块一体式底板 · 免焊接' },
      { key: 'B', name: 'Wio Terminal', note: '2.4″ 彩屏 + 摇杆 + 按键' },
      { key: 'C', name: 'XIAO ESP32S3 Sense', note: '拇指盖大小 + 摄像头 + 麦克风' },
      { key: '＋', name: 'Grove 40 合一备料池', note: '分组共用 · 做项目时自由取用' },
    ],

    capabilityCards: [
      {
        title: '感知 → 逻辑 → 输出',
        body: '拿到任何一个智能产品，能立刻拆解出「它感知什么、怎么判断、输出什么」，并画出自己的系统草图。',
      },
      {
        title: '把想法说清楚',
        body: '把「我想做个提醒喝水的东西」变成 AI 能精确理解的结构化需求：输入 / 逻辑 / 输出 / 边界。',
      },
      {
        title: '和 AI 协作',
        body: 'AI 辅助编程 5 大法则：一次只改一件事、报错原样贴回去、先跑通再优化、让 AI 解释、留住能用的版本。',
      },
      {
        title: 'BMAD 五角色工作流',
        body: '用 PM / UX / 架构 / 开发 / 测试 五个角色分步驱动 AI，把「能跑」的原型做成「有结构、能维护」的项目。',
      },
      {
        title: '调试与迭代',
        body: '看得懂报错、找得到问题、改得动作品；知道卡住时的三步求助法——问 AI、问同桌、问老师。',
      },
      {
        title: '记录与讲述',
        body: '写创客日志、录 30 秒演示视频、用 2 分钟把「痛点 → 方案 → 演示 → 价值」讲给陌生人听。',
      },
    ],
    capabilityCallout:
      'BMAD 不只是做硬件的方法。写作业、做小组课题、策划一场活动，都能套用同一个流程。这是学生能带走的「元方法」——也是这门课里唯一一件，十年后大概率还在用的东西。',

    toolchain: {
      stages: [
        {
          name: 'Codecraft',
          meta: '浏览器 · 零安装 · 5 分钟见效',
          steps: ['完全新手', '能跑通'],
          highlight: true,
        },
        {
          name: 'aily-blockly',
          meta: '桌面 · 工程化 · 作品永久属于自己',
          steps: ['能改代码', '能造工程', '能带走继续做'],
        },
      ],
      hinge: {
        title: '关键转折点 · 模块 8',
        body: 'Codecraft 的作品在服务器上，关掉浏览器就带不走；aily-blockly 让学生第一次从"租户"变成项目的"主人"。',
      },
      note: '另需 SenseCraft AI（无代码部署与训练视觉模型，用于模块 5 与视觉体验课，需外网）、NLHD 15 章中文教材（开源免费，结课后可长期自学）。',
    },

    kits: {
      items: [
        {
          code: 'M0-A',
          title: '环境感知',
          hardware: 'Grove Beginner Kit',
          body: '11 个模块一体式底板：OLED 屏、按键、旋钮、蜂鸣器、LED、光线／温湿度／气压／声音／加速度传感器。免焊接、免面包板。第一个「感知→逻辑→输出」闭环作品。',
          image: '/illustrations/m0-kit-a.png',
          imageAlt: 'Grove Beginner Kit 一体式底板',
        },
        {
          code: 'M0-B',
          title: '交互设计',
          hardware: 'Wio Terminal',
          body: '2.4 寸彩屏 + 三向摇杆 + 三按键 + 内置加速度计 + Grove 接口的掌上开发板。做带界面的人机交互作品：智能番茄钟、水平仪、体感小游戏。',
          image: '/illustrations/m0-kit-b.png',
          imageAlt: 'Wio Terminal 掌上开发板',
        },
        {
          code: 'M0-C',
          title: '视觉智能',
          hardware: 'XIAO ESP32S3 Sense',
          body: '拇指盖大小主控 + OV2640 摄像头 + 数字麦克风 + SD 卡槽，配扩展板、蜂鸣器、mini 风扇。端侧 AI：图像分类、人脸／物体检测。',
          image: '/illustrations/m0-kit-c.png',
          imageAlt: 'XIAO ESP32S3 Sense 与扩展配件',
        },
      ],
      pool: {
        title: '＋ Grove 40 合一扩展套件（分组共用备料池）',
        body: '超声波测距、水位、土壤湿度、震动、舵机、继电器、MP3、RGB 灯带…… 做自己的项目时自由取用，不受「套件里只有这几个模块」的限制。',
      },
    },

    formats: {
      items: [
        {
          id: 'weekly',
          name: '完整版 · 周课排',
          meta: '10 次 × 2h',
          shortName: '周课',
          shortMeta: '10×2h',
        },
        {
          id: 'after-school',
          name: '完整版 · 课后排',
          meta: '16 次 × 1h',
          shortName: '课后',
          shortMeta: '16×1h',
        },
        {
          id: 'intensive',
          name: '完整版 · 集训排',
          meta: '4–5 天 × 4h',
          shortName: '集训',
          shortMeta: '4–5天',
        },
        {
          id: 'marathon',
          name: '马拉松版',
          meta: '2 天 · 12–14h',
          shortName: '马拉松',
          shortMeta: '2天',
        },
        {
          id: 'coding-taster',
          name: '编程体验课',
          meta: '半天 · 2h',
          shortName: '编程',
          shortMeta: '2h',
        },
        {
          id: 'vision-taster',
          name: '视觉体验课',
          meta: '半天 · 2h',
          shortName: '视觉',
          shortMeta: '2h',
        },
      ],
      tiers: [
        {
          title: '完整版',
          finalProject: { label: 'FP 完整', included: true },
          summary: '16–20h · M0-A + B + C + 备料池',
          rows: [
            {
              title: '周课排',
              meta: '10 次 × 2 小时 · 20h',
              body: '社团课、周末营、每周一次的常规课程',
            },
            {
              title: '课后排',
              meta: '16 次 × 1 小时 · 16h',
              body: '课后服务 / 四点半课堂等单节偏短的时段',
            },
            {
              title: '集训排',
              meta: '4–5 天 × 4 小时 · 16–20h',
              body: '寒暑假冬夏令营、驻校集训周',
            },
          ],
          footnote: 'Codecraft + aily-blockly + SenseCraft AI · 10 个模块全覆盖',
        },
        {
          title: '马拉松版',
          finalProject: { label: 'FP 精简', included: true },
          summary: '2 天 · 12–14h · 仅 M0-A + 备料池',
          rows: [
            {
              title: 'Day 1 上午',
              meta: '模块 1 + 2',
              body: '不可能挑战 → Grove 感知闭环 → 3 个小作品',
            },
            {
              title: 'Day 1 下午',
              meta: '模块 6 + 4（BMAD 精简）',
              body: '找一个真问题 → 组队选题 → PRD',
            },
            { title: 'Day 2 上午', meta: '模块 7', body: '备料池选型 → 原型冲刺 → MVP v0.1' },
            { title: 'Day 2 下午', meta: '模块 9 + 10', body: '迭代 → 文档 → 30 秒视频 → 路演' },
          ],
          footnote: '单一硬件平台是刻意的：把全部时间押在创意、原型、文档上。助教配比建议 1:5–6。',
        },
        {
          title: '体验课',
          finalProject: { label: '无 FP', included: false },
          summary: '半天 2h · 零安装 · 单一硬件',
          rows: [
            {
              title: '编程体验课',
              meta: 'Wio Terminal × Codecraft',
              body: '卖「AI 能帮我做事」——2 小时做出智能番茄钟，走一遍 BMAD。方法可迁移。',
            },
            {
              title: '视觉体验课',
              meta: 'XIAO × SenseCraft AI',
              body: '卖「AI 能装进指甲盖」——一行代码不写，训出自己的模型。门槛最低。',
            },
          ],
          footnote:
            '两门可合并成一个整天（4h）体验日：上午编程、下午视觉，覆盖生成式 AI + 端侧 AI 两条主线。',
        },
      ],
      callouts: [
        '编程体验课是柴火基地车（MCV）全国巡游的标配工作坊。零安装、单一硬件、2 小时闭环、断网只是慢不会废场——这四条正是「车到人到、当天开课」最需要的性质。基地车上的分工：快闪一站 → 编程体验课；驻校两天 → 马拉松版；有网络且做 AI 主题 → 视觉体验课。',
      ],
      warnings: [
        '选课后排（16×1h）前请注意：16 × 1h = 16 小时，比周课排的 20 小时少 4 小时；每节固定开销（开机、发设备、连线、收纳）约 10 分钟，节数越多损耗越大——实际动手时间约 13h vs 18h。取舍是真实的：FP 迭代从两轮压到一轮，发布会 1 小时偏紧，建议争取双节连堂。',
        '16 次建议每周 2 次，不要每周 1 次。每周 1 次战线拉到 16 周（约一整学期），学生对自己的 Final Project 会「掉线」。每周 2 次 ≈ 8 周，节奏与周课排接近。',
        '视觉体验课的唯一硬约束是网络。SenseCraft AI 在云端训练，必须能访问外网且撑住全班并发上传——编程体验课断网只是慢，视觉体验课断网就是整场报废。落地前柴火会到场实测完整链路，并备好热点与预制模型兜底。',
      ],
    },

    curriculum: {
      items: [
        {
          no: '01',
          title: '不可能挑战',
          detail: '5 分钟让屏幕显示自己的名字 · AI 编程心智建立',
          tool: 'Codecraft',
          coverage: {
            weekly: 'full',
            'after-school': 'full',
            intensive: 'full',
            marathon: 'full',
            'coding-taster': 'part',
            'vision-taster': 'none',
          },
        },
        {
          no: '02',
          title: 'Grove 进阶',
          detail: '感知→逻辑→输出闭环 · AI 辅助编程 5 大法则',
          tool: 'Codecraft',
          coverage: {
            weekly: 'full',
            'after-school': 'full',
            intensive: 'full',
            marathon: 'full',
            'coding-taster': 'none',
            'vision-taster': 'none',
          },
        },
        {
          no: '03',
          title: 'Wio Terminal 带屏交互',
          detail: '界面、状态、按键',
          tool: 'Codecraft',
          coverage: {
            weekly: 'full',
            'after-school': 'full',
            intensive: 'full',
            marathon: 'none',
            'coding-taster': 'full',
            'vision-taster': 'none',
          },
        },
        {
          no: '04',
          title: 'BMAD 五角色工作流',
          detail: '从「能跑」到「有结构」· 智能番茄钟',
          tool: 'Codecraft + BMAD',
          coverage: {
            weekly: 'full',
            'after-school': 'full',
            intensive: 'full',
            marathon: 'part',
            'coding-taster': 'full',
            'vision-taster': 'none',
          },
        },
        {
          no: '05',
          title: 'XIAO + 摄像头',
          detail: '什么是端侧 AI（TinyML）· 图像分类实战',
          tool: 'SenseCraft AI',
          coverage: {
            weekly: 'full',
            'after-school': 'full',
            intensive: 'full',
            marathon: 'none',
            'coding-taster': 'none',
            'vision-taster': 'plus',
          },
        },
        {
          no: '06',
          title: '找一个真问题',
          detail: 'Final Project 选题锁定 + PRD + 系统草图',
          tool: '—',
          coverage: {
            weekly: 'full',
            'after-school': 'full',
            intensive: 'full',
            marathon: 'full',
            'coding-taster': 'none',
            'vision-taster': 'none',
          },
        },
        {
          no: '07',
          title: '原型 v1',
          detail: 'MVP 拆解：最多 3 个功能，必须闭环',
          tool: 'Codecraft',
          coverage: {
            weekly: 'full',
            'after-school': 'full',
            intensive: 'full',
            marathon: 'full',
            'coding-taster': 'none',
            'vision-taster': 'none',
          },
        },
        {
          no: '08',
          title: '关键转折点',
          detail: '从浏览器到桌面，第一次「拥有」自己的工程',
          tool: 'aily-blockly',
          hinge: true,
          coverage: {
            weekly: 'full',
            'after-school': 'part',
            intensive: 'full',
            marathon: 'none',
            'coding-taster': 'none',
            'vision-taster': 'none',
          },
        },
        {
          no: '09',
          title: '从玩具到产品',
          detail: '自定义传感器／库 · 外观 · 用户试用 + 互相挑刺',
          tool: 'aily-blockly',
          coverage: {
            weekly: 'full',
            'after-school': 'part',
            intensive: 'full',
            marathon: 'part',
            'coding-taster': 'none',
            'vision-taster': 'none',
          },
        },
        {
          no: '10',
          title: '发布会',
          detail: '打磨 → 录视频 → 路演 → 结营',
          tool: '自选',
          coverage: {
            weekly: 'full',
            'after-school': 'full',
            intensive: 'full',
            marathon: 'full',
            'coding-taster': 'part',
            'vision-taster': 'part',
          },
        },
      ],
      callout:
        '●＋ 是怎么回事：完整版的模块 5 只有一节课，视觉体验课用整整 2 小时只做视觉——因此多出「自己采数据、自己训模型、故意把它训错」这一段，而这恰恰是最有价值的部分。',
    },

    deliverablesIntro:
      '以下为完整版交付；马拉松版交付作品、文档、视频与源码；两门体验课分别交付番茄钟项目与自训 AI 模型。',
    deliverableCards: [
      {
        title: 'Final Project 作品',
        body: '学生自己想解决的问题，不是老师布置的题目。硬件回收，作品照片／视频保留。',
      },
      {
        title: '完整源码',
        body: 'Codecraft 云端作品 3+ 个，aily-blockly 本地工程 1 个，可上传 GitHub。',
      },
      {
        title: '项目文档',
        body: '问题／方案／用户、系统草图、硬件清单、实现过程、AI 协作记录。',
      },
      { title: '30 秒演示视频', body: '横屏，可直接用于比赛、素养档案。' },
      {
        title: '创客日志',
        body: '贯穿全程的过程记录——它就是参赛与发布的现成素材，无需事后补做。',
      },
      {
        title: '自训 AI 模型',
        body: '自己采数据、云端训练、部署在 XIAO 上跑的图像分类模型。',
      },
      {
        title: 'Codecraft 平台席位',
        body: '人手一席，有效期内持续可用——结课后回家打开浏览器就能接着做。',
      },
      { title: '结课证书', body: '柴火创客学园 M0 结业认证（体验课为参与证明）。' },
    ],

    teacherNotes: {
      heading: '我们希望你把它改成我们认不出来的样子',
      emphasis: '我们认不出来的样子',
      intro:
        '这份课程不是一个封闭的产品，是一个底座。柴火是一家创客空间，开源是我们的底色——M0 交付的从来不只是「一次上课」，而是一整套可以被拆开、改写、重新组装的东西：10 模块骨架、教师教案与 PPT、学生手册、Codecraft 云端项目、NLHD 开源教材、40 合一备料池。',
      openings: [
        {
          no: '口子 01',
          title: '换主题',
          body: '模块 6「找一个真问题」的问题域是开放的：你的学科、贵校的科技节、这座城市正在发生的一件真事。问题越靠近学生的生活，效果越好——而这件事你比我们懂。',
        },
        {
          no: '口子 02',
          title: '接资源',
          body: '你已有的社团项目、竞赛课题、校本课程，可以接在模块 7 之后，成为 Final Project 的方向池。M0 负责把技术门槛拆掉，门后面是什么，由你来定。',
        },
        {
          no: '口子 03',
          title: '加你的东西',
          body: '你教了很多年书攒下的那些：讲法、比喻、能让学生眼睛亮起来的那一下——那正是我们没有、也给不了的部分。',
        },
      ],
      quote: {
        text: '一门课最好的归宿，不是被完整地执行一遍，而是被一位老师改到面目全非，然后变成只有他能上的那门课。',
        cite: '—— 冯磊，本系列课程作者',
      },
    },
  },
  {
    id: 'm1',
    slug: 'm1',
    code: 'M1',
    title: '设备互联与智能管控',
    subtitle: '摆脱昂贵商业软件授权，在本地统一纳管各品牌老旧设备',
    oneLiner:
      '基于Home Assistant与ESPHome，在局域网内统一接入多协议设备，实现能耗监控与自动化联动。',
    oneLinerEmphasis: '统一接入多协议设备',
    realProblem:
      '商业楼宇、老旧设施、酒店公寓与工厂辅助车间中，空调、照明、安防等多套子系统独立运行，运维人员需多平台切换且数据互不相通。缺乏回路级能耗计量，仅能查看总表账单，无法精确定位高耗能设备与浪费时段。传统BA系统采用专有封闭协议，设备扩展与更换依赖原厂，改造成本高且周期长。',
    illustration: '/illustrations/m1.svg',
    difficulty: '入门',
    duration: '2 天',
    prerequisite: '无',
    scenarios: [
      '商业楼宇与办公园区智能化增量改造',
      '老旧设施电气与环境监测利旧升级',
      '酒店、公寓与公共空间的统一环境管控与能耗审计',
      '工厂辅助车间温湿度监视与用电回路计量',
      '园区配电回路能耗分项计量与异常告警',
    ],
    painPoints: [
      '多子系统割裂，数据互不相通',
      '能耗流向不明，缺乏回路级计量',
      '专有协议锁定，扩展改造成本高',
    ],
    techStack: [
      'Home Assistant OS',
      'ESPHome',
      'Node-RED',
      'Modbus RTU/TCP',
      'MQTT',
      'Wi-Fi / Zigbee',
      'YAML',
    ],
    coreHardware: [
      'reComputer R1125 / R1225 工业物联网网关',
      'XIAO ESP32-C6 开发板',
      'DDSU666 单相导轨式智能电表',
      'XY-MD02 工业温湿度变送器',
      'XIAO RS485 扩展板',
    ],
    capabilities: [
      '多协议设备统一接入与管理',
      '回路级能耗计量与监控看板搭建',
      '基于YAML与Node-RED的跨设备自动化编排',
      '第三方系统API/MQTT对接',
      '系统备份与灾难恢复',
    ],
    audience: [
      '方案顾问与商务销售',
      '实训讲师与教研团队',
      '职业院校与应用型本科师生',
      '企业运维与智能化改造工程师',
    ],
    deliverables: [
      '系统部署拓扑与网络配置说明',
      '接入设备清单与Modbus寄存器映射表',
      '能耗看板与自动化YAML/Node-RED流程配置文件',
      '系统备份恢复与日常运维指南',
    ],
    accent: 'yellow',
    cells: {
      L1: {
        title: '平台初识与基础设备接入',
        subtitle: '在一个面板统一纳管各品牌设备，摆脱昂贵的商业软件授权',
        durationDays: 1,
        outcomes: [
          '理解Home Assistant基础架构与核心概念（实体、服务、状态、自动化）',
          '掌握ESPHome固件配置与XIAO ESP32-C6传感器接入流程',
          '能在Lovelace仪表盘中配置卡片并进行状态监控',
        ],
        comingSoon: false,
      },
      L2: {
        title: '工业总线对接与场景联动',
        subtitle: '打通存量工业设备，直接查看实时数据并实现跨设备联动',
        durationDays: 3,
        outcomes: [
          '掌握Modbus RTU协议接线、调试与YAML寄存器配置',
          '独立搭建完整的能耗计量与监控看板',
          '掌握多条件自动化编排与异常告警配置',
        ],
        comingSoon: false,
      },
      L3: {
        title: '业务集成与系统运维',
        subtitle: '拥有专属的智慧楼宇监控看板，核心数据完全留在本地',
        durationDays: 5,
        outcomes: [
          '掌握HA与外部管理系统的数据集成方法（REST API/MQTT/Webhook）',
          '能够使用Node-RED编排复杂业务流',
          '具备独立交付可维护系统与实施灾难备份的能力',
        ],
        comingSoon: false,
      },
    },

    facts: [
      { label: '难度', value: '入门' },
      { label: '时长', value: '2 天' },
      { label: '最短形态', value: '1 天（体验课 · L1）' },
      { label: '排课形态', value: '3 层：体验 / 实战 / 交付' },
      { label: '核心协议', value: 'Modbus RTU / MQTT / Wi-Fi / Zigbee' },
    ],

    hardwareList: [
      { key: 'GW', name: 'reComputer R1125 / R1225', note: '工业物联网网关 · HA中枢主机' },
      { key: 'MCU', name: 'XIAO ESP32-C6', note: 'Wi-Fi 6 + BLE 5 微控制器 · 传感器/执行器节点' },
      { key: 'RS485', name: 'XIAO RS485 扩展板', note: '工业总线桥接 · Modbus RTU' },
      { key: 'METER', name: 'DDSU666 智能电表', note: '单相导轨式 · 回路级能耗计量' },
      { key: 'SENSOR', name: 'XY-MD02 温湿度变送器', note: '工业级 · Modbus RTU 环境传感' },
    ],

    hardwareIntro: {
      subtitle: '本课程的教学核心设备，围绕「统一管控中枢 + 多协议接入」构建。',
      items: [
        {
          name: 'reComputer R1125 / R1225 工业物联网网关',
          note: '现场中枢主机，运行Home Assistant平台与能耗看板',
          description:
            '国内版R1125，海外带LoRa版R1225。作为局域网边缘中枢，统一纳管多协议设备并承载能耗监控与自动化逻辑。',
          image: '/illustrations/m1-recomputer-r1225.png',
          imageAlt: 'reComputer R1125 / R1225 工业物联网网关',
        },
        {
          name: 'XIAO ESP32-C6 开发板',
          note: '双频Wi-Fi 6 + BLE 5微控制器主控',
          description:
            '分别用于灯带控制节点、RS485通信节点与备用节点。通过ESPHome固件配置实现传感器采集与执行器控制，支持OTA管理。',
          image: '/illustrations/m1-xiao-esp32-c5.png',
          imageAlt: 'XIAO ESP32-C6 开发板',
        },
        {
          name: 'XIAO RS485 扩展板',
          note: '为XIAO开发板扩展工业RS485接口',
          description:
            '连接温湿度变送器与电表，支持Modbus RTU寄存器读取，是消费级主控与工业总线之间的桥接硬件。',
          image: '/illustrations/m1-rs485-breakout.png',
          imageAlt: 'XIAO RS485 扩展板',
        },
        {
          name: 'XIAO W5500 以太网开发套件（PoE 蓝牙代理网关）',
          note: '免布线蓝牙网关，接收BLE设备广播并接入平台',
          description:
            '基于PoE供电的有线网络蓝牙代理网关，捕获米家蓝牙温湿度计等BLE广播设备的数据，通过有线网络回传至Home Assistant，解决蓝牙信号覆盖范围有限的问题。',
          image: '/illustrations/m1-xiao-ethernet-adapter.png',
          imageAlt: 'XIAO W5500 以太网开发套件',
        },
        {
          name: 'SenseCAP Indicator 4英寸 RGB 触控屏',
          note: '桌面触控中枢，展示环境参数与设备快捷控制',
          description:
            '4英寸RGB触控显示屏，作为本地人机交互界面，实时展示环境参数与设备状态，并提供快捷控制入口，适用于无需外接显示器的轻量部署场景。',
          image: '/illustrations/m1-indicator-d1s.png',
          imageAlt: 'SenseCAP Indicator 4英寸 RGB 触控屏',
        },
        {
          name: '60GHz 毫米波人体存在与跌倒检测模块',
          note: '人体微动感知与跌倒监测，联动报警自动化',
          description:
            '60GHz毫米波雷达模块（MR60FDA2），可检测人体存在、微动与跌倒姿态，隐私友好（不采集图像），通过ESPHome接入HA后触发人员在位联动与异常告警。',
          image: '/illustrations/m1-60ghz-mmwave-fall.png',
          imageAlt: '60GHz 毫米波人体存在与跌倒检测模块',
        },
      ],
      note: '另配DDSU666单相导轨式智能电表、XY-MD02工业温湿度变送器（必配，无独立插图）、屏幕、整体电源设计、路由器等通用配件。',
    },

    toolchain: {
      stages: [
        {
          name: 'ESPHome + HA OS',
          meta: '固件配置 + 统一平台 · YAML 驱动',
          steps: ['设备固件烧录', '多协议接入', '看板与基础自动化'],
          highlight: true,
        },
        {
          name: 'Node-RED + API/MQTT',
          meta: '可视化流程编排 · 第三方系统对接',
          steps: ['REST API/MQTT 对接', '复杂业务流编排', '备份与灾难恢复'],
        },
      ],
      hinge: {
        title: '关键转折点 · 从平台内自动化到跨系统业务编排',
        body: 'HA内的自动化解决「如果…就…」的单平台联动；Node-RED让系统第一次具备跨系统、多分支、定时轮询的业务编排能力，从「设备管控」走向「业务集成」。',
      },
      note: '另需EMQX/Mosquitto MQTT Broker（承载多节点异步报文）、HACS（社区集成与前端主题扩展）。',
    },

    curriculum: {
      items: [
        {
          no: '01',
          title: '课前准备与环境预检',
          detail: '硬件台架清点、网络环境配置、网关固件预置、教学资料下发',
          tool: '—',
          coverage: { taster: 'full', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '02',
          title: 'HA平台架构与核心概念',
          detail: '实体Entity、服务Service、状态State、自动化Automation、Lovelace仪表盘基础配置',
          tool: 'Home Assistant OS',
          coverage: { taster: 'full', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '03',
          title: '消费级智能硬件接入',
          detail: '标准Wi-Fi/Zigbee智能插座与照明设备接入流程，设备状态同步与手动控制',
          tool: 'Home Assistant',
          coverage: { taster: 'full', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '04',
          title: 'XIAO ESP32 + ESPHome传感器节点',
          detail: 'ESPHome编写温湿度采集配置、固件在线编译与烧录、HA自动发现与实体映射',
          tool: 'ESPHome',
          coverage: { taster: 'full', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '05',
          title: 'HA Energy能耗看板初识',
          detail: '能源看板配置结构与数据流向，了解能耗监控的基本框架',
          tool: 'HA Energy',
          coverage: { taster: 'part', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '06',
          title: 'Modbus RTU协议与RS485接线',
          detail: 'RS485差分总线接线规范、波特率/数据位/校验位/从机地址配置、寄存器类型与数据解析',
          tool: 'ESPHome Modbus',
          coverage: { taster: 'none', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '07',
          title: '工业传感器与电表接入',
          detail:
            'XIAO RS485扩展板读取XY-MD02温湿度变送器，接入DDSU666电表读取电压/电流/功率/累计电量',
          tool: 'ESPHome + RS485',
          coverage: { taster: 'none', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '08',
          title: '能源监控看板搭建',
          detail: '配置HA Energy模块绑定电表累计电量实体，实现实时功率曲线与分时能耗统计',
          tool: 'HA Energy',
          coverage: { taster: 'none', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '09',
          title: '场景自动化策略配置',
          detail: '多条件联动规则：温度超限启动风扇、光照低于阈值开灯、非工作时间异常功耗告警',
          tool: 'HA Automation / YAML',
          coverage: { taster: 'none', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '10',
          title: '第三方系统API/MQTT对接',
          detail:
            'HA REST API/WebSocket鉴权（Long-Lived Access Token）、MQTT发布订阅（EMQX Broker）、Webhook外部触发',
          tool: 'REST API / MQTT',
          coverage: { taster: 'none', workshop: 'none', bootcamp: 'full' },
        },
        {
          no: '11',
          title: 'Node-RED业务逻辑开发',
          detail: '安装配置Node-RED Add-on，编排复杂分支逻辑、定时轮询与外部系统数据转发',
          tool: 'Node-RED',
          coverage: { taster: 'none', workshop: 'none', bootcamp: 'full' },
        },
        {
          no: '12',
          title: '系统备份与灾难恢复',
          detail: '自动化备份策略配置（本地备份与网络挂载）、灾难恢复流程验证与系统迁移演练',
          tool: 'HA Backup',
          coverage: { taster: 'none', workshop: 'part', bootcamp: 'full' },
        },
        {
          no: '13',
          title: '方案复盘与交付总结',
          detail: '各组项目方案演练与配置评审、现场总线稳定性与网络拓扑复盘、交付文档与配置归档',
          tool: '—',
          coverage: { taster: 'part', workshop: 'full', bootcamp: 'full' },
        },
      ],
      callout:
        'coverage 键对应排课形态 ID（taster / workshop / bootcamp），值为 full（完整覆盖）/ part（精简覆盖）/ none（不含）/ plus（比完整版更深）。体验课（taster）聚焦 L1 平台接入与传感器节点，不含工业总线与业务集成；实战课（workshop）覆盖 L1+L2 完整工业总线与能耗看板；交付课（bootcamp）全覆盖 L1+L2+L3。',
    },

    formats: {
      items: [
        {
          id: 'taster',
          name: '体验课 · L1展示层',
          meta: '1 天 · 6–8h',
          shortName: '体验',
          shortMeta: '1天',
        },
        {
          id: 'workshop',
          name: '实战课 · L1+L2',
          meta: '2–3 天 · 14–20h',
          shortName: '实战',
          shortMeta: '2–3天',
        },
        {
          id: 'bootcamp',
          name: '交付课 · L1+L2+L3',
          meta: '3–5 天 · 24–35h',
          shortName: '交付',
          shortMeta: '3–5天',
        },
      ],
      tiers: [
        {
          title: '体验课',
          finalProject: { label: '无 FP', included: false },
          summary: '1 天 · 6–8h · L1 展示层 · 聚焦平台接入与传感器节点',
          rows: [
            {
              title: 'Day 1 上午',
              meta: '模块 01 + 02 + 03',
              body: '环境预检 → HA架构概念 → 消费级设备接入',
            },
            {
              title: 'Day 1 下午',
              meta: '模块 04 + 05 + 13(精简)',
              body: 'XIAO传感器节点 → 能耗看板初识 → 总结复盘',
            },
          ],
          footnote:
            '体验课目标是「看得懂、能讲解、能演示」，3分钟跑出设备接入与状态监控的演示效果。不含工业总线与业务集成。',
        },
        {
          title: '实战课',
          finalProject: { label: 'FP 完整', included: true },
          summary: '2–3 天 · 14–20h · L1+L2 · 工业总线对接 + 能耗看板 + 自动化联动',
          rows: [
            {
              title: 'Day 1',
              meta: '模块 01–05',
              body: '环境预检 → HA架构 → 消费级接入 → XIAO节点 → 能耗看板初识',
            },
            {
              title: 'Day 2',
              meta: '模块 06–09',
              body: 'Modbus协议接线 → 工业传感器电表接入 → 能源看板搭建 → 自动化策略配置',
            },
            {
              title: 'Day 3（可选）',
              meta: '模块 12(精简) + 13',
              body: '系统备份基础 → 方案复盘与交付总结',
            },
          ],
          footnote:
            '实战课交付 1 个 Modbus 设备/电表接入、1 个实时能耗看板、至少 2 套自动化联动规则。学员基础要求：能读懂 YAML 配置文件。',
        },
        {
          title: '交付课',
          finalProject: { label: 'FP 完整', included: true },
          summary: '3–5 天 · 24–35h · L1+L2+L3 · 全覆盖含跨系统集成与灾难恢复',
          rows: [
            {
              title: 'Day 1–2',
              meta: '模块 01–09',
              body: 'L1+L2 完整内容（平台接入 + 工业总线 + 能耗看板 + 自动化）',
            },
            {
              title: 'Day 3',
              meta: '模块 10',
              body: '第三方系统 API/MQTT 对接实操',
            },
            {
              title: 'Day 4',
              meta: '模块 11',
              body: 'Node-RED 复杂业务流开发',
            },
            {
              title: 'Day 5',
              meta: '模块 12 + 13',
              body: '系统备份与灾难恢复演练 → 方案复盘与交付归档',
            },
          ],
          footnote:
            '交付课目标是具备独立交付可维护系统的能力。学员基础要求：有 YAML/Node-RED 与网络基础，熟悉 L1–L2 能力。',
        },
      ],
      callouts: [
        '体验课是方案演示与客户沟通的标配形态：零工业接线门槛、1天闭环、聚焦「设备能接入、数据能看见」。适合展会、技术开放日与客户初次接触场景。',
        '实战课的 Day 3 为可选弹性日：若学员基础较好可压缩为 2 天（Day 2 下午合并备份与复盘）；若需更多自动化调优时间则用满 3 天。',
      ],
      warnings: [
        'DDSU666 电表接线涉及 AC 220V 强电回路，必须由讲师或持证电工完成进线与负载接线，学员仅操作 RS485 通信侧。严禁学员自行插拔强电端子。',
        'RS485 总线接线需注意 A/B 线序与终端电阻匹配，总线长度超过 10 米时建议在末端加装 120Ω 终端电阻，否则可能出现通信丢包或寄存器读取失败。',
        '体验课不包含工业总线内容，请勿向客户承诺体验课学员能独立完成 Modbus 设备接入——那是实战课的交付标准。',
      ],
    },

    deliverablesIntro:
      '以下为完整版（交付课）交付；实战课交付前 4 项；体验课交付第 1、2 项的精简版。',
    deliverableCards: [
      {
        title: '系统部署拓扑与网络配置说明',
        body: '含现场局域网拓扑图、IP 地址分配表、VLAN/隔离策略、网关与路由器配置参数。',
      },
      {
        title: '接入设备清单与 Modbus 寄存器映射表',
        body: '含所有接入设备型号、从机地址（Slave ID）、寄存器地址、数据类型与缩放系数。',
      },
      {
        title: '能耗看板与自动化 YAML / Node-RED 流程配置文件',
        body: '含 HA Energy 配置、Lovelace 仪表盘卡片配置、自动化规则 YAML 及 Node-RED 流程 JSON（L3）。',
      },
      {
        title: '系统备份恢复与日常运维指南',
        body: '含自动化备份策略配置、灾难恢复步骤、系统迁移流程与日常巡检清单。',
      },
      {
        title: 'XIAO 传感器节点 ESPHome 固件配置工程',
        body: '含各节点 YAML 配置文件、固件编译与 OTA 升级操作记录。',
      },
      {
        title: '跨系统 API/MQTT 对接验证记录',
        body: '含 REST API 调用示例、MQTT 主题规划、Webhook 配置与联调测试结果（L3）。',
      },
    ],

    teacherNotes: {
      heading: '这门课的价值不在硬件，在「把存量设备接进来」的方法',
      emphasis: '把存量设备接进来',
      intro:
        'M1 不是一门教学生「玩智能家居」的课，而是一门教团队如何用开源平台和轻量硬件，把现场已经存在的、互相割裂的设备统一接进来的方法课。柴火交付的从来不只是「一次上课」，而是一整套可以被拆开、改写、重新组装的东西：13模块课程骨架、教师教案与PPT、ESPHome示例配置、YAML模板、Modbus寄存器映射工具、设备清单与台架规范。',
      openings: [
        {
          no: '口子 01',
          title: '换场景',
          body: '模块 09「场景自动化策略配置」的联动规则是开放的：你的行业、你的客户现场、这座城市正在发生的一个真问题。温度超限可以是机房，可以是冷库，可以是养殖大棚——问题越靠近真实现场，效果越好，而这件事你比我们懂。',
        },
        {
          no: '口子 02',
          title: '接设备',
          body: '你已有的客户存量设备、学校实训台架上的传感器、合作方的专有协议设备，可以接在模块 06 之后，成为 Modbus 接入练习的对象池。M1 负责把方法讲透，门后面接什么设备，由你来定。',
        },
        {
          no: '口子 03',
          title: '加你的东西',
          body: '你在行业里攒下的那些：接线经验、踩过的坑、能让学员瞬间理解 Modbus 的那个比喻、客户现场最常问的三个问题——那正是我们没有、也给不了的部分。',
        },
      ],
      quote: {
        text: '一门集成课最好的归宿，不是被完整地执行一遍，而是被一位工程师改到面目全非，然后变成只有他能交付的那个方案。',
        cite: '—— 冯磊，本系列课程作者',
      },
    },

    complianceBoundary: {
      principles: ['仅做单向状态监视，不执行反向控制。'],
      applicable: [
        '跨品牌设备状态聚合与统一监控看板',
        '回路级能耗计量与分时能耗统计',
        '环境参数（温湿度、光照、人体存在）监视与阈值告警',
        '非安全关键系统的自动化联动（照明、风扇、插座等低压执行器）',
        '第三方系统数据对接（REST API / MQTT / Webhook 单向数据透传）',
      ],
      notApplicable: [
        '严禁介入消防、电梯控制、高压配电等安全关键生命系统',
        '严禁扩展到高压强电回路的直接通断控制与安全制动系统',
        '不替代法定消防系统与电梯安全保护系统',
        '不承诺特定场景的具体节电百分比（节能效果受现场设备、使用习惯与气候条件影响）',
        '不包含长周期驻场代运维服务',
        '控制类场景仅限低压直流执行器（LED灯带、5V/12V继电器模块等），严禁通过本系统控制 AC 220V 及以上强电负载',
      ],
    },
  },
  {
    id: 'm2',
    slug: 'm2',
    code: 'M2',
    title: '多模态 AI 交互',
    subtitle: '告别繁琐系统界面与复杂操作，说话就能查数据、办业务、控设备',
    oneLiner: '基于物理AI终端，融合边缘视觉、语音与业务系统API，实现多模态空间交互。',
    oneLinerEmphasis: '多模态空间交互',
    realProblem:
      '仓储管理、展厅导览、智能前台等场景中，现场人员需停下手工操作，通过键盘或手机手动检索业务数据，效率低下。传统交互终端缺乏视觉上下文，无法主动感知人员靠近或异常动作。智能终端多为封闭生态，难以与存量WMS/ERP/CRM系统对接；部分工业与政企场景禁止音频与业务数据上传公网。',
    illustration: '/illustrations/m2.svg',
    difficulty: '进阶',
    duration: 'L1 1天 / L2 2–3天 / L3 3–5天',
    prerequisite:
      'L1零基础或首次接触边缘AI交互设备；L2需具备Docker基础与REST API调用经验；L3需具备Linux、PyTorch/Jetson基础与shell操作能力',
    scenarios: [
      '智慧仓储与车间管理：免手动查库存、语音录入出入库、异常物料视觉提醒',
      '展厅与公共导览：主动人员识别、多语种语音讲解、展位联动控制',
      '智能前台与会议空间：访客接待、空间设备语音控制、日程自动化查询',
      '辅助看护与空间服务：特定行为感知告警、语音求助与远程联动',
      '工业隔离区语音交互：纯局域网离线语音查询与设备状态播报',
    ],
    painPoints: [
      '现场查询交互繁琐，需停下手工操作',
      '固定终端缺乏空间感知与视觉上下文',
      '业务系统封闭，难以与存量WMS/ERP对接',
      '隐私与离网诉求，数据禁止出域',
    ],
    techStack: [
      'SenseCraft AI',
      'SenseCAP Watcher',
      'MCP 协议（Model Context Protocol）',
      'Docker',
      'REST API',
      'OpenClaw',
      'VAD（Silero VAD）',
      'ASR（Whisper / FunASR）',
      'LLM（Qwen2.5-7B-Instruct 4-bit量化）',
      'TTS（ChatTTS / Piper）',
      'Jetson Orin NX',
    ],
    coreHardware: [
      'SenseCAP Watcher（小智英文版）',
      'reComputer RK3588-40 边缘智能控制器',
      'reTerminal D1001 8寸智能触控屏',
      'reComputer J4012（Jetson Orin NX 16GB）',
    ],
    capabilities: [
      '端侧视觉目标检测与事件触发',
      '自然语言语音查询与Agent角色配置',
      '基于MCP协议的业务系统工具调用',
      '本地WMS系统Docker部署与API集成',
      '纯本地离线语音AI管线部署（VAD→ASR→LLM→TTS）',
    ],
    audience: [
      '方案顾问与商务销售',
      '实训讲师与教研团队',
      '企业信息化与智能化工程师',
      '职业院校与应用型本科师生',
    ],
    deliverables: [
      'Watcher硬件配置与视觉模型参数说明书',
      '多模态Agent角色提示词与记忆策略配置文件',
      '本地业务系统与MCP桥接服务部署指南',
      'OpenClaw自动化工具配置脚本',
      '本地离线语音AI管线部署与调优手册（L3）',
    ],
    accent: 'red',
    cells: {
      L1: {
        title: '多模态交互能力体验',
        subtitle: '拥有专属的 AI 语音助手，通过日常说话直接查询数据与控制设备',
        durationDays: 1,
        outcomes: [
          '理解边缘视觉与大模型Agent结合的技术架构',
          '掌握MCP协议在端侧AI与业务系统对接中的核心作用',
          '掌握云端协同与本地部署在不同业务场景下的选型逻辑',
        ],
        comingSoon: false,
      },
      L2: {
        title: '业务系统集成与联动配置',
        subtitle: '打通内部业务系统，让语音交互直接流转工单、简化繁琐操作',
        durationDays: 3,
        outcomes: [
          '独立配置Watcher视觉与语音Agent参数',
          '掌握基于Docker的本地业务系统与MCP桥接服务部署',
          '掌握基于MCP协议扩展新业务API的方法',
        ],
        comingSoon: false,
      },
      L3: {
        title: '端到端本地离线语音AI管线部署',
        subtitle: '实现纯本地离线部署，断网可用且核心业务数据绝不出内网',
        durationDays: 5,
        outcomes: [
          '掌握VAD→ASR→LLM→TTS完整本地端到端语音管线架构',
          '掌握在Jetson边缘计算硬件上进行大模型量化与部署优化的方法',
          '具备在强隐私与工业隔离网环境下交付AI交互方案的能力',
        ],
        comingSoon: false,
      },
    },

    facts: [
      { label: '难度', value: '进阶' },
      { label: '时长', value: 'L1 1天 / L2 2–3天 / L3 3–5天' },
      { label: '最短形态', value: '1 天（体验课 · L1）' },
      { label: '排课形态', value: '3 层：体验 / 实战 / 交付' },
      { label: '核心协议', value: 'MCP / REST API / Wi-Fi' },
      { label: 'L3离线算力', value: '100 TOPS（Jetson Orin NX 16GB）' },
    ],

    hardwareList: [
      {
        key: 'WATCHER',
        name: 'SenseCAP Watcher 小智英文版',
        note: '端侧多模态交互终端 · 语音采集与视觉识别入口',
      },
      { key: 'GW', name: 'reComputer RK3588-40', note: '边缘智能控制器 · 业务系统与MCP桥接主机' },
      { key: 'HMI', name: 'reTerminal D1001', note: '8寸工业智能触控屏 · 工位人机界面' },
      {
        key: 'GPU',
        name: 'reComputer J4012 (Jetson Orin NX 16GB)',
        note: 'L3进阶算力主机 · 纯本地离线语音管线',
      },
    ],

    hardwareIntro: {
      subtitle: '本课程以「看得见的 AI 终端 + 本地推理算力」为核心教具。',
      items: [
        {
          name: 'SenseCAP Watcher（小智英文版）',
          note: '端侧多模态交互终端，语音采集与视觉识别入口',
          description:
            '集成音视频采集与屏幕显示，支持目标检测、人员靠近感知与自然语言语音交互，通过Wi-Fi接入SenseCraft AI平台。SKU 100051523，每组配置2台。',
          image: '/illustrations/m2-sensecap-watcher.png',
          imageAlt: 'SenseCAP Watcher 小智英文版',
        },
        {
          name: 'reComputer RK3588-40 边缘智能控制器',
          note: '运行业务系统与MCP桥接服务的边缘主机',
          description:
            '16GB内存，6 TOPS算力，运行Docker容器化WMS仓储系统与MCP Bridge桥接服务，实现局域网内业务数据与大模型工具调用的对接。SKU 100086238，自带12V电源适配器。',
          image: '/illustrations/m2-recomputer-rk3588.png',
          imageAlt: 'reComputer RK3588-40 边缘智能控制器',
        },
        {
          name: 'reTerminal D1001 8寸智能触控屏',
          note: '工位人机界面，仓管业务数据录入与状态监视',
          description:
            '8寸工业智能触控终端，含摄像头与双麦，SKU 100058144。作为工位人机交互界面，用于仓管业务数据录入与状态监视，可直连主机展示WMS管理控制台与交互日志。',
          image: '/illustrations/m2-reterminal-d1001.png',
          imageAlt: 'reTerminal D1001 8寸智能触控屏',
        },
        {
          name: 'reComputer J4012（Jetson Orin NX 16GB）',
          note: 'L3进阶边缘算力主机，部署纯本地离线语音管线',
          description:
            '100 TOPS级别算力，预置JetPack/CUDA/TensorRT/PyTorch环境，部署Silero VAD+Whisper ASR+Qwen LLM+ChatTTS纯本地离线语音AI管线，断网依然可用。SKU 114110314，配19V/4.7A电源适配器。',
          image: '/illustrations/m2-recomputer-j4012.png',
          imageAlt: 'reComputer J4012 Jetson Orin NX 16GB',
        },
      ],
      note: '另配便携式现场显示器（13.3" 1080P）、CUDY AX3000 Wi-Fi 6路由器、供电排插、六类千兆网线、智能仓管WMS实操模拟物料包（条码标贴/货位标签/实体样本盒）、Watcher桌面支架等通用配件。',
    },

    toolchain: {
      stages: [
        {
          name: 'SenseCraft AI + Watcher',
          meta: '云端大模型 + 端侧多模态终端 · 零代码配置',
          steps: ['Watcher配网绑定', '视觉模型与Agent角色配置', '语音查询与MCP工具调用体验'],
          highlight: true,
        },
        {
          name: 'MCP Bridge + Docker + OpenClaw',
          meta: '标准协议桥接 · 局域网业务数据不出域',
          steps: ['本地WMS Docker部署', 'MCP桥接config.yml配置', 'OpenClaw自动化工具注册与联调'],
        },
        {
          name: 'Jetson Orin NX + 离线语音管线',
          meta: 'VAD→ASR→LLM→TTS纯本地闭环 · 零公网依赖',
          steps: ['JetPack环境验证', '量化模型部署与显存调优', '断网联调与延迟优化'],
        },
      ],
      hinge: {
        title: '关键转折点 · 从云端协同到本地离线私有化部署',
        body: 'SenseCraft AI云端方案解决「快速验证与开箱即用」；MCP桥接让业务数据第一次在局域网内闭环，核心库存与业务数据不出域；Jetson离线管线则彻底切断公网依赖，在强隐私与工业隔离网环境下实现零外网语音交互。',
      },
      note: 'L1/L2依赖互联网连接大模型服务；L3需100 TOPS级别边缘算力（Jetson Orin NX 16GB），RK3588-40（6 TOPS）无法承载本地大模型推理。',
    },

    curriculum: {
      items: [
        {
          no: '01',
          title: '课前准备与环境预检',
          detail:
            '硬件台架清点、网络连通性测试、Watcher固件预检与平台账号初始化、RK3588-40 Docker环境与WMS镜像预置、J4012 JetPack环境预载、教学物料准备',
          tool: '—',
          coverage: { taster: 'full', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '02',
          title: '多模态交互架构与核心概念',
          detail:
            '边缘视觉、语音Agent、MCP协议与云边协同架构解析；云端协同与本地离线两种部署形态的技术差异与选型依据',
          tool: 'SenseCraft AI',
          coverage: { taster: 'full', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '03',
          title: '端侧轻量视觉推理体验',
          detail:
            'Watcher目标检测模型体验（物料识别、人员靠近、特定动作感知）、SenseCraft AI零代码视觉模型适配、UART与网络数据输出格式解析',
          tool: 'SenseCAP Watcher',
          coverage: { taster: 'full', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '04',
          title: '场景化语音问答与Agent机制',
          detail:
            '仓储/零售场景自然语言实时查询演示、语音输入→推理→语音合成播报全链路体验、Agent提示词与角色设定、对话记忆机制对比（无记忆/短期/长期）',
          tool: 'SenseCraft AI Agent',
          coverage: { taster: 'full', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '05',
          title: 'MCP工具调用与业务集成演示',
          detail:
            '基于MCP协议的外部工具调用演示（实时查询仓储数据库）、智慧仓管全链路演示（语音查库存/入库/出库）、OpenClaw桌面自动化联动演示',
          tool: 'MCP / OpenClaw',
          coverage: { taster: 'full', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '06',
          title: 'Watcher视觉AI与端侧网络配置',
          detail:
            'Watcher联网配置与SenseCraft平台绑定、视觉模型选择与置信度/触发阈值参数调优、事件上报规则配置（目标出现、区域检测）',
          tool: 'SenseCraft AI / Watcher',
          coverage: { taster: 'none', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '07',
          title: '语音Agent与角色提示词配置',
          detail:
            '定义Agent角色（仓管助手/展厅讲解员）、配置System Prompt与交互风格、记忆模式切换与效果验证',
          tool: 'SenseCraft AI Agent',
          coverage: { taster: 'none', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '08',
          title: '本地业务管理系统Docker部署',
          detail:
            '使用Docker与Git在RK3588-40上部署示例WMS（suharvest/warehouse_system）、访问管理控制台完成管理员初始化与API Key生成、导入演示物料与库位数据',
          tool: 'Docker / WMS',
          coverage: { taster: 'none', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '09',
          title: 'MCP桥接服务配置与联调',
          detail:
            '获取Watcher MCP接入端点与鉴权信息、编辑config.yml配置本地业务系统API地址与API Key、启动MCP Bridge服务并验证端点握手状态',
          tool: 'MCP Bridge',
          coverage: { taster: 'none', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '10',
          title: 'OpenClaw自动化任务联动',
          detail:
            '部署OpenClaw自动化工具环境、将自动化脚本注册为MCP可调用工具、配置语音指令触发自动化查询与定时任务',
          tool: 'OpenClaw',
          coverage: { taster: 'none', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '11',
          title: '全链路整合联调与故障排查',
          detail:
            '执行典型业务指令联调（库存查询、入库提交、物流追踪）、常见网络超时/API鉴权失效/端口冲突排查',
          tool: '—',
          coverage: { taster: 'none', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '12',
          title: '本地离线语音管线架构解析',
          detail:
            'VAD/ASR/LLM/TTS各模块职责与数据流转时延分析、离线方案与云端方案指标对比（端到端延迟、并发限制、显存占用与隐私合规）',
          tool: '—',
          coverage: { taster: 'none', workshop: 'none', bootcamp: 'full' },
        },
        {
          no: '13',
          title: 'Jetson运行环境与模型部署调优',
          detail:
            '验证JetPack/CUDA/TensorRT/PyTorch运行环境、部署ASR语音识别模型（Whisper/FunASR）、部署4-bit量化本地LLM（Qwen2.5-7B-Instruct）与TTS引擎（ChatTTS/Piper）、Watcher音频流定向至本地服务端口',
          tool: 'Jetson Orin NX',
          coverage: { taster: 'none', workshop: 'none', bootcamp: 'full' },
        },
        {
          no: '14',
          title: '断网联调与延迟优化',
          detail:
            '物理断开外网连接验证局域网自闭环运行、测试各环节耗时、调优模型上下文长度与采样参数',
          tool: '—',
          coverage: { taster: 'none', workshop: 'none', bootcamp: 'full' },
        },
        {
          no: '15',
          title: '方案复盘与交付总结',
          detail:
            '各组成果展示与业务场景适配答辩、云端SaaS架构vs本地边缘计算架构成本与选型复盘、业务系统API扩展规范与标准化交付文档归档',
          tool: '—',
          coverage: { taster: 'part', workshop: 'full', bootcamp: 'full' },
        },
      ],
      callout:
        'coverage 键对应排课形态 ID（taster / workshop / bootcamp），值为 full（完整覆盖）/ part（精简覆盖）/ none（不含）/ plus（比完整版更深）。体验课（taster）聚焦 L1 端侧体验与MCP工具调用演示，不含本地业务系统部署与离线管线；实战课（workshop）覆盖 L1+L2 完整Watcher配置、WMS部署与MCP桥接；交付课（bootcamp）全覆盖 L1+L2+L3，含Jetson离线语音管线部署。',
    },

    formats: {
      items: [
        {
          id: 'taster',
          name: '体验课 · L1展示层',
          meta: '1 天 · 6–8h',
          shortName: '体验',
          shortMeta: '1天',
        },
        {
          id: 'workshop',
          name: '实战课 · L1+L2',
          meta: '2–3 天 · 14–20h',
          shortName: '实战',
          shortMeta: '2–3天',
        },
        {
          id: 'bootcamp',
          name: '交付课 · L1+L2+L3',
          meta: '3–5 天 · 24–35h',
          shortName: '交付',
          shortMeta: '3–5天',
        },
      ],
      tiers: [
        {
          title: '体验课',
          finalProject: { label: '无 FP', included: false },
          summary: '1 天 · 6–8h · L1 展示层 · 聚焦端侧体验与MCP工具调用演示',
          rows: [
            {
              title: 'Day 1 上午',
              meta: '模块 01 + 02 + 03',
              body: '环境预检 → 多模态架构概念 → 端侧视觉推理体验',
            },
            {
              title: 'Day 1 下午',
              meta: '模块 04 + 05 + 15(精简)',
              body: '语音问答与Agent机制 → MCP工具调用与业务集成演示 → 总结复盘',
            },
          ],
          footnote:
            '体验课目标是「看得懂、能讲解、能演示」，3分钟跑通语音查询与视觉触发联动的演示效果。不含本地业务系统部署与离线语音管线。',
        },
        {
          title: '实战课',
          finalProject: { label: 'FP 完整', included: true },
          summary: '2–3 天 · 14–20h · L1+L2 · Watcher配置 + 本地WMS部署 + MCP桥接 + 自动化联动',
          rows: [
            {
              title: 'Day 1',
              meta: '模块 01–05',
              body: '环境预检 → 多模态架构 → 端侧视觉 → 语音Agent → MCP工具调用演示',
            },
            {
              title: 'Day 2',
              meta: '模块 06–09',
              body: 'Watcher视觉配置 → Agent角色提示词 → WMS Docker部署 → MCP桥接联调',
            },
            {
              title: 'Day 3（可选）',
              meta: '模块 10 + 11 + 15',
              body: 'OpenClaw自动化联动 → 全链路整合联调 → 方案复盘与交付总结',
            },
          ],
          footnote:
            '实战课交付 1 套包含视觉感知、语音Agent、本地WMS与自动化工具的完整多模态系统联调。学员基础要求：具备Docker基础与REST API调用经验。',
        },
        {
          title: '交付课',
          finalProject: { label: 'FP 完整', included: true },
          summary: '3–5 天 · 24–35h · L1+L2+L3 · 全覆盖含Jetson离线语音管线部署与断网验证',
          rows: [
            {
              title: 'Day 1–2',
              meta: '模块 01–11',
              body: 'L1+L2 完整内容（端侧体验 + Watcher配置 + WMS部署 + MCP桥接 + 全链路联调）',
            },
            {
              title: 'Day 3',
              meta: '模块 12',
              body: '本地离线语音管线架构解析',
            },
            {
              title: 'Day 4',
              meta: '模块 13',
              body: 'Jetson运行环境与ASR/LLM/TTS模型部署调优',
            },
            {
              title: 'Day 5',
              meta: '模块 14 + 15',
              body: '断网联调与延迟优化 → 方案复盘与交付归档',
            },
          ],
          footnote:
            '交付课目标是具备在强隐私与工业隔离网环境下交付AI交互方案的能力。学员基础要求：具备Linux、PyTorch/Jetson基础与shell操作能力，熟悉 L1–L2 能力。',
        },
      ],
      callouts: [
        '体验课是方案演示与客户沟通的标配形态：零部署门槛、1天闭环、聚焦「语音能查询、视觉能触发」。适合展会、技术开放日与客户初次接触场景。',
        '实战课的 Day 3 为可选弹性日：若学员基础较好可压缩为 2 天（Day 2 下午合并 OpenClaw 与全链路联调）；若需更多 MCP 桥接调优时间则用满 3 天。',
      ],
      warnings: [
        'L1/L2 云端协同方案要求现场具备稳定上行互联网带宽，用于 SenseCraft AI 平台与大模型服务调用；无外网环境下 L1/L2 无法运行，需切换至 L3 离线方案。',
        '语音识别准确率受现场环境底噪、方言口音及专业行业词库影响，高噪声工业现场需配置定向收音设备，不承诺远场盲收效果。',
        'L3 纯本地方案依赖 100 TOPS 级别边缘 GPU 硬件（Jetson Orin NX 16GB 及以上），6 TOPS 的 RK3588-40 无法承载本地大模型推理。',
        '体验课不包含本地业务系统部署与离线语音管线，请勿向客户承诺体验课学员能独立完成 WMS 部署或离线管线搭建——那是实战课与交付课的交付标准。',
      ],
    },

    deliverablesIntro:
      '以下为完整版（交付课）交付；实战课交付前 4 项；体验课交付第 1、2 项的精简版。',
    deliverableCards: [
      {
        title: 'Watcher硬件配置与视觉模型参数说明书',
        body: '含Watcher设备配网记录、视觉模型选择与置信度/触发阈值参数、事件上报规则配置清单。',
      },
      {
        title: '多模态Agent角色提示词与记忆策略配置文件',
        body: '含Agent角色System Prompt、交互风格设定、对话记忆模式（无记忆/短期/长期）配置与效果验证记录。',
      },
      {
        title: '本地业务系统与MCP桥接服务部署指南',
        body: '含Docker Compose部署文件、WMS管理控制台初始化步骤、MCP Bridge config.yml配置模板与API Key管理规范。',
      },
      {
        title: 'OpenClaw自动化工具配置脚本',
        body: '含OpenClaw环境部署步骤、自动化脚本注册为MCP可调用工具的配置、语音指令触发自动化查询与定时任务的配置示例。',
      },
      {
        title: '本地离线语音AI管线部署与调优手册（L3）',
        body: '含VAD→ASR→LLM→TTS各模块部署步骤、Jetson显存分配与量化模型优化参数、断网联调测试记录与端到端延迟测试报告。',
      },
    ],

    teacherNotes: {
      heading: '这门课的价值不在大模型，在「把业务系统接进语音交互」的方法',
      emphasis: '把业务系统接进语音交互',
      intro:
        'M2 不是一门教学生「跟AI聊天」的课，而是一门教团队如何用物理AI终端和标准协议，把现场已经存在的WMS/ERP/CRM系统接进自然语言交互的方法课。柴火交付的从来不只是「一次上课」，而是一整套可以被拆开、改写、重新组装的东西：15模块课程骨架、教师教案与PPT、Watcher配置模板、MCP桥接config.yml示例、Docker Compose部署文件、离线语音管线部署手册。',
      openings: [
        {
          no: '口子 01',
          title: '换场景',
          body: '模块 04「场景化语音问答」的查询内容是开放的：你的行业、你的客户现场、这座城市正在发生的一个真问题。查库存可以是仓管，可以是展厅展品，可以是会议室日程——问题越靠近真实现场，效果越好，而这件事你比我们懂。',
        },
        {
          no: '口子 02',
          title: '接系统',
          body: '你已有的客户业务系统、学校实训平台上的管理软件、合作方的REST API服务，可以接在模块 08 之后，成为 MCP 桥接练习的对象池。M2 负责把方法讲透，门后面接什么系统，由你来定。',
        },
        {
          no: '口子 03',
          title: '加你的东西',
          body: '你在行业里攒下的那些：Agent提示词调优经验、踩过的MCP鉴权坑、能让学员瞬间理解语音管线延迟的那个比喻、客户现场最常问的三个隐私问题——那正是我们没有、也给不了的部分。',
        },
      ],
      quote: {
        text: '一门AI交互课最好的归宿，不是被完整地执行一遍，而是被一位工程师改到面目全非，然后变成只有他能交付的那个方案。',
        cite: '—— 冯磊，本系列课程作者',
      },
    },

    complianceBoundary: {
      principles: [
        'L1/L2业务数据经本地MCP桥接在局域网内流转，核心数据不出域；L3纯本地离线运行，零公网依赖。',
      ],
      applicable: [
        '现场目标感知与结构化业务语音问答',
        '基于MCP协议的WMS/ERP/CRM系统工具调用',
        '边缘视觉事件触发与自动化任务联动',
        '智慧仓储、展厅导览、智能前台等场景的多模态交互',
        '强隐私与工业隔离网环境下的纯本地离线语音交互（L3）',
      ],
      notApplicable: [
        '不替代高并发、长链路的专用人工客服系统',
        '不承诺对模糊主观多轮逻辑的100%准确推理',
        '不包含对客户未开放API的封闭旧系统的反向破解开发',
        '不适用于高噪声工业现场的远场盲收（需配置定向收音）',
        'L1/L2方案依赖互联网连接大模型服务，无外网环境须切换至L3离线方案',
        'L3离线方案需100 TOPS级别边缘算力（Jetson Orin NX 16GB及以上），RK3588-40（6 TOPS）无法承载本地大模型推理',
        '语音识别准确率受现场环境底噪、方言口音及专业行业词库影响，不承诺特定场景下的识别准确率指标',
      ],
    },
  },
  {
    id: 'm3',
    slug: 'm3',
    code: 'M3',
    title: '自组网与韧性通信',
    subtitle: '没网没信号也能联通，支持信号中继，快速拉起可查位置、能发消息的应急专网',
    oneLiner:
      '基于 LoRa Mesh 自组网协议，构建无公网依赖、多跳中继的离网应急通信与传感数据回传网络。',
    oneLinerEmphasis: '无公网依赖、多跳中继',
    realProblem:
      '野外勘探、隧道施工、应急搜救等场景缺乏蜂窝基站覆盖，传统对讲机视距受限且无法回传坐标与传感数据。单点中继台依赖市电与高位节点，一旦受损整网中断；卫星电话终端昂贵且存在遮挡盲区，临时专网架设周期长、成本高。',
    illustration: '/illustrations/m3.svg',
    difficulty: '进阶',
    duration: 'L1 1 天 / L2 2–3 天 / L3 3–5 天',
    prerequisite:
      'L1 会使用智能手机与蓝牙配对，了解基础物联网概念；L2 具备 Node-RED 或 MQTT 基础，能配置网络与 Broker；L3 熟悉 C/C++ 与 PlatformIO，能阅读并修改开源固件源码',
    scenarios: [
      '野外勘探与户外赛事：队员位置实时追踪、分组文字通信、SOS 告警广播',
      '应急搜救与抢险救灾：受灾失联区域多跳中继搭建、前线搜救态势标绘',
      '地下管廊、隧道与矿道施工：分段中继穿透阻隔、有害气体与温湿度离网监测',
      '林区与无网园区监控：太阳能中继节点长期值守、关键设施运行状态回传',
    ],
    painPoints: ['偏远与地下盲区失联', '单点中继故障导致整网中断', '应急通信架设成本高、周期长'],
    techStack: [
      'LoRa',
      'Meshtastic Mesh 协议',
      'ESP32-S3',
      'Wio Tracker L1 Pro',
      'MQTT',
      'Node-RED',
      'PlatformIO',
      'C/C++',
      'BME280',
    ],
    coreHardware: [
      'Meshtastic 应急通信套件 (Hazard Response Mission Pack, E2410180)',
      'Wio 追踪器开发板 L1 Pro (114993649)',
      'SenseCAP Meshtastic & LoRa 太阳能节点 P1-Pro (114993633)',
      'XIAO ESP32S3 & Wio-SX1262 Kit (102010611)',
      'Grove BME280 环境传感器 (101020193)',
    ],
    capabilities: [
      '构建 LoRa Mesh 去中心化自组网',
      '配置信道加密与多跳中继路由',
      '实现离线文字通信与 GPS 坐标回传',
      '搭建 LoRa-MQTT 网关桥接公网',
      '编排 Node-RED 态势监控与告警流',
      '定制 Meshtastic 端侧固件与传感器集成',
    ],
    audience: [
      '应急通信与搜救团队技术人员',
      '野外勘探与户外赛事组织者',
      '隧道/管廊/矿道施工通信工程师',
      '物联网与嵌入式开发工程师',
      '职业院校与应用型本科师生',
    ],
    deliverables: [
      'LoRa Mesh 应急通信网络规划与拓扑图',
      '设备快速配网与信道加密操作手册',
      'LoRa-MQTT 网关固件配置与 Node-RED 监控流程文件',
      '离网传感定制固件源码与编译工程（L3）',
    ],
    accent: 'yellow',
    cells: {
      L1: {
        title: '基础组网与离线通信',
        subtitle: '拥有自己的应急通信网，在无网环境下互发消息并共享位置',
        durationDays: 1,
        outcomes: [
          '理解 LoRa 物理特性与 Meshtastic 路由拓扑原理',
          '熟练配置节点角色（Client / Repeater / Router）与信道加密（256 位 AES PSK）',
          '掌握离网环境下终端通信与地图定位实操',
          '完成至少 3 节点现场组网，实现点对点、群组广播及位置共享',
        ],
        comingSoon: false,
      },
      L2: {
        title: '状态监控与 MQTT 桥接',
        subtitle: '实现野外离网传感监控，自动采集环境数据与异常告警',
        durationDays: 3,
        outcomes: [
          '掌握 LoRa Mesh 与局域网/公网的 MQTT 桥接方法',
          '掌握基于 Node-RED 的 Mesh 遥测数据解析与自动化流编排',
          '具备搭建全域通信态势监控看板的能力',
          '完成 1 套 LoRa-MQTT 网关上线，看板实时显示节点坐标与电量状态',
        ],
        comingSoon: false,
      },
      L3: {
        title: '离网传感集成与固件定制',
        subtitle: '打通离网专网与物联生态，让无网专网也能与现场设备联动',
        durationDays: 5,
        outcomes: [
          '掌握 Meshtastic 开源固件架构与 C++ 源码定制流程',
          '掌握基于 PlatformIO 的嵌入式编译与固件烧录',
          '具备独立设计与构建离网环境监测节点的能力',
          '完成集成 BME280 环境传感器的 Wio Tracker L1 Pro 定制固件编译与实机验证',
        ],
        comingSoon: false,
      },
    },

    facts: [
      { label: '难度', value: '进阶' },
      { label: '时长', value: 'L1 1 天 / L2 2–3 天 / L3 3–5 天' },
      { label: '最短形态', value: '1 天（体验课 · L1）' },
      { label: '排课形态', value: '3 层：体验 / 实战 / 交付' },
      { label: '核心协议', value: 'LoRa / Meshtastic Mesh / MQTT' },
    ],

    hardwareList: [
      {
        key: 'MP',
        name: 'Meshtastic 应急通信套件',
        note: '自组网标准实训包 · 4 台 T1000-E 卡片终端',
      },
      { key: 'WT', name: 'Wio Tracker L1 Pro', note: '带屏手持开发终端 · 位置追踪与固件定制' },
      { key: 'SN', name: 'Solar Node P1-Pro', note: '太阳能中继基站 · 野外免维护 · IPX6' },
      {
        key: 'GW',
        name: 'XIAO ESP32S3 & Wio-SX1262',
        note: 'LoRa-MQTT 网关节点 · 桥接 Mesh 与局域网',
      },
      { key: 'SEN', name: 'Grove BME280', note: '环境传感器 · 温湿度与气压采集' },
    ],

    hardwareIntro: {
      subtitle: '本课程围绕「离网组网终端 + 太阳能自治节点」展开，均基于 Mission Pack 生态。',
      items: [
        {
          name: 'Meshtastic 应急通信套件 (Hazard Response Mission Pack, E2410180)',
          note: '自组网标准实训包，含 4 台 T1000-E 卡片终端及配件',
          description:
            '去中心化离线文字与位置通信标准实训包。包含 4 台 SenseCAP T1000-E 卡片式追踪终端，支持蓝牙配对与 Meshtastic App 配置，适用于 L1 基础组网与离线通信体验。终端内置 GPS 与 LoRa 射频，开机自动入网，支持点对点与群组广播。',
          image: '/illustrations/m3-mission-pack.png',
          imageAlt: 'Meshtastic 应急通信套件 Hazard Response Mission Pack',
        },
        {
          name: 'Wio 追踪器开发板 L1 Pro (114993649)',
          note: '带屏手持开发终端，支持位置追踪与固件定制',
          description:
            '带 1.3" OLED 屏幕的手持开发终端，内置 GPS 与 2000mAh 电池。适用于 L3 端侧固件定制开发，支持屏幕 UI 自定义与 I2C/UART 传感器扩展。基于 PlatformIO 编译 Meshtastic 源码，目标板型为 seeed_wio_tracker_L1。',
          image: '/illustrations/m3-wio-tracker-l1-pro.png',
          imageAlt: 'Wio 追踪器开发板 L1 Pro',
        },
        {
          name: 'SenseCAP Meshtastic & LoRa 太阳能节点 P1-Pro (114993633)',
          note: '野外免维护中继基站，太阳能自供电',
          description:
            '户外太阳能自供电中继节点，IPX6 防护等级。扩展网络覆盖与跳数，适用于野外长期值守与高位中继部署。支持 Meshtastic 协议自动中继转发，无需市电供电。',
          image: '/illustrations/m3-solar-node-p1-pro.png',
          imageAlt: 'SenseCAP Meshtastic & LoRa 太阳能节点 P1-Pro',
        },
        {
          name: 'XIAO ESP32S3 & Wio-SX1262 Kit (102010611)',
          note: 'LoRa-MQTT 网关节点，桥接 Mesh 与局域网',
          description:
            '出厂预刷 Meshtastic 固件的网关节点。将 LoRa Mesh 报文桥接至局域网 MQTT Broker 与监控大屏，支持 Wi-Fi 连接与数据上行转发、下行命令广播。适用于 L2 公网融合与态势监控。',
          image: '/illustrations/m3-xiao-esp32s3-sx1262.png',
          imageAlt: 'XIAO ESP32S3 & Wio-SX1262 Kit',
        },
        {
          name: 'Grove BME280 环境传感器 (101020193)',
          note: '高精度温湿度与气压测量传感器',
          description:
            '通过 Grove I2C 接口连接至 Wio Tracker L1 Pro，采集温湿度与气压数据。作为自定义遥测数据注入 Mesh 网络，适用于 L3 离网环境监测节点开发。',
          image: '/illustrations/m3-bme280.png',
          imageAlt: 'Grove BME280 环境传感器',
        },
      ],
      note: '另配 Grove 4P 连接线（20cm，连接 BME280 至 Wio Tracker L1 Pro）、屏幕、整体电源设计、路由器等通用配件。',
    },

    toolchain: {
      stages: [
        {
          name: 'Meshtastic App + 固件配置',
          meta: '信道加密 + 节点角色 · 蓝牙/App 驱动',
          steps: ['终端蓝牙配对', '信道与 PSK 配置', '多节点组网与离线通信'],
          highlight: true,
        },
        {
          name: 'Node-RED + MQTT',
          meta: '可视化流程编排 · Mesh 数据解析与告警',
          steps: ['LoRa-MQTT 网关搭建', '遥测报文解析', '态势看板与 SOS 告警'],
        },
        {
          name: 'PlatformIO + Meshtastic 源码',
          meta: 'C++ 嵌入式编译 · 端侧固件定制',
          steps: ['源码克隆与板型配置', '传感器集成与 UI 定制', '编译烧录与实机验证'],
        },
      ],
      hinge: {
        title: '关键转折点 · 从离网自治到公网融合与端侧定制',
        body: 'Meshtastic 配置解决「设备能组网、消息能送达」的离网通信问题；Node-RED 让 Mesh 数据第一次接入公网与监控大屏，从「通信工具」走向「态势感知系统」；PlatformIO 固件定制则进一步让终端具备自定义传感能力，从「使用设备」走向「开发设备」。',
      },
      note: '另需 EMQX/Mosquitto MQTT Broker（承载 Mesh 报文桥接）、Meshtastic Map（离线地图态势看板）。',
    },

    curriculum: {
      items: [
        {
          no: '01',
          title: '课前准备与环境预检',
          detail:
            '硬件台架清点、频段一致性校验（433/868/915 MHz）、固件预检升级、现场测线规划与小组信道/PSK 分配',
          tool: '—',
          coverage: { taster: 'full', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '02',
          title: 'LoRa 物理层与 Mesh 协议原理',
          detail:
            '频率/带宽/扩频因子/编码率参数解析，洪泛路由（Managed Flooding）、多跳计数与防环路机制',
          tool: 'Meshtastic',
          coverage: { taster: 'full', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '03',
          title: '终端与中继节点初始化',
          detail:
            'T1000-E 卡片终端蓝牙配对与 App 基础设置，Solar Node P1-Pro 部署规范与天线极化方向',
          tool: 'Meshtastic App',
          coverage: { taster: 'full', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '04',
          title: '信道规划与安全加密',
          detail: '主信道与分组子信道设置，256 位 AES 预共享密钥（PSK）配置，实现分组安全隔离',
          tool: 'Meshtastic',
          coverage: { taster: 'full', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '05',
          title: '离线通信与定位回传实测',
          detail: '室内穿墙与视距点对点文本收发测试，离线地图瓦片加载、GPS 定位上报与轨迹标绘实操',
          tool: 'Meshtastic App',
          coverage: { taster: 'full', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '06',
          title: 'ESP32S3 LoRa-MQTT 网关搭建',
          detail:
            'XIAO ESP32S3 + Wio-SX1262 网关组装，Wi-Fi 连接与 MQTT Broker 接入配置，数据上行转发与下行命令广播',
          tool: 'XIAO ESP32S3 / MQTT',
          coverage: { taster: 'none', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '07',
          title: 'Mesh 遥测数据解析与 Node-RED 联动',
          detail:
            '解析 Meshtastic MQTT 遥测报文（默认 Protobuf，JSON 输出需另行配置），节点状态监视流（电量/心跳），SOS 告警联动（Webhook/邮件/即时通信）',
          tool: 'Node-RED',
          coverage: { taster: 'none', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '08',
          title: '网络拓扑与地图可视化大屏',
          detail:
            '部署 Meshtastic Map 或自建地图服务，实时呈现节点分布、信号强度（RSSI/SNR）与中继链路跳数',
          tool: 'Meshtastic Map',
          coverage: { taster: 'none', workshop: 'part', bootcamp: 'full' },
        },
        {
          no: '09',
          title: '外接环境传感器硬件调试',
          detail: 'Grove 接口连接 BME280 温湿度/气压传感器，I2C 总线地址扫描与传感器供电管理',
          tool: 'Grove BME280',
          coverage: { taster: 'none', workshop: 'none', bootcamp: 'full' },
        },
        {
          no: '10',
          title: 'PlatformIO 开发环境与源码工程',
          detail:
            '搭建 VS Code + PlatformIO 编译环境，克隆 meshtastic/firmware 官方源码，配置 platformio.ini 目标板型 seeed_wio_tracker_L1',
          tool: 'PlatformIO',
          coverage: { taster: 'none', workshop: 'none', bootcamp: 'full' },
        },
        {
          no: '11',
          title: '端侧固件功能定制',
          detail:
            '修改屏幕 UI 交互逻辑（首页增加实时环境数据与未读消息计数），配置 Telemetry 遥测数据打包与周期发送策略',
          tool: 'C/C++ / Meshtastic 源码',
          coverage: { taster: 'none', workshop: 'none', bootcamp: 'full' },
        },
        {
          no: '12',
          title: '编译烧录与实机验证',
          detail:
            '编译生成自定义固件并通过 USB/串口烧录至 Wio Tracker L1 Pro，验证传感器数据在 Mesh 网络内的多跳广播与解析',
          tool: 'PlatformIO',
          coverage: { taster: 'none', workshop: 'none', bootcamp: 'full' },
        },
        {
          no: '13',
          title: '方案复盘与交付总结',
          detail:
            '复杂遮挡环境下信号衰减/中继跳数/丢包率数据复盘，应急通信网络部署拓扑与频段合规规范归档，硬件采购清单与备件建议',
          tool: '—',
          coverage: { taster: 'part', workshop: 'full', bootcamp: 'full' },
        },
      ],
      callout:
        'coverage 键对应排课形态 ID（taster / workshop / bootcamp），值为 full（完整覆盖）/ part（精简覆盖）/ none（不含）/ plus（比完整版更深）。体验课（taster）聚焦 L1 基础组网与离线通信，不含 MQTT 桥接与固件定制；实战课（workshop）覆盖 L1+L2 完整网关搭建与态势监控；交付课（bootcamp）全覆盖 L1+L2+L3。',
    },

    formats: {
      items: [
        {
          id: 'taster',
          name: '体验课 · L1展示层',
          meta: '1 天 · 6–8h',
          shortName: '体验',
          shortMeta: '1天',
        },
        {
          id: 'workshop',
          name: '实战课 · L1+L2',
          meta: '2–3 天 · 14–20h',
          shortName: '实战',
          shortMeta: '2–3天',
        },
        {
          id: 'bootcamp',
          name: '交付课 · L1+L2+L3',
          meta: '3–5 天 · 24–35h',
          shortName: '交付',
          shortMeta: '3–5天',
        },
      ],
      tiers: [
        {
          title: '体验课',
          finalProject: { label: '无 FP', included: false },
          summary: '1 天 · 6–8h · L1 展示层 · 聚焦 Meshtastic 组网与离线通信',
          rows: [
            {
              title: 'Day 1 上午',
              meta: '模块 01 + 02 + 03',
              body: '环境预检 → LoRa/Mesh 原理 → 终端与中继初始化',
            },
            {
              title: 'Day 1 下午',
              meta: '模块 04 + 05 + 13(精简)',
              body: '信道加密 → 离线通信与定位实测 → 总结复盘',
            },
          ],
          footnote:
            '体验课目标是「看得懂、能讲解、能演示」，完成 3 节点现场组网与离线消息/位置共享。不含 MQTT 桥接与固件定制。',
        },
        {
          title: '实战课',
          finalProject: { label: 'FP 完整', included: true },
          summary: '2–3 天 · 14–20h · L1+L2 · Mesh 组网 + MQTT 桥接 + 态势监控',
          rows: [
            {
              title: 'Day 1',
              meta: '模块 01–05',
              body: '环境预检 → 原理 → 终端初始化 → 信道加密 → 离线通信实测',
            },
            {
              title: 'Day 2',
              meta: '模块 06–08',
              body: 'MQTT 网关搭建 → Node-RED 数据解析 → 地图可视化大屏',
            },
            {
              title: 'Day 3（可选）',
              meta: '模块 13',
              body: '方案复盘与交付总结',
            },
          ],
          footnote:
            '实战课交付 1 套 LoRa-MQTT 网关上线、1 个态势监控看板、至少 1 套 SOS 告警联动规则。学员基础要求：具备 Node-RED 或 MQTT 基础。',
        },
        {
          title: '交付课',
          finalProject: { label: 'FP 完整', included: true },
          summary: '3–5 天 · 24–35h · L1+L2+L3 · 全覆盖含固件定制与传感集成',
          rows: [
            {
              title: 'Day 1–2',
              meta: '模块 01–08',
              body: 'L1+L2 完整内容（组网 + MQTT 桥接 + 态势监控）',
            },
            {
              title: 'Day 3',
              meta: '模块 09 + 10',
              body: 'BME280 传感器调试 → PlatformIO 环境搭建',
            },
            {
              title: 'Day 4',
              meta: '模块 11',
              body: '端侧固件功能定制开发',
            },
            {
              title: 'Day 5',
              meta: '模块 12 + 13',
              body: '编译烧录与实机验证 → 方案复盘与交付归档',
            },
          ],
          footnote:
            '交付课目标是具备独立开发离网传感节点的能力。学员基础要求：熟悉 C/C++ 与 PlatformIO。',
        },
      ],
      callouts: [
        '体验课是方案演示与客户沟通的标配形态：零开发门槛、1 天闭环、聚焦「设备能组网、消息能送达」。适合展会、技术开放日与客户初次接触场景。',
        '实战课的 Day 3 为可选弹性日：若学员基础较好可压缩为 2 天（Day 2 下午合并复盘）；若需更多 Node-RED 调优与看板定制时间则用满 3 天。',
      ],
      warnings: [
        '所有 LoRa 设备必须使用同一频段（433/868/915 MHz），混用频段将导致物理层无法解调组网。本课程仅面向海外无线频段（EU868/US915 等），不得用于国内频段应用。',
        'Solar Node 部署时需注意天线垂直极化方向与架设高度，通信距离受地形起伏与建筑物遮挡显著影响；消息时延随跳数增加而累加（典型 1–3 秒/跳）。',
        '体验课不包含 MQTT 桥接与固件定制内容，请勿向客户承诺体验课学员能独立完成 LoRa-MQTT 网关搭建——那是实战课的交付标准。',
      ],
    },

    deliverablesIntro:
      '以下为完整版（交付课）交付；实战课交付前 4 项；体验课交付第 1、2 项的精简版。',
    deliverableCards: [
      {
        title: 'LoRa Mesh 应急通信网络规划与拓扑图',
        body: '含现场节点布设拓扑、频段规划、信道分配表与中继跳数预算。',
      },
      {
        title: '设备快速配网与信道加密操作手册',
        body: '含 T1000-E 蓝牙配对流程、PSK 密钥配置规范、节点角色（Client/Repeater/Router）设置指南。',
      },
      {
        title: 'LoRa-MQTT 网关固件配置与 Node-RED 监控流程文件',
        body: '含 ESP32S3 网关 Wi-Fi/MQTT 配置、Node-RED 遥测解析流 JSON 与告警规则配置（L2）。',
      },
      {
        title: '态势监控看板配置与部署文档',
        body: '含 Meshtastic Map 部署步骤、节点状态监视面板配置与地理围栏告警设置（L2）。',
      },
      {
        title: '离网传感定制固件源码与编译工程',
        body: '含 Meshtastic 源码修改记录、platformio.ini 配置、BME280 传感器集成代码与编译产物（L3）。',
      },
      {
        title: '应急通信网络部署与运维指南',
        body: '含天线架设规范、频段合规要求、日常巡检清单与故障排查流程。',
      },
    ],

    teacherNotes: {
      heading: '这门课的价值不在硬件，在「无公网环境下把人和数据连起来」的方法',
      emphasis: '无公网环境下把人和数据连起来',
      intro:
        'M3 不是一门教学生「玩对讲机」的课，而是一门教团队如何用开源 Mesh 协议和轻量硬件，在没有基站、没有互联网的现场把通信和数据回传建起来的方法课。柴火交付的从来不只是「一次上课」，而是一整套可以被拆开、改写、重新组装的东西：13 模块课程骨架、教师教案与 PPT、Meshtastic 配置模板、Node-RED 示例流程、PlatformIO 编译工程、设备清单与台架规范。',
      openings: [
        {
          no: '口子 01',
          title: '换场景',
          body: '模块 05「离线通信与定位回传实测」的测试场景是开放的：你的行业、你的客户现场、这座城市正在发生的一个真问题。野外勘探可以是矿山，可以是林场，可以是海上作业——问题越靠近真实现场，效果越好，而这件事你比我们懂。',
        },
        {
          no: '口子 02',
          title: '接设备',
          body: '你已有的客户现场传感器、学校实训台架上的环境监测设备、合作方的专有协议终端，可以接在模块 09 之后，成为离网传感集成练习的对象池。M3 负责把方法讲透，门后面接什么传感器，由你来定。',
        },
        {
          no: '口子 03',
          title: '加你的东西',
          body: '你在行业里攒下的那些：野外部署经验、踩过的坑、能让学员瞬间理解 LoRa 跳数的那个比喻、客户现场最常问的三个问题——那正是我们没有、也给不了的部分。',
        },
      ],
      quote: {
        text: '一门通信课最好的归宿，不是被完整地执行一遍，而是被一位工程师改到面目全非，然后变成只有他能交付的那个方案。',
        cite: '—— 冯磊，本系列课程作者',
      },
    },

    complianceBoundary: {
      principles: ['仅面向海外无线频段（EU868/US915 等），不得用于国内频段应用。'],
      applicable: [
        '无公网环境下的短文本即时通讯与群组广播',
        'GPS 定位轨迹回传与离线地图态势标绘',
        '轻量传感器遥测数据（温湿度、气压等）的多跳回传',
        '去中心化多跳中继网络规划与部署',
        'LoRa Mesh 与公网 MQTT 的桥接与数据可视化（L2）',
        '基于 Meshtastic 开源固件的端侧定制开发（L3）',
      ],
      notApplicable: [
        '严禁用于国内无线频段应用，当前套件频段为 433/868/915 MHz（Meshtastic 社区频段），仅面向海外市场交付',
        '受 LoRa 物理带宽限制（几百 bps ~ 数 kbps），不支持语音通话、实时视频与大文件传输',
        '不作为蜂窝 4G/5G 宽带通信的完全替代方案',
        '不承诺极端复杂电磁干扰环境下的 100% 报文投递率',
        '消息传输时延随中继跳数增加而累加（通常 1–3 秒/跳），不适用于低时延实时控制场景',
        '网络容量受空口占空比与跳数影响，节点数过多时需合理规划信道参数与上报频率',
      ],
    },
  },
  {
    id: 'm4',
    slug: 'm4',
    code: 'M4',
    title: '边缘视觉 AI',
    subtitle: '告别事后翻查监控录像，把老旧摄像头升级为实时抓拍、可联动的智能视觉防线',
    oneLiner:
      '基于轻量边缘摄像头与工业级多路 AI 计算主机，构建目标检测、区域入侵告警与自动化联动的边缘视觉方案。',
    oneLinerEmphasis: '目标检测、区域入侵告警与自动化联动',
    realProblem:
      '传统监控仅能事后录像回溯，无法在风险发生瞬间产生结构化告警；移动侦测受光线变化、雨雪晃动干扰严重，误报率高。视觉 AI 定制开发周期长、需专门算法工程师与专用服务机架，方案商难以权衡单点嵌入式设备与多路集中服务器的性能与成本。',
    illustration: '/illustrations/m4.svg',
    difficulty: '高级',
    duration: 'L1 1 天 / L2 2–3 天 / L3 3–5 天',
    prerequisite:
      'L1 具备基础网络与浏览器操作经验，能连接 Wi-Fi 与访问 Web 界面；L2 理解 IP 网络、Docker 与 MQTT 基础，能编辑 YAML 配置文件；L3 具备 Python 与 Linux 命令行基础，了解目标检测基本原理',
    scenarios: [
      '物业与园区安防：周界防范、人员越界告警、夜间异常驻留检测',
      '工业制造与安全生产：未佩戴安全帽/反光衣检测、危险区域人员闯入、输送带状态监控',
      '智慧商业与客流分析：区域人流计数、驻留时长统计、热区分布',
      '农业与室外监控：PoE 供电户外点位监测、特定目标识别与越界告警',
      '临时布控与移动工位：单点 reCamera 快速部署、端侧推理即插即用',
    ],
    painPoints: [
      '缺乏实时事件感知，仅能事后回溯',
      '移动侦测误报率高，规则单一',
      '视觉 AI 落地与工程门槛高',
      '边缘算力适配困难，单点与多路选型难',
    ],
    techStack: [
      'reCamera',
      'Jetson Orin NX',
      'Frigate NVR',
      'Home Assistant',
      'Node-RED',
      'YOLO',
      'TensorRT',
      'MQTT',
      'RTSP',
      'InfluxDB',
      'Grafana',
    ],
    coreHardware: [
      'reComputer RK3576-30 (100052518)',
      'reCamera 2002w/2002 (102991896/102991894)',
      'reCamera 2002 HQ PoE 8GB (100029708)',
      'reServer Industrial J4012 (Jetson Orin NX 16GB, 114110247)',
      '8+2 口千兆 PoE 工业交换机 (802.3af/at)',
      'CUDY AX3000 Wi-Fi 6 千兆路由器',
    ],
    capabilities: [
      '配置 reCamera 端侧目标检测与 RTSP 推流',
      '编排 Node-RED 视觉事件与声光告警联动',
      '搭建 Frigate 多路 RTSP 汇聚与 NVR 录像管理',
      '配置检测区域（Zones）与置信度阈值调优',
      '集成 Home Assistant 跨系统自动化联动',
      '训练 YOLO 自定义模型并完成 TensorRT/cvimodel 量化部署',
    ],
    audience: [
      '物业园区安防与运维工程师',
      '工业制造安全生产管理人员',
      '智慧商业与客流分析从业者',
      '农业与户外监控系统集成商',
      'AIoT 与计算机视觉开发工程师',
      '职业院校与应用型本科师生',
    ],
    deliverables: [
      '视觉系统架构设计图与网络拓扑说明',
      'reCamera Node-RED 联动流程配置文件',
      'Frigate 配置文件（frigate.yml）与 HA 自动化脚本',
      '误报率调优前后测试对比记录表',
      '自定义数据集、训练配置与量化后模型文件（L3）',
    ],
    accent: 'red',
    cells: {
      L1: {
        title: '双线体验与基础配置',
        subtitle: '拥有自己的智能视觉哨兵，划定警戒区域并自动抓拍留证',
        durationDays: 1,
        outcomes: [
          '理解帧率、分辨率、置信度阈值与 IoU 等视觉核心概念',
          '独立完成 reCamera 设备的网络配置与视频流输出',
          '掌握轻节点与强节点方案的适用边界与选型依据',
          '完成 1 台 reCamera 节点的网络配置与基础目标识别验证',
        ],
        comingSoon: false,
      },
      L2: {
        title: '双线场景联动与多路汇聚',
        subtitle: '把既有老旧摄像头升级为智能监控网，过滤误报并联动现场声光报警',
        durationDays: 3,
        outcomes: [
          '掌握在 reCamera 上使用 Node-RED 实现边缘事件的本地联动',
          '掌握 Frigate frigate.yml 的多路配置、区域绘制与参数调优',
          '掌握 Frigate 与 Home Assistant 联动配置与跨系统事件驱动逻辑',
          '完成 1 套包含 2 路以上 RTSP 接入、Frigate 检测、HA 联动与误报调优的完整系统',
        ],
        comingSoon: false,
      },
      L3: {
        title: '模型定制与边缘部署优化',
        subtitle: '定制专属视觉识别模型，实时大屏业务数据',
        durationDays: 5,
        outcomes: [
          '掌握视觉 AI 从数据标注、模型训练到边缘部署的完整工程闭环',
          '掌握 TensorRT 与嵌入式模型量化转换的关键工具链',
          '具备独立设计和交付垂直行业视觉识别方案的能力',
          '交付 1 套自定义训练的目标检测模型，并在硬件上完成实跑验证',
        ],
        comingSoon: false,
      },
    },

    facts: [
      { label: '难度', value: '高级' },
      { label: '时长', value: 'L1 1天 / L2 2–3天 / L3 3–5天' },
      { label: '最短形态', value: '1 天（体验课 · L1）' },
      { label: '排课形态', value: '3 层：体验 / 实战 / 交付' },
      { label: '双硬件主线', value: 'reCamera（轻节点）+ Jetson Orin NX（强节点）' },
      { label: '核心协议', value: 'RTSP / MQTT / PoE 802.3af/at / REST API' },
    ],

    hardwareList: [
      { key: 'CAM-L', name: 'reCamera 2002w/2002', note: '轻量边缘节点 · 端侧NPU推理 · RTSP推流' },
      { key: 'CAM-H', name: 'reCamera 2002 HQ PoE 8GB', note: 'PoE主力机位 · 多路NVR汇聚' },
      {
        key: 'EDGE',
        name: 'reComputer RK3576-30',
        note: '轻量推理主机 · 6 TOPS NPU · Node-RED联动',
      },
      {
        key: 'NVR',
        name: 'reServer Industrial J4012',
        note: 'Jetson Orin NX 16GB · Frigate多路汇聚 · TensorRT',
      },
      { key: 'NET', name: '8+2口千兆PoE交换机', note: '802.3af/at · PoE供电与流量汇聚' },
    ],

    hardwareIntro: {
      subtitle: '本课程以「开源 AI 相机 + 边缘推理盒子」为核心教具，覆盖采集、推理到告警全链路。',
      items: [
        {
          name: 'reComputer RK3576-30 (100052518)',
          note: '轻量视觉推理主机，8GB 内存，6 TOPS 算力',
          description:
            '运行事件联动与轻量视频监控看板的边缘智能控制器。配备 8GB 内存与 6 TOPS NPU 算力，适用于 L1/L2 阶段的轻量视觉推理与 Node-RED 事件联动。可作为 Frigate 与 Home Assistant 的轻量部署主机。',
          image: '/illustrations/m4-recomputer-rk3576.png',
          imageAlt: 'reComputer RK3576-30 边缘 AI 盒子',
        },
        {
          name: 'reCamera 2002w/2002 (102991896/102991894)',
          note: '单机位视觉节点，端侧轻量目标检测与 RTSP 推流',
          description:
            '模块化开源 AI 相机，2002w 支持 Wi-Fi/AP 模式，2002 支持百兆有线以太网。内置 NPU 推理与 Node-RED 零代码编排，即插即用，适用于 L1 单点轻量节点体验与 L2 端侧自动化联动。支持 RTSP 视频流输出（554 端口）。',
          image: '/illustrations/m4-recamera-poe.png',
          imageAlt: 'reCamera 2002w/2002 开源 AI 相机',
        },
        {
          name: 'reCamera 2002 HQ PoE 8GB (100029708)',
          note: '多机位主力相机，PoE 单线供电推流',
          description:
            '模块化开源 AI 相机，支持 PoE 交换机单线供电与视频推流。8GB 内存配置，适用于多路 NVR 汇聚分析的主力机位。通过 RTSP 接入 Frigate，支持检测区域与置信度阈值配置。',
          image: '/illustrations/m4-recamera-poe.png',
          imageAlt: 'reCamera 2002 HQ PoE 8GB 开源 AI 相机',
        },
        {
          name: 'reCamera Pro AI 相机 (100092895)',
          note: '高性能开源 AI 视觉相机，进阶视觉开发与更高算力模型验证',
          description:
            '可选扩展设备，reCamera 系列高性能型号，适用于进阶视觉开发与更高算力模型验证。可承担更复杂的端侧推理任务与多模型并行验证，作为 L2/L3 阶段的进阶算力选项。',
          image: '/illustrations/m4-recamera-pro.png',
          imageAlt: 'reCamera Pro AI 相机',
        },
        {
          name: 'reServer Industrial J4012 (Jetson Orin NX 16GB, 114110247)',
          note: '高性能视频中枢，工业级 Jetson 边缘服务器',
          description:
            '工业级 Jetson Orin NX 16GB 边缘计算服务器，运行 Frigate NVR 汇聚多路检测。支持 GPU 硬件解码与 TensorRT 量化加速，适用于 L2 多路视频流汇聚与 L3 自定义模型推理部署。需刷写 JetPack 镜像并配置 Docker --runtime nvidia，Frigate 使用 stable-tensorrt-jp6 镜像。',
          image: '/illustrations/m4-reserver-j4012.png',
          imageAlt: 'reServer Industrial J4012 Jetson Orin NX 16GB',
        },
        {
          name: '8+2 口千兆 PoE 工业交换机 (802.3af/at)',
          note: '集中供电与高速组网',
          description:
            '8+2 口千兆 PoE 交换机，符合 802.3af/at 标准。为 PoE 相机供电并汇聚局域网流量，适用于多路 reCamera HQ PoE 集中部署与 Frigate NVR 汇聚场景。',
          image: '/illustrations/m4-poe-switch.png',
          imageAlt: '8+2 口千兆 PoE 工业交换机',
        },
      ],
      note: '另配CUDY AX3000 Wi-Fi 6千兆路由器、迷你三脚架×3（114993412）、便携式13.3" 1080P现场显示器（含mini HDMI与Type-C线）、六类千兆网线×4（1m）、公牛3位五孔+3×USB供电排插、场景模拟物料包（安全帽/反光背心标贴、测试工件模型）。',
    },

    toolchain: {
      stages: [
        {
          name: 'reCamera + Node-RED',
          meta: '端侧NPU推理 + 零代码编排 · RTSP/MQTT',
          steps: ['设备上电联网', 'RTSP视频流输出', '预置模型目标检测', 'Node-RED事件联动'],
          highlight: true,
        },
        {
          name: 'Frigate NVR + Home Assistant',
          meta: '多路RTSP硬件解码 + 区域检测 + MQTT告警',
          steps: ['多路RTSP接入', 'Zones/Masks配置', '置信度阈值调优', 'HA自动化联动'],
        },
        {
          name: 'YOLO + TensorRT / cvimodel',
          meta: '数据标注 + 迁移学习 + 量化部署',
          steps: [
            '数据集采集标注',
            'YOLO迁移训练',
            'ONNX导出',
            'TensorRT/cvimodel量化',
            '边缘端实跑',
          ],
        },
      ],
      hinge: {
        title: '关键转折点 · 从单点端侧推理到多路集中NVR汇聚',
        body: 'reCamera解决单点位即插即用的端侧检测与就地联动；Frigate+Jetson让系统第一次具备多路视频流汇聚、统一区域规则与跨系统告警的能力，从「单点感知」走向「多路集中分析」。',
      },
      note: '另需Mosquitto MQTT Broker（承载结构化告警事件，1883端口）、InfluxDB+Grafana（L3检测统计与时序看板）、CVAT/Roboflow（L3数据集标注平台）。',
    },

    curriculum: {
      items: [
        {
          no: '01',
          title: '课前准备与环境预检',
          detail:
            '硬件台架清点、网络环境配置、reCamera固件预置与Node-RED/SSCMA插件验证、Frigate容器部署与GPU直通配置、教学资料下发',
          tool: '—',
          coverage: { taster: 'full', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '02',
          title: '视觉AI核心概念与双主线架构',
          detail:
            '帧率FPS、分辨率、置信度阈值、IoU交并比；reCamera轻节点与Jetson强节点技术指标、成本与适用边界对比',
          tool: '—',
          coverage: { taster: 'full', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '03',
          title: 'reCamera单点轻节点配置',
          detail:
            '上电联网（2002w Wi-Fi/AP、2002百兆有线、HQ PoE交换机供电）、Web界面访问、RTSP视频流验证（554端口）、预置模型切换',
          tool: 'reCamera Web UI',
          coverage: { taster: 'full', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '04',
          title: '基础入侵检测与区域绘制',
          detail: '绘制基础检测框、观察目标进入触发事件、端侧NPU推理帧率与置信度变化观察',
          tool: 'reCamera / SSCMA',
          coverage: { taster: 'full', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '05',
          title: 'Jetson多路NVR架构演示',
          detail:
            'Frigate多路RTSP接入与GPU硬件解码展示、目标检测与录像管理、检测到入侵→MQTT推送→声光报警联动演示',
          tool: 'Frigate NVR',
          coverage: { taster: 'part', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '06',
          title: 'Node-RED视觉事件编排',
          detail:
            'SSCMA模型节点配置、置信度过滤与目标类型过滤、Dashboard实时画面与告警状态仪表盘搭建',
          tool: 'Node-RED / SSCMA',
          coverage: { taster: 'none', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '07',
          title: '多通道告警联动',
          detail: 'MQTT消息发布驱动智能灯泡变色与蜂鸣器鸣响、Webhook节点推送告警至企业微信群机器人',
          tool: 'Node-RED / MQTT',
          coverage: { taster: 'none', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '08',
          title: 'Frigate多路摄像头配置',
          detail:
            'frigate.yml配置结构解析、多台reCamera RTSP地址添加、检测帧率配置（5–10FPS）、Zones与Masks定义',
          tool: 'Frigate / YAML',
          coverage: { taster: 'none', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '09',
          title: 'Home Assistant深度集成',
          detail:
            'Frigate HA集成插件安装配置、摄像头实体与传感器状态映射、基于时间段与区域入侵的自动化YAML脚本编写',
          tool: 'Home Assistant / YAML',
          coverage: { taster: 'none', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '10',
          title: '误报率调优实操',
          detail:
            '置信度阈值调整（Min Score/Threshold）、Zones坐标优化排除树枝晃动/反光/背景杂物、调优前后误报数据对比记录',
          tool: 'Frigate',
          coverage: { taster: 'none', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '11',
          title: '数据集采集与标注',
          detail:
            '现场数据采集策略（光照变化/角度多源/正负样本平衡）、CVAT或Roboflow目标检测框标注、数据集划分7:2:1与数据增强',
          tool: 'CVAT / Roboflow',
          coverage: { taster: 'none', workshop: 'none', bootcamp: 'full' },
        },
        {
          no: '12',
          title: 'YOLO模型迁移学习',
          detail:
            'YOLO目标检测原理与骨干网络解析、PyTorch训练环境与预训练权重配置、Loss收敛曲线与mAP@0.5指标监控',
          tool: 'YOLO / PyTorch',
          coverage: { taster: 'none', workshop: 'none', bootcamp: 'full' },
        },
        {
          no: '13',
          title: '边缘端模型转换与部署',
          detail:
            'ONNX格式导出、Jetson TensorRT Engine转换、reCamera TPU-MLIR INT8量化转cvimodel、端侧推理延迟/FPS/显存实测',
          tool: 'TensorRT / TPU-MLIR',
          coverage: { taster: 'none', workshop: 'none', bootcamp: 'full' },
        },
        {
          no: '14',
          title: '结构化数据汇聚与看板',
          detail:
            '目标检测统计数据写入InfluxDB时序数据库、Grafana告警频次统计/区域热度/合规率趋势看板搭建',
          tool: 'InfluxDB / Grafana',
          coverage: { taster: 'none', workshop: 'none', bootcamp: 'full' },
        },
        {
          no: '15',
          title: '方案复盘与交付总结',
          detail:
            '各组项目方案演练与误报调优效果答辩、边缘算力开销与网络带宽占用复盘、交付物与配置文件归档',
          tool: '—',
          coverage: { taster: 'part', workshop: 'full', bootcamp: 'full' },
        },
      ],
      callout:
        'coverage 键对应排课形态 ID（taster / workshop / bootcamp），值为 full（完整覆盖）/ part（精简覆盖）/ none（不含）/ plus（比完整版更深）。体验课（taster）聚焦 L1 双线体验与基础配置，Jetson NVR为演示观摩不含实操；实战课（workshop）覆盖 L1+L2 完整Node-RED联动与Frigate多路汇聚；交付课（bootcamp）全覆盖 L1+L2+L3 含自定义模型训练与边缘部署。',
    },

    formats: {
      items: [
        {
          id: 'taster',
          name: '体验课 · L1展示层',
          meta: '1 天 · 6–8h',
          shortName: '体验',
          shortMeta: '1天',
        },
        {
          id: 'workshop',
          name: '实战课 · L1+L2',
          meta: '2–3 天 · 14–20h',
          shortName: '实战',
          shortMeta: '2–3天',
        },
        {
          id: 'bootcamp',
          name: '交付课 · L1+L2+L3',
          meta: '3–5 天 · 24–35h',
          shortName: '交付',
          shortMeta: '3–5天',
        },
      ],
      tiers: [
        {
          title: '体验课',
          finalProject: { label: '无 FP', included: false },
          summary: '1 天 · 6–8h · L1 展示层 · 聚焦reCamera单点配置与双主线架构认知',
          rows: [
            {
              title: 'Day 1 上午',
              meta: '模块 01 + 02 + 03',
              body: '环境预检 → 视觉AI核心概念 → reCamera单点轻节点配置',
            },
            {
              title: 'Day 1 下午',
              meta: '模块 04 + 05(演示) + 15(精简)',
              body: '基础入侵检测 → Jetson NVR架构演示 → 总结复盘',
            },
          ],
          footnote:
            '体验课目标是「看得懂、能讲解、能演示」，3分钟跑出reCamera目标检测与入侵告警的演示效果。Jetson多路NVR为观摩演示，不含实操。',
        },
        {
          title: '实战课',
          finalProject: { label: 'FP 完整', included: true },
          summary:
            '2–3 天 · 14–20h · L1+L2 · Node-RED告警联动 + Frigate多路汇聚 + HA自动化 + 误报调优',
          rows: [
            {
              title: 'Day 1',
              meta: '模块 01–05',
              body: '环境预检 → 视觉概念 → reCamera配置 → 基础检测 → Jetson NVR演示',
            },
            {
              title: 'Day 2',
              meta: '模块 06–08',
              body: 'Node-RED视觉事件编排 → 多通道告警联动 → Frigate多路摄像头配置',
            },
            {
              title: 'Day 3（可选）',
              meta: '模块 09 + 10 + 15',
              body: 'HA深度集成 → 误报率调优实操 → 方案复盘与交付总结',
            },
          ],
          footnote:
            '实战课交付 1 套包含 2 路以上 RTSP 接入、Frigate 检测、HA 联动与误报调优的完整系统。学员基础要求：理解 IP 网络、Docker 与 MQTT 基础，能编辑 YAML 配置文件。',
        },
        {
          title: '交付课',
          finalProject: { label: 'FP 完整', included: true },
          summary: '3–5 天 · 24–35h · L1+L2+L3 · 全覆盖含自定义模型训练与边缘部署优化',
          rows: [
            {
              title: 'Day 1–2',
              meta: '模块 01–10',
              body: 'L1+L2 完整内容（reCamera配置 + Node-RED联动 + Frigate多路汇聚 + HA集成 + 误报调优）',
            },
            {
              title: 'Day 3',
              meta: '模块 11 + 12',
              body: '数据集采集与标注 → YOLO模型迁移学习',
            },
            {
              title: 'Day 4',
              meta: '模块 13 + 14',
              body: '边缘端模型转换与部署 → 结构化数据汇聚与看板搭建',
            },
            {
              title: 'Day 5',
              meta: '模块 15',
              body: '方案复盘与交付归档',
            },
          ],
          footnote:
            '交付课目标是具备独立设计和交付垂直行业视觉识别方案的能力。学员基础要求：具备 Python 与 Linux 命令行基础，了解目标检测基本原理，熟悉 L1–L2 能力。',
        },
      ],
      callouts: [
        '体验课是方案演示与客户沟通的标配形态：零算法门槛、1天闭环、聚焦「摄像头能出流、目标能检测、告警能触发」。适合展会、技术开放日与客户初次接触场景。',
        '实战课的 Day 3 为可选弹性日：若学员基础较好可压缩为 2 天（Day 2 下午合并 HA 集成与误报调优）；若需更多 Frigate 配置调优时间则用满 3 天。',
      ],
      warnings: [
        'PoE 交换机与 reCamera HQ PoE 接线需确认交换机端口支持 802.3af/at 标准，非标准 PoE 注入器可能损坏相机网口。严禁将非 PoE 端口误接为 PoE 供电。',
        'Jetson reServer J4012 需刷写 JetPack 镜像并配置 Docker --runtime nvidia，Frigate 必须使用 stable-tensorrt-jp6 镜像，普通 CPU 镜像无法启用 GPU 硬件解码与 TensorRT 加速。',
        '体验课不包含 Frigate 多路配置与 Node-RED 实操，请勿向客户承诺体验课学员能独立完成多路 NVR 汇聚——那是实战课的交付标准。',
        '合规红线：本课程所有检测模型与场景均限于物体/行为/区域检测，严禁人脸身份识别与生物特征追踪。项目交付前须与客户书面确认检测边界。',
      ],
    },

    deliverablesIntro:
      '以下为完整版（交付课）交付；实战课交付前 4 项；体验课交付第 1、2 项的精简版。',
    deliverableCards: [
      {
        title: '视觉系统架构设计图与网络拓扑说明',
        body: '含双硬件主线拓扑图、现场局域网IP地址规划表、PoE供电方案、RTSP流地址与端口分配（554/5000/8123/1883）。',
      },
      {
        title: 'reCamera Node-RED 联动流程配置文件',
        body: '含 SSCMA 模型节点配置、置信度与目标类型过滤规则、MQTT 发布节点、Webhook 告警推送流程 JSON。',
      },
      {
        title: 'Frigate 配置文件（frigate.yml）与 HA 自动化脚本',
        body: '含多路 RTSP 摄像头配置、Zones/Masks 区域定义、检测帧率与置信度阈值、Home Assistant 自动化 YAML 规则。',
      },
      {
        title: '误报率调优前后测试对比记录表',
        body: '含调优前误报频次统计、置信度阈值与 Zones 调整记录、调优后误报率对比数据、光照与遮挡条件备注。',
      },
      {
        title: '自定义数据集、训练配置与量化后模型文件（L3）',
        body: '含标注数据集（Train/Val/Test 7:2:1）、YOLO 训练配置与权重、ONNX 导出文件、TensorRT Engine（Jetson）与 cvimodel（reCamera）量化模型、推理延迟与 FPS 基准测试报告。',
      },
      {
        title: 'InfluxDB 时序数据与 Grafana 看板配置（L3）',
        body: '含检测统计数据表结构、Grafana 告警频次/区域热度/合规率趋势看板配置 JSON。',
      },
    ],

    teacherNotes: {
      heading: '这门课的价值不在算法精度，在「把视觉AI从演示台架搬到客户现场」的工程方法',
      emphasis: '把视觉AI从演示台架搬到客户现场',
      intro:
        'M4 不是一门教学生「调参刷精度」的算法课，而是一门教团队如何用开源相机和边缘计算硬件，把目标检测从实验室演示变成可交付、可维护、可合规的现场方案的工程课。柴火交付的从来不只是「一次上课」，而是一整套可以被拆开、改写、重新组装的东西：15模块课程骨架、教师教案与PPT、reCamera Node-RED示例流程、frigate.yml配置模板、Zones区域绘制方法、误报调优记录表、设备清单与台架规范。',
      openings: [
        {
          no: '口子 01',
          title: '换场景',
          body: '模块 04「基础入侵检测与区域绘制」的检测区域是开放的：你的行业、你的客户现场、这座城市正在发生的一个真问题。周界防范可以是园区围墙，可以是仓库后门，可以是养殖大棚入口——问题越靠近真实现场，效果越好，而这件事你比我们懂。',
        },
        {
          no: '口子 02',
          title: '接相机',
          body: '你已有的客户存量网络摄像头、学校实训台架上的RTSP设备、合作方的专有协议相机，可以接在模块 08 之后，成为 Frigate 多路接入练习的对象池。M4 负责把方法讲透，门后面接什么相机，由你来定。',
        },
        {
          no: '口子 03',
          title: '加你的东西',
          body: '你在行业里攒下的那些：现场踩过的坑、能让学员瞬间理解置信度阈值的那个比喻、客户现场最常问的三个问题、误报调优的独门经验——那正是我们没有、也给不了的部分。',
        },
      ],
      quote: {
        text: '一门视觉AI课最好的归宿，不是被完整地执行一遍，而是被一位工程师改到面目全非，然后变成只有他能交付的那个方案。',
        cite: '—— 冯磊，本系列课程作者',
      },
    },

    complianceBoundary: {
      principles: ['仅做物体/行为/区域检测与事件告警，严禁人脸身份识别与生物特征追踪。'],
      applicable: [
        '通用与特定目标检测（人/车/安全帽/反光衣/工件等物体类别）',
        '区域入侵与越界检测、夜间异常驻留检测',
        '多路 RTSP 视频流汇聚分析与 NVR 录像管理',
        '结构化检测事件通过 MQTT/Webhook 推送至声光告警与第三方系统',
        '区域人流计数与驻留时长统计（匿名聚合，不关联个人身份）',
        '自定义目标检测模型训练与边缘端量化部署（L3）',
      ],
      notApplicable: [
        '严禁人脸身份识别与生物特征追踪（合规红线），全文所有模型与场景均限于物体/行为/区域检测',
        '严禁用于毫秒级生命安全制动控制（如自动驾驶、医疗诊断、工业安全联锁）',
        '不替代法定安防监控系统与消防报警系统',
        '不承诺在极端恶劣天气（暴雨、大雾、强逆光）下的 100% 识别率',
        '不包含长周期驻场代运维服务',
        'reCamera 单机为单摄像头轻量方案，支持 1 路 1080P 实时推理；多路并发需部署边缘主机（RK3576 / J4012）并合理规划检测分辨率与抽帧率（通常 5–10 FPS）',
      ],
    },
  },
  {
    id: 'm5',
    slug: 'm5',
    code: 'M5',
    title: '环境感知与数据采集',
    subtitle: '无需复杂拉线施工，搭建广域传感网络，轻松实现产业数字化升级',
    oneLiner: '工业级传感器与4G/LoRaWAN双链路，实现广域场景低功耗环境监测与数据采集。',
    oneLinerEmphasis: '工业级传感器与4G/LoRaWAN双链路',
    realProblem:
      '面向连栋温室大棚、设施园艺、河道水质监测、城市内涝点与工业仓储等广域分散场景，偏远点位布线取电成本高，野外山地与河流断面上百米至数公里铺设线缆工程量巨大。现场多厂商传感器各自定义私有协议，二次开发与协议适配周期长；霜冻、水质恶化、土壤干旱等异常依赖人工定期巡检，故障发现晚且耗费人力；采集到的环境数据停留在云端大屏或手机App，无法与既有灌溉/风机等执行机构联动，也无法对接第三方业务系统。',
    illustration: '/illustrations/m5.svg',
    difficulty: '入门',
    duration: '2 天',
    prerequisite: '无',
    scenarios: [
      '智慧农业与设施园艺：土壤温湿度/EC监测、温室CO2浓度调控、精准水肥灌溉联动',
      '水质与生态环境监测：河道断面与养殖水体pH值监测、户外微型气象站',
      '智慧市政与城市内涝：立交桥与低洼积水监测、管网温湿度与压力状态监测',
      '工业仓储与厂房监控：恒温恒湿库房监测、工业除尘与废气排放环境参数监控',
      '野外无人值守监测：林区防火气象站、大面积农场多点位土壤墒情远程采集',
    ],
    painPoints: [
      '偏远点位取电与布线成本高',
      '传感器协议多且不兼容',
      '异常响应滞后与人工巡检耗时',
      '缺乏标准化自动化与第三方对接能力',
    ],
    techStack: [
      'Modbus RTU',
      'RS485',
      'LoRaWAN',
      '4G全网通',
      'SenseCraft Data',
      'Node-RED',
      'SenseCAP Open API',
      'Grafana',
      'InfluxDB',
    ],
    coreHardware: [
      '4G多通道数据采集器（114992169）',
      '七合一气象环境传感器（101991050）',
      '耘小果多要素农业监测仪（114993122）',
      '4G土壤墒情监测仪（114993646）',
      '叶面温湿度传感器（314990737）',
      'reComputer R1025-10（113991274）',
    ],
    capabilities: [
      '多环境要素采集（土壤/气象/气体/水质）',
      '无线广域传输（4G蜂窝直连 / LoRaWAN）',
      '云端报表与多条件告警配置',
      'SenseCAP Open API数据对接与提取',
      'Node-RED本地阈值联动控制编排',
      '时序数据库存储与Grafana私有化看板',
    ],
    audience: [
      '方案顾问与商务销售',
      '教研团队与实训讲师',
      '农业、环保、市政工程技术人员',
      '合作院校与政企实训学员',
    ],
    deliverables: [
      '传感器网络部署图与电气接线定义表',
      'Modbus RTU从机地址与寄存器映射字典',
      'SenseCraft Data告警策略配置清单',
      'Node-RED自动化流程文件（.json）与API集成调用示例代码（L3）',
      'Grafana监控大屏配置文件（L3）',
    ],
    accent: 'yellow',
    cells: {
      L1: {
        title: '环境感知网络架构与数据监视',
        subtitle: '实现免拉线广域传感监测，设备上电即刻查看环境数据',
        durationDays: 1,
        outcomes: [
          '理解4G DTU与LoRaWAN网关在物联网数据采集中的不同拓扑结构与适用条件',
          '熟练使用SenseCraft Data网页端与移动端App查看多维度环境参数与历史趋势曲线',
          '了解土壤、水质、气象等典型工业传感器的测量原理与部署注意事项',
        ],
        comingSoon: false,
      },
      L2: {
        title: '传感器接线、Modbus配置与规则告警',
        subtitle: '拥有个性化传感数据统一看板，异常自动告警',
        durationDays: 3,
        outcomes: [
          '掌握RS485差分接线、5V/12V电源分配与Modbus RTU寄存器寻址配置',
          '熟练完成4G数据采集器（或LoRaWAN网关）的设备绑定与轮询周期设置',
          '配置3类以上业务告警策略（温度上限报警、土壤水分过低告警、设备离线通知）',
        ],
        comingSoon: false,
      },
      L3: {
        title: 'API数据集成与本地边缘自动化',
        subtitle: '打通数据接口，将现场监测数据无缝集成至自有系统',
        durationDays: 5,
        outcomes: [
          '掌握SenseCAP Open API鉴权（Access ID / Access Key，HTTP Basic Auth）与遥测数据提取接口调用',
          '在reComputer R1025上部署Node-RED编排本地自动化控制流，根据传感器数值触发执行机构',
          '将环境时序数据接入InfluxDB与Grafana，设计私有化数据监控大屏',
        ],
        comingSoon: false,
      },
    },

    facts: [
      { label: '难度', value: '入门' },
      { label: '时长', value: '2 天' },
      { label: '最短形态', value: '1 天（体验课 · L1）' },
      { label: '排课形态', value: '3 层：体验 / 实战 / 交付' },
      { label: '核心协议', value: 'Modbus RTU / RS485 / LoRaWAN / 4G 全网通' },
      { label: '双通信路线', value: '4G 蜂窝直连版（国内）/ LoRaWAN 广域版（海外免布线）' },
    ],

    hardwareList: [
      {
        key: 'DTU',
        name: '4G多通道数据采集器（114992169）',
        note: '4路RS485工业数采仪 · 4G蜂窝上报',
      },
      {
        key: 'WEATHER',
        name: '七合一气象环境传感器（101991050）',
        note: '超声波风速风向/雷达雨量 · RS485',
      },
      {
        key: 'AGRI',
        name: '耘小果多要素农业监测仪（114993122）',
        note: '温湿度/光照/CO2一体化 · RS485',
      },
      { key: 'SOIL', name: '4G土壤墒情监测仪（114993646）', note: '管式多层土壤监测 · 4G+太阳能' },
      {
        key: 'EDGE',
        name: 'reComputer R1025-10（113991274）',
        note: '边缘自动化主机 · Node-RED/API',
      },
    ],

    hardwareIntro: {
      subtitle:
        '本课程以「4G 数据采集 + 多类传感终端」为核心教具，覆盖农田、气象到园区的感知采集。',
      items: [
        {
          name: '4G多通道数据采集器（114992169）',
          note: '4路RS485工业数采仪，经4G上报云平台',
          description:
            '数采中枢，支持4路RS485通道，可经分线器扩展至最多32个传感器；4G蜂窝全网通直连，插卡即用，标准Modbus RTU协议，12V/2A电源适配器供电。',
          image: '/illustrations/m5-4g-multi-channel-logger.png',
          imageAlt: '4G多通道数据采集器',
        },
        {
          name: '七合一气象环境传感器（101991050）',
          note: '工业七合一气象站，RS485/SDI-12输出',
          description:
            '集成超声波风速风向、雷达雨量、光照、温湿压与太阳总辐射；12~24V DC供电，IP66一体式防护，用于气象多参数总线解析实操。',
          image: '/illustrations/m5-s700-weather-station.png',
          imageAlt: '七合一气象环境传感器',
        },
        {
          name: '耘小果多要素农业监测仪（114993122）',
          note: '一体化微气象农业监测仪，RS485输出',
          description:
            '集成空气温湿度、光照度、CO2紧凑型一体化监测；12V DC供电，农业室外防护等级，用于农业多要素采集教学对比与扩展测试。',
          image: '/illustrations/m5-yunxiaoguo-monitor.png',
          imageAlt: '耘小果多要素农业监测仪',
        },
        {
          name: '4G土壤墒情监测仪（114993646）',
          note: '管式土壤多层监测仪，内置4G与太阳能',
          description:
            '免布线深层土壤水分与温度连续监测；太阳能+锂电自供电，IP68防护，4G全网通无线直发，适用于野外无人值守土壤墒情监测。',
          image: '/illustrations/m5-4g-soil-moisture.png',
          imageAlt: '4G土壤墒情监测仪',
        },
        {
          name: '叶面温湿度传感器（314990737）',
          note: '仿生叶片表面温湿度监测探头，RS485接口',
          description:
            '监测叶面温湿度与叶面结露时长；5~24V DC供电，IP67防护，用于作物叶面微气候监测与病害预警实验。',
          image: '/illustrations/m5-leaf-wetness.png',
          imageAlt: '叶面温湿度传感器',
        },
        {
          name: 'reComputer R1025-10（113991274）',
          note: '本地自动化主机，运行Node-RED与API对接',
          description:
            '带隔离RS485与双网口的边缘智能控制器；通过官方安装脚本部署Node-RED，访问http://[设备IP]:1880进行本地自动化编排，实现阈值判断与执行机构联动；12V/2A独立供电。',
          image: '/illustrations/m5-recomputer-r1025.png',
          imageAlt: 'reComputer R1025-10',
        },
      ],
      note: '另配SenseCAP Outdoor Gateway（114992982）、SenseCAP S2100 Data Logger（114992872）、SenseCAP S2105土壤传感器（114992871）、SenseCAP S2103 CO2/温湿度传感器（114992869）等LoRaWAN路线硬件（待补图），以及4G物联网SIM卡、屏幕、整体电源设计、路由器等通用配件。',
    },

    toolchain: {
      stages: [
        {
          name: 'SenseCAP 传感器 + SenseCraft Data',
          meta: '工业传感器开箱接入 · 云端SaaS看板',
          steps: ['传感器接线', '4G采集器/网关绑定', '云端实时数据与报表'],
          highlight: true,
        },
        {
          name: 'Modbus RTU + RS485 总线',
          meta: '寄存器映射配置 · 多传感器并联与告警编排',
          steps: ['RS485差分接线', '从机地址与寄存器配置', '多级阈值告警策略'],
        },
        {
          name: 'SenseCAP Open API + Node-RED + Grafana',
          meta: 'REST API数据提取 · 本地阈值联动 · 私有化看板',
          steps: ['Open API鉴权与遥测提取', 'Node-RED本地自动化编排', 'InfluxDB+Grafana私有化大屏'],
        },
      ],
      hinge: {
        title: '关键转折点 · 从云端数据监视到本地边缘闭环控制',
        body: 'SenseCraft Data云端解决「数据能看见、告警能推送」的监视问题；SenseCAP Open API让系统第一次具备跨平台数据提取能力，Node-RED在reComputer边缘端实现「感知→阈值判断→执行机构联动」的就地闭环，从「环境监测」走向「数据集成与自动化控制」。',
      },
      note: '另需4G物联网SIM卡（承载蜂窝数据回传）、SenseCraft App（移动端设备绑定与告警推送）、InfluxDB时序数据库（L3私有化数据存储）。',
    },

    curriculum: {
      items: [
        {
          no: '01',
          title: '课前准备与环境预检',
          detail:
            '硬件台架清点（4G采集器/传感器/R1025）、物联网SIM卡激活、SenseCraft Data账号初始化、教学资料下发',
          tool: '—',
          coverage: { taster: 'full', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '02',
          title: '环境感知网络架构解析',
          detail:
            '4G直连架构（RS485传感器→4G采集器→云平台）与LoRaWAN架构（无线节点→户外网关→云平台→边缘主机）双拓扑对比与选型依据',
          tool: 'SenseCraft Data',
          coverage: { taster: 'full', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '03',
          title: '传感器测量原理与典型场景',
          detail:
            '土壤水分/温度/EC测量原理及墒情监测；七合一气象站构造；农业多要素传感与叶面温湿度探头部署要点',
          tool: '—',
          coverage: { taster: 'full', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '04',
          title: 'SenseCraft Data平台数据监控',
          detail:
            '网页端控制台：设备管理、实时数据卡片、历史趋势折线图与空间地理点位标绘；移动端SenseCraft App扫码绑定设备并查看状态与实时数据',
          tool: 'SenseCraft Data / App',
          coverage: { taster: 'full', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '05',
          title: '数据报表导出与移动端操作',
          detail: '按小时/天/月聚合数据导出（CSV/Excel格式）与历史归档；移动端告警消息中心操作演示',
          tool: 'SenseCraft Data',
          coverage: { taster: 'part', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '06',
          title: 'RS485传感器接线实操',
          detail:
            '航空插头引脚定义（VCC/GND/RS485-A/RS485-B）、传感器电源供电匹配（5V/12V DC）、多传感器并联（RS485分线器）与从机地址（Slave ID）防冲突设置',
          tool: 'RS485 / 接线工具',
          coverage: { taster: 'none', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '07',
          title: '数据采集器配置与平台绑定',
          detail:
            '4G采集器设备EUI与Key绑定、通道命名、采样间隔与上传周期设置；LoRaWAN网关入网与节点绑定流程',
          tool: '4G采集器 / SenseCraft Data',
          coverage: { taster: 'none', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '08',
          title: 'Modbus RTU寄存器映射配置',
          detail:
            '采集器与传感器Modbus寄存器映射表配置（起始地址、读取长度、数据类型解析与缩放系数）；寄存器读取调试与数据校验',
          tool: 'Modbus RTU',
          coverage: { taster: 'none', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '09',
          title: '多级业务告警规则配置',
          detail:
            '阈值告警（土壤温度<5°C霜冻预警、环境温度>35°C高温通风预警）；突变与趋势告警；设备运行状态告警（采集器离线/传感器掉线/电池低电量）；通知渠道配置（App推送/邮件/Webhook）',
          tool: 'SenseCraft Data 告警',
          coverage: { taster: 'none', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '10',
          title: 'SenseCAP Open API调用',
          detail:
            '在SenseCraft Data平台创建Access ID与Access Key，HTTP Basic Auth鉴权；编写HTTP请求获取最新遥测数据、历史时序数据与设备在线状态；JSON报文字段解析与数据清洗',
          tool: 'SenseCAP Open API',
          coverage: { taster: 'none', workshop: 'none', bootcamp: 'full' },
        },
        {
          no: '11',
          title: 'reComputer R1025本地自动化编排',
          detail:
            '官方安装脚本在R1025上部署Node-RED；编写自动化流：定时轮询/HTTP请求拉取云端数据，判断环境阈值；经RS485通道下发控制指令（触发继电器/开启灌溉水阀）',
          tool: 'Node-RED / reComputer R1025',
          coverage: { taster: 'none', workshop: 'none', bootcamp: 'full' },
        },
        {
          no: '12',
          title: '时序数据库与Grafana看板对接',
          detail:
            '将环境感知数据写入InfluxDB时序数据库；导入Grafana仪表盘模板，配置多区域环境对比大屏与私有化数据监控',
          tool: 'InfluxDB / Grafana',
          coverage: { taster: 'none', workshop: 'none', bootcamp: 'full' },
        },
        {
          no: '13',
          title: '方案复盘与交付总结',
          detail:
            '现场传感器布设抗干扰/防水等级（IP66/IP68）与防雷规范复盘；功耗预算计算（太阳能板瓦数与电池容量配比）；方案交付物与API接口说明文档归档',
          tool: '—',
          coverage: { taster: 'part', workshop: 'full', bootcamp: 'full' },
        },
      ],
      callout:
        'coverage 键对应排课形态 ID（taster / workshop / bootcamp），值为 full（完整覆盖）/ part（精简覆盖）/ none（不含）/ plus（比完整版更深）。体验课（taster）聚焦 L1 平台架构认知与云端数据监视，不含RS485接线与API集成；实战课（workshop）覆盖 L1+L2 完整传感器接线、Modbus配置与告警编排；交付课（bootcamp）全覆盖 L1+L2+L3，含SenseCAP Open API对接与Node-RED本地自动化。',
    },

    formats: {
      items: [
        {
          id: 'taster',
          name: '体验课 · L1展示层',
          meta: '1 天 · 6–8h',
          shortName: '体验',
          shortMeta: '1天',
        },
        {
          id: 'workshop',
          name: '实战课 · L1+L2',
          meta: '2–3 天 · 14–20h',
          shortName: '实战',
          shortMeta: '2–3天',
        },
        {
          id: 'bootcamp',
          name: '交付课 · L1+L2+L3',
          meta: '3–5 天 · 24–35h',
          shortName: '交付',
          shortMeta: '3–5天',
        },
      ],
      tiers: [
        {
          title: '体验课',
          finalProject: { label: '无 FP', included: false },
          summary: '1 天 · 6–8h · L1 展示层 · 聚焦双通信架构认知与云端数据监视',
          rows: [
            {
              title: 'Day 1 上午',
              meta: '模块 01 + 02 + 03',
              body: '环境预检 → 双通信架构解析 → 传感器测量原理与场景',
            },
            {
              title: 'Day 1 下午',
              meta: '模块 04 + 05 + 13(精简)',
              body: 'SenseCraft Data平台监控 → 报表导出与移动端操作 → 总结复盘',
            },
          ],
          footnote:
            '体验课目标是「看得懂、能讲解、能演示」，3分钟跑出多节点传感器数据上云与实时看板的演示效果。不含RS485接线、Modbus配置与API集成。',
        },
        {
          title: '实战课',
          finalProject: { label: 'FP 完整', included: true },
          summary: '2–3 天 · 14–20h · L1+L2 · 传感器接线 + Modbus配置 + 多级告警编排',
          rows: [
            {
              title: 'Day 1',
              meta: '模块 01–05',
              body: '环境预检 → 双通信架构 → 传感器原理 → 云端数据监控 → 报表导出',
            },
            {
              title: 'Day 2',
              meta: '模块 06–09',
              body: 'RS485接线实操 → 采集器配置与绑定 → Modbus寄存器映射 → 多级告警规则配置',
            },
            {
              title: 'Day 3（可选）',
              meta: '模块 13',
              body: '方案复盘与交付总结（含布设规范与功耗预算）',
            },
          ],
          footnote:
            '实战课交付 1 套含2种以上传感器的RS485物理接线、1 份Modbus寄存器映射表、至少 3 类业务告警策略。学员基础要求：能读懂传感器接线图，具备RS485/Modbus或电子接线基础。',
        },
        {
          title: '交付课',
          finalProject: { label: 'FP 完整', included: true },
          summary: '3–5 天 · 24–35h · L1+L2+L3 · 全覆盖含SenseCAP Open API对接与Node-RED本地自动化',
          rows: [
            {
              title: 'Day 1–2',
              meta: '模块 01–09',
              body: 'L1+L2 完整内容（架构认知 + 云端监视 + RS485接线 + Modbus配置 + 告警编排）',
            },
            {
              title: 'Day 3',
              meta: '模块 10',
              body: 'SenseCAP Open API鉴权与遥测数据提取实操',
            },
            {
              title: 'Day 4',
              meta: '模块 11',
              body: 'reComputer R1025上Node-RED本地自动化控制流开发',
            },
            {
              title: 'Day 5',
              meta: '模块 12 + 13',
              body: 'InfluxDB+Grafana私有化看板 → 方案复盘与交付归档',
            },
          ],
          footnote:
            '交付课目标是具备独立交付环境监测系统与API数据集成的能力。学员基础要求：有HTTP API调用、JSON解析与Linux命令行基础，熟悉 L1–L2 能力。',
        },
      ],
      callouts: [
        '体验课是方案演示与客户沟通的标配形态：零接线门槛、1天闭环、聚焦「传感器能接入、数据能上云、看板能看见」。适合展会、技术开放日与客户初次接触场景。',
        '实战课的 Day 3 为可选弹性日：若学员基础较好可压缩为 2 天（Day 2 下午合并复盘与交付总结）；若需更多告警策略调优与接线排障时间则用满 3 天。',
      ],
      warnings: [
        '4G采集器与传感器供电涉及12V/24V DC直流回路，必须确认电源适配器规格与传感器供电要求匹配（5V/12V/24V DC），避免过压损坏传感器或欠压导致读数异常。学员操作前需由讲师确认接线无误后方可通电。',
        'RS485总线接线需注意A/B线序与终端电阻匹配，多传感器并联时通过分线器扩展并设置唯一从机地址（Slave ID）防止冲突；总线长度超过10米时建议在末端加装120Ω终端电阻，否则可能出现通信丢包或寄存器读取失败。',
        '4G版需确认现场蜂窝信号强度，地下室或深山场景需外接高增益天线；每台采集器需插入有效物联网流量SIM卡。LoRaWAN版需评估网关与节点间的视距覆盖范围，野外长期节点需配套太阳能板与高低温环境电池。',
        '体验课不包含RS485接线与Modbus配置内容，请勿向客户承诺体验课学员能独立完成传感器物理接线——那是实战课的交付标准。',
      ],
    },

    deliverablesIntro:
      '以下为完整版（交付课）交付；实战课交付前 4 项；体验课交付第 1、2 项的精简版。',
    deliverableCards: [
      {
        title: '传感器网络部署图与电气接线定义表',
        body: '含现场传感器布点拓扑图、RS485总线接线图、航空插头引脚定义表（VCC/GND/RS485-A/RS485-B）、电源分配方案与从机地址（Slave ID）分配表。',
      },
      {
        title: 'Modbus RTU从机地址与寄存器映射字典',
        body: '含所有接入传感器型号、从机地址、寄存器起始地址、读取长度、数据类型、缩放系数与物理量换算公式。',
      },
      {
        title: 'SenseCraft Data告警策略配置清单',
        body: '含阈值告警（上下限绝对阈值）、突变与趋势告警、设备运行状态告警（离线/掉线/低电量）的完整配置参数与通知渠道（App推送/邮件/Webhook）设置记录。',
      },
      {
        title: '数据报表与平台操作手册',
        body: '含SenseCraft Data网页端与移动端App操作指南、数据报表导出流程（CSV/Excel）、历史数据归档方法与设备绑定步骤。',
      },
      {
        title: 'Node-RED自动化流程文件（.json）与API集成调用示例代码（L3）',
        body: '含SenseCAP Open API鉴权配置（Access ID/Access Key，HTTP Basic Auth）、遥测数据提取HTTP请求示例、Node-RED阈值联动控制流JSON文件与RS485控制指令下发逻辑。',
      },
      {
        title: 'Grafana监控大屏配置文件（L3）',
        body: '含InfluxDB时序数据库写入配置、Grafana数据源连接设置、多区域环境对比大屏仪表盘模板（JSON）与私有化部署说明。',
      },
    ],

    teacherNotes: {
      heading: '这门课的价值不在传感器硬件，在「把广域分散的环境数据接进来」的方法',
      emphasis: '把广域分散的环境数据接进来',
      intro:
        'M5 不是一门教学生「看几个传感器读数」的课，而是一门教团队如何用工业级传感器和双通信链路，把野外、农田、河道、市政管网上那些分散的、难以布线的环境数据统一接进来的方法课。柴火交付的从来不只是「一次上课」，而是一整套可以被拆开、改写、重新组装的东西：13模块课程骨架、教师教案与PPT、Modbus寄存器映射工具、传感器接线图模板、告警策略配置清单、API调用示例代码。',
      openings: [
        {
          no: '口子 01',
          title: '换场景',
          body: '模块 09「多级业务告警规则配置」的阈值是开放的：你的行业、你的客户现场、这座城市正在发生的一个真问题。土壤温度低于5°C可以是霜冻预警，可以是冷库，可以是养殖大棚——问题越靠近真实现场，效果越好，而这件事你比我们懂。',
        },
        {
          no: '口子 02',
          title: '接传感器',
          body: '你已有的客户存量传感器、学校实训台架上的环境探头、合作方的RS485设备，可以接在模块 06 之后，成为Modbus接入练习的对象池。M5 负责把方法讲透，门后面接什么传感器，由你来定。',
        },
        {
          no: '口子 03',
          title: '加你的东西',
          body: '你在行业里攒下的那些：野外布设经验、踩过的坑、能让学员瞬间理解LoRaWAN视距覆盖的那个比喻、客户现场最常问的三个问题——那正是我们没有、也给不了的部分。',
        },
      ],
      quote: {
        text: '一门环境监测课最好的归宿，不是被完整地执行一遍，而是被一位工程师改到面目全非，然后变成只有他能交付的那个方案。',
        cite: '—— 冯磊，本系列课程作者',
      },
    },

    complianceBoundary: {
      principles: [
        '4G与LoRaWAN为两条独立交付路线，硬件不混用；环境数据属低频物联监测，不做毫秒级闭环控制。',
      ],
      applicable: [
        '多环境要素采集（土壤温湿度/EC、气象七参数、CO2、叶面温湿度、水质pH等）与广域分散点位监测',
        '4G蜂窝直连（国内）与LoRaWAN广域无线（海外/免布线）两种通信架构的选型、部署与数据回传',
        'SenseCraft Data云端实时看板、历史趋势分析、数据报表导出（CSV/Excel）与多条件阈值告警配置',
        'SenseCAP Open API数据提取（HTTP Basic Auth，Access ID/Access Key鉴权）与第三方业务系统单向数据对接',
        'reComputer R1025边缘端Node-RED本地阈值联动控制（经RS485下发继电器/灌溉阀等低压执行器指令）',
        'InfluxDB时序数据库存储与Grafana私有化数据监控大屏部署',
      ],
      notApplicable: [
        '4G与LoRaWAN硬件不混用：两条路线为独立交付套件，4G采集器（114992169）与LoRaWAN网关（114992982）/S210x节点分属不同通信协议栈，不得在同一套教学台架中混合组网或交叉替换硬件',
        '数据主权与私有化部署边界：SenseCraft Data为云端SaaS平台，环境数据默认存储于Seeed云端；L3通过Open API提取数据至本地InfluxDB实现私有化存储，但原始数据仍先经云端中转，不提供纯离线/断网可用的本地化数据采集服务。私有化部署仅覆盖L3阶段的API拉取数据，不包含云端平台本身的私有化部署',
        '不适用于毫秒级闭环运动控制：环境传感采样周期通常为1~60分钟（视现场功耗与电池策略配置），属于低频物联监测，不做高频伺服振动监测，不适用于毫秒级闭环运动控制或实时伺服系统',
        '严禁介入消防、电梯控制、高压配电等安全关键生命系统的监测与控制',
        '不包含大面积土木施工与高空防雷工程实施',
        '不包含对未开放协议的第三方老旧传感器的协议破解服务',
        '不承诺由于极端自然灾害（淹没、雷击）导致的传感器硬件不可抗力损坏免责',
        '控制类场景仅限经RS485下发的低压直流执行器（继电器模块、灌溉水阀电磁阀等），严禁通过本系统直接控制AC 220V及以上强电负载',
        '传感器测量精度受安装深度、土壤紧实度、电极表面洁净度等物理环境影响，需定期维护与校准，不承诺特定场景下的绝对测量精度',
      ],
    },
  },
  {
    id: 'm6',
    slug: 'm6',
    code: 'M6',
    title: '机器人控制与具身智能',
    subtitle: '告别繁琐的传统机器人编程，轻松掌控多自由度动作，快速响应现场作业需求',
    oneLiner: '六轴桌面机械臂加多模态感知，实现主从遥操到3D空间精准抓取与具身智能开发。',
    oneLinerEmphasis: '主从遥操到3D空间精准抓取',
    realProblem:
      '面向农产品外观分拣、轻量自动化产线辅助上下料、展厅展位迎宾演示与辅助作业工位等场景，传统机械臂教学从运动学推导与电机控制讲起，应用侧人员上手周期长。大语言模型多局限于文本生成，缺乏接入物理执行机构的标准路径；从零搭建分拣/搬运演示需联调视觉识别、运动规划与抓取时序，多系统集成难度大；新手操作带动力机械臂，存在碰撞、误入工作空间等物理安全风险。',
    illustration: '/illustrations/m6.png',
    difficulty: '入门',
    duration: 'L1 1天 / L2 2–3天 / L3 3–5天',
    prerequisite:
      'L1无（零基础，具备基本电脑操作技能）；L2掌握基础网络配置与系统联动概念；L3具备基础Python编程与Linux技能',
    scenarios: [
      '农产品与工业件外观分拣：合格品、瑕疵品与疑似品分类抓取',
      '轻量自动化产线辅助：物料移载、工件推送、按序码放',
      '展厅展位与教学演示：语音/视觉交互迎宾、轨迹展示',
      '辅助作业与自动化工位：定时定点巡检摆拍、轻量协作抓取',
      '科研与实训：具身智能算法验证、机器人运动学教学实验',
    ],
    painPoints: [
      '底层控制与算法门槛高',
      '自然语言到物理执行断层',
      '视觉与执行协同调试复杂',
      '现场运行安全风险',
    ],
    techStack: [
      'SenseCraft Robotics',
      'Pinocchio（Python刚体运动学解算库）',
      'Motorbridge SDK（总线伺服舵机驱动）',
      'HTTP / MQTT消息通知',
      'Python',
      'LeRobot（动作数据集标准）',
      'Isaac Sim（数字孪生仿真，L3选修）',
    ],
    coreHardware: [
      'reBot DevArm B601-RS机械臂（100019336）',
      'Star Arm 102主控示教臂（100004723）',
      'reComputer Super J4012（114110314）',
      '奥比中光Gemini 2 3D相机（101090144）',
      'ET-S231广角1080P USB摄像头（100035502）',
      '双机位摄像头支架（100006505）',
      '机械臂数据采集光控箱（100094392）',
      'reSpeaker Flex语音套件（100005504 / 100099135）',
      '工业级独立急停按钮（100091373）',
    ],
    capabilities: [
      '机械臂选型与商业取舍判断',
      '硬件急停与工作空间安全规范操作',
      '主从臂遥操与语音指令控制',
      '多动作流程编排与安全确认机制配置',
      '工位视觉事件触发与微场景联调',
      'RGB-D深度相机3D定位与手眼对齐',
      'Pinocchio逆运动学求解与异常处理',
      'Motorbridge驱动真机空间抓取闭环',
      '遥操动作数据集采集（LeRobot标准）',
      'VLA具身大模型与Isaac Sim数字孪生初探',
    ],
    audience: [
      '方案顾问与商务销售',
      '教研团队与实训讲师',
      '机器人与自动化工程技术人员',
      '合作院校与政企实训学员',
    ],
    deliverables: [
      '机械臂工作空间布置与安全操作记录',
      'SenseCraft动作流程配置与工位视觉联动演示系统',
      '3D空间自动抓取Python工程源码（深度相机 + Pinocchio + Motorbridge）',
      '遥操动作数据集样本与方案设计交付文档',
    ],
    accent: 'red',
    cells: {
      L1: {
        title: '选型认知、安全规范与开箱上手',
        subtitle: '遥操六轴机械臂，实时同步多自由度动作',
        durationDays: 1,
        outcomes: [
          '理解工业机械臂分类（直角坐标滑台、SCARA、Delta、六轴关节）与速度/精度/负载/安全/成本的商业选型权衡',
          '掌握机械臂物理工作空间边界、硬件急停使用与安全操作规程',
          '掌握SenseCraft平台开箱连接，跑通主从遥操与语音指令夹取',
        ],
        comingSoon: false,
      },
      L2: {
        title: '场景剖析、空间直觉与多模态编排',
        subtitle: '自主识别目标并执行抓取，灵活应对位置变化',
        durationDays: 3,
        outcomes: [
          '能向客户清晰阐述3D场景为什么需要六轴机械臂及其选型边界',
          '掌握SenseCraft多动作流程编排与"生成 → 3D预览 → 人工确认 → 真机执行"安全确认机制',
          '掌握基于工位视觉的事件触发与微场景搭建，连续3次稳定运行',
        ],
        comingSoon: false,
      },
      L3: {
        title: '3D空间抓取闭环与具身智能前瞻',
        subtitle: '定制专属场景应用，快速适配特定作业流程',
        durationDays: 5,
        outcomes: [
          '使用RGB-D深度相机获取目标3D物理坐标，通过Python调用Pinocchio完成电机角度自动换算，利用Motorbridge驱动真机完成空间抓取与异常处理',
          '掌握主从遥操动作数据集采集流程（LeRobot标准格式），理解VLA具身大模型与Isaac Sim数字孪生仿真基本原理',
          '交付完整Python抓取工程源码、遥操数据集与方案设计文档',
        ],
        comingSoon: false,
      },
    },

    facts: [
      { label: '难度', value: '入门' },
      { label: '时长', value: 'L1 1天 / L2 2–3天 / L3 3–5天' },
      { label: '最短形态', value: '1 天（体验课 · L1）' },
      { label: '排课形态', value: '3 层：体验 / 实战 / 交付' },
      { label: '核心执行器', value: 'reBot DevArm B601-RS 六轴机械臂' },
      { label: '核心工具链', value: 'SenseCraft Robotics / Pinocchio / Motorbridge SDK / LeRobot' },
    ],

    hardwareList: [
      { key: 'ARM', name: 'reBot DevArm B601-RS', note: '六轴从动执行臂 · 含电动夹爪与总线舵机' },
      { key: 'MASTER', name: 'Star Arm 102', note: '主控示教臂 · 1:1主从遥操 · 兼容LeRobot' },
      {
        key: 'EDGE',
        name: 'reComputer Super J4012',
        note: 'Jetson Orin NX 16GB · 控制中枢与推理主机',
      },
      { key: 'DEPTH', name: '奥比中光Gemini 2', note: 'RGB-D深度相机 · 3D空间坐标定位' },
      { key: 'ESTOP', name: '工业级独立急停按钮', note: '常闭硬件回路 · 硬切动力电 · 不接软件' },
    ],

    hardwareIntro: {
      subtitle:
        '本课程以「六轴桌面机械臂 + 多模态感知 + 边缘算力」为核心教具，覆盖遥操到3D抓取全链路。',
      items: [
        {
          name: 'reBot DevArm B601-RS机械臂（100019336）',
          note: '6+1自由度开源从动机械臂成品，含电动夹爪与总线舵机',
          description:
            '受控从臂，响应指令执行动作与抓取；48V/600W工业级开关电源（SKU 100054289）独立稳压供电，需使用6寸G字夹（SKU 100014192）物理紧固于实验台防止动作倾倒。',
          image: '/illustrations/m6-rebot-devarm-b601.png',
          imageAlt: 'reBot DevArm B601-RS机械臂',
        },
        {
          name: 'Star Arm 102主控示教臂（100004723）',
          note: '6自由度模块化主控示教臂，兼容LeRobot',
          description:
            '主控示教端，手动引导操作并驱动从臂实时镜像动作，实现1:1主从位姿镜像映射；12V/2A多国插脚电源适配器（SKU 100033211）独立供电，套件自带XT30公头线。',
          image: '/illustrations/m6-star-arm-102.png',
          imageAlt: 'Star Arm 102主控示教臂',
        },
        {
          name: 'reComputer Super J4012（114110314）',
          note: 'Jetson Orin NX 16GB边缘算力主机',
          description:
            '控制中枢，运行机械臂运动学解算、控制服务与大模型推理；出厂预装JetPack 6.2，需确认SenseCraft Robotics服务与Python（Pinocchio / Motorbridge SDK）运行环境就绪；19V/4.7A大功率电源适配器供电。',
          image: '/illustrations/m6-recomputer-super-j4012.png',
          imageAlt: 'reComputer Super J4012',
        },
        {
          name: '奥比中光Gemini 2 3D相机（101090144）',
          note: '双目红外3D深度相机，Type-C接口',
          description:
            '空间三维视觉引导，直接读取物体在空间中的三维物理坐标（X, Y, Z）实现空间闭环抓取；L3阶段需与机械臂基座坐标系完成手眼标定对齐，确保测出的坐标可被Pinocchio正确换算为关节角度。',
          image: '/illustrations/m6-gemini-2-depth-camera.png',
          imageAlt: '奥比中光Gemini 2 3D相机',
        },
        {
          name: 'ET-S231广角1080P USB摄像头（100035502）',
          note: '工位图像采集端',
          description:
            '用于机械臂工位物料到位检测、工序事件触发与具身数采视觉输入；配合双机位支架实现前视/俯视多角度采集，在结构化恒定光照环境中提供状态触发信号。',
          image: '/illustrations/m6-et-s231-usb-camera.png',
          imageAlt: 'ET-S231广角1080P USB摄像头',
        },
        {
          name: '工业级独立急停按钮（100091373）',
          note: '带常闭机械触点的大蘑菇头急停开关',
          description:
            '安全闸门，串入动力电回路，拍下即刻硬切动力电；为独立硬件常闭回路，不接软件控制，置于操作者触手可及处。',
          image: '/illustrations/m6-emergency-stop-button.png',
          imageAlt: '工业级独立急停按钮',
        },
      ],
      note: '另配双机位摄像头支架（100006505）、机械臂数据采集光控箱（100094392）、reSpeaker Flex语音套件（100005504 / 100099135）、屏幕、整体电源设计、路由器等通用配件。',
    },

    toolchain: {
      stages: [
        {
          name: 'SenseCraft Robotics + Master Arm',
          meta: '零代码动作编排 · 主从1:1镜像遥操 · 语音指令触发',
          steps: ['开箱连接', '主从遥操/语音指令', '多动作流程编排与安全确认'],
          highlight: true,
        },
        {
          name: 'Python + Pinocchio + Motorbridge SDK',
          meta: '逆运动学解算 · 真机空间抓取闭环 · 异常处理与安全退回',
          steps: ['深度相机3D定位', 'Pinocchio逆运动学求解', 'Motorbridge驱动真机抓取'],
          highlight: true,
        },
        {
          name: 'LeRobot + VLA + Isaac Sim',
          meta: '动作数据集标准 · 具身大模型 · 数字孪生仿真',
          steps: ['遥操动作数据采集', 'VLA模型原理理解', 'Isaac Sim仿真验证'],
        },
      ],
      hinge: {
        title: '关键转折点 · 从零代码遥操演示到确定性工程抓取',
        body: 'SenseCraft解决「看得见、能演示」的展示层需求，让学员第一天就能跑通主从遥操与语音夹取；Python + Pinocchio + Motorbridge让系统第一次具备确定性3D空间抓取的工程能力，从「演示可用」走向「可交付工程」。',
      },
      note: '另需HTTP / MQTT消息通知（工位视觉事件触发与跨系统联动）、reSpeaker Flex语音套件（自然语言指令采集与播报）。',
    },

    curriculum: {
      items: [
        {
          no: '01',
          title: '课前准备与环境预检',
          detail:
            '硬件台架清点、机械臂物理固定与上电自检、安全隔离区布置、控制中枢与网络预置、视觉采集套件与光控箱就绪',
          tool: '—',
          coverage: { taster: 'full', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '02',
          title: '机械臂选型与商业取舍',
          detail:
            '常见形态（直角坐标/SCARA/Delta/六轴）、速度/精度/负载/安全/成本权衡、六轴通用首选逻辑',
          tool: '—',
          coverage: { taster: 'full', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '03',
          title: '实训安全第一课与急停演练',
          detail:
            '工作空间边界划定、硬件急停物理断电原理与演练、防碰撞与慢速运行、开关机与安全复位规程',
          tool: '硬件急停按钮',
          coverage: { taster: 'full', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '04',
          title: 'SenseCraft开箱与主从遥操',
          detail:
            '认识B601关节结构与接口、浏览器访问SenseCraft控制台、设备连接与基础点动、主从臂1:1镜像遥操与轨迹录制',
          tool: 'SenseCraft Robotics / Star Arm 102',
          coverage: { taster: 'full', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '05',
          title: '语音指令控制与夹取首验',
          detail:
            'reSpeaker麦克风阵列接入、自然语言触发预设夹取动作、阶段交付：语音指令成功触发一次夹取',
          tool: 'reSpeaker Flex / SenseCraft',
          coverage: { taster: 'full', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '06',
          title: '落地场景与节拍核算',
          detail:
            '机械臂适用场景（轻量分拣/上下料/展位互动/定点巡检）、不适用边界（>1件/秒高速量产/超重负载）、工序节拍与产能估算',
          tool: '—',
          coverage: { taster: 'none', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '07',
          title: '3D空间直觉与六轴必要性',
          detail:
            '气缸/传送带2D平面局限 vs 机械臂3D空间(X,Y,Z)+旋转姿态、3D界面理解伸展极限与奇异点死区',
          tool: 'SenseCraft 3D预览',
          coverage: { taster: 'none', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '08',
          title: '动作编排与安全确认机制',
          detail:
            '多点位串联作业流程（移动→张爪→下降→夹紧→抬起→放置）、「生成→3D预览→人工确认→真机执行」确认闸门',
          tool: 'SenseCraft Robotics',
          coverage: { taster: 'none', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '09',
          title: '工位视觉数据采集与事件联动',
          detail:
            '光控箱恒定光照结构化环境、ET-S231摄像头工位图像采集、物料到位检测作为事件触发器、联动抓取流程、分组微场景搭建（连续3次稳定运行）',
          tool: 'ET-S231 / 光控箱 / SenseCraft',
          coverage: { taster: 'none', workshop: 'full', bootcamp: 'full' },
        },
        {
          no: '10',
          title: '深度相机3D定位与手眼对齐',
          detail:
            '单目vs深度相机、RGB-D读取物体三维物理坐标(X,Y,Z)、相机坐标系到机械臂基座坐标系手眼标定',
          tool: '奥比中光Gemini 2 / Python',
          coverage: { taster: 'none', workshop: 'none', bootcamp: 'full' },
        },
        {
          no: '11',
          title: 'Pinocchio逆运动学求解与异常处理',
          detail:
            'Python调用Pinocchio工具库、输入目标坐标自动计算6关节角度、超出工作范围/解算失败异常报警与安全退回',
          tool: 'Python / Pinocchio',
          coverage: { taster: 'none', workshop: 'none', bootcamp: 'full' },
        },
        {
          no: '12',
          title: 'Motorbridge真机驱动与端到端抓取闭环',
          detail:
            'Python调用Motorbridge SDK驱动平滑运动与夹爪控制、整合全流程：深度相机检测→Pinocchio逆解→Motorbridge驱动抓取',
          tool: 'Python / Motorbridge SDK',
          coverage: { taster: 'none', workshop: 'none', bootcamp: 'full' },
        },
        {
          no: '13',
          title: '遥操动作数据集采集（LeRobot）',
          detail:
            '具身大模型数据采集逻辑、光控箱+双机位前视/俯视采集、主从遥操录制关节角度与视觉画面、LeRobot标准格式数据集',
          tool: 'Star Arm 102 / LeRobot / 双机位支架',
          coverage: { taster: 'none', workshop: 'none', bootcamp: 'part' },
        },
        {
          no: '14',
          title: 'VLA具身大模型与Isaac Sim仿真初探',
          detail:
            'VLA模型输入文本+图像输出动作架构理解、Isaac Sim加载机械臂3D资产、虚拟物理碰撞与仿真控制、「先仿真后真机」开发思路',
          tool: 'VLA / Isaac Sim',
          coverage: { taster: 'none', workshop: 'none', bootcamp: 'part' },
        },
        {
          no: '15',
          title: '方案复盘与交付总结',
          detail:
            '各组方案演练与配置评审、异常与失败案例复盘、演示线与工业产线工程差距总结（重复定位精度/连续运行可靠性/工业节拍/安全认证）、源码文档配置归档',
          tool: '—',
          coverage: { taster: 'part', workshop: 'full', bootcamp: 'full' },
        },
      ],
      callout:
        'coverage 键对应排课形态 ID（taster / workshop / bootcamp），值为 full（完整覆盖）/ part（精简覆盖）/ none（不含）/ plus（比完整版更深）。体验课（taster）聚焦 L1 选型认知、安全规范与SenseCraft开箱遥操，不含视觉联动与3D抓取开发；实战课（workshop）覆盖 L1+L2 完整场景剖析、动作编排与工位视觉事件触发；交付课（bootcamp）全覆盖 L1+L2+L3，含确定性3D空间抓取闭环与具身智能前沿探索。',
    },

    formats: {
      items: [
        {
          id: 'taster',
          name: '体验课 · L1展示层',
          meta: '1 天 · 6–8h',
          shortName: '体验',
          shortMeta: '1天',
        },
        {
          id: 'workshop',
          name: '实战课 · L1+L2',
          meta: '2–3 天 · 14–20h',
          shortName: '实战',
          shortMeta: '2–3天',
        },
        {
          id: 'bootcamp',
          name: '交付课 · L1+L2+L3',
          meta: '3–5 天 · 24–35h',
          shortName: '交付',
          shortMeta: '3–5天',
        },
      ],
      tiers: [
        {
          title: '体验课',
          finalProject: { label: '无 FP', included: false },
          summary: '1 天 · 6–8h · L1 展示层 · 聚焦选型认知、安全规范与SenseCraft开箱遥操',
          rows: [
            {
              title: 'Day 1 上午',
              meta: '模块 01 + 02 + 03',
              body: '环境预检 → 机械臂选型与商业取舍 → 实训安全第一课与急停演练',
            },
            {
              title: 'Day 1 下午',
              meta: '模块 04 + 05 + 15(精简)',
              body: 'SenseCraft开箱与主从遥操 → 语音指令夹取首验 → 总结复盘',
            },
          ],
          footnote:
            '体验课目标是「看得懂、能讲解、能演示」，跑出主从遥操与语音指令抓取的演示效果。不含工位视觉联动与3D空间抓取开发。',
        },
        {
          title: '实战课',
          finalProject: { label: 'FP 完整', included: true },
          summary: '2–3 天 · 14–20h · L1+L2 · 场景剖析 + 动作编排 + 工位视觉事件触发联动',
          rows: [
            {
              title: 'Day 1',
              meta: '模块 01–05',
              body: '环境预检 → 选型认知 → 安全急停 → SenseCraft遥操 → 语音夹取首验',
            },
            {
              title: 'Day 2',
              meta: '模块 06–09',
              body: '落地场景与节拍核算 → 3D空间直觉 → 动作编排与安全确认 → 工位视觉事件联动',
            },
            {
              title: 'Day 3（可选）',
              meta: '模块 15',
              body: '方案复盘与交付总结',
            },
          ],
          footnote:
            '实战课交付 1 套由工位视觉触发的微场景作业系统（连续 3 次稳定运行）。学员基础要求：掌握基础网络配置与系统联动概念。',
        },
        {
          title: '交付课',
          finalProject: { label: 'FP 完整', included: true },
          summary: '3–5 天 · 24–35h · L1+L2+L3 · 全覆盖含确定性3D空间抓取闭环与具身智能前沿探索',
          rows: [
            {
              title: 'Day 1–2',
              meta: '模块 01–09',
              body: 'L1+L2 完整内容（选型安全 + 遥操语音 + 场景编排 + 视觉联动）',
            },
            {
              title: 'Day 3',
              meta: '模块 10–12',
              body: '深度相机3D定位与手眼对齐 → Pinocchio逆运动学求解 → Motorbridge端到端抓取闭环',
            },
            {
              title: 'Day 4',
              meta: '模块 13–14',
              body: 'LeRobot遥操动作数据集采集 → VLA具身大模型与Isaac Sim仿真初探',
            },
            {
              title: 'Day 5',
              meta: '模块 15',
              body: '方案复盘与交付归档',
            },
          ],
          footnote:
            '交付课目标是具备独立交付确定性3D空间抓取工程的能力。学员基础要求：具备基础Python编程与Linux技能，熟悉 L1–L2 能力。',
        },
      ],
      callouts: [
        '体验课是方案演示与客户沟通的标配形态：零代码门槛、1天闭环、聚焦「机械臂能动、语音能控」。适合展会、技术开放日与客户初次接触场景。',
        '实战课的 Day 3 为可选弹性日：若学员基础较好可压缩为 2 天（Day 2 下午合并复盘）；若需更多微场景联调时间则用满 3 天。',
      ],
      warnings: [
        '机械臂为带动力机构，实操过程中必须严格遵守安全规程，禁止将身体部位伸入机械臂运动包络区。急停按钮为独立硬件常闭回路，不接软件控制，置于操作者触手可及处。',
        'reBot DevArm B601-RS使用48V/600W工业级开关电源供电，必须使用6寸G字夹物理紧固于实验台防止动作倾倒。上电前须由讲师确认接线与固定状态。',
        '控制类场景严禁扩展到高压强电与安全制动系统。本课程不提供ISO 10218/TS 15066工业机器人安全认证背书，不替代法定工业安全认证。',
        '体验课不包含工位视觉联动与3D空间抓取开发内容，请勿向客户承诺体验课学员能独立完成空间抓取——那是交付课的交付标准。',
      ],
    },

    deliverablesIntro:
      '以下为完整版（交付课）交付；实战课交付前 3 项；体验课交付第 1、2 项的精简版。',
    deliverableCards: [
      {
        title: '机械臂工作空间布置与安全操作记录',
        body: '含物理隔离区划定图、急停常闭回路接线确认、G字夹固定检查记录、开关机与安全复位规程执行记录。',
      },
      {
        title: 'SenseCraft动作流程配置与工位视觉联动演示系统',
        body: '含多动作流程编排配置、「生成→3D预览→人工确认→真机执行」安全确认机制设置、工位视觉事件触发联动流程、微场景系统连续3次运行验证记录。',
      },
      {
        title: '3D空间自动抓取Python工程源码',
        body: '含深度相机3D坐标读取模块、Pinocchio逆运动学求解与异常处理、Motorbridge SDK真机驱动与夹爪控制、端到端抓取闭环主程序（L3）。',
      },
      {
        title: '遥操动作数据集样本与方案设计交付文档',
        body: '含LeRobot标准格式动作数据集（关节角度+双机位视觉画面）、手眼标定参数记录、方案设计说明与交付验收记录（L3）。',
      },
      {
        title: '机械臂选型与场景节拍评估报告',
        body: '含目标场景形态匹配分析、速度/精度/负载/安全/成本选型权衡、工序节拍与产能估算、适用与不适用边界判定。',
      },
      {
        title: '硬件台架清单与部署运维指南',
        body: '含19项设备清单与SKU对照表、台架接线拓扑图、SenseCraft/Pinocchio/Motorbridge环境配置步骤、日常巡检与转场收纳规范。',
      },
    ],

    teacherNotes: {
      heading: '这门课的价值不在机械臂本身，在「把物理执行接进数字系统」的方法',
      emphasis: '把物理执行接进数字系统',
      intro:
        'M6 不是一门教学生「调机械臂参数」的课，而是一门教团队如何用开源工具链和轻量硬件，把视觉感知、自然语言指令与物理执行机构打通的方法课。柴火交付的从来不只是「一次上课」，而是一整套可以被拆开、改写、重新组装的东西：15模块课程骨架、教师教案与PPT、SenseCraft动作配置模板、Python抓取工程源码、Pinocchio/Motorbridge调用示例、LeRobot数据集采集规范、设备清单与台架安全规范。',
      openings: [
        {
          no: '口子 01',
          title: '换场景',
          body: '模块 09「工位视觉事件触发与联动」的微场景是开放的：你的行业、你的客户现场、这座城市正在发生的一个真问题。分拣可以是农产品，可以是电子元件，可以是快递面单——问题越靠近真实现场，效果越好，而这件事你比我们懂。',
        },
        {
          no: '口子 02',
          title: '接设备',
          body: '你已有的客户存量设备、学校实训台架上的传感器、合作方的视觉检测系统，可以接在模块 09 之后，成为事件触发练习的对象池。M6 负责把方法讲透，门后面接什么触发源，由你来定。',
        },
        {
          no: '口子 03',
          title: '加你的东西',
          body: '你在行业里攒下的那些：机械臂选型踩过的坑、能让学员瞬间理解逆运动学的那个比喻、客户现场最常问的三个安全问题——那正是我们没有、也给不了的部分。',
        },
      ],
      quote: {
        text: '一门机器人课最好的归宿，不是被完整地执行一遍，而是被一位工程师改到面目全非，然后变成只有他能交付的那个方案。',
        cite: '—— 冯磊，本系列课程作者',
      },
    },

    complianceBoundary: {
      principles: ['低速监督控制 + 独立硬件急停，不做安全关键系统替代。'],
      applicable: [
        '轻量分拣演示、展位互动、教学实训与低速监督控制场景',
        '农产品与工业件外观分类抓取、物料移载与按序码放',
        '语音/视觉交互迎宾、轨迹展示与定点巡检摆拍',
        '基于RGB-D深度相机的确定性3D空间抓取工程开发',
        '具身智能算法验证、LeRobot标准动作数据集采集与科研实训',
      ],
      notApplicable: [
        '控制类场景严禁扩展到高压强电与安全制动系统。',
        '不提供ISO 10218/TS 15066工业机器人安全认证背书，本课程不替代法定工业安全认证。',
        '急停为独立硬件常闭回路，不接软件控制，严禁通过软件指令替代硬件急停。',
        '不覆盖高速工业节拍（>1件/秒）、高精度力控装配与7×24无人值守严苛工况',
        '不包含微米级精密装配（如精密销孔插拔）与复杂柔性异形物料抓取',
        '不承诺特定场景的具体抓取成功率（受光照条件、物体材质反光及摆放姿态影响，验收指标以现场实测记录为准）',
        '机械臂含精密减速器，转场与收纳须使用定制减震箱固定位姿，避免运输冲击损坏关节齿轮',
      ],
    },
  },
];

export const getModule = (id: ModuleId): Module | undefined => modules.find((m) => m.id === id);

export const getModuleBySlug = (slug: string): Module | undefined =>
  modules.find((m) => m.slug === slug);

export const levels: LevelId[] = ['L1', 'L2', 'L3'];

export const levelMeta: Record<LevelId, { label: string; description: string }> = {
  L1: { label: 'L1 · 展示层', description: '看得懂、能讲解、能演示——3 分钟跑出「魔法时刻」' },
  L2: { label: 'L2 · 顾问层', description: '独立配置可用系统，交付体验工作坊' },
  L3: { label: 'L3 · 设计层', description: '商业闭环与深度定制：API 对接 / 模型训练 / 私有化部署' },
};
