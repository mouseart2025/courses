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
      '双师制课程，校企共建',
      '实训室硬件方案 + 教材',
      '竞赛辅导与师资培训',
    ],
    outcomes: [
      '学生具备行业真实交付能力',
      '专业建设与产业需求对齐',
      '校企成果共同署名',
    ],
    applicableForms: ['A', 'B', 'D'],
  },
  {
    id: 'integrator',
    title: '集成商 · 方案商',
    subtitle: '技术栈升级 / 交付提速',
    icon: 'lucide:network',
    features: [
      '团队 AI / IoT 能力补齐',
      '可复用的方案模板与 SDK',
      '打样到量产的直通链路',
    ],
    outcomes: [
      '交付周期压缩',
      '团队可独立承接新品类',
      '毛利与议价空间提升',
    ],
    applicableForms: ['B', 'C'],
  },
  {
    id: 'enterprise',
    title: '企业 · 产业端',
    subtitle: '内训 / 定制交付',
    icon: 'lucide:building-2',
    features: [
      '定制化内训课程',
      '技术顾问驻场',
      'POC 联合开发',
    ],
    outcomes: [
      '核心团队技术储备到位',
      '新业务方向可快速验证',
      '减少对外部供应商依赖',
    ],
    applicableForms: ['C', 'D'],
  },
];

export const partnershipForms: PartnershipForm[] = [
  {
    code: 'A',
    title: '标准课程授权',
    subtitle: 'Standard Curriculum',
    icon: 'lucide:book-open',
    features: [
      '完整 M0–M5 课程体系授权',
      '配套实训套件与教材',
      '教师培训与认证',
    ],
    deliverables: ['课程 PPT 与讲义', '实训硬件套件', '教师认证', '持续内容更新'],
    suitableScenarios: ['university'],
  },
  {
    code: 'B',
    title: '联合课程共建',
    subtitle: 'Co-developed Courses',
    icon: 'lucide:combine',
    features: [
      '围绕行业场景共同设计课程',
      '双方署名、共享知识产权',
      '长期师资互派机制',
    ],
    deliverables: ['共建课程模块', '行业案例库', '联合认证体系'],
    suitableScenarios: ['university', 'integrator'],
  },
  {
    code: 'C',
    title: '企业定制内训',
    subtitle: 'Enterprise Training',
    icon: 'lucide:briefcase',
    features: [
      '围绕企业实际项目定制内容',
      '驻场 / 远程混合交付',
      '成果验收与复盘',
    ],
    deliverables: ['定制课程大纲', '项目式实训', '结业评估报告'],
    suitableScenarios: ['integrator', 'enterprise'],
  },
  {
    code: 'D',
    title: '战略联合交付',
    subtitle: 'Strategic Delivery',
    icon: 'lucide:handshake',
    features: [
      '深度绑定的长期合作',
      '联合实验室 / 产学研基地',
      '共同承接产业项目',
    ],
    deliverables: ['联合实验室', '共同品牌活动', '项目合作机制'],
    suitableScenarios: ['university', 'enterprise'],
  },
];

export const getFormsForScenario = (id: ScenarioId): PartnershipForm[] =>
  partnershipForms.filter((f) => f.suitableScenarios.includes(id));

export const getScenariosForForm = (code: FormCode): Scenario[] =>
  scenarios.filter((s) => s.applicableForms.includes(code));
