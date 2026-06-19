import {
  LockOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components';
import { Helmet, useModel } from '@umijs/max';
import { Alert, App, Card, Col, Row, Space, Tag, Typography } from 'antd';
import { createStyles } from 'antd-style';
import React, { startTransition, useState } from 'react';
import { Footer } from '@/components';
import { campusDemo } from '@/demo/campus';
import { login } from '@/services/ant-design-pro/api';
import { resolveHomeByRole } from '@/utils/roles';
import Settings from '../../../../config/defaultSettings';

const useStyles = createStyles(({ token }) => ({
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background:
      'radial-gradient(circle at top left, rgba(22,119,255,0.22), transparent 32%), linear-gradient(135deg, rgba(22,119,255,0.10) 0%, rgba(5,145,255,0.06) 42%, rgba(255,255,255,1) 100%)',
  },
  content: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '1.15fr 440px',
    gap: 28,
    alignItems: 'center',
    padding: '48px 72px',
  },
  hero: {
    paddingRight: 24,
  },
  highlights: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 24,
  },
  roleCard: {
    borderRadius: token.borderRadiusLG,
    border: `1px solid ${token.colorBorderSecondary}`,
    background: 'rgba(255,255,255,0.72)',
    backdropFilter: 'blur(10px)',
  },
  formCard: {
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  },
}));

const demoAccounts = [
  {
    role: 'admin',
    label: '总控端',
    account: 'admin / ant.design',
    description: '查看总览驾驶舱、风险中心、系统配置。',
  },
  {
    role: 'teacher',
    label: '老师端',
    account: 'teacher / ant.design',
    description: '查看工作台、我的班级、待办中心。',
  },
] as const;

const walkthrough = [
  '1. 先登录总控端，展示校园驾驶舱和事件故事线。',
  '2. 切到老师端，展示请假申请如何进入待办中心。',
  '3. 再打开家长端，展示通知、消息和请假申请入口。',
] as const;

const LoginPage: React.FC = () => {
  const { styles } = useStyles();
  const { message } = App.useApp();
  const { initialState, setInitialState } = useModel('@@initialState');
  const [error, setError] = useState('');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      startTransition(() => {
        setInitialState((state) => ({
          ...state,
          currentUser: userInfo,
        }));
      });
    }
    return userInfo;
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>{Settings.title}</title>
      </Helmet>
      <div className={styles.content}>
        <div className={styles.hero}>
          <Tag color="blue">{campusDemo.schoolName}</Tag>
          <Typography.Title style={{ marginTop: 16, marginBottom: 12 }}>
            {campusDemo.slogan}
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ fontSize: 16 }}>
            当前版本聚焦总控端、老师端、家长端三类角色的差异化视图，
            并用统一事件故事线串联校园协同流程，适合甲方快速理解产品边界。
          </Typography.Paragraph>

          <div className={styles.highlights}>
            <Tag color="processing">总控驾驶舱</Tag>
            <Tag color="purple">老师工作台</Tag>
            <Tag color="gold">家长消息与请假</Tag>
          </div>

          <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
            {demoAccounts.map((item) => (
              <Col xs={24} md={12} key={item.role}>
                <Card className={styles.roleCard}>
                  <Typography.Text strong>{item.label}</Typography.Text>
                  <Typography.Paragraph
                    type="secondary"
                    style={{ marginTop: 8, marginBottom: 12 }}
                  >
                    {item.description}
                  </Typography.Paragraph>
                  <Tag color="blue">{item.account}</Tag>
                </Card>
              </Col>
            ))}
          </Row>

          <Card className={styles.roleCard} style={{ marginTop: 16 }}>
            <Typography.Text strong>推荐演示顺序</Typography.Text>
            <Space direction="vertical" size={10} style={{ marginTop: 12 }}>
              {walkthrough.map((item) => (
                <Typography.Text key={item} type="secondary">
                  {item}
                </Typography.Text>
              ))}
            </Space>
          </Card>
        </div>

        <Card className={styles.formCard}>
          <LoginForm
            logo={<SafetyCertificateOutlined style={{ fontSize: 28 }} />}
            title={campusDemo.productName}
            subTitle="选择角色后使用演示账号登录"
            submitter={{
              searchConfig: { submitText: '进入系统' },
            }}
            onFinish={async (values) => {
              setError('');
              const result = await login(values as API.LoginParams);
              if (result.status !== 'ok') {
                setError('账号或密码错误，请使用左侧提供的演示账号。');
                return;
              }

              const userInfo = await fetchUserInfo();
              message.success('登录成功');
              window.location.href = resolveHomeByRole(
                userInfo?.access || result.currentAuthority,
              );
            }}
          >
            {error ? (
              <Alert
                type="error"
                showIcon
                message={error}
                style={{ marginBottom: 16 }}
              />
            ) : null}
            <ProFormRadio.Group
              name="type"
              label="角色入口"
              initialValue="account"
              options={[
                { label: '账号登录', value: 'account' },
                { label: '快捷老师入口', value: 'mobile' },
              ]}
            />
            <ProFormText
              name="username"
              label="账号"
              initialValue="admin"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined />,
              }}
              rules={[{ required: true, message: '请输入演示账号' }]}
            />
            <ProFormText.Password
              name="password"
              label="密码"
              initialValue="ant.design"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              rules={[{ required: true, message: '请输入密码' }]}
            />
          </LoginForm>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
