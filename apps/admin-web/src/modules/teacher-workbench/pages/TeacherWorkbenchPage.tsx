import {
  MessageOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import {
  PageContainer,
  ProCard,
  StatisticCard,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Col, List, Row, Tag, Typography } from 'antd';
import { getTeacherWorkbenchView } from '@/demo';

const TeacherWorkbenchPage = () => {
  const { initialState } = useModel('@@initialState');
  const workbench = getTeacherWorkbenchView();

  return (
    <PageContainer
      header={{
        title: '老师工作台',
        subTitle: `${initialState?.currentUser?.name || ''} · ${initialState?.currentUser?.group || ''}`,
      }}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={16}>
          <StatisticCard.Group>
            <StatisticCard statistic={{ title: '班级人数', value: workbench.classStats.totalStudents }} />
            <StatisticCard statistic={{ title: '已到校', value: workbench.classStats.arrivedStudents }} />
            <StatisticCard
              statistic={{
                title: '待处理事项',
                value: workbench.classStats.pendingTodos,
                prefix: <NotificationOutlined />,
              }}
            />
          </StatisticCard.Group>
          <ProCard title="今日班级动态" style={{ marginTop: 16 }}>
            <List
              dataSource={workbench.classActivity}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </ProCard>
        </Col>
        <Col xs={24} xl={8}>
          <ProCard title="我的待办">
            <List
              dataSource={workbench.pendingTodos}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<MessageOutlined />}
                    title={
                      <>
                        <Typography.Text>{item.title}</Typography.Text>{' '}
                        <Tag color={item.processed ? 'success' : 'processing'}>
                          {item.processed ? `已处理${item.decisionLabel ? ` · ${item.decisionLabel}` : ''}` : '待处理'}
                        </Tag>
                      </>
                    }
                    description={item.description}
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

export default TeacherWorkbenchPage;
