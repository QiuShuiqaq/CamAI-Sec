import {
  AlertOutlined,
  BellOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import {
  PageContainer,
  ProCard,
  StatisticCard,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Col, Divider, List, Progress, Row, Space, Tag, Typography } from 'antd';
import { getOverviewView } from '@/demo';

const toneColorMap = {
  处理中: 'processing',
  已完成: 'success',
  正常: 'default',
  提醒: 'warning',
} as const;

const OverviewPage = () => {
  const { initialState } = useModel('@@initialState');
  const overview = getOverviewView();

  return (
    <PageContainer
      header={{
        title: '总览驾驶舱',
        subTitle: initialState?.currentUser?.schoolName || overview.schoolName,
      }}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <ProCard
            split="vertical"
            style={{
              background:
                'linear-gradient(135deg, rgba(22,119,255,0.12) 0%, rgba(255,255,255,1) 65%)',
            }}
          >
            <ProCard colSpan="58%">
              <Tag color="blue">{overview.campusName}</Tag>
              <Typography.Title level={3} style={{ marginTop: 16, marginBottom: 8 }}>
                {overview.storyTitle}
              </Typography.Title>
              <Typography.Paragraph type="secondary" style={{ marginBottom: 20 }}>
                {overview.storySummary}
              </Typography.Paragraph>
              <Space wrap size="middle">
                <Tag color="processing">{overview.focusClassName}</Tag>
                <Tag color="purple">{overview.teacherName}</Tag>
                <Tag color="gold">{overview.parentName}</Tag>
                <Tag color="success">家长送达率 {overview.parentReachRate}%</Tag>
              </Space>
            </ProCard>
            <ProCard title="事件故事线" colSpan="42%">
              <List
                dataSource={overview.timeline}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <Space>
                          <Typography.Text strong>{item.title}</Typography.Text>
                          <Tag color={toneColorMap[item.level as keyof typeof toneColorMap]}>
                            {item.level}
                          </Tag>
                        </Space>
                      }
                      description={`${item.time} · ${item.description}`}
                    />
                  </List.Item>
                )}
              />
            </ProCard>
          </ProCard>
        </Col>

        <Col xs={24} xl={18}>
          <StatisticCard.Group>
            <StatisticCard
              statistic={{
                title: '在校人数',
                value: overview.stats.studentsOnCampus,
                prefix: <TeamOutlined />,
              }}
            />
            <StatisticCard
              statistic={{
                title: '今日事件',
                value: overview.stats.eventsToday,
                prefix: <AlertOutlined />,
              }}
            />
            <StatisticCard
              statistic={{
                title: '待处理事项',
                value: overview.stats.pendingItems,
                prefix: <BellOutlined />,
              }}
            />
          </StatisticCard.Group>

          <ProCard title="校园运行概况" split="horizontal" style={{ marginTop: 16 }}>
            <ProCard title="家长通知送达率" colSpan="50%">
              <Progress percent={overview.stats.parentReachRate} strokeColor="#1677ff" />
            </ProCard>
            <ProCard title="本周班级活跃度" colSpan="50%">
              <Space size="middle" wrap>
                <Tag color="processing">七年级二班 92%</Tag>
                <Tag color="success">八年级一班 88%</Tag>
                <Tag color="warning">九年级三班 75%</Tag>
              </Space>
            </ProCard>
          </ProCard>
        </Col>

        <Col xs={24} xl={6}>
          <ProCard title="当前关注点">
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <Typography.Text strong>班主任待处理</Typography.Text>
                <Divider style={{ margin: '8px 0' }} />
                <Typography.Text type="secondary">
                  {overview.focusStudentName} 的请假申请已提交，等待
                  {overview.teacherName} 审批。
                </Typography.Text>
              </div>
              <div>
                <Typography.Text strong>家长侧状态</Typography.Text>
                <Divider style={{ margin: '8px 0' }} />
                <Typography.Text type="secondary">
                  家长已收到班级通知，服务入口可继续补充说明。
                </Typography.Text>
              </div>
            </Space>
          </ProCard>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default OverviewPage;
