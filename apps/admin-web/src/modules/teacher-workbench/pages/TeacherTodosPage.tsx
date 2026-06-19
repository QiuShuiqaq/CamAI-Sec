import { ClockCircleOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Link } from '@umijs/max';
import { List, Segmented, Space, Tag, Typography } from 'antd';
import { useState } from 'react';
import {
  getTeacherDecision,
  getTeacherTodosView,
  type TeacherTodoItem,
  type TeacherTodoTab,
} from '@/demo';

const TeacherTodosPage = () => {
  const teacherTodos = getTeacherTodosView();
  const [activeTab, setActiveTab] = useState<TeacherTodoTab>('待处理');

  return (
    <PageContainer
      header={{
        title: '待办中心',
        subTitle: '聚合老师端需要处理的事项，形成稳定的日常工作入口',
      }}
    >
      <ProCard>
        <Segmented<TeacherTodoTab>
          options={Object.keys(teacherTodos) as TeacherTodoTab[]}
          value={activeTab}
          onChange={(value) => setActiveTab(value as TeacherTodoTab)}
        />
        <List
          style={{ marginTop: 16 }}
          dataSource={[...teacherTodos[activeTab]]}
          renderItem={(item: TeacherTodoItem) => (
            <List.Item
              extra={
                item.eventId && getTeacherDecision(item.eventId) ? (
                  <Tag color="success">已处理</Tag>
                ) : null
              }
            >
              <List.Item.Meta
                title={
                  <Space>
                    <Typography.Text strong>{item.title}</Typography.Text>
                    <Tag>{activeTab}</Tag>
                    {item.eventId ? (
                      <Link to={`/teacher/todos/${item.eventId}`}>查看详情</Link>
                    ) : null}
                  </Space>
                }
                description={
                  <Space direction="vertical" size={4}>
                    <Typography.Text type="secondary">
                      {item.description}
                    </Typography.Text>
                    <Typography.Text type="secondary">
                      <ClockCircleOutlined /> {item.time}
                    </Typography.Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </ProCard>
    </PageContainer>
  );
};

export default TeacherTodosPage;
