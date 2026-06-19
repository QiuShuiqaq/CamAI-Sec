import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Table, Tag } from 'antd';
import { filterEventsByType } from '@/demo';

const AccessRecordsPage = () => {
  const records = [
    ...filterEventsByType('access_pass'),
    ...filterEventsByType('access_alert'),
  ].map((event, index) => ({
    key: String(index + 1),
    name: event.studentId === 'student-zhangxiaoyu' ? '张小雨' : '未登记人员',
    event: event.title,
    status:
      event.type === 'access_pass'
        ? '正常通行'
        : event.status === 'pending'
          ? '异常待确认'
          : '异常事件',
    point:
      event.relatedPointId === 'point-gate-east'
        ? '东门闸机'
        : event.relatedPointId === 'point-gate-west'
          ? '西门闸机'
          : '校门点位',
    time: event.createdAt.slice(11, 16),
  }));

  return (
    <PageContainer
      header={{
        title: '门禁管理',
        subTitle: '展示师生通行、陌生人告警与异常轨迹语义',
      }}
    >
      <ProCard>
        <Table
          rowKey="key"
          pagination={false}
          dataSource={records}
          columns={[
            { title: '对象', dataIndex: 'name' },
            { title: '事件', dataIndex: 'event' },
            {
              title: '状态',
              dataIndex: 'status',
              render: (value) => (
                <Tag color={value === '正常通行' ? 'success' : 'warning'}>
                  {value}
                </Tag>
              ),
            },
            { title: '点位', dataIndex: 'point' },
            { title: '时间', dataIndex: 'time' },
          ]}
        />
      </ProCard>
    </PageContainer>
  );
};

export default AccessRecordsPage;
