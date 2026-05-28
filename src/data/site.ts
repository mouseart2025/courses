import type { IconName } from './icons';

export interface LinkItem {
  label: string;
  href: string;
}

export interface HomeValueStatement {
  eyebrow: string;
  leadPrefix: string;
  leadHighlight: string;
  description: string;
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

export const homeValueStatement: HomeValueStatement = {
  eyebrow: 'Our Promise',
  leadPrefix: '不是提供解决方案，',
  leadHighlight: '能整合新技术的人',
  description:
    '硬件来自 Seeed，场景来自柴火生态里真实跑过的项目。学完你带走的不是一堆 demo，而是“一个人也能上场”的真实交付能力。',
};

export const homeFinalCta: FinalCta = {
  eyebrow: 'START AN APPLICATION',
  title: '把课程引入你的高校、集成商或企业',
  description:
    '告诉我们你的角色与目标，我们 3 个工作日内给出合作建议书。立即迈出引进世界级开源硬件赋能生态的第一步。',
  primary: { label: '立即申请合作', href: '/contact' },
  secondary: { label: '先看课程体系', href: '/courses' },
};

export const coursesFinalCta: FinalCta = {
  eyebrow: 'JOIN ECOSYSTEM',
  title: '把这套矩阵引入你的高校、集成商或企业',
  description:
    '3 类合作场景 × 4 种合作形态，总有一款对齐你的目标。我们将在 3 个工作日内向您提供量身定制的课程合作建议书。',
  primary: { label: '申请合作咨询', href: '/contact' },
  secondary: { label: '了解学院背景', href: '/about' },
};

export const aboutEcosystem: AboutEcosystemItem[] = [
  {
    name: 'Seeed Studio',
    role: '全球开源硬件领导者',
    description:
      '为全球创客和企业提供硬件产品与解决方案，产品覆盖物联网、边缘计算、AI 等领域。',
    link: 'https://www.seeedstudio.com',
    tag: '硬件产品',
  },
  {
    name: '柴火创客空间',
    role: '中国创客运动先驱',
    description:
      '2011 年成立，中国最早的创客空间之一。提供物理空间、社区活动、项目孵化等服务。',
    link: 'https://www.chaihuo.org',
    tag: '社区空间',
  },
  {
    name: '柴火创客学院',
    role: '技术赋能平台',
    description:
      '将生态中的技术能力转化为可学习的课程，帮助个人和企业掌握新技术整合能力。',
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
    description:
      '学完不是结束，而是进入生态的开始——对接项目机会、加入人才库、持续成长。',
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
    '从课程授权到联合交付，总有一款合作形态对齐您的目标。请留下您的意向信息，我们 3 个工作日内向您提供合作建议书。',
  primary: { label: '申请合作咨询', href: '/contact' },
};

export const contactFaqs: FaqItem[] = [
  {
    question: '合作从提交表单到启动一般需要多久？',
    answer:
      '首次对齐通常 3 个工作日内安排会议；定制内训从需求确认到开课一般 2–4 周；战略联合交付视合作深度而定。',
  },
  {
    question: '课程是否可以只引入某个模块或层级？',
    answer:
      '可以。M0–M5 每个模块都是独立设计的，L1/L2/L3 也可以单独引入。我们会根据你的目标推荐最小有效组合。',
  },
  {
    question: '合作是否包含硬件？',
    answer:
      '标准授权与内训默认包含推荐硬件清单，可以采购 Seeed 套件、使用自有硬件或混合方案。具体按项目报价。',
  },
  {
    question: '是否接受海外合作？',
    answer: '接受。柴火创客空间依托 Seeed 全球供应链，支持英文交付和海外师资外派。',
  },
];
