import { DotLoading } from 'antd-mobile';
import { Card, List, Space } from 'antd-mobile';
import { getParentProfileView } from '@/demo';

export function ProfileView() {
  const profileView = getParentProfileView();

  return (
    <Space direction="vertical" block>
      <Card title="家长账号">
        <List>
          <List.Item extra={profileView.parentName}>账号姓名</List.Item>
          <List.Item extra="已绑定 1 名学生">账号状态</List.Item>
        </List>
      </Card>
      <Card title="系统状态">
        <List>
          <List.Item extra={<DotLoading color="primary" />}>消息通道正常</List.Item>
          <List.Item extra={profileView.version}>当前版本</List.Item>
        </List>
      </Card>
    </Space>
  );
}
