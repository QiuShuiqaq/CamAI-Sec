# Demo 深度架构蓝图

## 1. 目标
这份文档解决的是“后期尽量不用大改结构”。

不是简单列页面，而是一次把下面这些定清楚：
- 前端分层
- 业务域划分
- 路由结构
- Mock 数据域
- 事件模型
- 页面与数据的映射关系
- 后续接真实接口时的替换边界

如果这层不先定好，后续每补一个功能都会开始改目录、改命名、改数据结构，最后 Demo 会越来越乱。

## 2. 核心设计原则
### 2.1 平台先于页面
不要按“页面”组织整个项目，而要按“业务域”组织。

错误方式：
- 先有很多页面
- 页面各自带一份假数据
- 页面之间只有视觉连接，没有真实业务关系

正确方式：
- 先定义业务域
- 再定义这些业务域在不同角色端的展示方式
- 页面只是业务域的视图

### 2.2 事件模型先于交互模型
这个项目的本质不是 CRUD 平台，而是“事件驱动的校园协同平台”。

因此整个 Demo 的中心不应该是某个表格，而应该是：
- 事件产生
- 事件分发
- 事件处理
- 事件闭环

### 2.3 三端不是三套系统
总控端、老师端、家长端应该共享：
- 同一学校
- 同一组织结构
- 同一学生/班级关系
- 同一事件
- 同一状态流

差异只在于：
- 能看到什么
- 能处理什么
- 以什么形式展示

### 2.4 Mock 要像未来 API，而不是像临时假数据
本轮虽然不接真实后端，但 Mock 结构必须像未来真实接口响应。

否则后续接后端时会整轮重构。

## 3. 建议的整体代码结构
当前已经有：
- `apps/admin-web`
- `apps/parent-h5`

建议下一阶段进一步明确成：

```text
apps/
  admin-web/
    src/
      app/
        layout/
        router/
        guards/
      modules/
        overview/
        access-control/
        patrol/
        emotion/
        alert-center/
        teacher-workbench/
        parent-communication/
        system-config/
      shared/
        components/
        hooks/
        utils/
        constants/
      demo/
        entities/
        events/
        views/
      pages/
        ...

  parent-h5/
    src/
      app/
        navigation/
      modules/
        home/
        child-status/
        messages/
        leave/
        feedback/
        profile/
      shared/
        components/
        hooks/
        utils/
      demo/
        entities/
        events/
        views/
```

### 为什么要这样拆
`modules/`
- 放真正业务域代码

`shared/`
- 放跨业务复用的组件和方法

`demo/entities`
- 放基础实体

`demo/events`
- 放统一事件流

`demo/views`
- 放不同角色视图的聚合数据

这样后续从 Mock 切到真实接口时：
- 只替换 `demo/` 数据接入层
- 页面和模块结构不用推翻

## 4. 业务域划分
建议把这个 Demo 的一期能力固定成 7 个核心业务域。

### 4.1 概览域 `overview`
负责：
- 总控首页
- 指标统计
- 校园态势
- 统一事件摘要

这是入口域，不承载复杂业务规则。

### 4.2 门禁域 `access-control`
负责：
- 人员通行记录
- 黑名单 / 陌生人事件
- 异常轨迹语义

后续可接：
- 人脸识别
- 人员轨迹
- 校门设备

### 4.3 巡检域 `patrol`
负责：
- 校园巡检事件
- 重点区域风险
- 点位和状态

后续可接：
- 摄像头事件流
- 巡检策略
- 告警截图

### 4.4 情绪与心理域 `emotion`
负责：
- 群体情绪趋势
- 风险提示
- 人工复核入口

后续可接：
- 情绪识别模型
- 心理老师工作流

### 4.5 告警中心域 `alert-center`
负责：
- 统一告警列表
- 状态流转
- 指派/处理/关闭

这是最关键的中枢域，后续几乎所有事件都应该汇总到这里。

### 4.6 老师工作域 `teacher-workbench`
负责：
- 工作台
- 我的班级
- 学生动态
- 待办中心
- 班级通知

### 4.7 家校协同域 `parent-communication`
负责：
- 家长消息
- 请假申请
- 通知送达
- 反馈建议

## 5. 实体模型建议
先定义实体，不要先定义页面。

建议至少固定以下实体：

### 5.1 School
```ts
type School = {
  id: string;
  name: string;
  campusName?: string;
};
```

### 5.2 Grade
```ts
type Grade = {
  id: string;
  schoolId: string;
  name: string;
};
```

### 5.3 Class
```ts
type ClassEntity = {
  id: string;
  schoolId: string;
  gradeId: string;
  name: string;
  teacherId: string;
};
```

### 5.4 User
```ts
type UserRole = 'admin' | 'teacher' | 'parent';

type User = {
  id: string;
  name: string;
  role: UserRole;
  schoolId: string;
};
```

### 5.5 Student
```ts
type Student = {
  id: string;
  name: string;
  classId: string;
  guardianIds: string[];
};
```

### 5.6 DevicePoint
```ts
type DevicePoint = {
  id: string;
  schoolId: string;
  name: string;
  type: 'gate' | 'camera' | 'area';
  location: string;
};
```

## 6. 统一事件模型
这是后面最不能轻易改的部分，建议现在就固定。

### 6.1 事件分类
建议至少有 8 类：
- `access_pass`
- `access_alert`
- `patrol_risk`
- `emotion_alert`
- `parent_leave_request`
- `notice_delivery`
- `parent_feedback`
- `manual_review`

### 6.2 事件状态
建议固定成：
- `new`
- `pending`
- `processing`
- `reviewing`
- `closed`

### 6.3 统一事件结构
```ts
type DemoEvent = {
  id: string;
  type: string;
  title: string;
  summary: string;
  level: 'low' | 'medium' | 'high';
  status: 'new' | 'pending' | 'processing' | 'reviewing' | 'closed';
  schoolId: string;
  classId?: string;
  studentId?: string;
  actorUserId?: string;
  ownerUserId?: string;
  relatedPointId?: string;
  source: 'mock-ai' | 'manual' | 'system' | 'parent';
  createdAt: string;
  updatedAt: string;
};
```

### 为什么这很重要
后续所有页面都可以围绕它派生：
- 总控端看全量事件
- 老师端看自己班级相关事件
- 家长端看与自己孩子相关的事件

## 7. 视图聚合层建议
不要让页面自己拼很多数据。

建议增加“视图聚合层”概念：

### 7.1 Admin Dashboard View
负责把：
- KPI
- 今日事件
- 告警列表
- 班级活跃度
- 送达率

聚合成总控首页需要的结构。

### 7.2 Teacher Workbench View
负责把：
- 班级人数
- 到校情况
- 待办事项
- 学生动态

聚合成老师首页需要的结构。

### 7.3 Parent Home View
负责把：
- 孩子状态
- 通知摘要
- 消息摘要
- 服务入口状态

聚合成家长首页需要的结构。

这样后面替换真实接口时，不会每个页面都重写。

## 8. 路由结构建议
建议现在就固定路由命名风格，后面不要来回改。

### 管理端
```text
/overview
/overview/campus
/access-control/records
/access-control/alerts
/patrol/events
/patrol/points
/emotion/trends
/emotion/reviews
/alert-center/list
/alert-center/detail/:id
/teacher/workbench
/teacher/class
/teacher/students
/teacher/notices
/teacher/todos
/system/roles
```

### 家长端
当前是单页切 tab，但建议内部结构也按未来页面固定：

```text
home
child-status
messages
leave-request
leave-history
feedback
profile
```

即使现在不做真正路由，也应按这个语义组织组件。

## 9. 页面到业务域映射
这一步能防止后面页面越来越散。

### 总控端
- 总览驾驶舱 -> `overview`
- 校园态势 -> `overview` + `patrol`
- 门禁管理 -> `access-control`
- 巡检告警 -> `patrol`
- 情绪研判 -> `emotion`
- 告警中心 -> `alert-center`
- 系统配置 -> `system-config`

### 老师端
- 工作台 -> `teacher-workbench`
- 我的班级 -> `teacher-workbench`
- 学生动态 -> `teacher-workbench`
- 待办中心 -> `alert-center` + `teacher-workbench`
- 心理复核 -> `emotion`
- 班级通知 -> `parent-communication`

### 家长端
- 首页 -> `parent-communication`
- 孩子 -> `teacher-workbench` 的家长视角
- 消息 -> `parent-communication`
- 请假 -> `parent-communication`
- 反馈 -> `parent-communication`

## 10. 后续接真实接口的替换边界
这一条如果现在不定，后面改动会很大。

建议未来替换顺序是：

1. 保持页面不动
2. 保持模块结构不动
3. 先替换 `demo/entities`
4. 再替换 `demo/events`
5. 最后替换 `views` 聚合逻辑

不要让页面自己直接依赖真实接口返回结构。

## 11. 推荐先做的结构性改造
在正式补功能前，建议先完成这 5 件事：

1. 建立统一 `demo` 数据目录分层
2. 建立统一事件模型
3. 建立统一实体模型
4. 重构管理端路由命名
5. 把管理端页面按业务域分组

这五件事完成后，后续再补门禁、巡检、情绪、告警时，基本不需要推翻结构。

## 12. 当前最稳的推进顺序
### 第一阶段：稳定骨架
- 目录改造
- 数据模型改造
- 路由结构改造

### 第二阶段：补总控端四大业务域
- 门禁
- 巡检
- 情绪
- 告警中心

### 第三阶段：补老师端闭环
- 学生动态
- 班级通知
- 心理复核
- 待办详情

### 第四阶段：补家长端闭环
- 消息详情
- 请假记录
- 反馈建议

### 第五阶段：统一文档与演示脚本
- 更新截图清单
- 更新演示脚本
- 更新启动说明

## 13. 建议新增 ADR
这个项目已经有足够多的结构性决定，建议至少补 3 个 ADR：

1. 为什么管理端和老师端共用 `admin-web`
2. 为什么本轮以统一事件模型为中心
3. 为什么当前阶段坚持 Mock 优先而不接真实接口

## 14. 结论
你要的不是“再多做几页”，而是“先把后续演进不会频繁推翻的骨架搭好”。

因此下一轮最合理的动作不是直接补页面，而是先按这份蓝图完成：
- 数据域稳定
- 业务域稳定
- 路由稳定
- 模块边界稳定

这样后面每补一个功能，都是往现有骨架里填内容，而不是边做边改地基。
