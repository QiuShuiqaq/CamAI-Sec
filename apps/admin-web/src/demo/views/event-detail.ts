import type { DemoEvent, EventStatus } from '../entities';
import { demoEvents } from '../events';
import { getTeacherDecision } from '../workflow-state';
import {
  demoClasses,
  demoPoints,
  demoStudents,
  demoUsers,
} from './index';

type StepStatus = 'wait' | 'process' | 'finish';

const eventTypeLabelMap: Record<DemoEvent['type'], string> = {
  access_pass: '门禁通行',
  access_alert: '门禁告警',
  patrol_risk: '巡检风险',
  emotion_alert: '情绪预警',
  parent_leave_request: '家长请假',
  notice_delivery: '通知送达',
  parent_feedback: '家长反馈',
  manual_review: '人工复核',
};

const eventStatusLabelMap: Record<EventStatus, string> = {
  new: '新建',
  pending: '待处理',
  processing: '处理中',
  reviewing: '待复核',
  closed: '已关闭',
};

const eventLevelLabelMap: Record<DemoEvent['level'], string> = {
  low: '低',
  medium: '中',
  high: '高',
};

const eventSourceLabelMap: Record<DemoEvent['source'], string> = {
  'mock-ai': '本地模型事件',
  manual: '人工录入',
  system: '系统事件',
  parent: '家长发起',
};

const statusFlow: EventStatus[] = [
  'new',
  'pending',
  'processing',
  'reviewing',
  'closed',
];

export function getEventDetailView(eventId: string) {
  const event = demoEvents.find((item) => item.id === eventId);
  if (!event) {
    return null;
  }

  const student = demoStudents.find((item) => item.id === event.studentId);
  const classEntity = demoClasses.find((item) => item.id === event.classId);
  const actor = demoUsers.find((item) => item.id === event.actorUserId);
  const owner = demoUsers.find((item) => item.id === event.ownerUserId);
  const point = demoPoints.find((item) => item.id === event.relatedPointId);
  const teacherDecision = getTeacherDecision(event.id);

  return {
    id: event.id,
    title: event.title,
    summary: event.summary,
    typeLabel: eventTypeLabelMap[event.type],
    levelLabel: eventLevelLabelMap[event.level],
    statusLabel: eventStatusLabelMap[event.status],
    status: event.status,
    sourceLabel: eventSourceLabelMap[event.source],
    scene: classEntity?.name ?? point?.name ?? '校园平台',
    createdAt: formatDateTime(event.createdAt),
    updatedAt: formatDateTime(event.updatedAt),
    relatedRoles: [
      { label: '学生', value: student?.name ?? '未关联' },
      { label: '班级', value: classEntity?.name ?? '未关联' },
      { label: '发起人', value: actor?.name ?? '系统' },
      { label: '负责人', value: owner?.name ?? '系统' },
      { label: '点位', value: point?.name ?? '未关联' },
    ],
    steps: statusFlow.map((status, index) => ({
      title: eventStatusLabelMap[status],
      description: getStepDescription(event, status),
      status: toStepStatus(event.status, index),
    })),
    recommendations: getRecommendations(event),
    collaboration: getCollaborationNotes(event),
    teacherAction: getTeacherAction(event),
    teacherDecision,
    relatedEvents: getRelatedEvents(event),
    dispositionLogs: getDispositionLogs(event, teacherDecision),
  };
}

function toStepStatus(currentStatus: EventStatus, index: number): StepStatus {
  const currentIndex = statusFlow.indexOf(currentStatus);

  if (index < currentIndex) {
    return 'finish';
  }

  if (index === currentIndex) {
    return 'process';
  }

  return 'wait';
}

function getStepDescription(event: DemoEvent, status: EventStatus) {
  if (status === 'new') return '事件已入库，等待分发。';
  if (status === 'pending') return '已进入待处理队列，等待责任人接手。';
  if (status === 'processing') return `当前由${resolveOwnerName(event.ownerUserId)}处理中。`;
  if (status === 'reviewing') return '已进入人工复核阶段，等待结果确认。';
  return '事件闭环完成，保留全链路留痕。';
}

function getRecommendations(event: DemoEvent) {
  if (event.type === 'parent_leave_request') {
    return [
      '班主任确认请假时间与原因说明。',
      '家长端同步审批状态，避免重复咨询。',
      '总控端保留请假与到校状态联动记录。',
    ];
  }

  if (event.type === 'access_alert') {
    return [
      '安保确认陌生人来源与停留位置。',
      '必要时联动门禁点位和巡检记录复核。',
      '确认后更新事件状态并形成处置留痕。',
    ];
  }

  if (event.type === 'emotion_alert' || event.type === 'manual_review') {
    return [
      '心理老师先完成人工复核，不直接输出个人标签。',
      '如需跟进，仅对授权角色开放后续处置记录。',
      '闭环后同步总控侧状态，保留风险演化轨迹。',
    ];
  }

  return [
    '确认事件真实性与影响范围。',
    '根据角色权限分发到对应责任人。',
    '在处理完成后更新事件状态并归档。',
  ];
}

function getCollaborationNotes(event: DemoEvent) {
  if (event.type === 'parent_leave_request') {
    return [
      '家长端发起请假申请。',
      '老师端进入待办审批。',
      '总控端可查看事件轨迹和处理状态。',
    ];
  }

  if (event.type === 'parent_feedback') {
    return [
      '家长端提交反馈问题。',
      '老师端接收并回复。',
      '必要时同步总控端形成服务留痕。',
    ];
  }

  return [
    '总控端统一汇聚风险事件。',
    '根据事件类型分发给安保、班主任或心理老师。',
    '闭环结果回写到平台视图中。',
  ];
}

function getTeacherAction(event: DemoEvent) {
  if (event.type === 'parent_leave_request') {
    return {
      title: '请假审批动作',
      options: [
        { label: '同意请假', value: 'approve' },
        { label: '补充说明', value: 'request-more' },
        { label: '暂缓处理', value: 'hold' },
      ],
      placeholder: '记录老师审批意见，后续可同步给家长和总控端。',
      defaultNote: '已查看家长说明，建议按半天请假处理。',
      helperText: '这类事件重点演示“家长提交 -> 老师审批 -> 总控留痕”的闭环。',
    };
  }

  if (event.type === 'parent_feedback') {
    return {
      title: '家长反馈处理',
      options: [
        { label: '直接回复', value: 'reply' },
        { label: '转班级通知', value: 'broadcast' },
        { label: '上报总控', value: 'escalate' },
      ],
      placeholder: '记录老师回复口径或后续处理方案。',
      defaultNote: '统一在班级通知中补充周五活动集合时间。',
      helperText: '这类事件重点演示家校沟通问题如何在老师端沉淀处理记录。',
    };
  }

  if (event.type === 'access_alert') {
    return {
      title: '异常到校确认',
      options: [
        { label: '联系安保确认', value: 'verify-security' },
        { label: '联系家长确认', value: 'verify-parent' },
        { label: '升级处理', value: 'escalate' },
      ],
      placeholder: '记录本班相关的协同处理意见。',
      defaultNote: '先核对闸机异常名单，再联系安保确认具体人员信息。',
      helperText: '这类事件重点演示老师和总控对同一异常的协同视角。',
    };
  }

  return {
    title: '处置建议',
    options: [
      { label: '继续跟进', value: 'follow-up' },
      { label: '记录备注', value: 'note' },
      { label: '转交他人', value: 'transfer' },
    ],
    placeholder: '记录当前处理意见。',
    defaultNote: '已查看事件详情，待继续跟进。',
    helperText: '当前为 Demo 处理动作区，仅演示流程入口。',
  };
}

function getRelatedEvents(event: DemoEvent) {
  return demoEvents
    .filter((item) => item.id !== event.id)
    .filter(
      (item) =>
        (event.studentId && item.studentId === event.studentId) ||
        (event.classId && item.classId === event.classId) ||
        (event.ownerUserId && item.ownerUserId === event.ownerUserId),
    )
    .slice(0, 3)
    .map((item) => ({
      id: item.id,
      title: item.title,
      statusLabel: eventStatusLabelMap[item.status],
      typeLabel: eventTypeLabelMap[item.type],
    }));
}

function getDispositionLogs(
  event: DemoEvent,
  teacherDecision: ReturnType<typeof getTeacherDecision>,
) {
  const logs = [
    {
      time: formatDateTime(event.createdAt),
      actor: event.actorUserId ? resolveUserName(event.actorUserId) : '系统',
      action: '事件产生',
      detail: event.summary,
    },
  ];

  if (event.ownerUserId) {
    logs.push({
      time: formatDateTime(event.updatedAt),
      actor: resolveUserName(event.ownerUserId),
      action: event.status === 'closed' ? '完成闭环' : '接收处理',
      detail: getDispositionDetail(event),
    });
  }

  if (event.status === 'reviewing') {
    logs.push({
      time: formatDateTime(event.updatedAt),
      actor: '平台复核流',
      action: '进入复核',
      detail: '当前事件进入人工复核阶段，待进一步确认结果。',
    });
  }

  if (teacherDecision) {
    logs.push({
      time: teacherDecision.time,
      actor: '老师端处置',
      action: teacherDecision.actionLabel,
      detail: teacherDecision.note || '已提交处理结果。',
    });
  }

  return logs;
}

function getDispositionDetail(event: DemoEvent) {
  if (event.type === 'parent_leave_request') {
    return '老师端已收到请假申请，等待审批结果同步。';
  }

  if (event.type === 'access_alert') {
    return '告警已分发至安保/老师协同视图，等待确认异常来源。';
  }

  if (event.type === 'parent_feedback') {
    return '反馈已进入老师待办，准备统一回复或转通知。';
  }

  return '事件已进入当前责任人的处置流程。';
}

function resolveOwnerName(ownerUserId?: string) {
  const owner = demoUsers.find((item) => item.id === ownerUserId);
  return owner?.name ?? '系统';
}

function resolveUserName(userId: string) {
  const user = demoUsers.find((item) => item.id === userId);
  return user?.name ?? '系统';
}

function formatDateTime(iso: string) {
  return iso.slice(0, 16).replace('T', ' ');
}
