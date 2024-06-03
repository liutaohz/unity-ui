## CronForm

Cron 表达式 Form 表单

Demo:

```tsx |
import React from 'react';
import { CronForm } from 'unity-ui';
import { Button, Form, message } from 'antd';
const CronParser = require('cron-parser');

export default () => {
  const onFinish = (values) => {
    console.log('Success:', values);
    message.success(`提交成功：${values?.CronTxt}`);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const customValidate = (rule, value, callback) => {
    if (!value) {
      callback();
    } else {
      try {
        CronParser.parseExpression(value);
        callback();
      } catch (error) {
        callback('请输入合法Cron表达式！');
        console.error(error);
      }
    }
  };
  return (
    <div style={{ padding: '20px' }}>
      <Form
        name="表单"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="CronTxt"
          name="CronTxt"
          rules={[
            { required: true, message: '请生成表达式！' },
            {
              validator: customValidate,
              message: '请输入合法Cron表达式！',
            },
          ]}
        >
          <CronForm placeholder="请输入Cron表达式" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
```

### API

| 属性        | 说明                         | 类型                                                      | 必填 | 默认值              |
| ----------- | ---------------------------- | --------------------------------------------------------- | ---- | ------------------- |
| value       | 表单 value                   | string                                                    | 否   | 无                  |
| onChange    | 表单 onChange                | function                                                  | 否   | 无                  |
| placeholder | 表单 placeholder             | sting                                                     | 否   | '请输入'            |
| className   | 表单自定义类名，用于样式设置 | sting                                                     | 否   | 无                  |
| customStyle | 外层 Style 样式覆盖          | CSSProperties                                             | 否   | 无                  |
| btnProps    | 按钮属性传递                 | [ant button](https://ant.design/components/button-cn#api) | 否   | 无                  |
| btnTxt      | 按钮文案                     | string                                                    | 否   | 无                  |
| modalTitle  | 弹窗标题文案                 | string                                                    | 否   | 'Cron 表达式生成器' |
