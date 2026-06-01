import type { IconName } from './icons';

export interface LinkItem {
  label: string;
  href: string;
}

export interface FinalCta {
  eyebrow: string;
  title: string;
  description: string;
  primary: LinkItem;
  secondary?: LinkItem;
}

export interface AboutEcosystemItem {
  name: string;
  role: string;
  description: string;
  link: string | null;
  tag: string;
}

export interface AboutValueItem {
  title: string;
  description: string;
  icon: IconName;
}

export interface StatItem {
  number: string;
  label: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FamiliarObject {
  icon: IconName;
  label: string;
  hint: string;
  moduleHint: string;
  href: string;
}

export interface AxisDef {
  label: string;
  description: string;
}

export interface MapLegend {
  axisX: AxisDef;
  axisY: AxisDef;
  anchors: { code: string; role: string }[];
  note: string;
}

export interface OutcomeItem {
  icon: IconName;
  label: string;
  description: string;
}

export const homeFinalCta: FinalCta = {
  eyebrow: 'NEXT STEP',
  title: '把课程体系引入你的教学、培训或项目现场',
  description:
    '可以先引入单个模块，也可以按目标组合课程包；销售形态包括裸硬件套件、标准教学套件、全托交付与师资培训。',
  primary: { label: '申请合作咨询', href: '/contact' },
  secondary: { label: '查看课程体系', href: '/courses' },
};

export const pathsFinalCta: FinalCta = {
  eyebrow: 'NEXT STEP',
  title: '选好组合后，回到课程体系确认模块与级别',
  description:
    '选课指南只帮助你缩小范围。真正落地时，还要看模块内容、课堂实验、硬件清单、交付材料和销售形态。',
  primary: { label: '查看完整课程体系', href: '/courses' },
  secondary: { label: '直接咨询合作', href: '/contact' },
};

export const coursesFinalCta: FinalCta = {
  eyebrow: 'JOIN ECOSYSTEM',
  title: '把课程模块引入你的课程、团队或项目现场',
  description:
    '如果你已经有明确方向，可以继续讨论裸硬件套件、标准教学套件、全托交付或师资培训。我们会根据目标推荐模块组合与授课深度。',
  primary: { label: '申请合作咨询', href: '/contact' },
  secondary: { label: '了解学院背景', href: '/about' },
};

export const aboutEcosystem: AboutEcosystemItem[] = [
  {
    name: 'Seeed Studio',
    role: '全球硬件产品与供应链平台',
    description: '为全球创客和企业提供硬件产品与解决方案，产品覆盖物联网、边缘计算、AI 等领域。',
    link: 'https://www.seeedstudio.com',
    tag: '硬件产品',
  },
  {
    name: '柴火创客空间',
    role: '中国创客运动先驱',
    description: '2011 年成立，中国最早的创客空间之一。提供物理空间、社区活动、项目孵化等服务。',
    link: 'https://www.chaihuo.org',
    tag: '创客空间',
  },
  {
    name: '柴火创客 OPC 学院',
    role: '技术赋能平台',
    description: '将生态中的技术能力转化为可学习的课程，帮助个人和企业掌握新技术整合能力。',
    link: null,
    tag: '技术培训',
  },
];

export const aboutValues: AboutValueItem[] = [
  {
    title: '真硬件',
    description: '课程使用的工具和设备，就是 Seeed Studio 的真实产品，不是教学道具。',
    icon: 'lucide:cpu',
  },
  {
    title: '真场景',
    description: '案例来自柴火生态中的真实项目，学的是已经被验证过的解决方案。',
    icon: 'lucide:map',
  },
  {
    title: '真连接',
    description: '学完不是结束，而是进入生态的开始——对接项目机会、加入人才库、持续成长。',
    icon: 'lucide:network',
  },
];

export const aboutStats: StatItem[] = [
  { number: '2011', label: '柴火创客空间成立' },
  { number: '20+', label: '全国授权合作机构' },
  { number: '4000+', label: '累计赋能人次' },
];

export const aboutFinalCta: FinalCta = {
  eyebrow: 'ECOSYSTEM OPPORTUNITIES',
  title: '想把这份生态能力带到你的组织？',
  description:
    '从裸硬件套件到全托交付，可以按你的目标选择销售形态。请留下意向信息，我们 3 个工作日内提供合作建议。',
  primary: { label: '申请合作咨询', href: '/contact' },
  secondary: { label: '查看选课指南', href: '/paths' },
};

export const contactFaqs: FaqItem[] = [
  {
    question: '合作从提交表单到启动一般需要多久？',
    answer:
      '首次对齐通常 3 个工作日内安排会议；标准教学套件可快速发货开课；全托交付与师资培训从需求确认到开课一般 2–4 周。',
  },
  {
    question: '课程是否可以只引入某个模块或层级？',
    answer:
      '可以。M0–M5 每个模块都是独立设计的，L1/L2/L3 也可以单独引入。我们会根据你的目标推荐最小有效组合。',
  },
  {
    question: '四种销售形态有什么区别？',
    answer:
      'A 裸硬件套件仅含硬件，适合有自研课程能力的机构；B 标准教学套件含完整课程资源包，开箱即可开课；C 全托交付套件由柴火讲师到场授课，适合首次采购；D 师资培训套件帮你培养自有讲师，可持续自主开课。',
  },
  {
    question: '是否接受海外合作？',
    answer: '接受。柴火创客空间依托 Seeed 全球供应链，支持英文交付和海外师资外派。',
  },
];

export const homeFamiliarObjects: FamiliarObject[] = [
  {
    icon: 'lucide:sparkles',
    label: 'AI 辅助编程',
    hint: '用自然语言让 AI 写代码',
    moduleHint: 'M0',
    href: '/courses/m0',
  },
  {
    icon: 'lucide:network',
    label: '设备互联中枢',
    hint: '跨品牌设备统一管控',
    moduleHint: 'M1',
    href: '/courses/m1',
  },
  {
    icon: 'lucide:message-square',
    label: '多模态 AI 交互',
    hint: '能听懂、能看见的交互终端',
    moduleHint: 'M2',
    href: '/courses/m2',
  },
  {
    icon: 'lucide:wifi',
    label: '自组网通信',
    hint: '无公网也能全连通',
    moduleHint: 'M3',
    href: '/courses/m3',
  },
  {
    icon: 'lucide:camera',
    label: '边缘视觉 AI',
    hint: '从事后追溯到事前阻断',
    moduleHint: 'M4',
    href: '/courses/m4',
  },
  {
    icon: 'lucide:thermometer',
    label: '环境感知',
    hint: '城市到野外的全域感知',
    moduleHint: 'M5',
    href: '/courses/m5',
  },
];

export const homeMapLegend: MapLegend = {
  axisX: {
    label: '横轴 · M0–M5',
    description:
      '课程方向。M0 是零基础旗舰入口（智能硬件入门），M1–M5 是五大行业方向，按目标可独立选学。',
  },
  axisY: {
    label: '纵轴 · L1 / L2 / L3',
    description:
      '掌握深度。L1 展示层看得懂能演示，L2 顾问层独立配置可用系统，L3 设计层做到业务集成与深度定制。',
  },
  anchors: [
    { code: 'M0', role: '零基础旗舰入口' },
    { code: 'M1–M5', role: '五大行业方向' },
  ],
  note: '可以按方向、深度或目标组合课程——不必从头到尾线性学习。这是当前版本的课程体系，未来会随技术发展继续扩展。',
};

export const homeOutcomes: OutcomeItem[] = [
  {
    icon: 'lucide:rocket',
    label: '课堂实验与系统 demo',
    description: '每个模块围绕真实硬件展开，课程现场能搭建、能联调、能演示。',
  },
  {
    icon: 'lucide:package',
    label: '硬件套件与课程资源包',
    description: '课程可配套 Seeed 硬件、NLHD 教材、实验说明、教师材料和学员任务。',
  },
  {
    icon: 'lucide:file-text',
    label: '项目材料与 SOP',
    description: '从需求拆解、部署记录到验收材料，帮助课程走向项目训练。',
  },
  {
    icon: 'lucide:hand-helping',
    label: '四种销售形态可选',
    description: '可按机构目标选择裸硬件套件、标准教学套件、全托交付或师资培训。',
  },
];
