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
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

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
  status: number;
  capacity: string;
  chargeEquipment: string;
  totalHours: string;
  mark: string;
}

const OrderDetail: React.FC = () => {
  const navigate = useNavigate();
  // const { orderNo } = useParams();
  const [searchParams] = useSearchParams();
  const [curData, setCurData] = useState<IcurDatasType| null>(null);
  const initParam = useMemo(() => ({ orderNo: searchParams.get("orderNo") }), []);
  const { result, loading } = useFetch<IcurDatasType>(
    "/api/orderDetail",
    "Post",
    initParam,
  );
  useEffect(() => {
    console.log(result);
    const newData = result[0];
    setCurData(() => ({
      ...newData,
    }));
  }, [result]);

  return (
    <div className={curStyle["current-container"]}>
      <Flex vertical={true} gap={"small"}>
        <Flex justify="flex-end">
          <Button
            type="primary"
            onClick={() => navigate("/root/operations/orders")}
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
