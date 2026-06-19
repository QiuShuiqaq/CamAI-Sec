import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Col, Progress, Row, Space, Tag, Typography } from 'antd';
import { filterEventsByType } from '@/demo';

const EmotionTrendsPage = () => {
  const reviews = filterEventsByType('emotion_alert');

  return (
    <PageContainer
      header={{
        title: '情绪研判',
        subTitle: '仅展示群体趋势和人工复核入口，不生成个人情绪标签',
      }}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={12}>
          <ProCard title="群体情绪趋势">
            <Typography.Paragraph type="secondary">
              当前以七年级二班为例，展示群体状态趋势和人工复核入口。
            </Typography.Paragraph>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Typography.Text>七年级二班</Typography.Text>
                <Progress percent={68} strokeColor="#1677ff" />
              </div>
              <div>
                <Typography.Text>八年级一班</Typography.Text>
                <Progress percent={83} strokeColor="#52c41a" />
              </div>
              <div>
                <Typography.Text>九年级三班</Typography.Text>
                <Progress percent={74} strokeColor="#faad14" />
              </div>
            </Space>
          </ProCard>
        </Col>
        <Col xs={24} xl={12}>
          <ProCard title="人工复核事项">
            {reviews.map((item) => (
              <div key={item.id} style={{ marginBottom: 16 }}>
                <Space>
                  <Typography.Text strong>{item.title}</Typography.Text>
                  <Tag color="warning">待复核</Tag>
                </Space>
                <Typography.Paragraph type="secondary" style={{ marginTop: 8 }}>
                  {item.summary}
                </Typography.Paragraph>
              </div>
            ))}
          </ProCard>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default EmotionTrendsPage;
