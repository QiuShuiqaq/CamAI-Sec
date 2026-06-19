import { Badge, Button, Card, List, Space, Toast } from 'antd-mobile';
import { getParentServicesView } from '@/demo';

export function ServicesView({
  onOpenLeave,
  onOpenLeaveHistory,
  onOpenFeedback,
}: {
  onOpenLeave: () => void;
  onOpenLeaveHistory: () => void;
  onOpenFeedback: () => void;
}) {
  const pending = getParentServicesView();

  return (
    <Space direction="vertical" block>
      <Card title="常用服务">
        <div className="action-grid">
          <Button color="primary" fill="solid" onClick={onOpenLeave}>
            请假申请
          </Button>
          <Button fill="outline" onClick={onOpenLeaveHistory}>
            请假记录
          </Button>
          <Button
            fill="outline"
            onClick={() => {
              Toast.show('已打开联系老师入口');
            }}
          >
            联系老师
          </Button>
          <Button
            fill="outline"
            onClick={onOpenFeedback}
          >
            反馈建议
          </Button>
        </div>
      </Card>
      <Card title="当前待处理">
        <List>
          {pending.map((item) => (
            <List.Item
              key={item.title}
              extra={item.extra === '1' ? <Badge content={item.extra} /> : item.extra}
            >
              {item.title}
            </List.Item>
          ))}
        </List>
      </Card>
    </Space>
  );
}
