import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Table, Tag } from 'antd';
import { getTeacherClassView } from '@/demo';

const TeacherMyClassPage = () => {
  const classView = getTeacherClassView();

  return (
    <PageContainer
      header={{
        title: '我的班级',
        subTitle: classView.className,
      }}
    >
      <ProCard title="学生动态">
        <Table
          rowKey="key"
          pagination={false}
          dataSource={classView.rows}
          columns={[
            { title: '学生姓名', dataIndex: 'name' },
            {
              title: '到校状态',
              dataIndex: 'status',
              render: (value) => {
                const color = value === '已到校' ? 'success' : 'warning';
                return <Tag color={color}>{value}</Tag>;
              },
            },
            { title: '家长', dataIndex: 'parent' },
            { title: '备注', dataIndex: 'note' },
          ]}
        />
      </ProCard>
    </PageContainer>
  );
};

export default TeacherMyClassPage;
