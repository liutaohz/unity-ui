import React, { FC, useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { cloneDeep, get } from 'lodash';
import { nanoid } from 'nanoid';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Space,
  Input,
  Select,
  Col,
  Row,
  Radio,
  message,
} from 'antd';
import styles from './index.less';

interface DynamicLevelFormProps {
  className?: string;
}
const DynamicLevelForm = (props: any) => {
  const { className = '', ...other } = props;
  const [conditionForm] = Form.useForm();
  const curRuleList: any = Form.useWatch('ruleList', conditionForm);
  const makeRule = (type: any, deep: number = 0) => {
    let obj: any = {
      type, // group record
      conditionSelect: undefined, // 条件名称
      conditionOp: undefined, // 操作符
      conditionVal: undefined, // 值
      id: nanoid(),
      desc: 'hello',
      deep: deep + 1,
    };
    if (type === 'group') {
      obj = {
        ...obj,
        ruleList: [], // 条件组
      };
    }
    return obj;
  };
  useEffect(() => {
    console.log('curRuleList:', curRuleList);
  }, [curRuleList]);
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
    try {
      result = (
        <div className={styles.ruleListItem}>
          <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
            <Form.Item
              {...restField}
              key={`${propsItem?.id}_conditionSelect`}
              name={[formProps.name, 'conditionSelect']}
              rules={[{ required: true, message: '请输入' }]}
            >
              <Input placeholder="请输入条件名称" />
            </Form.Item>
            <Form.Item
              {...restField}
              key={`${propsItem?.id}_conditionOp`}
              name={[formProps.name, 'conditionOp']}
              rules={[{ required: true, message: '请输入' }]}
            >
              <Input placeholder="请输入操作符" />
            </Form.Item>
            <Form.Item
              {...restField}
              key={`${propsItem?.id}_conditionVal`}
              name={[formProps.name, 'conditionVal']}
              rules={[{ required: true, message: '请输入' }]}
            >
              <Input placeholder="请输入值" />
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
    const curKeyPathArr = cloneDeep(keyPathArr);
    return (
      <>
        <Form.Item
          noStyle
          name={[formProps.name, 'ruleList']}
          initialValue={[]}
        />
        <Form.List
          key={`${propsItem.id}_ruleList`}
          name={[formProps.name, 'ruleList']}
        >
          {(fields, { add, remove }) => (
            <div className={styles.ruleList}>
              <h3>组{propsItem?.deep}</h3>
              <div className={styles.ruleListCon}>
                {fields.map((formProps2: any, index) => {
                  const { key, name, ...restField } = formProps2;
                  const nowKeyPath = [...curKeyPathArr, 'ruleList', name];
                  console.log('nowKeyPath====3', nowKeyPath);
                  const curItem: any = get(curRuleList, nowKeyPath);
                  // const curFormValue = conditionForm.getFieldValue(curPath);
                  console.log('FormValue====3', curItem);
                  let innerForm: any = '';
                  if (curItem?.type === 'group') {
                    innerForm = groupForm(
                      formProps2,
                      remove,
                      curItem,
                      restField,
                      nowKeyPath,
                    );
                  } else if (curItem?.type === 'record') {
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
              <div className={styles.ruleListOptions}>
                <Button
                  className={styles.groupBtn}
                  type="primary"
                  onClick={() => {
                    // const curFormValue: any = get(curRuleList, curPathArr, []);
                    // console.log("curFormValue:", curFormValue);
                    // curFormValue.push(makeRule("record", propsItem?.deep));
                    // conditionForm.setFieldValue(curPathArr, curFormValue);
                    add(makeRule('record', propsItem?.deep));
                  }}
                >
                  添加条件
                </Button>
                {propsItem?.deep < 5 && (
                  <Button
                    className={styles.groupBtn}
                    type="primary"
                    onClick={() => {
                      add(makeRule('group', propsItem?.deep));
                      // const curFormValue: any = get(curRuleList, curPathArr, []);
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
                  danger
                  onClick={() => {
                    removeStore(formProps.name);
                  }}
                >
                  删除条件组
                </Button>
              </div>
            </div>
          )}
        </Form.List>
      </>
    );
  };
  return (
    <div className={styles.dynamicLevelForm}>
      <Form
        form={conditionForm}
        onFinish={handleFormFinish}
        initialValues={{
          ruleList: [],
        }}
      >
        <Form.List name="ruleList">
          {(fields, { add, remove }) => (
            <div className={styles.ruleList}>
              <div className={styles.ruleListCon}>
                {fields.map((formProps: any, index) => {
                  const { key, name, ...restField } = formProps;
                  const curItem: any = curRuleList[name];
                  console.log('curItem=====:', curItem);
                  let innerForm: any = '';
                  if (curItem?.type === 'group') {
                    innerForm = groupForm(
                      formProps,
                      remove,
                      curItem,
                      restField,
                      [name],
                    );
                  } else if (curItem?.type === 'record') {
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
              <div className={styles.ruleListOptions}>
                <Button
                  className={styles.groupBtn}
                  type="primary"
                  onClick={() => {
                    add(makeRule('record', 0));
                  }}
                >
                  添加条件
                </Button>
                <Button
                  className={styles.groupBtn}
                  type="primary"
                  onClick={() => {
                    add(makeRule('group', 0));
                  }}
                >
                  添加条件组
                </Button>
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
    </div>
  );
};

export default DynamicLevelForm;
