import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
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
  type PopconfirmProps,
  type TableColumnsType,
  type TableProps,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import curStyle from "./index.module.scss";
import setting from "../../globalSetting";
import type { Dayjs } from "dayjs";
import useFetch from "../../hooks/useFetch";
import { useNavigate, useSearchParams } from "react-router-dom";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];
type DatePickerType = [
  start: Dayjs | null | undefined | string,
  end: Dayjs | null | undefined | string,
];
interface DataType {
  id: string;
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
  { value: "全部", label: "全部" },
  { value: "1", label: "进行中" },
  { value: "2", label: "异常中" },
  { value: "3", label: "已完成" },
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
];

const payLabelByStatus = (value: string): any => {
  const current = statusOptions.find((item) => item.value === value);
  if (current?.label) {
    return (
      <Tag
        color={+value === 1 ? "green" : +value === 2 ? "red" : "blue"}
        bordered={false}
      >
        {current.label}
      </Tag>
    );
  }
  return <span style={{ color: "lightgray" }}>未知</span>;
};

const Orders: React.FC = memo(() => {
  const navigate = useNavigate();
  const blankSearchParam = useMemo(
    () => ({
      orderNum: "",
      equipmentNo: "",
      pay: "全部",
      dates: ["", ""],
      status: "全部",
    }),
    [],
  );
  const [dateValues, setDateValues] = useState<any>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchForm, setSearchForm] =
    useState<typeof blankSearchParam>(blankSearchParam);
  const [searchParams, setSearchParams] = useSearchParams()

  const {
    result,
    pagination,
    setPagination,
    setCurrentParamsForDatas,
    loading,
    latestResultRef,
  } = useFetch<DataType>("/api/orderList", "Post");
  const handleJumpToDetail = (orderNo:string) => {
    navigate(`/root/operations/detail?orderNo=${orderNo}`);
  };
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
              <Button
                color="primary"
                variant="text"
                onClick={() => handleJumpToDetail(row.orderNo)}
              >
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
    setSearchForm({
      ...searchForm,
      orderNum: e.target.value,
    });
  };
  // 订单编号数据记录
  const deviceNumberChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchForm({
      ...searchForm,
      equipmentNo: e.target.value,
    });
  };
  // 重置数据
  const handleResetForms = () => {
    setDateValues(null);
    setSearchForm({
      ...blankSearchParam,
    });
    setCurrentParamsForDatas({});
    setPagination(() => {
      return {
        pageSize: 10,
        pageNum: 1,
        total: 0,
      };
    });
  };
  const handleSearchForms = () => {
    const formatSearchForm: Record<string, any> = {
      ...searchForm,
      startDate: searchForm.dates[0],
      endDate: searchForm.dates[1],
    };
    delete formatSearchForm.dates;
    setCurrentParamsForDatas({ ...formatSearchForm });
    console.log("latestResultRef", latestResultRef);
  };
  // 站点名称记录
  const handlePayTypeChange = (value: string): void => {
    setSearchForm((prev) => ({
      ...prev,
      pay: value,
    }));
  };
  // 状态记录
  const handleStatusChange = (value: string) => {
    setSearchForm((prev) => ({
      ...prev,
      status: value,
    }));
  };
  // 日期数据就
  const handleDatepickerChange = (values: any, dateString: DatePickerType) => {
    setDateValues(values);
    setSearchForm((prev) => ({
      ...prev,
      dates: dateString as [string, string],
    }));
  };
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(() => newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const pageOnChange = (pageNum: number, pageSize: number) => {
    setPagination((prev: Ipage) => ({
      ...prev,
      pageNum,
      pageSize,
    }));
  };
  const handleBatchDeleteDatas = () => {
    message.success("删除成功！");
  };

  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    handleBatchDeleteDatas();
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.info("取消删除！");
  };
  useEffect(() => {
    // getOrderManDatas();
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
                value={searchForm.orderNum}
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
                value={searchForm.status}
                options={statusOptions}
              />
            </Col>
            <Col span={6}>
              <Input
                value={searchForm.equipmentNo}
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
                value={searchForm.pay}
                options={[
                  { value: "全部", label: "全部" },
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
                <Button type="primary" onClick={handleSearchForms}>
                  查 询
                </Button>
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
          <Popconfirm
            title="提示"
            description="您确定要对选中的数据进行批量删除吗?"
            onConfirm={confirm}
            onCancel={cancel}
            disabled={selectedRowKeys.length <= 0}
            okText="确定"
            cancelText="取消"
          >
            <Button
              disabled={selectedRowKeys.length <= 0}
              color="danger"
              variant="solid"
            >
              批量删除
            </Button>
          </Popconfirm>
        </Card>
        <Card
          styles={{
            body: {
              ...setting.boxShadow,
              padding: "12px",
            },
          }}
        >
          <Table<DataType>
            size="middle"
            loading={loading}
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
            dataSource={result}
          />
        </Card>
      </Flex>
    </div>
  );
});

export default Orders;
