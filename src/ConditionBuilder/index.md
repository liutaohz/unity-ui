## ConditionBuilder

动态多层表单

Demo:

一些表单类型使用 Demo

交互模仿https://baidu.github.io/amis/zh-CN/components/form/condition-builder

```tsx
import React from 'react';
import { ConditionBuilder } from 'unity-ui';
const leftSelectOptions = [
  {
    value: 'id_XXXtest_text',
    label: '测试字符串类型',
    type: 'text',
    textFormProps: {
      placeholder: '请输入文本',
      maxLength: 12,
      showCount: true,
    },
  },
  {
    value: 'id_XXXtest_number',
    label: '测试数字',
    type: 'number',
    numberFormProps: {
      placeholder: '请输入数字',
      min: 0,
      max: 100,
    },
  },
  {
    value: 'id_XXXtest_date',
    label: '测试日期',
    type: 'date',
    dateFormProps: {
      format: 'YYYY-MM-DD',
      showNow: true,
    },
  },
  {
    value: 'id_XXXtest_time',
    label: '测试时间',
    type: 'time',
    timeFormProps: {
      format: 'HH:mm',
    },
  },
  {
    value: 'id_XXXtest_select',
    label: '测试多选',
    type: 'select',
    selectFormProps: {
      options: [
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2' },
        { label: '选项三', value: '3' },
      ], //可选的下拉option
      maxCount: 2,
    },
    // selectOptions: [
    //   { label: '选项一', value: '1' },
    //   { label: '选项二', value: '2' },
    //   { label: '选项三', value: '3' },
    // ], //可选的下拉option
  },
];
export default () => {
  return (
    <div style={{ padding: '20px' }}>
      <ConditionBuilder
        leftSelectOptions={leftSelectOptions}
      ></ConditionBuilder>
    </div>
  );
};
```

## 该组件还在开发中，尚未发布...
