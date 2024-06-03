// Cron表达式Form表单
import React, {
  useEffect,
  useMemo,
  useCallback,
  useState,
  useRef,
} from 'react';
import { Button, Input, Space, Modal } from 'antd';
import CronFormCon from './CronFormCon';
import styles from './index.less';
interface CronFormProps {
  value?: any;
  onChange?: (value: any) => void;
  placeholder?: string;
  className?: any;
  customStyle?: any; // 自定义样式
  btnProps?: any;
  btnTxt?: any;
  modalTitle?: any;
}
const CronForm: React.FC<CronFormProps> = ({
  value = '',
  className = '',
  onChange,
  placeholder = '请输入',
  customStyle = {},
  btnProps = {
    type: 'primary',
    ghost: false,
  },
  btnTxt = '生成Cron表达式',
  modalTitle = 'Cron表达式生成器',
}) => {
  const [curValue, setCurValue] = useState<any>(value);
  const [isCronOpen, setIsCronOpen] = useState(false);
  const cronRef = useRef<any>();
  useEffect(() => {
    setCurValue(value);
  }, [value]);
  const inputChange = useCallback(
    (val: any) => {
      const curTxt = val?.target?.value?.trim();
      onChange?.(curTxt);
    },
    [onChange],
  );
  const btnClick = () => {
    setIsCronOpen(true);
  };
  return (
    <>
      <div className={`${styles.cronForm} ${className}`} style={customStyle}>
        <Space.Compact style={{ width: '100%' }}>
          <Input
            placeholder={placeholder}
            value={curValue}
            onChange={inputChange}
          />
          <Button {...btnProps} onClick={btnClick}>
            {btnTxt}
          </Button>
        </Space.Compact>
        {/* cron */}
        <Modal
          title={modalTitle}
          open={isCronOpen}
          onCancel={() => {
            setIsCronOpen(false);
          }}
          footer={[
            <Button
              key={1}
              onClick={() => {
                onChange?.(cronRef.current?.refGetCron() || '');
                setIsCronOpen(false);
              }}
              type="primary"
            >
              确认
            </Button>,
            <Button
              onClick={() => {
                cronRef.current?.resetCronState();
              }}
              key={2}
            >
              重置
            </Button>,
            <Button
              key={3}
              onClick={() => {
                cronRef.current?.resetCronState(curValue);
                setIsCronOpen(false);
              }}
            >
              取消
            </Button>,
          ]}
          width={700}
        >
          <CronFormCon cronExpression={curValue} ref={cronRef} />
        </Modal>
      </div>
    </>
  );
};

export default CronForm;
