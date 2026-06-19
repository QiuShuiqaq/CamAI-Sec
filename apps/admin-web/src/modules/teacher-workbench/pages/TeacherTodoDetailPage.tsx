import { useState } from 'react';
import { App, Button, Empty, Input, Segmented, Space, Typography } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-components';
import { history, useParams } from '@umijs/max';
import { getEventDetailView, saveTeacherDecision } from '@/demo';
import EventDetailView from '@/components/EventDetailView';

const TeacherTodoDetailPage = () => {
  const { message } = App.useApp();
  const params = useParams<{ id: string }>();
  const detail = getEventDetailView(params.id || '');
  const [selectedAction, setSelectedAction] = useState(
    detail?.teacherDecision?.actionValue ?? detail?.teacherAction.options[0]?.value ?? '',
  );
  const [note, setNote] = useState(
    detail?.teacherDecision?.note ?? detail?.teacherAction.defaultNote ?? '',
  );
  const [result, setResult] = useState<{
    actionValue: string;
    actionLabel: string;
    note: string;
    time: string;
  } | null>(
    detail?.teacherDecision
      ? {
          actionValue: detail.teacherDecision.actionValue,
          actionLabel: detail.teacherDecision.actionLabel,
          note: detail.teacherDecision.note,
          time: detail.teacherDecision.time,
        }
      : null,
  );

  if (!detail) {
    return (
      <PageContainer
        header={{
          title: '待办详情',
          onBack: () => history.push('/teacher/todos'),
        }}
      >
        <Empty description="未找到对应待办" />
      </PageContainer>
    );
  }

  return (
    <PageContainer
      header={{
        title: '待办详情',
        subTitle: detail.typeLabel,
        onBack: () => history.push('/teacher/todos'),
      }}
      extra={[
        <Button
          key="reply"
          onClick={() => {
            message.success('Demo 中仅演示处理动作，未接真实审批接口。');
          }}
        >
          补充说明
        </Button>,
        <Button
          key="process"
          type="primary"
          onClick={() => {
            message.success('Demo 中仅演示老师处理入口，未变更真实数据。');
          }}
        >
          进入处理
        </Button>,
      ]}
    >
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <ProCard title={detail.teacherAction.title}>
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <Segmented
              block
              options={detail.teacherAction.options}
              value={selectedAction}
              onChange={(value) => setSelectedAction(String(value))}
            />
            <Input.TextArea
              rows={4}
              value={note}
              placeholder={detail.teacherAction.placeholder}
              onChange={(event) => setNote(event.target.value)}
            />
            <Space wrap>
              <Button
                onClick={() => {
                  message.success('Demo 中已记录草稿动作。');
                }}
              >
                保存草稿
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  const actionLabel =
                    detail.teacherAction.options.find(
                      (item) => item.value === selectedAction,
                    )?.label ?? '处理';
                  const nextResult = {
                    actionValue: selectedAction,
                    actionLabel,
                    note,
                    time: new Date().toLocaleString('zh-CN', { hour12: false }),
                  };
                  setResult(nextResult);
                  saveTeacherDecision({
                    eventId: detail.id,
                    actionValue: nextResult.actionValue,
                    actionLabel: nextResult.actionLabel,
                    note: nextResult.note,
                    time: nextResult.time,
                  });
                  message.success(`Demo 中已执行“${actionLabel}”动作。`);
                }}
              >
                提交处理
              </Button>
            </Space>
            <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
              {detail.teacherAction.helperText}
            </Typography.Paragraph>
          </Space>
        </ProCard>
        {result ? (
          <ProCard title="审批结果展示">
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              <Typography.Text strong>处理动作：{result.actionLabel}</Typography.Text>
              <Typography.Text type="secondary">处理时间：{result.time}</Typography.Text>
              <Typography.Paragraph style={{ marginBottom: 0 }}>
                处理说明：{result.note || '无补充说明'}
              </Typography.Paragraph>
            </Space>
          </ProCard>
        ) : null}
        <EventDetailView detail={detail} audienceLabel="老师端" />
      </Space>
    </PageContainer>
  );
};

export default TeacherTodoDetailPage;
