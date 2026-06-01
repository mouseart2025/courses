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

// 三大课程方向：用 AI 造物 / 造 AI 的物 / 解决方案（M0 为零基础旗舰入口，M1–M5 为五大行业方向）。
export const tracks: Track[] = [
  {
    id: 'make-with-ai',
    name: '用 AI 造物',
    goal: '用 AI 工具辅助创作，零编程基础即可上手',
    tagline: 'M0',
    moduleIds: ['m0'],
    description:
      '让 AI 当程序员，你来当创客。用自然语言驱动 AI 写代码，零基础也能从感知、交互到边缘视觉，做出属于自己的智能硬件作品。',
    accent: 'red',
  },
  {
    id: 'build-ai-products',
    name: '造 AI 的物',
    goal: '开发具备 AI 能力的产品',
    tagline: 'M2 · M4',
    moduleIds: ['m2', 'm4'],
    description:
      '从多模态 AI 交互到边缘视觉 AI，做出能听懂业务、能看见需求、能秒级响应的智能终端与产品。',
    accent: 'red',
  },
  {
    id: 'solutions',
    name: '解决方案',
    goal: '系统集成与场景落地',
    tagline: 'M1 · M3 · M5',
    moduleIds: ['m1', 'm3', 'm5'],
    description:
      '设备互联、自组网通信、环境感知三条线组合，把跨品牌设备、离网通信与全域感知集成为可交付的行业方案。',
    accent: 'yellow',
  },
];

export const getTracksForModule = (id: ModuleId): Track[] =>
  tracks.filter((t) => t.moduleIds.includes(id));
