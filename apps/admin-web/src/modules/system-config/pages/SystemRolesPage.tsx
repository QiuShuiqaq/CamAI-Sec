import {
  ClusterOutlined,
  SafetyOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import {
  PageContainer,
  ProCard,
  StatisticCard,
} from '@ant-design/pro-components';
import { Col, List, Row, Space, Table, Tag, Typography } from 'antd';
import { getSystemRolesView } from '@/demo';

const SystemRolesPage = () => {
  const systemRoles = getSystemRolesView();

  return (
    <PageContainer
      header={{
        title: '系统配置',
        subTitle: '用于演示多角色权限、组织结构和后续可迁移配置能力',
      }}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={16}>
          <StatisticCard.Group>
            <StatisticCard
              statistic={{
                title: '角色模板',
                value: systemRoles.stats.roleTemplates,
                prefix: <SafetyOutlined />,
              }}
            />
            <StatisticCard
              statistic={{
                title: '组织层级',
                value: systemRoles.stats.organizationLevels,
                prefix: <ClusterOutlined />,
              }}
            />
            <StatisticCard
              statistic={{
                title: '学校初始化项',
                value: systemRoles.stats.onboardingItems,
                prefix: <SettingOutlined />,
              }}
            />
          </StatisticCard.Group>

          <ProCard title="角色与权限模板" style={{ marginTop: 16 }}>
            <Table
              rowKey="key"
              pagination={false}
              dataSource={systemRoles.roleTemplates}
              columns={[
                { title: '角色', dataIndex: 'role' },
                {
                  title: '权限范围',
                  dataIndex: 'scope',
                  render: (value) => <Tag color="processing">{value}</Tag>,
                },
                { title: '关键菜单', dataIndex: 'menu' },
                { title: '演示账号数', dataIndex: 'users' },
              ]}
            />
          </ProCard>
        </Col>
        <Col xs={24} xl={8}>
          <ProCard title="可迁移交付要点">
            <List
              dataSource={systemRoles.rolloutItems}
              renderItem={(item) => (
                <List.Item>
                  <Space align="start">
                    <Tag color="success">配置化</Tag>
                    <Typography.Text>{item}</Typography.Text>
                  </Space>
                </List.Item>
              )}
            />
          </ProCard>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default SystemRolesPage;
