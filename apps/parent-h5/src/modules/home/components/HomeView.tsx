import { Card, List, NoticeBar, Space } from 'antd-mobile';
import { getParentHomeView, type ParentLeaveRecord } from '@/demo';

export function HomeView({
  latestLeaveRecord,
}: {
  latestLeaveRecord?: ParentLeaveRecord;
}) {
  const homeView = getParentHomeView(latestLeaveRecord);

  return (
    <Space direction="vertical" block>
      <NoticeBar content="今日校内通知已更新，家长端 Demo 当前使用模拟数据展示。" />
      <Card title="当前流程状态">
        <div className="status-story">
          <div className="status-story-line">
            <span className="hero-label">主线事件</span>
            <strong>请假申请协同闭环</strong>
          </div>
          <div className="status-story-line">
            <span className="hero-label">当前状态</span>
            <span
              className={`status-pill ${
                latestLeaveRecord?.status === '已通过'
                  ? 'status-pill-success'
                  : latestLeaveRecord?.status === '待审批'
                    ? 'status-pill-warning'
                    : 'status-pill-default'
              }`}
            >
              {latestLeaveRecord?.status ?? '待审批'}
            </span>
          </div>
          <div className="status-story-note">
            当前用于演示“家长提交 {'->'} 老师审批 {'->'} 总控留痕”的三端联动。
          </div>
        </div>
      </Card>
      <Card title={`${homeView.studentName} · ${homeView.className}`}>
        <div className="hero-grid">
          <div className="hero-item">
            <span className="hero-label">今日状态</span>
            <strong>已到校</strong>
          </div>
          <div className="hero-item">
            <span className="hero-label">班主任</span>
            <strong>{homeView.teacherName}</strong>
          </div>
          <div className="hero-item">
            <span className="hero-label">最近动态</span>
            <strong>{homeView.recentUpdate}</strong>
          </div>
        </div>
      </Card>
      <Card title="学校通知">
        <List>
          {homeView.notices.map((item) => (
            <List.Item key={item.title} extra={item.time}>
              {item.title}
            </List.Item>
          ))}
        </List>
      </Card>
    </Space>
  );
}
