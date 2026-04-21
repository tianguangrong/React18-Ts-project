import React, { useEffect, useState } from "react";
import curStyle from "./index.module.scss";
import setting from "../../globalSetting";
import { Flex, Card, Select, type SelectProps, Row, Col, Input } from "antd";
import { httpPost } from "../../utils/axios/index";

const options: SelectProps["options"] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}
const Management: React.FC = () => {
  const [option, setOption] = useState<typeof options | []>([]);
  const [statusList, setStatusList] = useState<typeof options | []>([]);

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
    // debugger;
  };
  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  // 请求接口数据
  const getCurrentDataForRequest: () => void = async () => {
    try {
      const { code, data } = (await httpPost("/api/currentList", {})) as any;
      if (code === 200) {
        setOption(
          data.map((item: { [key: string]: any }) => ({
            value: item.id,
            label: item.name,
          })),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getCurrentStatusForRequest: () => void = async () => {
    try {
      const { code, data } = (await httpPost("/api/currentStatus", {})) as any;
      if (code === 200) {
        setStatusList(
          data.map((item: { [key: string]: any }) => ({
            value: item.id,
            label: item.name,
          })),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  // /api/currentStatus
  useEffect(() => {
    getCurrentDataForRequest();
    getCurrentStatusForRequest();
    return () => {};
  }, []);

  // useEffect(() => {
  //   alert(1);
  //   return () => {};
  // }, [searchValue]);

  return (
    <div className={curStyle["current-container"]}>
      <Card
        styles={{
          body: {
            ...setting.boxShadow,
          },
        }}
      >
        <Row gutter={12}>
          <Col span={12}>
            {/* 
              mode="tags" */}
            <Select
              allowClear
              mode="multiple"
              style={{ width: "100%" }}
              optionFilterProp="label"
              filterOption
              placeholder="请选择"
              onChange={handleChange}
              onSearch={onSearch}
              options={option}
            />
          </Col>
        </Row>
      </Card>
      <div className={curStyle["padding12"]}></div>
      <Card
        styles={{
          body: {
            ...setting.boxShadow,
          },
        }}
      >
        2
      </Card>
      <div className={curStyle["padding12"]}></div>
      <Card
        styles={{
          body: {
            ...setting.boxShadow,
          },
        }}
      >
        3
      </Card>
    </div>
  );
};

export default Management;
