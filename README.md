# CamAI-Sec

校园 AI 安防协同平台 Demo 仓库，当前发布版本为 `1.0.0`。

这套 Demo 不是算法联调工程，而是面向甲方演示的一期产品壳体，重点展示：
- 总控端
- 老师端
- 家长端
- 同一事件在三端之间的协同闭环

## 仓库结构

- `apps/admin-web`
  - 基于 `ant-design-pro`
  - 承载总控端和老师端
- `apps/parent-h5`
  - 基于 `ant-design-mobile`
  - 承载家长端 H5

## 当前版本范围

`1.0.0` 版本已经完成以下内容：

- 管理端登录和角色分流
- 总览驾驶舱、门禁管理、校园巡检、情绪研判、告警中心、处置总览、系统配置
- 老师工作台、我的班级、学生动态、班级通知、待办中心、待办详情
- 家长首页、孩子、消息、消息详情、请假申请、请假记录、反馈建议、我的
- 家长提交 -> 老师处理 -> 总控回看 的主线演示链路

当前仍然是本地 Mock 演示版本，不接真实设备、真实视觉模型或真实后端。

## 演示账号

### 管理端

- 总控端：`admin / ant.design`
- 老师端：`teacher / ant.design`

### 家长端

- 当前不做真实登录，直接打开页面演示

## 本地启动

### 管理端

```powershell
cd f:\Workspace_VS\CamAI-Sec\apps\admin-web
npm.cmd run dev
```

说明：
- 必须使用带本地 mock 的开发启动方式
- 不要使用关闭 mock 的启动命令，否则登录演示会失效

默认地址：
- `http://127.0.0.1:8000`

### 家长端

```powershell
cd f:\Workspace_VS\CamAI-Sec\apps\parent-h5
npm.cmd run dev
```

默认 Vite 端口通常是：
- `http://127.0.0.1:5173`

如果端口被占用，可改端口启动：

```powershell
npm.cmd run dev -- --host 127.0.0.1 --port 5174
```

## 构建验证

### 管理端

```powershell
cd f:\Workspace_VS\CamAI-Sec\apps\admin-web
npm.cmd run tsc
npm.cmd run test
npm.cmd run build
```

### 家长端

```powershell
cd f:\Workspace_VS\CamAI-Sec\apps\parent-h5
npm.cmd run build
```

## 交付定位

这套仓库当前适合：
- 方案汇报
- 界面评审
- 角色流程演示
- 后续继续向真实系统实施推进

这套仓库当前不包含：
- 真实视觉识别实现
- 无人机或硬件联调
- 生产后端服务
- 数据库和正式部署架构

## 相关文档

- [项目方向文档.md](./项目方向文档.md)
- [平台壳体Demo方案.md](./平台壳体Demo方案.md)
- [三端信息架构与演示地图.md](./三端信息架构与演示地图.md)
- [Demo深度架构蓝图.md](./Demo深度架构蓝图.md)
- [当前代码架构索引.md](./当前代码架构索引.md)
- [甲方演示脚本.md](./甲方演示脚本.md)

## 已知事项

- `apps/admin-web` 在 Windows 下构建结束时仍可能出现一次持久化权限告警
- 当前不影响构建产物，也不影响本地演示
