import { PageContainer, ProCard, StatisticCard } from '@ant-design/pro-components';
import { Link } from '@umijs/max';
import { Col, List, Row, Space, Tag, Typography } from 'antd';
import { getAlertOpsOverviewView } from '@/demo';

const AlertOpsOverviewPage = () => {
  const overview = getAlertOpsOverviewView();

  return (
    <PageContainer
      header={{
        title: '处置总览',
        subTitle: '用于汇报整体告警消化情况、老师回写情况和平台处置闭环',
      }}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <ProCard
            split="vertical"
            style={{
              background:
                'linear-gradient(135deg, rgba(22,119,255,0.10) 0%, rgba(255,255,255,1) 70%)',
            }}
          >
            <ProCard colSpan="60%" title="当前演示主线">
              <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 8 }}>
                家长发起 {'->'} 老师处理 {'->'} 总控回看
              </Typography.Title>
              <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                这一页不强调单条事件明细，而是用于给甲方快速看到平台作为“处置中枢”的价值：
                哪些事件仍在平台侧跟进，哪些已经获得老师端回写，闭环是否形成。
              </Typography.Paragraph>
            </ProCard>
            <ProCard colSpan="40%" title="状态图例">
              <Space wrap>
                <Tag color="warning">平台处理中</Tag>
                <Tag color="success">老师已回写</Tag>
                <Tag color="error">高风险关注</Tag>
              </Space>
            </ProCard>
          </ProCard>
        </Col>
        <Col xs={24}>
          <StatisticCard.Group>
            {overview.summary.map((item) => (
              <StatisticCard key={item.title} statistic={{ title: item.title, value: item.value }} />
            ))}
          </StatisticCard.Group>
        </Col>
        <Col xs={24} xl={10}>
          <ProCard title="汇报要点" style={{ height: '100%' }}>
            <List
              dataSource={overview.highlights}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </ProCard>
        </Col>
        <Col xs={24} xl={14}>
          <ProCard title="老师已回写事件" style={{ marginBottom: 16 }}>
            <List
              dataSource={overview.teacherProcessedRows}
              locale={{ emptyText: '当前暂无老师回写事件' }}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Link key={item.eventId} to={`/alert-center/detail/${item.eventId}`}>
                      查看详情
                    </Link>,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Space>
                        <Typography.Text strong>{item.event}</Typography.Text>
                        <Tag color="success">{item.status}</Tag>
                      </Space>
                    }
                    description={`${item.scene} · ${item.owner} · ${item.time}`}
                  />
                </List.Item>
              )}
            />
          </ProCard>
          <ProCard title="仍在平台侧跟进">
            <List
              dataSource={overview.pendingRows}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Link key={item.eventId} to={`/alert-center/detail/${item.eventId}`}>
                      查看详情
                    </Link>,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Space>
                        <Typography.Text strong>{item.event}</Typography.Text>
                        <Tag color="warning">{item.status}</Tag>
                      </Space>
                    }
                    description={`${item.scene} · ${item.owner} · ${item.time}`}
                  />
                </List.Item>
              )}
            />
          </ProCard>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default AlertOpsOverviewPage;
