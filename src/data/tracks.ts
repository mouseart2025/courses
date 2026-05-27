import type { ModuleId } from './modules';

export interface Track {
  id: string;
  name: string;
  tagline: string;
  moduleIds: ModuleId[];
  description: string;
  accent: 'red' | 'yellow';
}

export const tracks: Track[] = [
  {
    id: 'smart-space',
    name: '智能空间集成',
    tagline: 'M0 → M1 → M5',
    moduleIds: ['m0', 'm1', 'm5'],
    description: '面向集成商：从硬件基础到 Home Assistant 生态整合，落地可交付的智能空间项目。',
    accent: 'yellow',
  },
  {
    id: 'field-iot',
    name: '野外物联网',
    tagline: 'M0 → M2 → M5',
    moduleIds: ['m0', 'm2', 'm5'],
    description: '面向农业 / 城市 / 科研：无公网场景下的 LoRa 与 Mesh 组网交付能力。',
    accent: 'yellow',
  },
  {
    id: 'edge-ai',
    name: '边缘视觉 AI',
    tagline: 'M0 → M3 → M5',
    moduleIds: ['m0', 'm3', 'm5'],
    description: '面向安防 / 零售 / 工业：从硬件到视觉模型，完成边缘 AI 生产级部署。',
    accent: 'yellow',
  },
  {
    id: 'spatial-agent',
    name: '空间 Agent',
    tagline: 'M0 → M4 → M5',
    moduleIds: ['m0', 'm4', 'm5'],
    description: '面向文旅 / 展陈 / 品牌：语音 + LLM Agent 驱动的空间级交互体验。',
    accent: 'red',
  },
];

export const getTracksForModule = (id: ModuleId): Track[] =>
  tracks.filter((t) => t.moduleIds.includes(id));
