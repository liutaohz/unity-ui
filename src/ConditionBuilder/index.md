## ConditionBuilder

动态多层表单

Demo:

一些表单类型使用 Demo

交互模仿https://baidu.github.io/amis/zh-CN/components/form/condition-builder

```tsx
import React, { FC, useState, useRef } from 'react';
import { ConditionBuilder } from 'unity-ui';
import { Button, Form } from 'antd';
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
      ],
      maxCount: 2,
    },
  },
];
export default () => {
  const [conditionForm] = Form.useForm();
  const submitFn = () => {
    conditionForm
      .validateFields()
      .then((value: any) => {
        console.log('value:', value);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };
  return (
    <div style={{ padding: '20px' }}>
      <ConditionBuilder
        leftSelectOptions={leftSelectOptions}
        conditionForm={conditionForm}
      ></ConditionBuilder>
      <div>
        <Button type="primary" size="small" onClick={submitFn}>
          保存
        </Button>
      </div>
    </div>
  );
};
```

## API

### ConditionBuilderProps

| 属性              | 说明                                             | 类型              | 必填 | 默认值         |
| ----------------- | ------------------------------------------------ | ----------------- | ---- | -------------- |
| leftSelectOptions | 左侧下拉选择，也就是整个配置项，数据驱动         | `Array<LeftType>` | 是   | []             |
| readonly          | 是否只读                                         | boolean           | 否   | false          |
| initialValue      | 表单初始值                                       | ConditionRecord   | 否   | {}             |
| conditionForm     | 表单实例，可以从外部传入，用于表单主动校验和提交 | Form              | 否   | Form.useForm() |
| maxDeep           | 嵌套深度                                         | number            | 否   | 5              |

```ts
import type {
  InputProps,
  InputNumberProps,
  DatePickerProps,
  TimePickerProps,
  TimeRangePickerProps,
} from 'antd';
export enum ConditionFormTypeEnum {
  text = 'text', // 文本
  number = 'number', // 数字
  date = 'date', // 日期 年月日 时分秒  format  "YYYY-MM-DD HH:mm:ss" 或者 "YYYY-MM-DD"
  time = 'time', // 时间 时分秒
  select = 'select', // 下拉选择，当是此种类型时需要注入配置option数组selectOptions
}

export enum ConditionType {
  single = 'single', // 单个条件
  group = 'group', // 条件组
}
// 公共基础类型
interface BaseField {
  type: ConditionFormTypeEnum;
  value: string;
  label: string;
}

interface TextField extends BaseField {
  type: ConditionFormTypeEnum.text;
  textFormProps?: InputProps;
}

interface NumberField extends BaseField {
  type: ConditionFormTypeEnum.number;
  numberFormProps?: InputNumberProps;
}

interface DateField extends BaseField {
  type: ConditionFormTypeEnum.date;
  dateFormProps?: DatePickerProps;
}

interface TimeField extends BaseField {
  type: ConditionFormTypeEnum.time;
  timeFormProps?: TimePickerProps | TimeRangePickerProps;
}

interface SelectField extends BaseField {
  type: ConditionFormTypeEnum.select;
  selectFormProps?: InputNumberProps;
}
export type LeftType =
  | TextField
  | NumberField
  | DateField
  | TimeField
  | SelectField;
export enum ConjunctionEnum {
  and = 'and', // 单个条件
  or = 'or', // 条件组
}
export type ConditionRecord = {
  deep: number;
  id: string; // 条件ID
  type: ConditionType;
  conjunction: ConjunctionEnum; // 且、或 连词
  conditionList?: Array<ConditionRecord>;
  left?: LeftType | undefined;
  op?: string; // 表达式
  right?: any; // 结果
  desc?: string; // 备注
  not?: boolean; // 非
};
```
