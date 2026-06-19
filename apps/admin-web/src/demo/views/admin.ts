import type { DemoEvent } from '../entities';
import { demoEvents } from '../events';
import { getTeacherDecision } from '../workflow-state';
import { campusDemo, demoSchool } from './index';

type AccessRecordStatus = '正常通行' | '异常待确认' | '异常事件';

export function getOverviewView() {
  return {
    schoolName: demoSchool.name,
    campusName: demoSchool.campusName,
    storyTitle: '校园协同平台总控视图',
    storySummary:
      '当前以“张小雨请假申请”这条事件主线串联总控端、老师端和家长端，用于向甲方直观展示角色分层、消息触达和处置闭环。',
    timeline: campusDemo.timeline,
    stats: campusDemo.stats,
    focusStudentName: campusDemo.studentName,
    focusClassName: campusDemo.className,
    teacherName: campusDemo.teacherName,
    parentName: campusDemo.parentName,
    parentReachRate: campusDemo.attendanceRate,
  };
}

export function getAlertCenterView() {
  const alertEvents = demoEvents.filter((event) =>
    ['access_alert', 'patrol_risk', 'emotion_alert', 'manual_review'].includes(
      event.type,
    ),
  );

  const rows = campusDemo.riskItems.map((item) => {
    const teacherDecision = item.eventId ? getTeacherDecision(item.eventId) : null;

    if (!teacherDecision) {
      return item;
    }

    return {
      ...item,
      owner: '老师端已处理',
      status: `已处理 · ${teacherDecision.actionLabel}`,
      time: teacherDecision.time.slice(11, 16),
    };
  });

  return {
    rows,
    summary: {
      total: alertEvents.length,
      highRisk: alertEvents.filter((event) => event.level === 'high').length,
      processing: rows.filter((item) => !String(item.status).startsWith('已处理')).length,
      processedByTeacher: rows.filter((item) => String(item.status).startsWith('已处理'))
        .length,
    },
  };
}

export function getAlertOpsOverviewView() {
  const alertCenter = getAlertCenterView();
  const teacherProcessedRows = alertCenter.rows.filter((item) =>
    String(item.status).startsWith('已处理'),
  );

  return {
    summary: [
      { title: '总告警数', value: alertCenter.summary.total },
      { title: '平台处理中', value: alertCenter.summary.processing },
      { title: '老师已回写', value: alertCenter.summary.processedByTeacher },
      {
        title: '高风险占比',
        value: `${Math.round((alertCenter.summary.highRisk / Math.max(alertCenter.summary.total, 1)) * 100)}%`,
      },
    ],
    highlights: [
      '总控端统一查看告警收敛情况，适合甲方快速理解平台中枢能力。',
      '老师端处理结果会回写到总控侧摘要和处置日志中。',
      '后续接真实后端时，这里可以直接替换成实时处置看板。',
    ],
    teacherProcessedRows: teacherProcessedRows.slice(0, 4),
    pendingRows: alertCenter.rows
      .filter((item) => !String(item.status).startsWith('已处理'))
      .slice(0, 4),
  };
}

export function getAccessControlView() {
  return demoEvents
    .filter((event) => event.type === 'access_pass' || event.type === 'access_alert')
    .map((event, index) => ({
      key: String(index + 1),
      name: event.studentId === 'student-zhangxiaoyu' ? '张小雨' : '未登记人员',
      event: event.title,
      status: resolveAccessStatus(event),
      point: resolvePointName(event.relatedPointId),
      time: event.createdAt.slice(11, 16),
    }));
}

export function getPatrolView() {
  return demoEvents
    .filter((event) => event.type === 'patrol_risk')
    .map((event) => ({
      id: event.id,
      title: event.title,
      summary: event.summary,
      time: event.createdAt.slice(11, 16),
      tag:
        event.level === 'high'
          ? { label: '高风险', color: 'error' as const }
          : { label: '巡检正常', color: 'processing' as const },
    }));
}

export function getEmotionView() {
  return {
    trendCards: [
      { label: '七年级二班', percent: 68, color: '#1677ff' },
      { label: '八年级一班', percent: 83, color: '#52c41a' },
      { label: '九年级三班', percent: 74, color: '#faad14' },
    ],
    reviewItems: demoEvents
      .filter((event) => event.type === 'emotion_alert')
      .map((event) => ({
        id: event.id,
        title: event.title,
        summary: event.summary,
      })),
  };
}

export function getSystemRolesView() {
  return {
    stats: {
      roleTemplates: campusDemo.roleTemplates.length,
      organizationLevels: 4,
      onboardingItems: 12,
    },
    roleTemplates: campusDemo.roleTemplates,
    rolloutItems: [
      '学校基础信息改配置，不改代码',
      '角色权限按模板导入，适配学校 B 只需改组织架构',
      '前端壳体已为后续视觉识别、消息中心和设备接入预留入口',
    ],
  };
}

function resolveAccessStatus(event: DemoEvent): AccessRecordStatus {
  if (event.type === 'access_pass') {
    return '正常通行';
  }

  return event.status === 'pending' ? '异常待确认' : '异常事件';
}

function resolvePointName(pointId?: string) {
  if (pointId === 'point-gate-east') return '东门闸机';
  if (pointId === 'point-gate-west') return '西门闸机';
  return '校门点位';
}
