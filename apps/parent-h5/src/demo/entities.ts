export type ParentMessage = {
  id: string;
  title: string;
  description: string;
  badge?: number;
};

export type ParentNotice = {
  title: string;
  time: string;
};

export type WeeklyStatus = {
  label: string;
  status: '正常' | '待确认';
};

export type PendingItem = {
  title: string;
  extra: string;
};

export type ParentMessageDetail = {
  id: string;
  title: string;
  description: string;
  time: string;
  source: string;
  summary: string;
  actions: string[];
};

export type ParentLeaveRecord = {
  id: string;
  date: string;
  reason: string;
  status: '待审批' | '已通过' | '已归档';
  teacherReply: string;
};

export type ParentFeedbackRecord = {
  id: string;
  category: string;
  content: string;
  status: '待回复' | '已记录';
  time: string;
};
