export type ModuleId = 'm0' | 'm1' | 'm2' | 'm3' | 'm4' | 'm5';
export type LevelId = 'L1' | 'L2' | 'L3';

export interface ModuleCell {
  title: string;
  subtitle: string;
  durationDays: number;
  outcomes: string[];
}

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

export const modules: Module[] = [
  {
    id: 'm0',
    slug: 'm0',
    code: 'M0',
    title: '硬件基础与万物启蒙',
    subtitle: 'Hardware Foundation',
    oneLiner: '从第一次点亮 LED 开始，建立硬件直觉与动手自信',
    realProblem: '硬件世界没有"快速上手"按钮。读不懂电路图、烫不好焊点、调不通串口——所有后续模块都会卡在同一道槛上。',
    illustration: '/illustrations/m0.png',
    coreHardware: ['XIAO 系列', '传感器套件', '面包板 & 跳线', 'USB 调试工具'],
    capabilities: ['电子原理入门', '嵌入式编程基础', '电路调试方法', '硬件选型判断'],
    audience: ['零基础入门者', '转型硬件的软件工程师', '高校学生', '教师 / 教练'],
    deliverables: [
      '可运行的 LED / 传感器 demo',
      '硬件作品集（含调试视频）',
      '面包板到 PCB 的进阶路线图',
    ],
    accent: 'red',
    cells: {
      L1: {
        title: 'LED 与按键',
        subtitle: '点亮第一颗灯',
        durationDays: 2,
        outcomes: ['认识面包板与 GPIO', '完成 LED 流水灯', '读取按键状态'],
      },
      L2: {
        title: '传感器读写',
        subtitle: '感知物理世界',
        durationDays: 3,
        outcomes: ['温湿度采集', 'I2C / SPI 总线使用', '串口数据上报'],
      },
      L3: {
        title: '硬件作品集',
        subtitle: '独立交付小项目',
        durationDays: 5,
        outcomes: ['PCB 基础认识', '外壳打样', '硬件作品独立交付'],
      },
    },
  },
  {
    id: 'm1',
    slug: 'm1',
    code: 'M1',
    title: '设备互联与智能管控',
    subtitle: 'Home Assistant 生态',
    oneLiner: '用 HA 把异构设备拧成一个可编排的整体',
    realProblem: '空间里有 Zigbee 灯、Matter 插座、HomeKit 摄像头、Shelly 开关——每个 App 各管一摊，没有人能编排"整套场景"。',
    illustration: '/illustrations/m1.png',
    coreHardware: ['HA Green / Yellow', 'Zigbee 网关', 'Matter 设备', 'Shelly 系列'],
    capabilities: ['HA 部署与配网', '自动化脚本编写', 'Matter / Zigbee 集成', 'Dashboard 设计'],
    audience: ['智能家居集成商', 'IT / 运维人员', '空间运营方', 'DIY 进阶玩家'],
    deliverables: [
      'Home Assistant 部署文档',
      '跨协议自动化场景包',
      '可交付给客户的运维 Dashboard',
    ],
    accent: 'yellow',
    cells: {
      L1: {
        title: 'HA 快速配网',
        subtitle: '场景联动',
        durationDays: 2,
        outcomes: ['HA OS 安装', '加入第一个 Matter 设备', '配置一条自动化'],
      },
      L2: {
        title: '多协议整合',
        subtitle: 'Zigbee + Matter',
        durationDays: 3,
        outcomes: ['Zigbee2MQTT 部署', '跨协议场景编排', '能耗 Dashboard'],
      },
      L3: {
        title: '可交付系统',
        subtitle: '客户级部署',
        durationDays: 5,
        outcomes: ['远程运维能力', '多用户权限', '客户可维护文档'],
      },
    },
  },
  {
    id: 'm2',
    slug: 'm2',
    code: 'M2',
    title: '远距无线与物联组网',
    subtitle: 'LoRa / Mesh Network',
    oneLiner: '无公网覆盖也能拉起一张自己的传感网',
    realProblem: '野外、地下、跨厂区——没 Wi-Fi 没 4G 也得让数据回得来。',
    illustration: '/illustrations/m2.png',
    coreHardware: ['LoRa-E5 网关', 'XIAO LoRa 节点', 'Meshtastic 终端', '太阳能供电板'],
    capabilities: ['LoRa 点对点通信', 'Meshtastic 组网', 'TTN 接入', '低功耗设计'],
    audience: ['野外作业 / 科研', '农业 / 城市监测', '应急通信', '硬件出海团队'],
    deliverables: [
      'LoRa / Mesh 组网方案',
      'TTN / 自建网关部署文档',
      '低功耗节点选型与续航测试报告',
    ],
    accent: 'yellow',
    cells: {
      L1: {
        title: 'LoRa 点对点',
        subtitle: '第一次远距通信',
        durationDays: 2,
        outcomes: ['两节点握手', '信号强度测试', '低功耗模式'],
      },
      L2: {
        title: 'Mesh 组网',
        subtitle: 'Meshtastic 实战',
        durationDays: 3,
        outcomes: ['多节点自组网', 'GPS 位置上报', '离网消息转发'],
      },
      L3: {
        title: '城乡部署',
        subtitle: '大规模传感网',
        durationDays: 5,
        outcomes: ['网关规划', '跨区域数据回传', '运维与告警体系'],
      },
    },
  },
  {
    id: 'm3',
    slug: 'm3',
    code: 'M3',
    title: '视觉 AI 与边缘推理',
    subtitle: 'Edge Vision AI',
    oneLiner: '把摄像头变成一个会思考的传感器',
    realProblem: '摄像头每天产生 TB 级视频，真正有用的事件只占 0.1%——但传统方案要么云端贵、要么延迟高。',
    illustration: '/illustrations/m3.png',
    coreHardware: ['reComputer Jetson', 'XIAO ESP32S3 Sense', 'reCamera', 'Grove Vision AI v2'],
    capabilities: ['模型选型与部署', '目标检测 / 分类', '推理加速', '边缘-云协同'],
    audience: ['安防 / 零售 / 工业', 'AI 产品经理', 'CV 方向学生', '硬件集成商'],
    deliverables: [
      '边缘推理 demo + 性能指标报告',
      '自训练模型 + 数据集',
      '多路接入 + 远程升级的生产级部署方案',
    ],
    accent: 'yellow',
    cells: {
      L1: {
        title: '模型跑起来',
        subtitle: '第一次推理',
        durationDays: 2,
        outcomes: ['部署预训练模型', '跑通目标检测 demo', '理解推理性能指标'],
      },
      L2: {
        title: '定制数据集',
        subtitle: '训练自己的模型',
        durationDays: 4,
        outcomes: ['数据标注', '迁移学习', '模型量化与部署'],
      },
      L3: {
        title: '生产级部署',
        subtitle: '边缘集群',
        durationDays: 5,
        outcomes: ['多路视频接入', '告警与回流', '远程升级管线'],
      },
    },
  },
  {
    id: 'm4',
    slug: 'm4',
    code: 'M4',
    title: '空间智能与交互体验',
    subtitle: 'Spatial AI Agent',
    oneLiner: '让空间听得见、看得见、答得上',
    realProblem: '展厅、文旅、零售场景想"让空间能对话"——但买现成方案被锁死，自研又跨不过语音 + LLM + 硬件的多重门槛。',
    illustration: '/illustrations/m4.png',
    coreHardware: ['XIAO ESP32S3', '麦克风阵列', '投影 / 显示模块', 'reSpeaker'],
    capabilities: ['语音唤醒与识别', 'LLM Agent 编排', '多模态交互', '本地化部署'],
    audience: ['空间运营 / 文旅', '展陈 / 新零售', 'Agent 应用开发者', '品牌体验团队'],
    deliverables: [
      '本地语音唤醒 + Agent demo',
      'RAG 接入本地知识库的实施方案',
      '空间级部署 + 可运营后台',
    ],
    accent: 'yellow',
    cells: {
      L1: {
        title: '语音点亮设备',
        subtitle: '本地唤醒词',
        durationDays: 2,
        outcomes: ['唤醒词训练', '本地指令识别', '语音控制 GPIO'],
      },
      L2: {
        title: 'Agent 串联',
        subtitle: 'LLM 驱动交互',
        durationDays: 4,
        outcomes: ['工具调用', '多轮对话', 'RAG 接入本地知识'],
      },
      L3: {
        title: '空间级部署',
        subtitle: '展厅 / 文旅空间',
        durationDays: 5,
        outcomes: ['多房间联动', '观众行为分析', '可运营后台'],
      },
    },
  },
  {
    id: 'm5',
    slug: 'm5',
    code: 'M5',
    title: '行业场景与交付整合',
    subtitle: 'Vertical Delivery',
    oneLiner: '从可运行的 demo 到可交付的系统',
    realProblem: 'demo 跑通不等于项目能交付。需求拆解、选型、验收、SOP、培训——每一步都可能让一个技术上"可行"的方案卡死在合同上。',
    illustration: '/illustrations/m5.png',
    coreHardware: ['按项目选型', 'Seeed 定制网关', '云端接入模块', '工业级外壳'],
    capabilities: ['需求拆解', '系统集成', '交付管理', '甲乙方沟通'],
    audience: ['系统集成商', '产品经理', '项目经理', '独立交付者'],
    deliverables: [
      '需求文档与技术选型矩阵',
      'POC → Pilot 交付报告',
      '可复制 SOP + 客户培训材料',
    ],
    accent: 'yellow',
    cells: {
      L1: {
        title: '场景拆解',
        subtitle: '从需求到方案',
        durationDays: 2,
        outcomes: ['写出需求文档', '技术选型矩阵', '成本估算'],
      },
      L2: {
        title: '小规模交付',
        subtitle: 'POC → Pilot',
        durationDays: 4,
        outcomes: ['完成 POC', '现场部署与调试', '验收与培训'],
      },
      L3: {
        title: '规模化复制',
        subtitle: '可复制方案',
        durationDays: 5,
        outcomes: ['SOP 编写', '交付团队培训', '项目组合管理'],
      },
    },
  },
];

export const getModule = (id: ModuleId): Module | undefined =>
  modules.find((m) => m.id === id);

export const getModuleBySlug = (slug: string): Module | undefined =>
  modules.find((m) => m.slug === slug);

export const levels: LevelId[] = ['L1', 'L2', 'L3'];

export const levelMeta: Record<LevelId, { label: string; description: string }> = {
  L1: { label: 'L1 · 入门', description: '理解原理、跑通 demo' },
  L2: { label: 'L2 · 进阶', description: '独立完成小项目' },
  L3: { label: 'L3 · 实战', description: '可交付的系统能力' },
};
