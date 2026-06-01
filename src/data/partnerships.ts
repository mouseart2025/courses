import type { IconName } from './icons';

export type ScenarioId = 'university' | 'integrator' | 'enterprise';
export type FormCode = 'A' | 'B' | 'C' | 'D';

export interface Scenario {
  id: ScenarioId;
  title: string;
  subtitle: string;
  icon: IconName;
  features: string[];
  outcomes: string[];
  applicableForms: FormCode[];
}

export interface PartnershipForm {
  code: FormCode;
  title: string;
  subtitle: string;
  icon: IconName;
  features: string[];
  deliverables: string[];
  suitableScenarios: ScenarioId[];
}

export const scenarios: Scenario[] = [
  {
    id: 'university',
    title: '高校 · 职业院校',
    subtitle: '课程共建 / 师资赋能',
    icon: 'lucide:graduation-cap',
    features: [
      '有自研课程能力可选裸硬件套件',
      '标准教学套件开箱即开课',
      '师资培训套件培养自有讲师',
    ],
    outcomes: ['学生具备行业真实交付能力', '专业建设与产业需求对齐', '机构形成可持续自主开课能力'],
    applicableForms: ['A', 'B', 'C', 'D'],
  },
  {
    id: 'integrator',
    title: '集成商 · 方案商',
    subtitle: '技术栈升级 / 交付提速',
    icon: 'lucide:network',
    features: [
      '裸硬件套件灵活组合自有方案',
      '标准教学套件补齐团队能力',
      '师资培训套件沉淀内部讲师',
    ],
    outcomes: ['交付周期压缩', '团队可独立承接新品类', '毛利与议价空间提升'],
    applicableForms: ['A', 'B', 'C', 'D'],
  },
  {
    id: 'enterprise',
    title: '企业 · 产业端',
    subtitle: '内训 / 定制交付',
    icon: 'lucide:building-2',
    features: ['首次采购可选全托交付套件', '标准教学套件用于内训', '柴火讲师到场端到端交付'],
    outcomes: ['核心团队技术储备到位', '新业务方向可快速验证', '减少对外部供应商依赖'],
    applicableForms: ['B', 'C'],
  },
];

// 四种销售形态（硬件套件口径）：A 裸硬件 / B 标准教学 / C 全托交付 / D 师资培训。
export const partnershipForms: PartnershipForm[] = [
  {
    code: 'A',
    title: '裸硬件套件',
    subtitle: 'Bare Hardware Kit',
    icon: 'lucide:cpu',
    features: ['仅含硬件与配件，不含课程资源', '适配自研课程，灵活组合', '按 M0–M5 模块自由选配'],
    deliverables: ['Seeed 原厂硬件与配件', '模块选型清单', '硬件保修与供货支持'],
    suitableScenarios: ['university', 'integrator'],
  },
  {
    code: 'B',
    title: '标准教学套件',
    subtitle: 'Standard Teaching Kit',
    icon: 'lucide:package',
    features: ['硬件 + 完整课程资源包', '含 NLHD 教材、课件与实验手册', '开箱即可开课'],
    deliverables: ['对应模块硬件套件', '完整课程资源包', '持续课程内容更新'],
    suitableScenarios: ['university', 'integrator', 'enterprise'],
  },
  {
    code: 'C',
    title: '全托交付套件',
    subtitle: 'Full-Delivery Kit',
    icon: 'lucide:hand-helping',
    features: ['硬件 + 课程 + 柴火讲师到场授课', '适合首次采购、零师资客户', '端到端托管交付'],
    deliverables: ['硬件与课程资源', '柴火讲师现场授课', '课程交付与结业支持'],
    suitableScenarios: ['enterprise', 'university', 'integrator'],
  },
  {
    code: 'D',
    title: '师资培训套件',
    subtitle: 'Train-the-Trainer Kit',
    icon: 'lucide:graduation-cap',
    features: ['硬件 + 课程 + Train-the-Trainer 师训', '培养机构自有讲师', '可持续自主开课'],
    deliverables: ['硬件与课程资源', 'Train-the-Trainer 师资培训', '讲师认证与复训'],
    suitableScenarios: ['university', 'integrator'],
  },
];

export const getFormsForScenario = (id: ScenarioId): PartnershipForm[] =>
  partnershipForms.filter((f) => f.suitableScenarios.includes(id));

export const getScenariosForForm = (code: FormCode): Scenario[] =>
  scenarios.filter((s) => s.applicableForms.includes(code));
