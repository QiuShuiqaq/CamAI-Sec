import type {
  ParentFeedbackRecord,
  ParentLeaveRecord,
  ParentMessage,
  ParentMessageDetail,
  ParentNotice,
  PendingItem,
  WeeklyStatus,
} from './entities';

export const parentDemo = {
  productName: '校园协同平台 Demo',
  schoolName: '湖州第一实验学校',
  studentName: '张小雨',
  className: '七年级二班',
  teacherName: '林老师',
  parentName: '张女士',
  notices: [
    { title: '本周家长会安排已发布', time: '刚刚' },
    { title: '今日班级通知送达成功', time: '08:30' },
  ] satisfies ParentNotice[],
  weeklyStatus: [
    { label: '周一 08:05 到校', status: '正常' },
    { label: '周二 请假申请中', status: '待确认' },
    { label: '周三 08:12 到校', status: '正常' },
  ] satisfies WeeklyStatus[],
  messages: [
    {
      id: 'msg-parent-meeting',
      title: '家长会通知已发布',
      description: '七年级二班 · 刚刚',
      badge: 1,
    },
    {
      id: 'msg-leave-received',
      title: '请假申请已收到，待老师审批',
      description: '林老师 · 08:20',
    },
    {
      id: 'msg-campus-notice',
      title: '本周校园公告已同步更新',
      description: '系统消息 · 昨天',
    },
  ] satisfies ParentMessage[],
  messageDetails: [
    {
      id: 'msg-parent-meeting',
      title: '家长会通知已发布',
      description: '七年级二班 · 刚刚',
      time: '2026-06-19 08:45',
      source: '班级通知',
      summary:
        '本周家长会安排已经发布，当前用于演示“老师发布通知 -> 家长接收阅读”的链路。',
      actions: ['查看通知附件', '联系班主任确认参会安排', '同步到家庭日程'],
    },
    {
      id: 'msg-leave-received',
      title: '请假申请已收到，待老师审批',
      description: '林老师 · 08:20',
      time: '2026-06-19 08:20',
      source: '请假流程',
      summary:
        '家长提交的请假说明已经进入老师待办，当前用于演示“家长发起 -> 老师审批 -> 总控留痕”的闭环。',
      actions: ['补充请假说明', '查看老师处理进度', '等待审批结果通知'],
    },
    {
      id: 'msg-campus-notice',
      title: '本周校园公告已同步更新',
      description: '系统消息 · 昨天',
      time: '2026-06-18 17:30',
      source: '系统公告',
      summary:
        '系统消息用于演示平台级公告下发，不涉及老师个人处理动作。',
      actions: ['查看公告详情', '确认已读', '返回消息列表'],
    },
  ] satisfies ParentMessageDetail[],
  leaveHistory: [
    {
      id: 'leave-20260620-am',
      date: '2026-06-20 上午',
      reason: '身体不适，申请上午请假半天',
      status: '待审批',
      teacherReply: '班主任待确认中',
    },
    {
      id: 'leave-20260612-pm',
      date: '2026-06-12 下午',
      reason: '参加区级比赛，已提前报备',
      status: '已通过',
      teacherReply: '林老师已同意并同步班级考勤',
    },
    {
      id: 'leave-20260530-am',
      date: '2026-05-30 上午',
      reason: '医院复诊',
      status: '已归档',
      teacherReply: '流程已完成归档',
    },
  ] satisfies ParentLeaveRecord[],
  feedbackHistory: [
    {
      id: 'feedback-001',
      category: '活动安排',
      content: '建议在家长端统一展示周五活动集合时间和地点。',
      status: '待回复',
      time: '2026-06-19 08:27',
    },
    {
      id: 'feedback-002',
      category: '通知体验',
      content: '希望班级通知可以区分紧急和普通消息。',
      status: '已记录',
      time: '2026-06-18 19:10',
    },
  ] satisfies ParentFeedbackRecord[],
  pending: [
    { title: '请假申请待老师审批', extra: '1' },
    { title: '班级通知阅读状态', extra: '已送达' },
  ] satisfies PendingItem[],
};

export function getParentHomeView(latestLeaveRecord?: ParentLeaveRecord) {
  return {
    schoolName: parentDemo.schoolName,
    studentName: parentDemo.studentName,
    className: parentDemo.className,
    teacherName: parentDemo.teacherName,
    notices: parentDemo.notices,
    recentUpdate: latestLeaveRecord
      ? `${latestLeaveRecord.date} 已提交请假申请`
      : '08:12 提交请假说明',
  };
}

export function getParentChildView() {
  return {
    studentName: parentDemo.studentName,
    className: parentDemo.className,
    teacherName: parentDemo.teacherName,
    weeklyStatus: parentDemo.weeklyStatus,
  };
}

export function getParentMessagesView(latestLeaveRecord?: ParentLeaveRecord) {
  return parentDemo.messages.map((item) => {
    if (item.id !== 'msg-leave-received' || !latestLeaveRecord) {
      return item;
    }

    return {
      ...item,
      description: `请假流程 · ${latestLeaveRecord.status}`,
    };
  });
}

export function getParentMessageDetailView(
  messageId: string,
  latestLeaveRecord?: ParentLeaveRecord,
) {
  const detail = parentDemo.messageDetails.find((item) => item.id === messageId) ?? null;
  if (!detail || detail.id !== 'msg-leave-received' || !latestLeaveRecord) {
    return detail;
  }

  return {
    ...detail,
    description: `请假流程 · ${latestLeaveRecord.status}`,
    summary: `最新请假记录为“${latestLeaveRecord.date}”，原因：${latestLeaveRecord.reason}。当前状态为${latestLeaveRecord.status}，等待老师侧进一步处理。`,
  };
}

export function getParentServicesView() {
  return parentDemo.pending;
}

export function getParentLeaveHistoryView() {
  return parentDemo.leaveHistory;
}

export function getParentFeedbackHistoryView() {
  return parentDemo.feedbackHistory;
}

export function getParentProfileView() {
  return {
    parentName: parentDemo.parentName,
    schoolName: parentDemo.schoolName,
    version: 'Demo v1',
  };
}
