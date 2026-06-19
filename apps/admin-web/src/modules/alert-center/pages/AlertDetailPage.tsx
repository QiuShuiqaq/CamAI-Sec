import { App, Button, Empty, List, Space, Tag } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-components';
import { Link, history, useParams } from '@umijs/max';
import { getEventDetailView } from '@/demo';
import EventDetailView from '@/components/EventDetailView';

const AlertDetailPage = () => {
  const { message } = App.useApp();
  const params = useParams<{ id: string }>();
  const detail = getEventDetailView(params.id || '');

  if (!detail) {
    return (
      <PageContainer
        header={{
          title: '告警详情',
          onBack: () => history.push('/alert-center/list'),
        }}
      >
        <Empty description="未找到对应事件" />
      </PageContainer>
    );
  }

  return (
    <PageContainer
      header={{
        title: '告警详情',
        subTitle: detail.typeLabel,
        onBack: () => history.push('/alert-center/list'),
      }}
      extra={[
        <Button
          key="assign"
          onClick={() => {
            message.success('Demo 中仅演示指派入口，未接真实流程。');
          }}
        >
          指派处理
        </Button>,
        <Button
          key="close"
          type="primary"
          onClick={() => {
            message.success('Demo 中仅演示闭环入口，未变更真实数据。');
          }}
        >
          标记闭环
        </Button>,
      ]}
    >
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <EventDetailView detail={detail} audienceLabel="总控端" />
        {detail.teacherDecision ? (
          <ProCard title="老师侧处理摘要">
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              <div>处理动作：{detail.teacherDecision.actionLabel}</div>
              <div>处理时间：{detail.teacherDecision.time}</div>
              <div>处理说明：{detail.teacherDecision.note || '无补充说明'}</div>
            </Space>
          </ProCard>
        ) : null}
        <ProCard title="处置日志">
          <List
            dataSource={detail.dispositionLogs}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <Space>
                      <Tag color="processing">{item.action}</Tag>
                      <span>{item.actor}</span>
                    </Space>
                  }
                  description={`${item.time} · ${item.detail}`}
                />
              </List.Item>
            )}
          />
        </ProCard>
        {detail.relatedEvents.length ? (
          <ProCard title="关联事件">
            <List
              dataSource={detail.relatedEvents}
              renderItem={(item) => (
                <List.Item
                  actions={[<Link key={item.id} to={`/alert-center/detail/${item.id}`}>查看</Link>]}
                >
                  <List.Item.Meta
                    title={
                      <Space>
                        <Link to={`/alert-center/detail/${item.id}`}>{item.title}</Link>
                        <Tag>{item.typeLabel}</Tag>
                      </Space>
                    }
                    description={`当前状态：${item.statusLabel}`}
                  />
                </List.Item>
              )}
            />
          </ProCard>
        ) : null}
      </Space>
    </PageContainer>
  );
};

export default AlertDetailPage;
