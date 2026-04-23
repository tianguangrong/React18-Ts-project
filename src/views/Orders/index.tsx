import React, { useEffect, useRef, useState } from "react";
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
} from "antd";
import curStyle from "./index.module.scss";
import setting from "../../globalSetting";
import type { Dayjs } from "dayjs";
import type { TableColumnsType, TableProps } from "antd";
import { httpPost } from "../../utils/axios";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];
type DatePickerType = [
  start: Dayjs | null | undefined | string,
  end: Dayjs | null | undefined | string,
];
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
interface Ipage {
  pageNum: number;
  pageSize: number;
  total: number;
}

const columns: TableColumnsType<DataType> = [
  { title: "Name", dataIndex: "name" },
  { title: "Age", dataIndex: "age" },
  { title: "Address", dataIndex: "address" },
];
const dataSource = Array.from<DataType>({ length: 46 }).map<DataType>(
  (_, i) => ({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  }),
);

const Orders: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [deviceNumber, setDeviceNumber] = useState<string>("");
  const [payType, setpayType] = useState<string | undefined>(undefined);
  const [dateValues, setDateValues] = useState<any>([]);
  const [curStatus, setCurStatus] = useState<string | undefined>(undefined);
  const dateValuesRef = useRef<DatePickerType>(["", ""]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<Ipage>({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  });

  // 订单编号数据记录
  const orderNumberChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setOrderNumber(e.target.value);
  };
  // 订单编号数据记录
  const deviceNumberChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDeviceNumber(e.target.value);
  };
  // 重置数据
  const handleResetForms = () => {
    setOrderNumber("");
    setpayType(undefined);
    setDeviceNumber("");
    setDateValues([]);
    dateValuesRef.current = ["", ""];
    setCurStatus(undefined);
  };
  // 站点名称记录
  const handlePayTypeChange = (value: string): void => {
    setpayType(value);
  };
  // 状态记录
  const handleStatusChange = (value: string) => {
    console.log(`selected ${value}`);
    setCurStatus(value);
  };
  // 日期数据就
  const handleDatepickerChange = (values: any, dateString: DatePickerType) => {
    setDateValues(values);
    dateValuesRef.current = dateString;
  };
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  // 请求api获取数据 /api/orderList
  const getOrderManDatas = async (): Promise<void> => {
    setLoading(() => true);
    try {
      const datas = {
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize,
      };
      const { code, data } = (await httpPost("/api/orderList", datas)) as any;
      debugger;
      if (code === 200) {
        console.log(data);
        debugger;
      }
      setLoading(() => false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const pageOnChange = (pageNum: number, pageSize: number) => {};
  useEffect(() => {
    getOrderManDatas();
  }, []);
  return (
    <div className={curStyle["current-container"]}>
      <Flex vertical={true} gap={"small"}>
        <Card
          styles={{
            body: {
              ...setting.boxShadow,
              padding: "12px",
            },
          }}
        >
          <Row gutter={16} style={{ marginBottom: "12px" }}>
            <Col span={6}>
              <Input
                value={orderNumber}
                allowClear
                onChange={orderNumberChange}
                placeholder="请输入订单编号"
              />
            </Col>
            <Col span={6}>
              <Select
                style={{ width: "100%" }}
                onChange={handleStatusChange}
                placeholder="请选择订单状态"
                allowClear
                value={curStatus}
                options={[
                  { value: "进行中", label: "进行中" },
                  { value: "异常", label: "异常" },
                  { value: "已完成", label: "已完成" },
                ]}
              />
            </Col>
            <Col span={6}>
              <Input
                value={deviceNumber}
                allowClear
                onChange={deviceNumberChange}
                placeholder="请输入设备编号"
              />
            </Col>
            <Col span={6}></Col>
          </Row>

          <Row gutter={16}>
            <Col span={6}>
              <Select
                style={{ width: "100%" }}
                allowClear
                onChange={handlePayTypeChange}
                placeholder="请选择支付方式"
                
                value={payType}
                options={[
                  { value: "支付宝", label: "支付宝" },
                  { value: "微信", label: "微信" },
                  { value: "储值卡", label: "储值卡" },
                ]}
              />
            </Col>
            <Col span={6}>
              <DatePicker.RangePicker
                style={{ width: "100%" }}
                placeholder={["开始日期", "结束日期"]}
                format="YYYY-MM-DD"
                value={dateValues}
                onChange={handleDatepickerChange}
              />
            </Col>
            <Col span={6}></Col>
            <Col span={6}>
              <Flex gap={"small"} justify="end">
                <Button type="primary">查 询</Button>
                <Button onClick={handleResetForms}>重 置</Button>
              </Flex>
            </Col>
          </Row>
        </Card>
        <Card
          styles={{
            body: {
              ...setting.boxShadow,
              padding: "12px",
            },
          }}
        >
          <Button color="danger" variant="solid">
            批量删除
          </Button>
        </Card>
        <Card
          loading={loading}
          styles={{
            body: {
              ...setting.boxShadow,
              padding: "12px",
            },
          }}
        >
          <Table<DataType>
            size="middle"
            style={{ width: "auto", flex: 1 }}
            scroll={{ x: "max-content" }}
            pagination={{
              current: pagination.pageNum,
              pageSize: pagination.pageSize,
              total: pagination.total,
              onChange: pageOnChange,
            }}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
          />
        </Card>
      </Flex>
    </div>
  );
};

export default Orders;
