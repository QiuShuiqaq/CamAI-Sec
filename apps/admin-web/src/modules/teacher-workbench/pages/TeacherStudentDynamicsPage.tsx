import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Table, Tag } from 'antd';
import { demoStudents } from '@/demo';

const TeacherStudentDynamicsPage = () => {
  const rows = demoStudents.map((student, index) => ({
    key: student.id,
    name: student.name,
    arrivalStatus: index === 2 ? '待确认' : '已到校',
    latestEvent: index === 0 ? '请假申请处理中' : '今日状态正常',
  }));

  return (
    <PageContainer
      header={{
        title: '学生动态',
        subTitle: '班级学生动态与到校状态的老师视图',
      }}
    >
      <ProCard>
        <Table
          rowKey="key"
          pagination={false}
          dataSource={rows}
          columns={[
            { title: '学生姓名', dataIndex: 'name' },
            {
              title: '到校状态',
              dataIndex: 'arrivalStatus',
              render: (value) => (
                <Tag color={value === '已到校' ? 'success' : 'warning'}>
                  {value}
                </Tag>
              ),
            },
            { title: '最新动态', dataIndex: 'latestEvent' },
          ]}
        />
      </ProCard>
    </PageContainer>
  );
};

export default TeacherStudentDynamicsPage;
