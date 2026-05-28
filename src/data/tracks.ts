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
