import { Card, List, Space, Tag } from 'antd-mobile';
import { getParentMessageDetailView, type ParentLeaveRecord } from '@/demo';

export function MessageDetailView({
  messageId,
  latestLeaveRecord,
}: {
  messageId: string;
  latestLeaveRecord?: ParentLeaveRecord;
}) {
  const detail = getParentMessageDetailView(messageId, latestLeaveRecord);

  if (!detail) {
    return (
      <Card title="消息详情">
        <div>未找到对应消息。</div>
      </Card>
    );
  }

  return (
    <Space direction="vertical" block>
      <Card title={detail.title}>
        <div className="detail-meta">
          <Tag color="primary">{detail.source}</Tag>
          <span className="detail-meta-text">{detail.time}</span>
        </div>
        <div className="detail-highlight">
          <span className="detail-highlight-label">当前作用</span>
          <strong>用于向家长侧解释当前流程进度和下一步动作</strong>
        </div>
        <p className="detail-summary">{detail.summary}</p>
      </Card>
      <Card title="建议动作">
        <List>
          {detail.actions.map((item) => (
            <List.Item key={item}>{item}</List.Item>
          ))}
        </List>
      </Card>
    </Space>
  );
}
