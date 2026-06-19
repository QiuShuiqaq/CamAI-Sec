import { Alert, Descriptions, List, Space, Steps, Tag, Typography } from 'antd';
import { ProCard } from '@ant-design/pro-components';

type EventDetailViewData = NonNullable<
  ReturnType<typeof import('@/demo').getEventDetailView>
>;

export default function EventDetailView({
  detail,
  audienceLabel,
}: {
  detail: EventDetailViewData;
  audienceLabel: string;
}) {
  const levelColor =
    detail.levelLabel === '高'
      ? 'error'
      : detail.levelLabel === '中'
        ? 'warning'
        : 'processing';
  const statusColor =
    detail.status === 'closed'
      ? 'success'
      : detail.status === 'reviewing'
        ? 'warning'
        : detail.status === 'processing'
          ? 'processing'
          : 'default';

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <ProCard
        style={{
          background:
            'linear-gradient(135deg, rgba(22,119,255,0.10) 0%, rgba(255,255,255,1) 72%)',
        }}
      >
        <Space wrap size={[8, 8]} style={{ marginBottom: 12 }}>
          <Tag color="blue">{detail.typeLabel}</Tag>
          <Tag color={levelColor}>{detail.levelLabel}风险</Tag>
          <Tag color={statusColor}>{detail.statusLabel}</Tag>
          <Tag>{audienceLabel}</Tag>
        </Space>
        <Descriptions
          title={detail.title}
          column={{ xs: 1, md: 2 }}
          items={[
            { key: 'type', label: '事件类型', children: detail.typeLabel },
            {
              key: 'level',
              label: '风险等级',
              children: <Tag color={levelColor}>{detail.levelLabel}</Tag>,
            },
            { key: 'status', label: '当前状态', children: <Tag color={statusColor}>{detail.statusLabel}</Tag> },
            { key: 'source', label: '事件来源', children: detail.sourceLabel },
            { key: 'scene', label: '所属场景', children: detail.scene },
            { key: 'audience', label: '当前视角', children: audienceLabel },
            { key: 'createdAt', label: '创建时间', children: detail.createdAt },
            { key: 'updatedAt', label: '更新时间', children: detail.updatedAt },
          ]}
        />
        <Typography.Paragraph type="secondary" style={{ marginTop: 16, marginBottom: 0 }}>
          {detail.summary}
        </Typography.Paragraph>
        <Typography.Paragraph style={{ marginTop: 12, marginBottom: 0 }}>
          当前这条事件用于串联三端视图，演示同一条业务线如何在不同角色下呈现不同信息密度和处理动作。
        </Typography.Paragraph>
      </ProCard>

      <ProCard title="状态流转">
        <Steps
          direction="vertical"
          current={detail.steps.findIndex((item) => item.status === 'process')}
          items={detail.steps}
        />
      </ProCard>

      <ProCard title="协同对象">
        <Descriptions
          column={{ xs: 1, md: 2 }}
          items={detail.relatedRoles.map((item) => ({
            key: item.label,
            label: item.label,
            children: item.value,
          }))}
        />
      </ProCard>

      <ProCard title="建议动作">
        <List
          dataSource={detail.recommendations}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </ProCard>

      <Alert
        type="info"
        showIcon
        message="三端协同说明"
        description={
          <List
            size="small"
            dataSource={detail.collaboration}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        }
      />
    </Space>
  );
}
