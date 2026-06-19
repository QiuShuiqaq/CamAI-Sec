import type {
  ClassEntity,
  DemoEvent,
  DevicePoint,
  Grade,
  School,
  Student,
  User,
} from '../entities';
import { demoEvents } from '../events';

export const demoSchool: School = {
  id: 'school-hz-01',
  name: '湖州第一实验学校',
  campusName: '仁和校区',
};

export const demoGrades: Grade[] = [
  { id: 'grade-7', schoolId: demoSchool.id, name: '七年级' },
  { id: 'grade-8', schoolId: demoSchool.id, name: '八年级' },
  { id: 'grade-9', schoolId: demoSchool.id, name: '九年级' },
];

export const demoUsers: User[] = [
  { id: 'admin-chen', name: '陈校长', role: 'admin', schoolId: demoSchool.id },
  {
    id: 'teacher-lin',
    name: '林老师',
    role: 'teacher',
    schoolId: demoSchool.id,
    classId: 'class-g7-2',
  },
  { id: 'teacher-psy', name: '周老师', role: 'teacher', schoolId: demoSchool.id },
  {
    id: 'parent-zhangnvshi',
    name: '张女士',
    role: 'parent',
    schoolId: demoSchool.id,
  },
];

export const demoClasses: ClassEntity[] = [
  {
    id: 'class-g7-2',
    schoolId: demoSchool.id,
    gradeId: 'grade-7',
    name: '七年级二班',
    teacherId: 'teacher-lin',
  },
];

export const demoStudents: Student[] = [
  {
    id: 'student-zhangxiaoyu',
    name: '张小雨',
    classId: 'class-g7-2',
    guardianIds: ['parent-zhangnvshi'],
  },
  {
    id: 'student-lizheyuan',
    name: '李哲远',
    classId: 'class-g7-2',
    guardianIds: [],
  },
  {
    id: 'student-wangsiqi',
    name: '王思琪',
    classId: 'class-g7-2',
    guardianIds: [],
  },
];

export const demoPoints: DevicePoint[] = [
  {
    id: 'point-gate-east',
    schoolId: demoSchool.id,
    name: '东门闸机',
    type: 'gate',
    location: '校门东侧',
  },
  {
    id: 'point-gate-west',
    schoolId: demoSchool.id,
    name: '西门闸机',
    type: 'gate',
    location: '校门西侧',
  },
  {
    id: 'point-east-building',
    schoolId: demoSchool.id,
    name: '东教学楼',
    type: 'camera',
    location: '教学区',
  },
  {
    id: 'point-roof-area',
    schoolId: demoSchool.id,
    name: '天台高风险区域',
    type: 'area',
    location: '教学楼顶部',
  },
];

export const campusDemo = {
  productName: '校园协同平台 Demo',
  slogan: '让甲方先看到完整产品形态',
  schoolName: demoSchool.name,
  campusName: demoSchool.campusName,
  studentName: '张小雨',
  className: '七年级二班',
  teacherName: '林老师',
  parentName: '张女士',
  attendanceRate: 98,
  stats: {
    studentsOnCampus: 1286,
    eventsToday: 18,
    pendingItems: 5,
    parentReachRate: 98,
  },
  timeline: demoEvents.slice(0, 4).map((event) => ({
    id: event.id,
    title: event.title,
    level: toDisplayLevel(event.level, event.status),
    time: displayTime(event.createdAt),
    description: event.summary,
  })),
  riskItems: toRiskItems(demoEvents),
  classActivity: [
    '08:00 班级晨检完成，异常 0 项',
    '08:12 收到 1 条家长请假申请',
    '08:25 班级通知已送达 44 位家长',
  ],
  teacherTodos: {
    待处理: [
      {
        id: 'todo-leave-request',
        eventId: 'evt-leave-request',
        title: '审批张小雨请假申请',
        description: '家长已提交 6 月 20 日上午请假说明。',
        time: '2 分钟前',
      },
      {
        id: 'todo-arrival-review',
        eventId: 'evt-gate-alert',
        title: '确认到校异常名单',
        description: '今日 1 名学生尚未完成到校确认。',
        time: '8 分钟前',
      },
    ],
    处理中: [
      {
        id: 'todo-parent-feedback',
        eventId: 'evt-parent-feedback',
        title: '回复家长关于活动安排的留言',
        description: '家长询问周五活动集合时间。',
        time: '12 分钟前',
      },
    ],
    已完成: [
      {
        id: 'todo-notice-delivery',
        eventId: 'evt-notice-delivery',
        title: '发布班级通知',
        description: '家长会通知已全部送达。',
        time: '今天 08:15',
      },
    ],
  },
  roleTemplates: [
    {
      key: '1',
      role: '平台管理员',
      scope: '全校',
      menu: '总览、门禁、巡检、情绪、告警中心、系统配置',
      users: 2,
    },
    {
      key: '2',
      role: '班主任',
      scope: '本班',
      menu: '工作台、我的班级、学生动态、班级通知、待办中心',
      users: 18,
    },
    {
      key: '3',
      role: '家长',
      scope: '本人孩子',
      menu: '首页、孩子、消息、服务、我的',
      users: 300,
    },
  ],
};

export type TeacherTodoTab = keyof typeof campusDemo.teacherTodos;
export type TeacherTodoItem =
  (typeof campusDemo.teacherTodos)[TeacherTodoTab][number];

export function filterEventsByType(type: DemoEvent['type']) {
  return demoEvents.filter((event) => event.type === type);
}

export function filterEventsByOwner(ownerUserId: string) {
  return demoEvents.filter((event) => event.ownerUserId === ownerUserId);
}

function toRiskItems(events: DemoEvent[]) {
  return events.slice(0, 6).map((event, index) => ({
    key: String(index + 1),
    eventId: event.id,
    event: event.title,
    scene: resolveScene(event),
    level: levelLabel(event.level),
    owner: resolveOwner(event.ownerUserId),
    status: statusLabel(event.status),
    time: displayTime(event.updatedAt),
  }));
}

function resolveScene(event: DemoEvent) {
  if (event.classId === 'class-g7-2') {
    return '七年级二班';
  }

  if (event.relatedPointId === 'point-gate-east') return '东门闸机';
  if (event.relatedPointId === 'point-gate-west') return '西门闸机';
  if (event.relatedPointId === 'point-east-building') return '东教学楼';
  if (event.relatedPointId === 'point-roof-area') return '天台高风险区域';

  return '校园平台';
}

function resolveOwner(ownerUserId?: string) {
  const owner = demoUsers.find((user) => user.id === ownerUserId);
  return owner?.name ?? '系统';
}

function levelLabel(level: DemoEvent['level']) {
  if (level === 'high') return '高';
  if (level === 'medium') return '中';
  return '低';
}

function statusLabel(status: DemoEvent['status']) {
  if (status === 'pending') return '待处理';
  if (status === 'processing') return '处理中';
  if (status === 'reviewing') return '待复核';
  if (status === 'closed') return '已关闭';
  return '新建';
}

function toDisplayLevel(level: DemoEvent['level'], status: DemoEvent['status']) {
  if (status === 'processing') return '处理中';
  if (status === 'closed') return '已完成';
  if (status === 'reviewing') return '提醒';
  return levelLabel(level);
}

function displayTime(iso: string) {
  return iso.slice(11, 16);
}
