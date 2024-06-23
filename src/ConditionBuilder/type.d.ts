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
