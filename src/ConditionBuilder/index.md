## ConditionBuilder

动态多层表单

Demo:

一些表单类型使用 Demo

```tsx
import React from 'react';
import { ConditionBuilder } from 'unity-ui';
const leftSelectOptions = [
  {
    value: 'id_XXXtest_text',
    label: '测试字符串类型',
    type: 'text',
    selectOptions: [],
  },
  {
    value: 'id_XXXtest_number',
    label: '测试数字',
    type: 'number',
    selectOptions: [],
  },
  {
    value: 'id_XXXtest_date',
    label: '测试日期',
    type: 'date',
    selectOptions: [],
  },
  {
    value: 'id_XXXtest_time',
    label: '测试时间',
    type: 'time',
    selectOptions: [],
  },
  {
    value: 'id_XXXtest_select',
    label: '测试多选',
    type: 'select',
    selectOptions: [
      { label: '选项一', value: '1' },
      { label: '选项二', value: '2' },
      { label: '选项三', value: '3' },
    ], //可选的下拉option
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
