import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
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
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
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
  orderNo: string;
  date: string;
  startTime: string;
  endTime: string;
  equipmentNo: string;
  money: number;
  pay: string;
  status: number;
  opera?: any;
}
interface Ipage {
  pageNum: number;
  pageSize: number;
  total: number;
}

const statusOptions = [
  { value: 1, label: "进行中" },
  { value: 2, label: "异常中" },
  { value: 3, label: "已完成" },
];
const columns: TableColumnsType<DataType> = [
  { title: "序号", dataIndex: "index", key: "index" },
  { title: "订单编号", dataIndex: "orderNo", key: "orderNo" },
  { title: "创建日期", dataIndex: "date", key: "date" },
  { title: "开始时间", dataIndex: "startTime", key: "startTime" },
  { title: "结束时间", dataIndex: "endTime", key: "endTime" },
  { title: "设备编号", dataIndex: "equipmentNo", key: "equipmentNo" },
  { title: "消费金额(元)", dataIndex: "money", key: "money" },
  { title: "支付方式", dataIndex: "pay", key: "pay" },
  // {
  //   title: "订单状态",
  //   dataIndex: "status",
  //   render: (_, { status }) => <>{status && payLabelByStatus(status)}</>,
  // },
];

const payLabelByStatus = (value: number): any => {
  const current = statusOptions.find((item) => item.value === value);
  if (current?.label) {
    return (
      <Tag
        color={value === 1 ? "green" : value === 2 ? "red" : "blue"}
        bordered={false}
      >
        {current.label}
      </Tag>
    );
  }
  return <span style={{ color: "lightgray" }}>未知</span>;
};
const Orders: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [deviceNumber, setDeviceNumber] = useState<string>("");
  const [payType, setpayType] = useState<string | undefined>(undefined);
  const [dateValues, setDateValues] = useState<any>([]);
  const [curStatus, setCurStatus] = useState<string | undefined>(undefined);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [pagination, setPagination] = useState<Ipage>({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  });

  
  const dateValuesRef = useRef<DatePickerType>(["", ""]);
  const originDatasRef = useRef<{list: DataType[],total: number} | undefined>(undefined);


  // table 每行数据内容
  const currentColumns: TableProps<DataType>["columns"] = useMemo(() => {
    return [
      ...columns,
      {
        title: "订单状态",
        dataIndex: "status",
        render: (_, { status }) => <>{status && payLabelByStatus(status)}</>,
      },
      {
        title: "操作",
        key: "opera",
        width: 200,
        fixed: "right",
        render: (_, row: any) => {
          return (
            <Space size="middle">
              <Button color="primary" variant="text" onClick={() => {}}>
                详情
              </Button>
              <Popconfirm
                title="数据删除"
                description="你确定要删除该条数据吗？"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                cancelText="取消"
                okText="确定"
                onConfirm={() => {}}
              >
                <Button color="danger" variant="text">
                  删除
                </Button>
              </Popconfirm>
            </Space>
          );
        },
      },
    ];
  }, []);
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
    debugger;
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // 请求api获取数据 /api/orderList
  const getOrderManDatas = useCallback(async () => {
    setLoading(() => true);
    try {
      const datas = {
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize,
      };
      const {
        code,
        data: { list, total },
      } = (await httpPost("/api/orderList", datas)) as any;
      if (code === 200) {
        setDataSource(
          list.map((item: DataType, index: number) => ({
            ...item,
            index: index + 1,
          })),
        );
        setPagination({
          ...pagination,
          total,
        });
        originDatasRef.current = {
          list,
          total
        }
      }
      setLoading(() => false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, []);
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
                options={statusOptions}
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
            columns={currentColumns}
            dataSource={dataSource}
          />
        </Card>
      </Flex>
    </div>
  );
};

export default Orders;
