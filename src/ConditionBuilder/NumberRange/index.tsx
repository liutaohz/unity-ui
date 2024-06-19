import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { InputNumber } from 'antd';
interface NumberRangeProps {
  value?: any;
  onChange?: (value: any) => void;
  readonly?: boolean;
  customStyle?: any;
}

const NumberRange: React.FC<NumberRangeProps> = ({
  value = [0, 0],
  readonly = false,
  customStyle = {},
  onChange = (value: any) => {},
  ...restProps
}) => {
  const changeStartNum = (val: any) => {
    console.log('changed', val);
    if (readonly) {
      onChange([val, value[1]]);
    }
  };
  const changeEndNum = (val: any) => {
    if (readonly) {
      onChange([value[0], val]);
    }
  };
  return (
    <>
      <InputNumber
        style={{ width: '89px' }}
        placeholder="请输入"
        defaultValue={value[0]}
        onChange={changeStartNum}
        {...restProps}
      />
      <span style={{ margin: '0 4px' }}>至</span>
      <InputNumber
        style={{ width: '89px' }}
        placeholder="请输入"
        defaultValue={value[1]}
        onChange={changeEndNum}
        {...restProps}
      />
    </>
  );
};

export default NumberRange;
