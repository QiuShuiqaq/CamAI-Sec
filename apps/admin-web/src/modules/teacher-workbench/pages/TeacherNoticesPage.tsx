import { PageContainer, ProCard } from '@ant-design/pro-components';
import { List, Space, Tag, Typography } from 'antd';

const notices = [
  {
    title: '家长会通知已送达 44 位家长',
    status: '已送达',
    time: '08:25',
  },
  {
    title: '周五活动安排待补充说明',
    status: '待补充',
    time: '08:30',
  },
];

const TeacherNoticesPage = () => {
  return (
    <PageContainer
      header={{
        title: '班级通知',
        subTitle: '展示班级通知发布与家长触达情况',
      }}
    >
      <ProCard>
        <List
          dataSource={notices}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Space>
                    <Typography.Text strong>{item.title}</Typography.Text>
                    <Tag>{item.status}</Tag>
                  </Space>
                }
                description={item.time}
              />
            </List.Item>
          )}
        />
      </ProCard>
    </PageContainer>
  );
};

export default TeacherNoticesPage;
