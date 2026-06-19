import { Card, List, Space, Tag } from 'antd-mobile';
import { getParentChildView } from '@/demo';

export function ChildStatusView() {
  const childView = getParentChildView();

  return (
    <Space direction="vertical" block>
      <Card title="孩子信息">
        <List>
          <List.Item extra={childView.studentName}>姓名</List.Item>
          <List.Item extra={childView.className}>班级</List.Item>
          <List.Item extra={childView.teacherName}>班主任</List.Item>
        </List>
      </Card>
      <Card title="本周动态">
        <List>
          {childView.weeklyStatus.map((item) => (
            <List.Item
              key={item.label}
              extra={
                <Tag color={item.status === '正常' ? 'success' : 'warning'}>
                  {item.status}
                </Tag>
              }
            >
              {item.label}
            </List.Item>
          ))}
        </List>
      </Card>
    </Space>
  );
}
