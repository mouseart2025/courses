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
}

export const modules: Module[] = [
  {
    id: 'm0',
    slug: 'm0',
    code: 'M0',
    title: '零基础智能硬件入门',
    subtitle: 'Smart Hardware Fundamentals',
    oneLiner:
      '用自然语言告诉 AI 你想做什么，AI 帮你写代码——零编程基础，做出属于自己的智能硬件作品。',
    realProblem:
      '学生不会写代码、合格师资极少、从创意到原型总是断层——硬件启蒙卡在“先学会编程”这道伪门槛上。',
    illustration: '/illustrations/m0.png',
    difficulty: '入门',
    duration: '半天起（M0-ABC 共 6 次课 / 17h+）',
    scenarios: ['高校通识课', '创客训练营', 'K12 科普', '教师工作坊', '企业创新体验'],
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
  },
  {
    id: 'm1',
    slug: 'm1',
    code: 'M1',
    title: '设备互联与智能管控',
    subtitle: 'Device Integration & Intelligent Control',
    oneLiner: '跨品牌、跨代际设备统一管控，打破数据孤岛，构建全场景智能中枢。',
    realProblem:
      '管理系统碎片化、能耗流向不可见、过度依赖云端——空间里的设备各管一摊，没有统一可编排的中枢。',
    illustration: '/illustrations/m1.png',
    difficulty: '入门',
    duration: '2 天',
    scenarios: ['楼宇能源管理', '办公空间自动化', '机房环境监测', '酒店客控', '实验室管理'],
    painPoints: ['管理系统碎片化', '能耗流向不可见', '云端依赖风险高'],
    techStack: ['Home Assistant', 'ESPHome', 'Node-RED', 'Modbus'],
    coreHardware: ['Home Assistant 智能中枢', 'ESPHome 设备', 'Modbus 网关'],
    capabilities: [
      'Home Assistant 部署与配网',
      'ESPHome 设备接入',
      'Node-RED 自动化编排',
      'Modbus 工业设备数字化',
    ],
    audience: ['楼宇 / 园区运维', '智能空间集成商', '机房与实验室管理', '酒店工程团队'],
    deliverables: [
      '跨品牌设备统一控制中枢',
      '能源流向看板与节能自动化',
      '工业设备数字化的私有化部署方案',
    ],
    accent: 'yellow',
    cells: {
      L1: {
        title: '统一控制中枢',
        subtitle: '展示层 · 单点体验',
        durationDays: 1,
        outcomes: ['部署智能中枢', '接入空调 / 照明 / 安防等跨品牌设备', '实现统一控制'],
      },
      L2: {
        title: '能源看板与自动化',
        subtitle: '顾问层 · 场景联动',
        durationDays: 1,
        outcomes: ['搭建能源流向看板', '配置「人走灯灭」等节能策略', '交付可用的自动化系统'],
      },
      L3: {
        title: '工业设备数字化',
        subtitle: '设计层 · 业务集成',
        durationDays: 1,
        outcomes: ['改造传统工业设备并数字化', '接入智能中枢', '实现私有化部署'],
      },
    },
  },
  {
    id: 'm2',
    slug: 'm2',
    code: 'M2',
    title: '多模态 AI 交互',
    subtitle: 'Multimodal AI Interaction',
    oneLiner: '解放双手，主动服务：打造能听懂业务、能看见需求的 AI 交互终端。',
    realProblem:
      '系统操作依赖专业技能、物理交互限制效率、需求响应总是滞后——交互方式没跟上，AI 能力就落不了地。',
    illustration: '/illustrations/m2.png',
    difficulty: '进阶',
    duration: '2 天',
    prerequisite: '建议先学习 M1 设备互联与智能管控',
    scenarios: ['展厅智能导览', '智能前台', '智慧零售', '仓库管理', '空间主动服务'],
    painPoints: ['系统操作依赖专业技能', '物理交互限制业务效率', '需求响应滞后，被动服务'],
    techStack: ['SenseCraft AI', 'Watcher', 'LLM', 'MCP 协议', '语音交互'],
    coreHardware: ['Watcher', '麦克风阵列', '边缘 AI 主机'],
    capabilities: [
      'SenseCraft AI 零代码训练',
      'Watcher 多模态交互',
      'LLM 本地部署',
      'MCP 工具开发',
    ],
    audience: ['展厅与文旅运营', '智慧零售方案商', '空间服务集成商', 'AI 应用开发者'],
    deliverables: ['零代码的多模态交互体验', '本地 AI 后端与工具库接入', '完全私有化的业务闭环'],
    accent: 'red',
    cells: {
      L1: {
        title: '零代码 AI 交互',
        subtitle: '展示层 · 单点体验',
        durationDays: 1,
        outcomes: ['零代码体验 AI 交互与视觉训练', '接入智能中枢', '实现基础的多模态交互'],
      },
      L2: {
        title: '本地 AI 后端',
        subtitle: '顾问层 · 场景联动',
        durationDays: 1,
        outcomes: ['本地部署 AI 后端服务', '配置模型参数', '连接现有的工具库'],
      },
      L3: {
        title: '私有化业务闭环',
        subtitle: '设计层 · 业务集成',
        durationDays: 1,
        outcomes: ['本地化部署大语言模型', '开发自定义工具', '实现完全私有化的业务闭环'],
      },
    },
  },
  {
    id: 'm3',
    slug: 'm3',
    code: 'M3',
    title: '自组网与韧性通信',
    subtitle: 'Mesh Networking & Resilient Communication',
    oneLiner: '零依赖，全连通，构建去中心化的韧性通信网络。',
    realProblem:
      '通信盲区就意味着失控、中心节点太脆弱、应急部署门槛又高——一旦断网，整个系统跟着失灵。',
    illustration: '/illustrations/m3.png',
    difficulty: '进阶',
    duration: '1.5 天',
    scenarios: ['应急救援', '户外探索与赛事保障', '地下空间通信', '野外科考'],
    painPoints: ['通信盲区即失控', '中心节点太脆弱', '应急部署门槛高'],
    techStack: ['Mission Pack', 'Meshtastic', 'LoRa', 'GPS', 'Node-RED'],
    coreHardware: ['Mission Pack', 'Meshtastic 终端', 'LoRa 模块'],
    capabilities: [
      'Mesh 中继规划',
      'Meshtastic 组网与监听',
      'LoRa 离网通信',
      'Node-RED 自动化联动',
    ],
    audience: ['应急通信团队', '户外赛事保障', '野外科考', '公共安全集成商'],
    deliverables: [
      'Mesh 中继规划与盲区覆盖',
      '网络异常与位置信息的自动化联动',
      '自定义的离网传感设备',
    ],
    accent: 'yellow',
    cells: {
      L1: {
        title: '设备与中继规划',
        subtitle: '展示层 · 单点体验',
        durationDays: 1,
        outcomes: ['掌握设备基础操作', '规划 Mesh 中继', '解决复杂环境下的通信盲区'],
      },
      L2: {
        title: '网络监听与联动',
        subtitle: '顾问层 · 场景联动',
        durationDays: 1,
        outcomes: ['监听 Mesh 网络异常与位置信息', '结合低代码平台编排', '实现自动化联动'],
      },
      L3: {
        title: '离网传感设备',
        subtitle: '设计层 · 业务集成',
        durationDays: 1,
        outcomes: [
          '将外部传感器 / 自定义设备接入 Mesh',
          '设计、构建离网传感设备',
          '构建去中心化网络',
        ],
      },
    },
  },
  {
    id: 'm4',
    slug: 'm4',
    code: 'M4',
    title: '边缘视觉 AI',
    subtitle: 'Edge Visual AI',
    oneLiner: '从「事后追溯」进化为「事前阻断」，构建秒级响应的智能决策闭环。',
    realProblem:
      '摄像头只能录、不能防，无效告警形成风暴，自建智能化门槛又高——视频价值始终停在事后追溯。',
    illustration: '/illustrations/m4.png',
    difficulty: '高级',
    duration: '2 天',
    scenarios: ['周界安防', '安全合规检测', '零售客流分析', '工业质检'],
    painPoints: ['只能录不能防', '无效告警风暴', '智能化门槛高'],
    techStack: ['reCamera', 'Jetson', 'Frigate', '目标检测', '视频分析'],
    coreHardware: ['reCamera', 'reComputer Jetson', '网络摄像头'],
    capabilities: ['预置模型目标检测', 'Frigate 本地告警', '专属模型训练与部署', '识别数据可视化'],
    audience: ['安防工程与集成商', '工业质检团队', '零售运营', '园区安全管理'],
    deliverables: [
      '预置模型的目标检测与区域入侵',
      '本地告警与设备控制自动化',
      '专属识别模型与业务看板',
    ],
    accent: 'red',
    cells: {
      L1: {
        title: '目标检测体验',
        subtitle: '展示层 · 单点体验',
        durationDays: 1,
        outcomes: ['接入视频流', '体验预置 AI 模型的目标检测', '感受区域入侵能力'],
      },
      L2: {
        title: '告警与设备联动',
        subtitle: '顾问层 · 场景联动',
        durationDays: 1,
        outcomes: ['将识别事件接入本地网关', '实现声光告警', '联动设备控制自动化'],
      },
      L3: {
        title: '专属模型与看板',
        subtitle: '设计层 · 业务集成',
        durationDays: 1,
        outcomes: ['训练专属识别模型并部署', '识别数据接入报表 / 可视化看板', '形成业务闭环'],
      },
    },
  },
  {
    id: 'm5',
    slug: 'm5',
    code: 'M5',
    title: '环境感知与数据采集',
    subtitle: 'Environmental Sensing & Data Acquisition',
    oneLiner: '消灭现场盲区，打破距离成本：构建从城市到野外的全域感知网络。',
    realProblem:
      '现场状态是黑箱、运维半径受限、非标设备接入处处是坑——想看见远端，却被距离和成本挡住。',
    illustration: '/illustrations/m5.png',
    difficulty: '入门',
    duration: '2 天',
    scenarios: ['智慧农业', '智慧城市', '气象监测', '工业园区环境监测'],
    painPoints: ['现场状态黑箱', '运维半径受限', '非标接入陷阱'],
    techStack: ['SenseCAP', 'RS485', 'Modbus', 'MQTT', '4G'],
    coreHardware: ['SenseCAP 传感器', '数据采集网关', '4G 回传模块'],
    capabilities: [
      'SenseCAP 即开即用采集',
      'Modbus / RS485 非标接入',
      'MQTT 数据上云',
      '云端与本地协同',
    ],
    audience: ['智慧农业方案商', '智慧城市与气象', '园区环境监测', '物联网集成商'],
    deliverables: [
      '即开即用的数据报表与实时状态',
      '跨设备协同与告警响应',
      'API 集成至客户已有系统（开发中）',
    ],
    accent: 'yellow',
    cells: {
      L1: {
        title: '即开即用数据',
        subtitle: '展示层 · 单点体验',
        durationDays: 1,
        outcomes: ['绑定设备', '通过 App / Web 即刻获取完整数据报表', '查看实时状态'],
      },
      L2: {
        title: '协同与告警',
        subtitle: '顾问层 · 场景联动',
        durationDays: 1,
        outcomes: ['配置云端或本地逻辑', '实现跨设备协同', '配置告警响应'],
      },
      L3: {
        title: 'API 系统集成（开发中）',
        subtitle: '设计层 · 即将推出',
        durationDays: 0,
        outcomes: [
          '调用 API 将数据集成至客户已有系统',
          '对接编排平台',
          '该层级正在开发中，敬请期待',
        ],
      },
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
