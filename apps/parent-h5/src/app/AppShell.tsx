import { useMemo, useState } from 'react';
import { SafeArea, TabBar } from 'antd-mobile';
import { LeftOutline } from 'antd-mobile-icons';
import {
  getParentFeedbackHistoryView,
  getParentLeaveHistoryView,
  parentDemo,
  type ParentFeedbackRecord,
  type ParentLeaveRecord,
} from '@/demo';
import { FeedbackCenterView } from '@/modules/feedback/components/FeedbackCenterView';
import { ChildStatusView } from '@/modules/child-status/components/ChildStatusView';
import { HomeView } from '@/modules/home/components/HomeView';
import { LeaveHistoryView } from '@/modules/leave/components/LeaveHistoryView';
import { LeaveRequestPopup } from '@/modules/leave/components/LeaveRequestPopup';
import { MessageDetailView } from '@/modules/messages/components/MessageDetailView';
import { MessagesView } from '@/modules/messages/components/MessagesView';
import { ProfileView } from '@/modules/profile/components/ProfileView';
import { ServicesView } from '@/modules/services/components/ServicesView';
import { parentTabs } from '@/app/navigation/tabs';
import type {
  ParentDetailView,
  ParentFeedbackSubmission,
  ParentOverlayKey,
  ParentTabKey,
} from '@/shared/types/navigation';

export default function AppShell() {
  const [activeKey, setActiveKey] = useState<ParentTabKey>('home');
  const [overlay, setOverlay] = useState<ParentOverlayKey>(null);
  const [detailView, setDetailView] = useState<ParentDetailView>(null);
  const [leaveRecords, setLeaveRecords] = useState<ParentLeaveRecord[]>(
    getParentLeaveHistoryView(),
  );
  const [feedbackRecords, setFeedbackRecords] = useState<ParentFeedbackRecord[]>(
    getParentFeedbackHistoryView(),
  );
  const latestLeaveRecord = leaveRecords[0];

  const content = useMemo(() => {
    if (detailView?.type === 'message-detail') {
      return (
        <MessageDetailView
          messageId={detailView.id}
          latestLeaveRecord={latestLeaveRecord}
        />
      );
    }

    if (detailView?.type === 'leave-history') {
      return <LeaveHistoryView records={leaveRecords} />;
    }

    if (detailView?.type === 'feedback-center') {
      return (
        <FeedbackCenterView
          records={feedbackRecords}
          onSubmit={(payload: ParentFeedbackSubmission) => {
            const nextRecord: ParentFeedbackRecord = {
              id: `feedback-${Date.now()}`,
              category: payload.category,
              content: payload.content,
              status: '待回复',
              time: new Date().toLocaleString('zh-CN', { hour12: false }),
            };
            setFeedbackRecords((current) => [nextRecord, ...current]);
          }}
        />
      );
    }

    switch (activeKey) {
      case 'child-status':
        return <ChildStatusView />;
      case 'messages':
        return (
          <MessagesView
            latestLeaveRecord={latestLeaveRecord}
            onOpenDetail={(messageId) => setDetailView({ type: 'message-detail', id: messageId })}
          />
        );
      case 'services':
        return (
          <ServicesView
            onOpenLeave={() => {
              setOverlay('leave-request');
            }}
            onOpenLeaveHistory={() => {
              setDetailView({ type: 'leave-history' });
            }}
            onOpenFeedback={() => {
              setDetailView({ type: 'feedback-center' });
            }}
          />
        );
      case 'profile':
        return <ProfileView />;
      case 'home':
      default:
        return <HomeView latestLeaveRecord={latestLeaveRecord} />;
    }
  }, [activeKey, detailView, feedbackRecords, latestLeaveRecord, leaveRecords]);

  const headerTitle =
    detailView?.type === 'message-detail'
      ? '消息详情'
      : detailView?.type === 'leave-history'
        ? '请假记录'
        : detailView?.type === 'feedback-center'
          ? '反馈建议'
        : '家长端';

  const headerSubtitle =
    detailView?.type === null || detailView === null ? parentDemo.schoolName : '校园协同平台 Demo';

  return (
    <div className="mobile-shell">
      <header className="mobile-header">
        <div className="mobile-header-row">
          {detailView ? (
            <button
              className="mobile-back"
              type="button"
              onClick={() => setDetailView(null)}
            >
              <LeftOutline /> 返回
            </button>
          ) : null}
          <span className="mobile-title">{headerTitle}</span>
        </div>
        <span className="mobile-subtitle">{headerSubtitle}</span>
      </header>
      <main className="mobile-content">{content}</main>
      {detailView ? null : (
        <TabBar activeKey={activeKey} onChange={(value) => setActiveKey(value as ParentTabKey)}>
          {parentTabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      )}
      <SafeArea position="bottom" />
      <LeaveRequestPopup
        visible={overlay === 'leave-request'}
        onClose={() => setOverlay(null)}
        onSubmit={(payload) => {
          const record: ParentLeaveRecord = {
            id: `leave-${Date.now()}`,
            date: `${payload.date} 提交`,
            reason: payload.remark
              ? `${payload.reason}；补充：${payload.remark}`
              : payload.reason,
            status: '待审批',
            teacherReply: '班主任待确认中',
          };
          setLeaveRecords((current) => [record, ...current]);
          setDetailView({ type: 'leave-history' });
        }}
      />
    </div>
  );
}
