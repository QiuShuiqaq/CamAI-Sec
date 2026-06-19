import { ClockCircleOutlined } from '@ant-design/icons';
import { PageContainer, ProCard, StatisticCard } from '@ant-design/pro-components';
import { Link } from '@umijs/max';
import { Col, Row, Table, Tag, Typography } from 'antd';
import { getAlertCenterView } from '@/demo';

const RiskCenterPage = () => {
  const alertCenter = getAlertCenterView();

  return (
    <PageContainer
      header={{
        title: '告警中心',
        subTitle: '统一查看需要平台侧关注的事件与待办',
      }}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <StatisticCard.Group>
            <StatisticCard statistic={{ title: '告警总数', value: alertCenter.summary.total }} />
            <StatisticCard statistic={{ title: '高风险事件', value: alertCenter.summary.highRisk }} />
            <StatisticCard statistic={{ title: '处理中', value: alertCenter.summary.processing }} />
            <StatisticCard statistic={{ title: '老师已回写', value: alertCenter.summary.processedByTeacher }} />
          </StatisticCard.Group>
        </Col>
        <Col xs={24}>
          <ProCard>
            <Table
              rowKey="key"
              dataSource={alertCenter.rows}
              pagination={false}
              columns={[
                {
                  title: '事件名称',
                  dataIndex: 'event',
                  render: (_, record) => (
                    <Link to={`/alert-center/detail/${record.eventId}`}>{record.event}</Link>
                  ),
                },
                { title: '场景', dataIndex: 'scene' },
                {
                  title: '等级',
                  dataIndex: 'level',
                  render: (_, record) => {
                    const colorMap = {
                      高: 'error',
                      中: 'warning',
                      低: 'processing',
                    } as const;

                    return (
                      <Tag color={colorMap[record.level as keyof typeof colorMap]}>
                        {record.level}
                      </Tag>
                    );
                  },
                },
                { title: '负责人', dataIndex: 'owner' },
                {
                  title: '状态',
                  dataIndex: 'status',
                  render: (value) => <Tag>{value}</Tag>,
                },
                {
                  title: '更新时间',
                  dataIndex: 'time',
                  render: (value) => (
                    <Typography.Text type="secondary">
                      <ClockCircleOutlined /> {value}
                    </Typography.Text>
                  ),
                },
                {
                  title: '操作',
                  key: 'action',
                  render: (_, record) => (
                    <Link to={`/alert-center/detail/${record.eventId}`}>查看详情</Link>
                  ),
                },
              ]}
            />
          </ProCard>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default RiskCenterPage;
