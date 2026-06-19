import dayjs from 'dayjs';
import { useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Popup,
  TextArea,
  Toast,
} from 'antd-mobile';
import { parentDemo } from '@/demo/views';
import type { ParentLeaveSubmission } from '@/shared/types/navigation';

export function LeaveRequestPopup({
  visible,
  onClose,
  onSubmit,
}: {
  visible: boolean;
  onClose: () => void;
  onSubmit: (payload: ParentLeaveSubmission) => void;
}) {
  const [dateVisible, setDateVisible] = useState(false);
  const [leaveDate, setLeaveDate] = useState<Date | null>(new Date());
  const [form] = Form.useForm();

  return (
    <>
      <Popup
        visible={visible}
        onMaskClick={onClose}
        bodyStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
      >
        <div className="popup-shell">
          <div className="popup-title">请假申请</div>
          <Form
            form={form}
            layout="horizontal"
            footer={
              <Button
                block
                color="primary"
                onClick={async () => {
                  const values = await form.validateFields();
                  onSubmit({
                    date: leaveDate ? dayjs(leaveDate).format('YYYY-MM-DD') : '待定',
                    reason: values.reason,
                    remark: values.remark,
                  });
                  form.resetFields(['reason', 'remark']);
                  Toast.show('请假申请已提交给班主任');
                  onClose();
                }}
              >
                提交申请
              </Button>
            }
          >
            <Form.Item
              name="student"
              label="学生姓名"
              initialValue={parentDemo.studentName}
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item
              label="请假日期"
              trigger="onConfirm"
              onClick={() => setDateVisible(true)}
            >
              <div className="picker-value">
                {leaveDate ? dayjs(leaveDate).format('YYYY-MM-DD') : '请选择'}
              </div>
            </Form.Item>
            <Form.Item
              name="reason"
              label="请假原因"
              rules={[{ required: true, message: '请填写请假原因' }]}
            >
              <TextArea placeholder="例如：身体不适，上午请假半天" rows={3} />
            </Form.Item>
            <Form.Item name="remark" label="备注">
              <TextArea placeholder="可补充说明" rows={2} />
            </Form.Item>
          </Form>
        </div>
      </Popup>
      <DatePicker
        visible={dateVisible}
        value={leaveDate}
        onClose={() => setDateVisible(false)}
        onConfirm={(value) => {
          setLeaveDate(value);
        }}
      />
    </>
  );
}
