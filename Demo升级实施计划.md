# Implementation Plan: 校园协同平台 Demo 第二阶段升级

## Overview
在现有三端壳体基础上，补齐与“项目方向文档”一致的一期业务表达。重点不是做真算法，而是把门禁、人脸通行、校园巡检、情绪研判、统一告警和角色闭环做成可演示、可讲述、可继续扩展的 Demo。

## Architecture Decisions
- 继续使用双端结构：
  - `apps/admin-web` 承担总控端与老师端
  - `apps/parent-h5` 承担家长端
- 继续使用本地 Mock 数据，不引入真实接口。
- 以“统一事件模型”作为三端联动核心，不先拆复杂后端。
- 继续采用垂直切片方式推进，每一刀都形成可演示的完整路径。

## Gap Summary
- 现状更像“平台外壳”，而不是“一期能力 Demo”。
- 页面已经有基础骨架，但模块名和功能深度还没对齐项目方向。
- 三端联动主线已有雏形，但事件种类过少、状态流转不够完整。

## Task List

### Phase 1: Data and Navigation Foundation

## Task 1: 定义统一事件模型与演示数据字典
**Description:** 梳理门禁、巡检、情绪、请假、通知等事件，统一成一套可跨三端复用的 Mock 数据模型。

**Acceptance criteria:**
- [ ] 至少定义 8 类核心事件
- [ ] 事件包含来源、等级、状态、处理人、关联角色
- [ ] 管理端和家长端都能消费同一组业务语义

**Verification:**
- [ ] 数据文件结构清晰可读
- [ ] 同一事件能映射到三端不同页面
- [ ] 手动检查事件状态字段覆盖完整

**Dependencies:** None

**Files likely touched:**
- `apps/admin-web/src/demo/*`
- `apps/parent-h5/src/demo/*`

**Estimated scope:** Medium

## Task 2: 重构管理端导航与信息架构
**Description:** 把管理端菜单从当前壳体结构升级成更贴近一期业务的结构，包含门禁、巡检、情绪、告警等模块。

**Acceptance criteria:**
- [ ] 总控端菜单与项目方向文档核心模块对齐
- [ ] 老师端菜单保持清晰独立
- [ ] 无效或偏模板化菜单被移除

**Verification:**
- [ ] 管理员和老师菜单差异正确
- [ ] 所有新菜单可访问
- [ ] 登录后默认首页正确

**Dependencies:** Task 1

**Files likely touched:**
- `apps/admin-web/config/routes.ts`
- `apps/admin-web/src/app.tsx`
- `apps/admin-web/src/utils/*`

**Estimated scope:** Medium

## Checkpoint: Foundation
- [ ] 三端共享统一业务词汇
- [ ] 管理端菜单完成升级
- [ ] 现有登录和角色切换不受影响

### Phase 2: Admin Core Features

## Task 3: 完成校园巡检与告警中心页面
**Description:** 以“校园智能安全巡检”为中心，补出巡检事件页和统一告警中心页。

**Acceptance criteria:**
- [ ] 有巡检页面，展示点位、事件、状态
- [ ] 有统一告警中心，展示待处理 / 处理中 / 已关闭
- [ ] 巡检事件能跳转到告警中心详情

**Verification:**
- [ ] 管理员登录后可访问两个页面
- [ ] 事件列表和状态标签正常渲染
- [ ] 页面间跳转正确

**Dependencies:** Task 2

**Files likely touched:**
- `apps/admin-web/src/pages/*`
- `apps/admin-web/src/demo/*`

**Estimated scope:** Medium

## Task 4: 完成门禁管理与通行记录页面
**Description:** 增加门禁管理模块，用于表达师生通行、陌生人告警、异常轨迹等能力。

**Acceptance criteria:**
- [ ] 页面展示人员通行记录
- [ ] 页面能区分正常通行与异常事件
- [ ] 页面能展示黑名单/陌生人/异常轨迹语义

**Verification:**
- [ ] 页面内容与门禁主题一致
- [ ] 表格、筛选、状态标签正常
- [ ] 与风险中心语义一致

**Dependencies:** Task 1, Task 2

**Files likely touched:**
- `apps/admin-web/src/pages/*`
- `apps/admin-web/src/demo/*`

**Estimated scope:** Medium

## Task 5: 完成情绪研判与心理复核页面
**Description:** 在合规边界内表达“群体情绪感知”和“人工复核”两个关键概念。

**Acceptance criteria:**
- [ ] 页面展示群体趋势，而非个人标签
- [ ] 页面展示待复核状态和处理记录
- [ ] 页面明确“算法辅助，教师复核”的定位

**Verification:**
- [ ] 页面文案符合合规方向
- [ ] 趋势图和列表正常展示
- [ ] 与项目方向文档中的边界一致

**Dependencies:** Task 1, Task 2

**Files likely touched:**
- `apps/admin-web/src/pages/*`
- `apps/admin-web/src/demo/*`

**Estimated scope:** Medium

## Checkpoint: Admin Features
- [ ] 总控端具备门禁、巡检、情绪、告警四类核心页面
- [ ] 页面词汇与方向文档一致
- [ ] 管理端已从“平台壳”升级为“一期业务 Demo”

### Phase 3: Teacher and Parent Completion

## Task 6: 补齐老师端学生动态、班级通知、心理复核入口
**Description:** 让老师端不仅有工作台和待办，还具备更完整的班级管理与复核表达。

**Acceptance criteria:**
- [ ] 有学生动态页
- [ ] 有班级通知页
- [ ] 有心理复核相关入口或详情页

**Verification:**
- [ ] 老师端菜单和页面流完整
- [ ] 待办能指向对应页面
- [ ] 页面内容符合老师视角

**Dependencies:** Task 1, Task 2, Task 5

**Files likely touched:**
- `apps/admin-web/src/pages/teacher/*`
- `apps/admin-web/src/demo/*`

**Estimated scope:** Medium

## Task 7: 补齐家长端通知详情、请假记录、反馈建议
**Description:** 完善家长端服务链路，让家长侧不止有入口，还能体现记录与反馈。

**Acceptance criteria:**
- [ ] 有通知详情或消息详情表达
- [ ] 有请假记录展示
- [ ] 有反馈建议入口和结果状态

**Verification:**
- [ ] 家长端主导航仍清晰
- [ ] 相关弹层或页面能正常演示
- [ ] 与老师端待办语义呼应

**Dependencies:** Task 1

**Files likely touched:**
- `apps/parent-h5/src/*`
- `apps/parent-h5/src/demo/*`

**Estimated scope:** Medium

## Checkpoint: Role Flows
- [ ] 家长 -> 老师 -> 总控的主链路完整
- [ ] 老师端和家长端信息口径一致
- [ ] 三端不再只是展示页面，而是完整流程

### Phase 4: Polish and Delivery

## Task 8: 强化总控首页视觉与业务跳转
**Description:** 把总控首页打造成更适合截图、汇报、导航的入口页。

**Acceptance criteria:**
- [ ] 首页支持跳转到核心业务页
- [ ] 首页视觉更接近正式汇报大屏/驾驶舱
- [ ] 首页突出一期核心能力而非零散数据

**Verification:**
- [ ] 截图可直接进入 PPT
- [ ] 首页跳转链路顺滑
- [ ] 业务重点一眼可见

**Dependencies:** Task 3, Task 4, Task 5

**Files likely touched:**
- `apps/admin-web/src/pages/overview/*`
- `apps/admin-web/src/styles/*`

**Estimated scope:** Medium

## Task 9: 更新演示脚本、截图清单与启动说明
**Description:** 随功能升级同步修正文档，保证演示资料和实际页面一致。

**Acceptance criteria:**
- [ ] 演示脚本与页面结构一致
- [ ] 截图清单覆盖新增模块
- [ ] 启动说明无过期命令

**Verification:**
- [ ] 文档人工走查
- [ ] 按脚本手动走一遍
- [ ] 无明显过期内容

**Dependencies:** Task 3, Task 4, Task 5, Task 6, Task 7, Task 8

**Files likely touched:**
- `README.md`
- `甲方演示脚本.md`
- `汇报截图清单.md`

**Estimated scope:** Small

## Checkpoint: Complete
- [ ] 一期核心能力页面表达完整
- [ ] 三端故事线可完整演示
- [ ] 文档、页面、启动方式一致
- [ ] 准备进入下一轮实现

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| 页面扩太多导致再次失焦 | High | 严格围绕一期能力，不碰二期/三期 |
| 三端数据模型分裂 | High | Task 1 先统一事件模型 |
| 老师端和总控端信息重复 | Medium | 同一事件不同视角表达，避免页面复制 |
| 情绪研判表达触碰不合规文案 | High | 只做群体趋势和人工复核，不做个人标签 |

## Open Questions
- 是否在第二阶段加入独立的“校园态势大屏”页面
- 是否引入多校区切换演示
- 是否把家长端进一步贴近小程序导航体验
