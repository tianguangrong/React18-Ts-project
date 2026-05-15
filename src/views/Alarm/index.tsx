import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
  useDeferredValue,
} from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Flex,
  Input,
  DatePicker,
  Space,
  Select,
  Table,
  Tag,
  Popconfirm,
  message,
  Form,
  Radio,
  Empty,
  type FormProps,
  type CheckboxGroupProps,
  type PopconfirmProps,
  type TableColumnsType,
  type TableProps,
  type TreeProps,
} from "antd";
import curStyle from "./index.module.scss";
import setting from "../../globalSetting";
import useFetch from "../../hooks/useFetch";

const options: CheckboxGroupProps<string>["options"] = [
  { label: "严重告警", value: "1" },
  { label: "紧急告警", value: "2" },
  { label: "重要告警", value: "3" },
  { label: "一般告警", value: "4" },
];

const Alarm: React.FC = () => {
  return (
    <div className={curStyle["current-container"]}>
      <Space
        direction="vertical"
        size="middle"
        style={{ display: "flex", width: "100%", height: "100%" }}
      >
        <Card
          styles={{
            body: {
              ...setting.boxShadow,
              padding: "12px",
            },
          }}
        >
          <Radio.Group
            options={options}
            defaultValue="1"
            optionType="button"
            buttonStyle="solid"
          />
        </Card>
        <Card
          style={{ flex: 1 }}
          styles={{
            body: {
              ...setting.boxShadow,
              padding: "12px",
            },
          }}
        >
          2
        </Card>
      </Space>
    </div>
  );
};

export default Alarm;
