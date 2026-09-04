# M4 边缘视觉 AI · 课程大纲

> **双硬件主线**：reCamera（边缘轻节点）+ reServer Industrial J4012 / Jetson Orin NX（边缘强节点）。
> **能力分级**：L1 展示层（体验）→ L2 顾问层（实战）→ L3 设计层（交付）。

## 一、培训目标

完成本课程培训后，学员与团队将具备以下能力：

- **视频流采集与预处理**：掌握网络摄像机 RTSP 视频流配置与轻量边缘摄像头参数调优。
- **目标检测与规则配置**：掌握目标分类、置信度阈值调优、检测区域（Zones）与入侵告警规则设定。
- **跨系统自动化联动**：掌握通过 MQTT / Webhook 将视觉事件推送到 Home Assistant 与声光告警设备。
- **双主线算力选型**：能够根据现场点位数、帧率与算力需求，合理选型单点轻量方案或多路集中 NVR 方案。
- **模型定制与边缘优化（L3）**：掌握使用 YOLO 框架进行特定目标迁移学习、TensorRT / cvimodel 量化与部署优化。

## 二、教学模块

### 模块〇：课前准备（讲师与助教）

> 培训开始前完成软硬件预置与台架检查，对照 [M4.2 培训设备清单](M4.2 培训设备清单.md) 逐项清点，保障现场实操顺利进行。学员无需参与。

#### reCamera 节点准备

- [ ] 按 [M4.2 培训设备清单](M4.2 培训设备清单.md) 验收各工位相机（reCamera 2002w/PoE）、三脚架与连接线材齐全
- [ ] 检查 reCamera 固件版本与网络连通性
- [ ] 验证 Node-RED 运行环境与 SSCMA 插件状态
- [ ] 验证 RTSP 视频流输出稳定性（554 端口）
- [ ] 预置标准测试模型（人/车/通用物品）

#### 边缘计算主机准备

- [ ] 按台架规范刷写边缘主机系统镜像并配置 Docker 运行环境
- [ ] 部署 Frigate NVR 容器并完成基础 GPU 直通配置（Jetson 需使用 `ghcr.io/blakeblackshear/frigate:stable-tensorrt-jp6` 镜像并启用 `--runtime nvidia`）
- [ ] 配置 MQTT Broker（Mosquitto）与 Home Assistant 容器
- [ ] 预接入 2 路测试 RTSP 视频流并验证检测管线

#### 通用环境准备

- [ ] 部署现场独立 Wi-Fi 路由器，分配静态 IP 地址段与 PoE 交换机端口
- [ ] 准备场景模拟道具（测试模型、安全帽反光衣、入侵区域标识）

### 模块一：双线体验与基础配置（L1 展示层）

**目标**：掌握视觉 AI 的核心概念，完成 reCamera 单点轻节点的快速上线，并观摩 Jetson 多路 NVR 的架构与运行效果。

**时长**：约 2–3 小时

#### 1.1 reCamera 线：单点轻节点实操（约 60 分钟）

- **核心原理**：边缘 AI 一体化架构、嵌入式 NPU 推理、RTSP 视频流传输与 Web 控制台。
- **实操步骤**：
  1. reCamera 硬件上电与联网配置：2002w 使用 Wi-Fi / AP 模式，2002 使用 100Mbps 有线以太网，2002 HQ PoE 使用 PoE 交换机供电；注意 2002 标准版不支持 PoE。
  2. 访问 Web 界面，验证 RTSP 视频流（VLC / Web 播放器）。
  3. 切换预置目标检测模型（人、车、常用目标），观察推理帧率与置信度变化。
  4. 绘制基础入侵检测框，观察目标进入时的检测框与事件触发。

#### 1.2 边缘主机线：多路汇聚 NVR 架构演示（约 45 分钟）

- **核心原理**：集中式边缘算力架构、GPU 硬件解码与推理、Frigate NVR 统一视频流管理。
- **演示内容**：
  1. 边缘计算设备硬件规格与算力分层说明。
  2. Frigate 同时接入多路 RTSP 视频流的目标检测与录像管理展示（实测多路并发稳定分析）。
  3. 跨系统联动演示：检测到人员入侵 → MQTT 消息推送 → 联动声光报警与系统通知。

#### 1.3 方案对比与场景选型（约 30 分钟）

- 传统安防监控 vs 开源边缘 AI 方案。
- reCamera（轻节点）与 Jetson（强节点）的技术指标、成本与适用边界对比。
- 讨论：结合学员实际业务场景进行硬件架构选型。

**阶段交付**：每组完成 1 台 reCamera 节点的网络配置与基础目标识别验证。

**能力收获**：

- 理解帧率、分辨率、置信度阈值与 IoU 等视觉核心概念
- 独立完成 reCamera 设备的网络配置与视频流输出
- 掌握轻节点与强节点方案的适用边界与选型依据

### 模块二：双线场景联动与多路汇聚（L2 顾问层）

**目标**：掌握 reCamera + Node-RED 单点自动化联动，以及 Jetson + Frigate 多路视频流汇聚与 Home Assistant 深度集成。

**时长**：约 6–8 小时

#### 2.1 reCamera 线：Node-RED 自动化实战（约 2.5 小时）

1. **Node-RED 视觉流配置**
   - 学习 Node-RED 界面与 Flow 数据流概念。
   - 配置 SSCMA 模型节点，设置置信度过滤与目标类型过滤。
   - 搭建 Dashboard 仪表盘（呈现实时画面与告警状态）。
2. **多通道告警联动**
   - 配置 MQTT 消息发布节点，实现入侵事件驱动智能灯泡变色与蜂鸣器鸣响。
   - 配置 Webhook 节点，实现告警信息推送至企业微信群机器人。

#### 2.2 边缘主机线：Frigate 多路汇聚与 HA 集成（约 3 小时）

1. **Frigate 多路摄像头配置**
   - SSH 登录边缘主机，解析 `frigate.yml` 配置文件结构。
   - 添加多台 reCamera 的 RTSP 地址（格式示例 `rtsp://admin:admin@<ip>:554/live`），配置分辨率与检测帧率（建议 5–10 FPS，兼顾实时性与算力负载）。
   - 定义检测区域（Zones）与遮挡掩码（Masks），过滤无效干扰区域。
2. **Home Assistant 深度集成**
   - 安装并配置 Frigate HA 集成插件，映射摄像头实体与传感器状态。
   - 编写自动化 YAML 脚本：基于时间段、区域入侵状态执行声光告警与移动端推送。
3. **现场误报率调优实操**
   - 调整置信度阈值（Min Score / Threshold）。
   - 优化 Zones 坐标，排除树枝晃动、反光与背景杂物区域。
   - 记录调优前后的误报数据对比。

**阶段交付**：每组完成 1 套包含 2 路以上 RTSP 接入、Frigate 检测、HA 联动与误报调优的完整系统。

**能力收获**：

- 掌握在 reCamera 上使用 Node-RED 实现边缘事件的本地联动
- 掌握 Frigate `frigate.yml` 的多路配置、区域绘制与参数调优
- 掌握 Frigate 与 Home Assistant 联动配置与跨系统事件驱动逻辑

### 模块三：模型定制与边缘部署优化（L3 设计层）

**目标**：掌握特定业务场景（如安全帽检测、特定工件识别）的模型训练、量化转换与边缘端推理部署。

**时长**：约 8–16 小时（1–2 天）

#### 3.1 数据集采集与标注（约 3 小时）

- 制定现场数据采集策略（光照变化、角度多源、正负样本平衡）。
- 使用 CVAT 或 Roboflow 进行目标检测框标注与类别定义。
- 数据集划分（Train / Val / Test 7:2:1）与数据增强策略（翻转、对比度、马赛克增强）。

#### 3.2 YOLO 模型迁移学习（约 4 小时）

- YOLO 目标检测原理与骨干网络结构解析。
- 在边缘计算工作站 / 云端配置 PyTorch 训练环境与预训练权重。
- 启动训练脚本，监控 Loss 损失收敛曲线与 mAP@0.5 指标。

#### 3.3 边缘端模型转换与部署优化（约 3 小时）

- 将 PyTorch `.pt` 权重导出为通用 ONNX 格式。
- **Jetson 平台优化**：在 `stable-tensorrt-jp6` 镜像中，使用 Frigate TensorRT detector 加载预生成的 `.trt` 模型（YOLOv3/v4/v7 系列），或让 ONNX detector 在启动时自动转换为 TensorRT Engine；具体模型与量化策略需与 Frigate 版本匹配。
- **reCamera 平台优化**：使用 Sophgo TPU-MLIR 工具链，将 ONNX 经 MLIR 中间表示、INT8 量化后转换为 CV181x 适用的 `.cvimodel`，再导入 Node-RED 的 SSCMA 模型节点。
- 实测端侧推理延迟（Latency）、帧率（FPS）与显存占用，并形成基准对比报告。

#### 3.4 结构化数据汇聚与看板搭建（约 2 小时）

- 将目标检测统计数据写入 InfluxDB 时序数据库。
- 在 Grafana 中搭建告警频次统计、区域热度与合规率趋势看板。

**阶段交付**：每组交付 1 套自定义训练的目标检测模型（含权重文件与指标报告），并在硬件上完成实跑验证。

**能力收获**：

- 掌握视觉 AI 从数据标注、模型训练到边缘部署的完整工程闭环
- 掌握 TensorRT 与嵌入式模型量化转换的关键工具链
- 具备独立设计和交付垂直行业视觉识别方案的能力

### 模块四：方案复盘与交付总结

- 各组项目方案演练与误报调优效果答辩
- 边缘算力开销、网络带宽占用与光照鲁棒性复盘
- 方案交付物与配置文件归档

## 三、交付物清单

- 视觉系统架构设计图与网络拓扑说明
- reCamera Node-RED 联动流程配置文件
- Jetson Frigate 配置文件（`frigate.yml`）与 HA 自动化脚本
- 误报率调优前后测试对比记录表
- 自定义数据集、训练配置与量化后模型文件（.engine / .cvimodel，L3）

## 四、风险与预期管理

### 环境与算法须知

- 识别准确率高度依赖现场环境光照、摄像机安装高度、焦距匹配与遮挡情况。
- 边缘设备算力有限，多路并发时需合理规划检测分辨率与抽帧率（通常 5-10 FPS 用于检测即可）。
- 自定义模型质量取决于标注数据集的样本多样性与覆盖度。

### 明确不交付范围

- **严禁做人脸身份识别与生物特征追踪（合规红线）**。
- 不用于自动驾驶、医疗诊断等强安全关键制动场景。
- 不承诺在极端恶劣天气（如暴雨大雾）下的 100% 识别率。

## 五、相关核心参考资料

### 1. 硬件文档

- **reCamera 2002 系列快速入门**: [Getting Started](https://wiki.seeedstudio.com/recamera_getting_started/)
- **reCamera 2002 系列硬件规格**: [Hardware Specs](https://wiki.seeedstudio.com/recamera_2002_series_hardware_and_specs/)
- **reCamera 2002 HQ PoE 快速入门**: [HQ PoE Getting Started](https://wiki.seeedstudio.com/recamera_hq_poe_getting_started/)
- **reCamera Node-RED 开发指南**: [Develop with Node-RED](https://wiki.seeedstudio.com/recamera_develop_with_node-red/)
- **reServer Industrial J4012 产品页**: [reServer Product](https://www.seeedstudio.com/reServer-Industrial-J4012-p-5747.html)
- **reServer Industrial 快速入门**: [reServer Industrial Getting Started](https://wiki.seeedstudio.com/reServer_Industrial_Getting_Started/)
- **reServer Industrial PoE 摄像头使用**: [PoE Camera Usage](https://wiki.seeedstudio.com/reserver_industrial_poe_camera_usage/)
- **NVIDIA Jetson Orin NX 官方文档**: [Jetson Orin NX Guide](https://developer.nvidia.com/embedded/jetson-orin-nx)

### 2. 软件与开发工具

- **Frigate NVR 官方文档**: [Frigate Docs](https://docs.frigate.video/)
- **Frigate 摄像头与区域配置指南**: [Cameras & Zones Configuration](https://docs.frigate.video/configuration/cameras/)
- **Frigate 检测器与 Jetson/TensorRT 支持**: [Object Detectors](https://docs.frigate.video/configuration/object_detectors/)
- **Frigate Jetson 视频硬件加速**: [Video Decoding](https://docs.frigate.video/configuration/hardware_acceleration_video/)
- **Frigate Home Assistant 集成**: [Home Assistant Integration](https://docs.frigate.video/integrations/home-assistant/)
- **Ultralytics YOLO 官方文档**: [YOLO Docs](https://docs.ultralytics.com/)
- **reCamera YOLO11n 模型转换指南（TPU-MLIR → cvimodel）**: [Model Conversion Guide](https://wiki.seeedstudio.com/model_conversion_guide/)
- **NVIDIA TensorRT 优化指南**: [TensorRT Developer Guide](https://developer.nvidia.com/tensorrt)
