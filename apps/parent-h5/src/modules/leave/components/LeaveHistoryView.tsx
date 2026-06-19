import { Card, List, Space, Tag } from 'antd-mobile';
import type { ParentLeaveRecord } from '@/demo';

export function LeaveHistoryView({
  records,
}: {
  records: ParentLeaveRecord[];
}) {
  return (
    <Space direction="vertical" block>
      <Card title="请假记录">
        <div className="section-intro">家长提交后的申请会在这里形成记录，并用于向老师端待办和总控端事件做演示映射。</div>
        <List>
          {records.map((item, index) => (
            <List.Item
              key={item.id}
              description={
                <div className="leave-history-desc">
                  <span className="detail-meta-text">{item.reason}</span>
                  <span className="detail-meta-text">{item.teacherReply}</span>
                </div>
              }
              extra={
                <Space wrap>
                  {index === 0 ? <Tag color="primary">最新</Tag> : null}
                  <Tag
                    color={
                      item.status === '已通过'
                        ? 'success'
                        : item.status === '待审批'
                          ? 'warning'
                          : 'default'
                    }
                  >
                    {item.status}
                  </Tag>
                </Space>
              }
            >
              {item.date}
            </List.Item>
          ))}
        </List>
      </Card>
    </Space>
  );
}
