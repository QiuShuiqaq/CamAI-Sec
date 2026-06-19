import { PageContainer, ProCard } from '@ant-design/pro-components';
import { List, Space, Tag, Typography } from 'antd';
import { filterEventsByType } from '@/demo';

const PatrolEventsPage = () => {
  const items = filterEventsByType('patrol_risk');

  return (
    <PageContainer
      header={{
        title: '校园巡检',
        subTitle: '以重点区域巡检事件为中心展示校园安全巡检能力',
      }}
    >
      <ProCard title="巡检事件">
        <List
          dataSource={items}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Space>
                    <Typography.Text strong>{item.title}</Typography.Text>
                    <Tag color={item.level === 'high' ? 'error' : 'processing'}>
                      {item.level === 'high' ? '高风险' : '巡检正常'}
                    </Tag>
                  </Space>
                }
                description={`${item.createdAt.slice(11, 16)} · ${item.summary}`}
              />
            </List.Item>
          )}
        />
      </ProCard>
    </PageContainer>
  );
};

export default PatrolEventsPage;
