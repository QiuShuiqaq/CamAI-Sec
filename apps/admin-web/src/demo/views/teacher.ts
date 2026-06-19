import { campusDemo, demoStudents } from './index';
import { getTeacherDecision } from '../workflow-state';

export function getTeacherWorkbenchView() {
  const pendingTodos = campusDemo.teacherTodos.待处理.map((item) => ({
    ...item,
    processed: item.eventId ? Boolean(getTeacherDecision(item.eventId)) : false,
    decisionLabel: item.eventId ? getTeacherDecision(item.eventId)?.actionLabel : undefined,
  }));

  return {
    classStats: {
      totalStudents: 48,
      arrivedStudents: 46,
      pendingTodos: pendingTodos.filter((item) => !item.processed).length,
    },
    classActivity: campusDemo.classActivity,
    pendingTodos,
  };
}

export function getTeacherTodosView() {
  return campusDemo.teacherTodos;
}

export function getTeacherClassView() {
  return {
    className: campusDemo.className,
    rows: [
      {
        key: '1',
        name: '张小雨',
        status: '已到校',
        parent: '张女士',
        note: '请假申请待确认',
      },
      {
        key: '2',
        name: '李哲远',
        status: '已到校',
        parent: '李先生',
        note: '正常',
      },
      {
        key: '3',
        name: '王思琪',
        status: '待确认',
        parent: '王女士',
        note: '尚未完成到校确认',
      },
    ],
  };
}

export function getTeacherStudentDynamicsView() {
  return demoStudents.map((student, index) => ({
    key: student.id,
    name: student.name,
    arrivalStatus: index === 2 ? '待确认' : '已到校',
    latestEvent: index === 0 ? '请假申请处理中' : '今日状态正常',
  }));
}

export function getTeacherNoticesView() {
  return [
    {
      title: '家长会通知已送达 44 位家长',
      status: '已送达',
      time: '08:25',
    },
    {
      title: '周五活动安排待补充说明',
      status: '待补充',
      time: '08:30',
    },
  ];
}
