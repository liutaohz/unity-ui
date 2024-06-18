import { Checkbox } from 'antd';
import React from 'react';
interface CheckboxFormProps {
  value?: any;
  onChange?: (value: any) => void;
  readonly?: boolean;
  customStyle?: any;
  restProps?: any;
  label?: any;
}

const CheckboxForm: React.FC<CheckboxFormProps> = ({
  value = false,
  readonly = false,
  customStyle = {},
  onChange = (value: any) => {},
  restProps = {},
  label = '',
}) => {
  return (
    <>
      <Checkbox
        style={customStyle}
        checked={value}
        {...restProps}
        onChange={(e) => {
          if (!readonly) {
            onChange(e.target.checked);
          }
        }}
      >
        {label}
      </Checkbox>
    </>
  );
};

export default CheckboxForm;
