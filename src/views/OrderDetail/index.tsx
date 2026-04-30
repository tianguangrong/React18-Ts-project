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
} from "antd";
import curStyle from "./index.module.scss";
import setting from "../../globalSetting";
import useFetch from "../../hooks/useFetch";
import {
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
} from "react-router-dom";

interface IcurDatasType {
  id: string;
  key: React.Key;
  orderNo: string;
  date: string;
  startTime: string;
  endTime: string;
  equipmentNo: string;
  money: number;
  pay: string;
  city: string;
  status: string;
  capacity: string;
  chargeEquipment: string;
  totalHours: string;
  mark: string;
}

const OrderDetail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // 获取点击前订单管理页面的查询条件
  const ordersStateRef= useRef(null)

  const [searchParams] = useSearchParams();
  const [curData, setCurData] = useState<IcurDatasType | null>(null);
  const initParam = useMemo(
    () => ({ orderNo: searchParams.get("orderNo") }),
    [],
  );
  const { result, loading } = useFetch<IcurDatasType>(
    "/api/orderDetail",
    "Post",
    initParam,
  );
  const statusOptions = [
    { value: "全部", label: "全部" },
    { value: "1", label: "进行中" },
    { value: "2", label: "异常中" },
    { value: "3", label: "已完成" },
  ];
  const payLabelByStatus = (value: string): any => {
    if (!value) return "未知";
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
  };
  useEffect(() => {
    if (result) {
      const newData = result[0];
      setCurData(() => ({
        ...newData,
      }));
    }
  }, [result]);
  useEffect(() => {
    if (location) {
      console.log("location", location.state);
      ordersStateRef.current = location.state;
    }
  }, [location]);
  const gobackToOrders = () => {
    navigate("/root/operations/orders", {
      state: ordersStateRef.current
    })
  }
  return (
    <div className={curStyle["current-container"]}>
      <Flex vertical={true} gap={"small"}>
        <Flex justify="flex-end">
          <Button
            type="primary"
            onClick={ gobackToOrders }
          >
            返回
          </Button>
        </Flex>
        <Card
          loading={loading}
          styles={{
            body: {
              ...setting.boxShadow,
              padding: "12px",
            },
          }}
        >
          <Row gutter={16}>
            <Col span={24}>
              <h3>订单编号：{curData?.orderNo}</h3>
            </Col>
          </Row>
          <Row gutter={16}>
            <Flex vertical gap={"small"} style={{ width: "100%" }}>
              <Flex style={{ marginTop: "16px" }}>
                <Col span={8}>
                  <span>订单编号：</span>
                  <span>{curData?.orderNo}</span>
                </Col>
                <Col span={8}>
                  <span>设备编号：</span>
                  <span>{curData?.equipmentNo}</span>
                </Col>
                <Col span={8}>
                  <span>订单日期：</span>
                  <span>{curData?.date}</span>
                </Col>
              </Flex>
              <Flex>
                <Col span={8}>
                  <span>站点名称：</span>
                  <span>北京西单充电站</span>
                </Col>
                <Col span={8}>
                  <span>开始时间：</span>
                  <span>{curData?.startTime}</span>
                </Col>
                <Col span={8}>
                  <span>结束时间：</span>
                  <span>{curData?.endTime}</span>
                </Col>
              </Flex>

              <Flex>
                <Col span={8}>
                  <span>订单金额：</span>
                  <span>{curData?.money}</span>
                </Col>
                <Col span={8}>
                  <span>支付方式：</span>
                  <span>{curData?.pay}</span>
                </Col>
                <Col span={8}>
                  <span>所在城市：</span>
                  <span>{curData?.city}</span>
                </Col>
              </Flex>

              <Flex>
                <Col span={8}>
                  <span>充电总量(°)：</span>
                  <span>{curData?.capacity}</span>
                </Col>
                <Col span={8}>
                  <span>充电设备：</span>
                  <span>{curData?.chargeEquipment}</span>
                </Col>
                <Col span={8}>
                  <span>充电总时长(h)：</span>
                  <span>{curData?.totalHours}</span>
                </Col>
              </Flex>

              <Flex>
                <Col span={8}>
                  <span>支付方式：</span>
                  <span>
                    <Tag color="green">{curData?.pay}</Tag>
                  </span>
                </Col>
                <Col span={8}>
                  <span>订单状态：</span>
                  <span>{payLabelByStatus(curData?.status ?? "")}</span>
                </Col>
                <Col span={8}>
                  <span>充电总金额(元)：</span>
                  <span>{curData?.money}</span>
                </Col>
              </Flex>
              <Flex>
                <Col span={8}>
                  <span>备注：</span>
                  <span>{curData?.mark}</span>
                </Col>
              </Flex>
            </Flex>
          </Row>
        </Card>
      </Flex>
    </div>
  );
};

export default OrderDetail;
