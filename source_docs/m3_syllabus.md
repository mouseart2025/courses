# M3 自组网与韧性通信 · 课程大纲（仅海外）

> **自组网与韧性通信** × 企业培训实施指南

**课程定位：** 掌握基于 LoRa 与 Meshtastic 协议的去中心化 Mesh 组网技术，解决野外、隧道与断网环境下的通信与定位盲区问题，实现离网传感器数据汇聚与公网 MQTT 桥接。

> **市场范围**：当前套件频段为 433/868/915 MHz（Meshtastic 社区频段），**仅面向海外市场交付**。

## 一、培训目标

完成本课程培训后，学员与团队将具备以下能力：

- **Mesh 拓扑规划与部署**：掌握 LoRa 调制参数、信道加密与多跳中继节点（Solar Node）的规划布设。
- **应急通信与位置态势**：掌握无公网环境下的离线地图标注、即时文本广播与 GPS 轨迹回传。
- **公网融合与数据可视化**：搭建 ESP32 LoRa-MQTT 网关，并在 Node-RED 与地图看板中实现多节点状态监视。
- **离网传感与固件开发（L3）**：基于 Wio Tracker L1 Pro 源码定制 Meshtastic 固件，实现外接传感器数据编码与回传。

## 二、教学模块

### 模块〇：课前准备（讲师与助教）

> 培训开始前完成硬件检测与频段规划，对照 [M3.2 培训设备清单](M3.2 培训设备清单.md) 逐项清点，保障现场实操顺利进行。

- **硬件台架清点**：按 [M3.2 培训设备清单](M3.2 培训设备清单.md) 检查 Mission Pack 套件、T1000-E 卡片终端、Solar Node P1-Pro 中继、XIAO ESP32S3 网关、Wio Tracker L1 Pro 与 BME280 传感器齐全。
- **频段一致性校验**：确认全套 LoRa 设备工作频段严格一致（433/868/915 MHz），检查天线频段标识匹配。
- **固件预检与升级**：T1000-E、Solar Node P1-Pro、XIAO ESP32S3 网关按需刷写最新稳定版 Meshtastic 固件。
- **现场测线规划**：规划室内多遮挡环境与室外高位中继测试路线，分配小组信道名称与 256 位预共享密钥（PSK）。

### 模块一：基础组网与离线通信（L1 展示层）

**目标**：理解 LoRa 物理层与 Meshtastic 网状路由机制，完成便携终端与中继节点的快速配网、信道配置与离线通信验证。

**实操内容**：

1. **LoRa 物理层与 Mesh 协议核心原理**
   - 核心参数解析：频率（Freq）、带宽（BW）、扩频因子（SF）、编码率（CR）与空口速率平衡
   - 网状自组网机制：洪泛路由（Managed Flooding）、多跳计数（Hop Limit）与防环路机制
2. **终端与中继节点初始化配置**
   - T1000-E 卡片式追踪器蓝牙配对与 Meshtastic App 基础设置
   - SenseCAP Solar Node P1 Pro 太阳能中继节点部署规范与天线极化方向
3. **信道规划与安全加密**
   - 主信道（Primary Channel）与分组子信道（Secondary Channel）设置
   - 256 位 AES 密钥配置，实现分组安全隔离
4. **离线通信与定位回传实测**
   - 室内穿墙与视距点对点文本收发测试
   - 离线地图瓦片加载、GPS 定位上报与轨迹标绘实操

**阶段交付**：每组完成至少 3 个节点的现场组网，并在无公网环境下完成点对点、群组广播及位置共享测试。

**能力收获**：

- 理解 LoRa 物理特性与 Meshtastic 路由拓扑原理
- 熟练配置节点角色（Client / Repeater / Router）与信道加密
- 掌握离网环境下的终端通信与地图定位实操

### 模块二：状态监控与 MQTT 桥接（L2 顾问层）

**目标**：掌握 LoRa Mesh 网络与互联网的桥接技术，搭建 MQTT 消息通道与态势监控大屏。

**实操内容**：

1. **ESP32S3 LoRa-MQTT 网关搭建**
   - 使用 XIAO ESP32S3 + Wio-SX1262 组装网关硬件
   - 配置网关 Wi-Fi 连接与 MQTT Broker 接入参数（官方教程示例：`mqtt.meshtastic.org`，用户名 `meshdev`，密码 `large4cats`；亦可接入自建/EMQX 等 Broker）
   - 网关数据上行转发与下行命令广播机制
2. **数据解析与 Node-RED 自动化联动**
   - 解析 Meshtastic MQTT 遥测报文（固件默认 Protobuf，JSON 输出需另行配置）
   - 在 Node-RED 中编写节点状态监视流：电量过低告警、心跳离线判定
   - 配置紧急 SOS 告警联动（Webhook / 邮件 / 即时通信转发）
3. **网络拓扑与地图可视化大屏**
   - 部署 Liam Cottle's Meshtastic Map 或自建地图服务
   - 实时呈现全场节点分布、信号强度（RSSI/SNR）与中继链路跳数

**阶段交付**：每组完成 1 套 LoRa-MQTT 网关上线，并在看板上实时显示各节点坐标与电量状态。

**能力收获**：

- 掌握 LoRa Mesh 与局域网/公网的 MQTT 桥接方法
- 掌握基于 Node-RED 的 Mesh 遥测数据解析与自动化流编排
- 具备搭建全域通信态势监控看板的能力

### 模块三：离网传感集成与固件定制（L3 设计层）

**目标**：掌握外接环境传感器的硬件接口调试，并在 PlatformIO 环境中定制编译 Meshtastic 端侧固件。

**实操内容**：

1. **外接环境传感器硬件调试**
   - 使用 Grove 接口连接 BME280 温湿度/气压传感器
   - I2C 总线地址扫描与传感器供电管理
2. **PlatformIO 开发环境与源码工程**
   - 搭建 VS Code + PlatformIO 编译环境
   - 克隆 `meshtastic/firmware` 官方源码并配置 `platformio.ini` 目标板型 `seeed_wio_tracker_L1`
3. **端侧固件功能定制（以 Wio Tracker L1 Pro 为例）**
   - 修改屏幕 UI 交互逻辑：在首页增加实时环境数据展示与未读消息计数页面
   - 配置 Telemetry 遥测数据打包与周期发送策略
4. **编译、烧录与实机验证**
   - 编译生成自定义固件并通过 USB/串口烧录至 Wio Tracker L1 Pro
   - 验证传感器数据在 Mesh 网络内的多跳广播与解析

**阶段交付**：每组完成 1 款集成环境传感器的定制固件编译，并在屏幕与 Mesh 接收端验证数据。

**能力收获**：

- 掌握 Meshtastic 开源固件架构与 C++ 源码定制流程
- 掌握基于 PlatformIO 的嵌入式编译与固件烧录
- 具备独立设计与构建离网环境监测节点的能力

### 模块四：方案复盘与交付总结

- 复杂遮挡环境下的信号衰减、中继跳数与丢包率数据复盘
- 应急通信网络部署拓扑与频段合规规范归档
- 硬件采购清单与备件建议

## 三、交付物清单

- LoRa Mesh 应急通信网络规划与拓扑图
- 设备快速配网与信道加密操作手册
- LoRa-MQTT 网关固件配置与 Node-RED 监控流程文件
- 离网传感定制固件源码与编译工程（L3）

## 四、风险与预期管理

### 通信环境与部署须知

- 通信距离受地形起伏、建筑物遮挡及天线安装高度显著影响。
- 消息传输时延随中继跳数增加而累加（通常为 1–3 秒/跳），复杂遮挡环境下需预留合理跳数预算。
- 野外长期节点需配套太阳能板与高低温环境电池。

### 明确不交付范围

- 不支持语音对讲、视频传输及大体积文件下载。
- 不作为蜂窝 4G/5G 宽带通信的完全替代方案。
- 不承诺极端复杂电磁干扰环境下的 100% 报文投递率。

## 五、相关核心参考资料

### 1. 硬件选型与快速入门

- **Seeed Meshtastic 方案构建指南**: [Build Your First Meshtastic Network](https://www.seeedstudio.com/blog/2026/01/27/build-your-first-meshtastic-network-using-seeeds-starter-kit/)
- **SenseCAP T1000-E Wiki**: [T1000-E Getting Started](https://wiki.seeedstudio.com/sensecap_t1000_e/)
- **SenseCAP Solar Node P1 Pro Wiki**: [Solar Node Guide](https://wiki.seeedstudio.com/get_started_with_meshtastic_solar_node/)
- **XIAO ESP32S3 & Wio-SX1262 套件**: [Kit Wiki](https://wiki.seeedstudio.com/xiao_esp32s3_&_wio_SX1262_kit_for_meshtastic/)

### 2. 软件平台与网关

- **Meshtastic 官方文档**: [Meshtastic Docs](https://meshtastic.org/docs/)
- **Meshtastic Web 在线刷机工具**: [Web Flasher](https://flasher.meshtastic.org/)
- **MQTT 网关配置教程**: [MQTT Gateway Setup](https://wiki.seeedstudio.com/xiao_esp32s3_&_wio_sx1262_kit_mqtt/)
- **Wio Tracker L1 源码实战教程**: [Practical Tutorial](https://wiki.seeedstudio.com/meshtastic_source_code_practical_tutorial/)
