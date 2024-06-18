import React, {
  FC,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
// import { cloneDeep, get } from 'lodash';
import * as _ from 'lodash';
import { MinusCircleOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';
import {
  ConfigProvider,
  Button,
  Form,
  Space,
  Input,
  Select,
  Dropdown,
  InputNumber,
  DatePicker,
  TimePicker,
} from 'antd';
import {
  ConditionRecord,
  ConditionType,
  ConjunctionEnum,
  ConditionFormTypeEnum,
} from './type.d';
import { conjunctionOptions, OperatorsOptions } from './constant';
import CheckboxForm from './CheckboxForm';
import NumberRange from './NumberRange';
import RangePickerForm from './RangePickerForm';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs/esm';
import styles from './index.less';
dayjs.locale('zh-cn');
const DropdownMenuOptions: any = conjunctionOptions.map((item: any) => {
  return {
    label: (
      <div
        className={styles.menuItem}
        style={{
          background: item.background,
          color: item.color,
        }}
      >
        {item.label}
      </div>
    ),
    key: item.value,
  };
});
const mockData = {
  type: 'group',
  conditionList: [],
  id: 'O123lObbNHKedOK_2JGCZ',
  conjunction: 'and',
  desc: '',
};
const ConditionBuilder = (props: any) => {
  const {
    leftSelectOptions = [],
    readonly,
    initialValue,
    conditionForm: form,
  } = props;
  const [conditionForm] = Form.useForm(form);
  // const { leftSelectOptions = [], readonly, initialValue } = props;
  // const [conditionForm] = Form.useForm()
  const curConditionList: any = Form.useWatch('conditionList', conditionForm);
  const wapCondition: any =
    Form.useWatch('conjunction', conditionForm) || 'and';
  const curConditionData: any = useMemo(() => {
    return conjunctionOptions.find((item: any) => item?.value === wapCondition);
  }, [wapCondition]);
  useEffect(() => {
    console.log('wapCondition:', wapCondition);
  }, [wapCondition]);
  useEffect(() => {
    console.log('curConditionData:', curConditionData);
  }, [curConditionData]);
  const makeRule = useCallback((type: ConditionType, deep: number = 0) => {
    let obj: ConditionRecord = {
      deep: deep + 1,
      type, // group single
      conjunction: ConjunctionEnum.and, // 操作符
      id: nanoid(),
      left: undefined, // 左侧下拉选择值
      op: undefined,
      right: undefined,
      desc: '',
      not: false,
    };
    if (type === ConditionType.group) {
      obj['conditionList'] = [];
    }
    return obj;
  }, []);
  useEffect(() => {
    // setTimeout(() => {
    //   console.log('initialValue:', initialValue)
    //   try {
    //     // conditionForm.setFieldsValue(initialValue||mockData)
    //     conditionForm.setFieldsValue(mockData)
    //   } catch (error) {
    //     console.error(error)
    //   }
    // }, 100)
  }, [conditionForm, initialValue]);
  const handleFormFinish = async (values: any) => {
    try {
      console.log('values:', values);
    } catch (error) {}
  };
  const recordForm = (
    formProps: any,
    removeStore: any,
    propsItem: any,
    restField: any,
    keyPathArr: Array<any>,
  ) => {
    let result: any = '';
    const { showTime = true, format, maxCount = 100 } = propsItem?.left || {};
    const defaultDateFormat = 'YYYY-MM-DD HH:mm:ss';
    const defaultTimeFormatt = 'HH:mm:ss';
    // const [startTime = null, endTime = null] = (propsItem?.right || [])
    const curKeyPathArr = _.cloneDeep(keyPathArr);
    let opOptions: any = [];
    // const curKey = leftSelectOptions?.find((item:any)=>item.value===propsItem?.left?.value)?.type;
    // if(propsItem?.left){
    //   opOptions = OperatorsOptions[curKey]||[]
    // }
    const curKey = propsItem?.left?.type;
    if (curKey) {
      opOptions = OperatorsOptions[curKey] || [];
    }
    const { left, op } = propsItem;
    let formItem: any = (
      <Form.Item
        {...restField}
        key={`${propsItem?.id}_right${propsItem.op}`}
        name={[formProps.name, 'right']}
        rules={[{ required: true, message: '请输入' }]}
      >
        <Input placeholder="请输入值" />
      </Form.Item>
    );
    try {
      if (['is_empty', 'is_not_empty'].includes(op)) {
        formItem = <></>;
      } else {
        switch (left?.type) {
          case ConditionFormTypeEnum.text:
            formItem = (
              <Form.Item
                {...restField}
                key={`${propsItem?.id}_right${propsItem.op}`}
                name={[formProps.name, 'right']}
                rules={[{ required: true, message: '请输入' }]}
              >
                <Input style={{ width: 200 }} placeholder="请输入值" />
              </Form.Item>
            );
            break;
          case ConditionFormTypeEnum.number:
            if (['between', 'not_between'].includes(op)) {
              formItem = (
                <Form.Item
                  {...restField}
                  key={`${propsItem?.id}_right${propsItem.op}`}
                  name={[formProps.name, 'right']}
                  rules={[{ required: true, message: '请输入' }]}
                >
                  <NumberRange />
                </Form.Item>
              );
            } else {
              formItem = (
                <Form.Item
                  {...restField}
                  key={`${propsItem?.id}_right${propsItem.op}`}
                  name={[formProps.name, 'right']}
                  rules={[{ required: true, message: '请输入' }]}
                >
                  <InputNumber placeholder="请输入" style={{ width: 200 }} />
                </Form.Item>
              );
            }
            break;
          case ConditionFormTypeEnum.date:
            if (['between', 'not_between'].includes(op)) {
              formItem = (
                <Form.Item
                  {...restField}
                  key={`${propsItem?.id}_right${propsItem.op}`}
                  name={[formProps.name, 'right']}
                  rules={[{ required: true, message: '请输入' }]}
                  // initialValue={[startTime ? dayjs(startTime, format || defaultDateFormat) : null, endTime ? dayjs(endTime, format || defaultDateFormat) : null]}
                >
                  <RangePickerForm
                    readonly={readonly}
                    showTime={showTime}
                    format={format || defaultDateFormat}
                  />
                </Form.Item>
              );
            } else {
              formItem = (
                <Form.Item
                  {...restField}
                  key={`${propsItem?.id}_right${propsItem.op}`}
                  name={[formProps.name, 'right']}
                  rules={[{ required: true, message: '请输入' }]}
                >
                  <DatePicker
                    showTime={showTime}
                    style={{ width: 200 }}
                    format={format || defaultDateFormat}
                  />
                </Form.Item>
              );
            }
            break;
          case ConditionFormTypeEnum.time:
            if (['between', 'not_between'].includes(op)) {
              formItem = (
                <Form.Item
                  {...restField}
                  key={`${propsItem?.id}_right${propsItem.op}`}
                  name={[formProps.name, 'right']}
                  rules={[{ required: true, message: '请输入' }]}
                  // initialValue={[startTime ? dayjs(startTime, format || defaultTimeFormatt) : null, endTime ? dayjs(endTime, format || defaultTimeFormatt) : null]}
                >
                  <TimePicker.RangePicker
                    format={format || defaultTimeFormatt}
                  />
                </Form.Item>
              );
            } else {
              formItem = (
                <Form.Item
                  {...restField}
                  key={`${propsItem?.id}_right${propsItem.op}`}
                  name={[formProps.name, 'right']}
                  rules={[{ required: true, message: '请输入' }]}
                >
                  <TimePicker format={format || defaultTimeFormatt} />
                </Form.Item>
              );
            }
            break;
          case ConditionFormTypeEnum.select:
            formItem = (
              <Form.Item
                {...restField}
                key={`${propsItem?.id}_right${propsItem.op}`}
                name={[formProps.name, 'right']}
                rules={[{ required: true, message: '请选择' }]}
              >
                <Select
                  style={{
                    width: '200px',
                  }}
                  filterOption={(input, option: any) =>
                    (option?.label || '').includes(input)
                  }
                  allowClear
                  mode="multiple"
                  maxCount={maxCount}
                  labelInValue
                  placeholder="请选择"
                  options={propsItem?.left?.selectOptions || []}
                ></Select>
              </Form.Item>
            );
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.error(error);
    }
    try {
      result = (
        <div className={styles.conditionListItem}>
          <Space style={{ display: 'flex' }} align="baseline">
            <Form.Item
              {...restField}
              key={`${propsItem?.id}_left`}
              name={[formProps.name, 'left']}
              rules={[{ required: true, message: '请选择' }]}
            >
              <Select
                style={{
                  width: '200px',
                }}
                allowClear
                labelInValue
                filterOption={(input, option: any) =>
                  (option?.label || '').includes(input)
                }
                placeholder="请选择"
                options={leftSelectOptions}
                onChange={(val, option: any) => {
                  console.log('val:', val);
                  console.log('option:', option);
                  conditionForm.setFields([
                    {
                      name: ['conditionList', ...curKeyPathArr, 'left'],
                      value: option, // 也可以是val，确保有label、value ，选择option是因为想要获取selectOptions和type值
                    },
                    {
                      name: ['conditionList', ...curKeyPathArr, 'op'],
                      value: undefined,
                    },
                    {
                      name: ['conditionList', ...curKeyPathArr, 'right'],
                      value: undefined,
                    },
                  ]);
                }}
              ></Select>
            </Form.Item>
            {propsItem.left && (
              <Form.Item
                {...restField}
                key={`${propsItem?.id}_op_${curKey}`}
                name={[formProps.name, 'op']}
                rules={[{ required: true, message: '请选择' }]}
              >
                <Select
                  style={{
                    width: '160px',
                  }}
                  allowClear
                  filterOption={(input, option: any) =>
                    (option?.label || '').includes(input)
                  }
                  placeholder="请选择"
                  options={opOptions}
                  onChange={(val, option: any) => {
                    conditionForm.setFields([
                      {
                        name: ['conditionList', ...curKeyPathArr, 'right'],
                        value: undefined,
                      },
                    ]);
                  }}
                ></Select>
              </Form.Item>
            )}
            {propsItem.op && <>{formItem}</>}
            <Form.Item
              {...restField}
              key={`${propsItem?.id}_not`}
              name={[formProps.name, 'not']}
            >
              <CheckboxForm label="非" />
            </Form.Item>
            <MinusCircleOutlined
              onClick={() => removeStore([formProps.name])}
            />
          </Space>
        </div>
      );
    } catch (error) {
      console.error(error);
    }
    return result;
  };
  const groupForm = (
    formProps: any,
    removeStore: any,
    propsItem: any,
    restField: any,
    keyPathArr: Array<any>,
  ) => {
    const curKeyPathArr = _.cloneDeep(keyPathArr);
    const curConditionStr =
      _.get(curConditionList, [...curKeyPathArr, 'conjunction']) || 'and';
    const curConditionInfo: any = conjunctionOptions.find(
      (item: any) => item?.value === curConditionStr,
    );
    return (
      <>
        <Form.Item
          noStyle
          name={[formProps.name, 'conditionList']}
          initialValue={[]}
        />
        <Form.Item
          noStyle
          name={[formProps.name, 'id']}
          initialValue={nanoid()}
        />
        <Form.Item
          noStyle
          name={[formProps.name, 'conjunction']}
          initialValue={'and'}
        />
        <Form.List
          key={`${propsItem.id}_conditionList`}
          name={[formProps.name, 'conditionList']}
        >
          {(fields, { add, remove }) => (
            <div className={styles.conditionList}>
              <div className={styles.conditionListCon}>
                {fields.map((formProps2: any, index) => {
                  const { key, name, ...restField } = formProps2;
                  const nowKeyPath = [...curKeyPathArr, 'conditionList', name];
                  const curItem: any = _.get(curConditionList, nowKeyPath);
                  // const curFormValue = conditionForm.getFieldValue(curPath);
                  let innerForm: any = '';
                  if (curItem?.type === ConditionType.group) {
                    innerForm = groupForm(
                      formProps2,
                      remove,
                      curItem,
                      restField,
                      nowKeyPath,
                    );
                  } else if (curItem?.type === ConditionType.single) {
                    innerForm = recordForm(
                      formProps2,
                      remove,
                      curItem,
                      restField,
                      nowKeyPath,
                    );
                  }
                  return (
                    <div key={`${propsItem?.id}_${key}_innerForm`}>
                      {innerForm}
                    </div>
                  );
                })}
              </div>
              <div className={styles.conditionListOptions}>
                <Button
                  className={styles.groupBtn}
                  type="primary"
                  size="small"
                  onClick={() => {
                    // const curFormValue: any = get(curConditionList, curPathArr, []);
                    // console.log("curFormValue:", curFormValue);
                    // curFormValue.push(makeRule("record", propsItem?.deep));
                    // conditionForm.setFieldValue(curPathArr, curFormValue);
                    add(makeRule(ConditionType.single, propsItem?.deep));
                  }}
                >
                  添加条件
                </Button>
                {propsItem?.deep < 5 && (
                  <Button
                    className={styles.groupBtn}
                    type="primary"
                    size="small"
                    onClick={() => {
                      add(makeRule(ConditionType.group, propsItem?.deep));
                      // const curFormValue: any = get(curConditionList, curPathArr, []);
                      // console.log("curFormValue:", curFormValue);
                      // curFormValue.push(makeRule("group", propsItem?.deep));
                      // conditionForm.setFieldValue(curPathArr, curFormValue);
                    }}
                  >
                    添加条件组
                  </Button>
                )}
                <Button
                  className={styles.groupBtn}
                  type="primary"
                  size="small"
                  danger
                  onClick={() => {
                    removeStore(formProps.name);
                  }}
                >
                  删除条件组
                </Button>
              </div>
              <div
                className={styles.leftLine}
                style={{
                  background: curConditionInfo.background,
                  color: curConditionInfo.color,
                }}
              >
                <div
                  className={styles.lineMidBox}
                  style={{
                    background: curConditionInfo.background,
                    color: curConditionInfo.color,
                  }}
                >
                  <Dropdown
                    trigger={readonly ? [] : ['click']}
                    overlayClassName={styles.dropdown}
                    menu={{
                      items: DropdownMenuOptions,
                      onClick: (e) => {
                        conditionForm.setFields([
                          {
                            name: [
                              'conditionList',
                              ...curKeyPathArr,
                              'conjunction',
                            ],
                            value: e.key,
                          },
                        ]);
                      },
                    }}
                  >
                    <span
                      className={styles.conjunction}
                      key={`${JSON.stringify(curKeyPathArr)}_conjunction_${
                        curConditionData.label
                      }`}
                    >
                      {curConditionInfo.label}
                    </span>
                  </Dropdown>
                </div>
              </div>
            </div>
          )}
        </Form.List>
      </>
    );
  };
  return (
    <div className={styles.dumi_conditionBuilder}>
      <ConfigProvider locale={zhCN}>
        <Form form={conditionForm} onFinish={handleFormFinish}>
          <Form.Item noStyle name={['id']} initialValue={nanoid()} />
          <Form.Item noStyle name={['conjunction']} initialValue={'and'} />
          <Form.List name="conditionList">
            {(fields, { add, remove }) => (
              <div className={styles.conditionList}>
                <div className={styles.conditionListCon}>
                  {fields.map((formProps: any, index) => {
                    const { key, name, ...restField } = formProps;
                    const curItem: any = curConditionList[name];
                    let innerForm: any = '';
                    if (curItem?.type === ConditionType.group) {
                      innerForm = groupForm(
                        formProps,
                        remove,
                        curItem,
                        restField,
                        [name],
                      );
                    } else if (curItem?.type === ConditionType.single) {
                      innerForm = recordForm(
                        formProps,
                        remove,
                        curItem,
                        restField,
                        [name],
                      );
                    }
                    return <div key={key}>{innerForm}</div>;
                  })}
                </div>
                <div className={styles.conditionListOptions}>
                  <Button
                    className={styles.groupBtn}
                    type="primary"
                    size="small"
                    onClick={() => {
                      add(makeRule(ConditionType.single, 0));
                    }}
                  >
                    添加条件
                  </Button>
                  <Button
                    className={styles.groupBtn}
                    type="primary"
                    size="small"
                    onClick={() => {
                      add(makeRule(ConditionType.group, 0));
                    }}
                  >
                    添加条件组
                  </Button>
                </div>

                <div
                  className={styles.leftLine}
                  style={{
                    background: curConditionData?.background,
                    color: curConditionData?.color,
                  }}
                >
                  <div
                    className={styles.lineMidBox}
                    style={{
                      background: curConditionData?.background,
                      color: curConditionData?.color,
                    }}
                  >
                    <Dropdown
                      trigger={readonly ? [] : ['click']}
                      overlayClassName={styles.dropdown}
                      menu={{
                        items: DropdownMenuOptions,
                        onClick: (e) => {
                          conditionForm.setFields([
                            {
                              name: ['conjunction'],
                              value: e.key,
                            },
                          ]);
                        },
                      }}
                    >
                      <span
                        className={styles.conjunction}
                        key={`conjunction${curConditionData?.label}`}
                      >
                        {curConditionData?.label}
                      </span>
                    </Dropdown>
                  </div>
                </div>
              </div>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default ConditionBuilder;
