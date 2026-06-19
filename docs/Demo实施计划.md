# Implementation Plan: 校园平台壳体 Demo

## Overview
基于 `ant-design/ant-design-pro` 和 `ant-design/ant-design-mobile`，先完成一个可演示的校园平台前端壳体。目标不是实现真实业务，而是先把总控端、老师端、家长端三端产品形态、角色权限差异和基础交互链路做完整。

## Architecture Decisions
- 使用双端前端方案：
  - `admin-web` 承担总控端和老师端
  - `parent-h5` 承担家长端
- 使用统一 Mock 数据层，保证三端数据口径一致。
- 使用角色驱动的路由与菜单配置，不先做复杂权限后端。
- 第一版以“完整演示流”优先，不追求真实业务深度。

## Phase 1: Foundation

## Task 1: 建立仓库结构与前端基线
**Description:** 初始化 `admin-web` 和 `parent-h5` 两个前端应用，确定共享样式变量与公共资源目录。

**Acceptance criteria:**
- [ ] 仓库中存在 PC 端和移动端两个独立应用入口
- [ ] 两端都能独立启动
- [ ] 公共品牌资源目录已建立

**Verification:**
- [ ] 开发命令可运行
- [ ] 两端基础首页可访问
- [ ] 目录结构清晰可读

**Dependencies:** None

**Files likely touched:**
- `apps/admin-web/*`
- `apps/parent-h5/*`
- `assets/*`

**Estimated scope:** Medium

## Task 2: 建立角色、菜单、路由配置模型
**Description:** 定义 `admin`、`teacher`、`parent` 三类角色的菜单、默认首页和页面访问规则。

**Acceptance criteria:**
- [ ] 三类角色都有独立默认首页
- [ ] 菜单会根据角色变化
- [ ] 路由守卫能阻止错误访问

**Verification:**
- [ ] 手动切换角色后菜单变化正确
- [ ] 不同角色跳转主页正确
- [ ] 无权限页面不能直接进入

**Dependencies:** Task 1

**Files likely touched:**
- `apps/admin-web/src/router/*`
- `apps/admin-web/src/config/*`
- `apps/parent-h5/src/router/*`

**Estimated scope:** Medium

## Checkpoint: Foundation
- [ ] 两端都可运行
- [ ] 三类角色切换逻辑成立
- [ ] 菜单和首页映射成立

## Phase 2: Core Demo Pages

## Task 3: 完成总控端首页与风险中心
**Description:** 搭建总控端首页、校园态势模块和风险中心页，形成第一眼的管理平台印象。

**Acceptance criteria:**
- [ ] 总控端首页具备 KPI、趋势、事件流
- [ ] 风险中心页具备事件列表与状态筛选
- [ ] 页面之间导航顺畅

**Verification:**
- [ ] 登录管理员后可进入总控端首页
- [ ] 从首页可跳转到风险中心
- [ ] 风险数据可正常渲染

**Dependencies:** Task 2

**Files likely touched:**
- `apps/admin-web/src/pages/overview/*`
- `apps/admin-web/src/pages/risk-center/*`
- `apps/admin-web/src/mock/*`

**Estimated scope:** Medium

## Task 4: 完成老师端工作台与班级页
**Description:** 搭建老师工作台、我的班级页和待办中心，让老师端显得像独立产品而不是后台子页面。

**Acceptance criteria:**
- [ ] 老师首页展示班级概况和待处理事项
- [ ] 我的班级页展示学生与班级状态
- [ ] 待办中心能展示处理链路

**Verification:**
- [ ] 登录老师角色后进入工作台
- [ ] 班级页数据可浏览
- [ ] 待办页与首页卡片能联动

**Dependencies:** Task 2

**Files likely touched:**
- `apps/admin-web/src/pages/teacher-workbench/*`
- `apps/admin-web/src/pages/my-class/*`
- `apps/admin-web/src/pages/todos/*`

**Estimated scope:** Medium

## Task 5: 完成家长端首页与服务页
**Description:** 搭建家长端首页、孩子页、请假申请页和消息页，形成轻量服务入口感。

**Acceptance criteria:**
- [ ] 家长端首页展示孩子今日状态和通知
- [ ] 请假申请页能完成表单提交流程
- [ ] 消息页能区分学校通知和老师通知

**Verification:**
- [ ] 家长端首页可正常进入
- [ ] 请假流程可完整演示
- [ ] 消息页数据展示清晰

**Dependencies:** Task 1

**Files likely touched:**
- `apps/parent-h5/src/pages/home/*`
- `apps/parent-h5/src/pages/child/*`
- `apps/parent-h5/src/pages/leave/*`
- `apps/parent-h5/src/pages/messages/*`

**Estimated scope:** Medium

## Checkpoint: Core Demo Pages
- [ ] 总控端、老师端、家长端各有完整首页
- [ ] 三端至少各有一个可深入演示的核心页面
- [ ] 基础讲解路径已经成立

## Phase 3: Story Flow and Polish

## Task 6: 建立统一 Mock 数据与事件联动
**Description:** 设计统一的学校、班级、老师、家长、通知、事件数据模型，让三端展示同一世界观。

**Acceptance criteria:**
- [ ] 三端共用同一组学校与班级数据
- [ ] 事件在不同端有对应映射
- [ ] 数据结构便于后续替换成真实接口

**Verification:**
- [ ] 一个通知能在总控端、老师端、家长端各自出现
- [ ] 一个请假申请能在老师端和家长端关联展示
- [ ] Mock 数据结构清晰可维护

**Dependencies:** Task 3, Task 4, Task 5

**Files likely touched:**
- `packages/mock-server/*`
- `apps/admin-web/src/mock/*`
- `apps/parent-h5/src/mock/*`

**Estimated scope:** Medium

## Task 7: 完成登录页与角色切换演示入口
**Description:** 提供统一登录页或统一演示入口，支持一键进入管理员、老师、家长三种视角。

**Acceptance criteria:**
- [ ] 演示入口可快速切换三类身份
- [ ] 切换后进入对应首页
- [ ] 页面风格统一

**Verification:**
- [ ] 演示者可以在 30 秒内切换到任一角色
- [ ] 登录态和角色态稳定
- [ ] 无跳转错误

**Dependencies:** Task 2, Task 3, Task 4, Task 5

**Files likely touched:**
- `apps/admin-web/src/pages/login/*`
- `apps/parent-h5/src/pages/login/*`
- `apps/admin-web/src/stores/*`
- `apps/parent-h5/src/stores/*`

**Estimated scope:** Medium

## Task 8: 完成视觉统一与演示优化
**Description:** 收敛品牌色、图标、卡片样式、标题层级和演示路径中的关键视觉细节。

**Acceptance criteria:**
- [ ] 三端风格一致但有角色差异
- [ ] 首页视觉达到可汇报水平
- [ ] 关键页面没有明显占位感

**Verification:**
- [ ] 人工走查主要页面
- [ ] 演示路径完整顺滑
- [ ] 页面截屏具备汇报可用性

**Dependencies:** Task 6, Task 7

**Files likely touched:**
- `apps/admin-web/src/styles/*`
- `apps/parent-h5/src/styles/*`
- `packages/shared-ui/*`

**Estimated scope:** Medium

## Checkpoint: Complete
- [ ] 三端演示链路完整
- [ ] 角色差异明显
- [ ] 页面视觉可用于甲方展示
- [ ] 后续可继续往真实系统演进

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| 页面做太多导致第一版失焦 | High | 严格按 P0 页面先做 |
| 家长端和老师端风格过于接近 | Medium | 在首页布局和交互入口上做明显区分 |
| 过早接入真实接口拖慢进度 | High | 第一版只做 Mock |
| 总控端看起来像通用后台而非校园平台 | High | 强化学校、班级、家长、通知等校园语义 |

## Open Questions
- 家长端后续是否明确走微信小程序方向
- 是否需要第一版体现“多校切换”
- 是否需要单独做一个总控大屏模式
