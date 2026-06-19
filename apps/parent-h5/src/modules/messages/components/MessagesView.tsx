import { Badge, Card, List, Space } from 'antd-mobile';
import { getParentMessagesView, type ParentLeaveRecord } from '@/demo';

export function MessagesView({
  onOpenDetail,
  latestLeaveRecord,
}: {
  onOpenDetail: (messageId: string) => void;
  latestLeaveRecord?: ParentLeaveRecord;
}) {
  const messages = getParentMessagesView(latestLeaveRecord);

  return (
    <Space direction="vertical" block>
      <Card title="消息中心">
        <List>
          {messages.map((item) => (
            <List.Item
              key={item.id}
              prefix={item.badge ? <Badge content={item.badge} /> : undefined}
              description={item.description}
              onClick={() => onOpenDetail(item.id)}
              >
              {item.title}
            </List.Item>
          ))}
        </List>
      </Card>
    </Space>
  );
}
