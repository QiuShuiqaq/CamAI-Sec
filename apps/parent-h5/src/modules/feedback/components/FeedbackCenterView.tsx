import { useState } from 'react';
import { Button, Card, List, Segmented, Space, Tag, TextArea, Toast } from 'antd-mobile';
import type { ParentFeedbackRecord } from '@/demo';
import type { ParentFeedbackSubmission } from '@/shared/types/navigation';

const feedbackOptions = [
  { label: '活动安排', value: '活动安排' },
  { label: '通知体验', value: '通知体验' },
  { label: '服务建议', value: '服务建议' },
] as const;

export function FeedbackCenterView({
  records,
  onSubmit,
}: {
  records: ParentFeedbackRecord[];
  onSubmit: (payload: ParentFeedbackSubmission) => void;
}) {
  const [category, setCategory] = useState<string>('活动安排');
  const [content, setContent] = useState('');

  return (
    <Space direction="vertical" block>
      <Card title="反馈建议">
        <div className="section-intro">这里用于展示家长侧问题如何沉淀为老师端或平台侧可处理的服务记录。</div>
        <Space direction="vertical" block style={{ width: '100%' }}>
          <Segmented
            block
            options={[...feedbackOptions]}
            value={category}
            onChange={(value) => setCategory(String(value))}
          />
          <TextArea
            rows={4}
            value={content}
            placeholder="请输入想反馈给老师或学校的内容"
            onChange={setContent}
          />
          <Button
            color="primary"
            block
            onClick={() => {
              if (!content.trim()) {
                Toast.show('请先填写反馈内容');
                return;
              }
              onSubmit({
                category,
                content: content.trim(),
              });
              setContent('');
              Toast.show('反馈已提交');
            }}
          >
            提交反馈
          </Button>
        </Space>
      </Card>
      <Card title="历史反馈">
        <List>
          {records.map((item, index) => (
            <List.Item
              key={item.id}
              description={
                <div className="leave-history-desc">
                  <span className="detail-meta-text">{item.content}</span>
                  <span className="detail-meta-text">{item.time}</span>
                </div>
              }
              extra={
                <Space wrap>
                  {index === 0 ? <Tag color="primary">最新</Tag> : null}
                  <Tag color={item.status === '待回复' ? 'warning' : 'success'}>
                    {item.status}
                  </Tag>
                </Space>
              }
            >
              {item.category}
            </List.Item>
          ))}
        </List>
      </Card>
    </Space>
  );
}
