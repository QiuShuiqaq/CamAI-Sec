export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        name: '登录',
        component: './user/login',
      },
      {
        name: '404',
        component: './exception/404',
        path: '/user/*',
      },
    ],
  },
  {
    path: '/overview',
    name: '总览驾驶舱',
    icon: 'dashboard',
    access: 'canAdmin',
    component: './overview',
  },
  {
    path: '/access-control',
    name: '门禁管理',
    icon: 'safetyCertificate',
    access: 'canAdmin',
    routes: [
      {
        path: '/access-control',
        redirect: '/access-control/records',
      },
      {
        path: '/access-control/records',
        name: '通行记录',
        component: './access-control/records',
      },
    ],
  },
  {
    path: '/patrol',
    name: '校园巡检',
    icon: 'alert',
    access: 'canAdmin',
    routes: [
      {
        path: '/patrol',
        redirect: '/patrol/events',
      },
      {
        path: '/patrol/events',
        name: '巡检事件',
        component: './patrol/events',
      },
    ],
  },
  {
    path: '/emotion',
    name: '情绪研判',
    icon: 'barChart',
    access: 'canAdmin',
    routes: [
      {
        path: '/emotion',
        redirect: '/emotion/trends',
      },
      {
        path: '/emotion/trends',
        name: '群体趋势',
        component: './emotion/trends',
      },
    ],
  },
  {
    path: '/alert-center',
    name: '告警中心',
    icon: 'notification',
    access: 'canAdmin',
    routes: [
      {
        path: '/alert-center',
        redirect: '/alert-center/list',
      },
      {
        path: '/alert-center/list',
        name: '统一告警',
        component: './risk-center',
      },
      {
        path: '/alert-center/overview',
        name: '处置总览',
        component: './alert-center/overview',
      },
      {
        path: '/alert-center/detail/:id',
        hideInMenu: true,
        component: './alert-center/detail',
      },
    ],
  },
  {
    path: '/system',
    name: '系统配置',
    icon: 'setting',
    access: 'canAdmin',
    routes: [
      {
        path: '/system',
        redirect: '/system/roles',
      },
      {
        path: '/system/roles',
        name: '角色配置',
        component: './system/roles',
      },
    ],
  },
  {
    path: '/teacher',
    name: '老师工作台',
    icon: 'team',
    access: 'canTeacher',
    routes: [
      {
        path: '/teacher',
        redirect: '/teacher/workbench',
      },
      {
        path: '/teacher/workbench',
        name: '工作台',
        icon: 'home',
        component: './teacher/workbench',
      },
      {
        path: '/teacher/my-class',
        name: '我的班级',
        icon: 'book',
        component: './teacher/my-class',
      },
      {
        path: '/teacher/students',
        name: '学生动态',
        icon: 'user',
        component: './teacher/students',
      },
      {
        path: '/teacher/notices',
        name: '班级通知',
        icon: 'message',
        component: './teacher/notices',
      },
      {
        path: '/teacher/todos',
        name: '待办中心',
        icon: 'notification',
        component: './teacher/todos',
      },
      {
        path: '/teacher/todos/:id',
        hideInMenu: true,
        component: './teacher/todo-detail',
      },
    ],
  },
  {
    path: '/',
    component: './RoleRedirect',
  },
  {
    component: './exception/404',
    path: '/*',
  },
];
