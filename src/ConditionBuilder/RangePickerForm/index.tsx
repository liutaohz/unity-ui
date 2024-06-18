import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;
interface RangePickerFormProps {
  value?: any;
  onChange?: (value: any) => void;
  readonly?: boolean;
  showTime?: boolean;
  customStyle?: any;
  format?: string;
  restProps?: any;
}

const RangePickerForm: React.FC<RangePickerFormProps> = ({
  value = [null, null],
  readonly = false,
  showTime = true,
  format = 'YYYY-MM-DD HH:mm:ss',
  customStyle = {},
  onChange = (value: any) => {},
  restProps = {},
}) => {
  const curValue = useMemo(() => {
    let timeInit: any = [null, null];
    try {
      const [startDate = null, endDate = null] = value;
      const initStartTime = startDate ? dayjs(startDate, format) : null;
      const initEndTime = endDate ? dayjs(endDate, format) : null;
      timeInit = [initStartTime, initEndTime];
      console.log('timeInit:', timeInit);
    } catch (error) {
      console.error('error===', error);
    }

    return timeInit;
  }, [value]);
  return (
    <>
      <RangePicker
        style={customStyle}
        format={format}
        showTime={showTime}
        value={curValue}
        {...restProps}
        onChange={(parm1, timeStrArr) => {
          if (!readonly) {
            onChange(timeStrArr);
          }
        }}
      />
    </>
  );
};

export default RangePickerForm;
