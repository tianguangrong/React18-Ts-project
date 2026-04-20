import React, { useEffect, useRef, useMemo, useState } from "react";
import { Card, Flex, Row, Col, Tag, Space, Input, Table } from "antd";
import { ProfileOutlined, SearchOutlined } from "@ant-design/icons";
import curStyle from "./index.module.scss";
import * as echarts from "echarts";
import eOption from "./eOption";
import type { TableProps } from "antd";
import { httpGet, httpPost } from "@utils/axios";
import setting from "@/globalSetting.ts";
interface Istatics {
  label: string;
  type: string;
  count: number;
  down?: number;
  up?: string;
}

interface DataType {
  key: React.Key;
  index?: number;
  id?: string;
  city: string;
  count: number;
  electricity: number;
  member: number;
  month: number;
  mpercent: number;
  name: string;
  sigleDayFee: number;
  parkingFee: number;
  percent: number;
  serviceFee: number;
}
const totalStatics: Istatics[] = [
  {
    label: "今日总收入(元)",
    type: "down",
    count: 776571,
    down: -32,
  },
  {
    label: "本月总收入(万元)",
    type: "down",
    count: 57231,
    down: -32,
  },
  {
    label: "会员卡储蓄金额(元)",
    type: "up",
    count: 9545,
    up: "+32",
  },
  {
    label: "服务费总额(元)",
    type: "up",
    count: 776571,
    up: "+12",
  },
  {
    label: "停车费总额(元)",
    type: "down",
    count: 358,
    down: -3,
  },
  {
    label: "电费总金额(元)",
    type: "up",
    count: 76575,
    up: "+32",
  },
];
const { Search } = Input;
const suffix = (
  <SearchOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);
const Revenue: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [tableData, setTableData] = useState<DataType[] | []>([]);
  const [pagination, setPagination] = useState<{
    pageNum: number;
    pageSize: number;
    total: number;
  }>({ pageNum: 1, pageSize: 8, total: 0 });
  const revenueRef = useRef<HTMLDivElement>(null);
  // const boxShadow = { boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.12)" };
  let revenueInstance: echarts.ECharts | null = null;
  const initRevenueEcharts = (eOpt: typeof eOption): void => {
    revenueInstance = echarts.init(revenueRef.current);
    revenueInstance.setOption(eOpt);
  };
  const getEchartsDatas: () => void = async () => {
    try {
      const {
        code,
        data: { list },
      } = (await httpGet("/api/revenueChart")) as any;
      if (code === 200) {
        console.log(list);
        eOption.series[0].data = list[0]?.data ?? [];
        eOption.series[1].data = list[1]?.data ?? [];
        console.log("eOption", eOption);

        initRevenueEcharts(eOption);
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  useEffect(() => {
    getEchartsDatas();
    window.addEventListener("resize", () => {
      revenueInstance?.resize();
    });
    return () => {
      revenueInstance?.dispose();
    };
  }, []);
  const onSearch = (value: string) => {
    setPagination({
      ...pagination,
      pageNum: 1,
    });
    setInputValue(value);
  };

  // mpercent: number;
  // percent: number;
  const memoColumns: TableProps<DataType>["columns"] = useMemo(() => {
    return [
      {
        title: "序号",
        dataIndex: "index",
        render: (idx: number) => <a>{idx}</a>,
        width: 80,
        fixed: true,
      },
      {
        title: "充电站名称",
        dataIndex: "name",
        ellipsis: true,
        width: 200,
        fixed: true,
      },
      {
        title: "充电站ID",
        dataIndex: "id",
        width: 100,
      },

      {
        title: "所属城市",
        dataIndex: "city",
        width: 100,
      },
      {
        title: "充电站总量(个)",
        dataIndex: "count",
        width: 140,
      },
      {
        title: "单日总收入(元)",
        dataIndex: "sigleDayFee",
        width: 140,
        render: (text, { mpercent }) => (
          <>
            {
              <span>
                {text}

                <Tag color={mpercent > 0 ? "green" : "red"} bordered={false}>
                  {mpercent}
                </Tag>
              </span>
            }
          </>
        ),
      },
      {
        title: "月度总收入(元)",
        dataIndex: "month",
        width: 140,
        render: (text, { percent }) => (
          <>
            {
              <span>
                {text}
                <Tag color={percent > 0 ? "green" : "red"} bordered={false}>
                  {percent}
                </Tag>
              </span>
            }
          </>
        ),
      },

      {
        title: "电费营收(元)",
        dataIndex: "electricity",
        width: 140,
      },
      {
        title: "停车费营收(元)",
        dataIndex: "parkingFee",
        width: 140,
      },
      {
        title: "服务费营收(元)",
        dataIndex: "serviceFee",
        width: 140,
      },
      {
        title: "会员储值金(元)",
        dataIndex: "member",
        width: 140,
      },
    ];
  }, []);
  const pageOnChange = (pageNum: number, pageSize: number) => {
    console.log("pagination", pageNum, pageSize);
    setPagination({
      ...pagination,
      pageNum,
      pageSize,
    });
  };
  const getRevenueTableList = async () => {
    setTableData([]);
    setLoading(() => true);
    try {
      const datas = {
        pageSize: pagination.pageSize,
        page: pagination.pageNum,
        name: inputValue,
      };
      const {
        code,
        data: { list, total },
      } = (await httpPost("/api/revenueList", datas)) as any;
      setLoading(() => false);
      if (code === 200) {
        console.log("list", list);
        setTableData(
          list.map((item: DataType, index: number) => ({
            ...item,
            index: +index + 1,
          })),
        );
        setPagination({
          ...pagination,
          total,
        });
      }
    } catch (error) {
      setLoading(() => false);
      console.error("error", error);
    }
  };
  useEffect(() => {
    getRevenueTableList();
  }, [pagination.pageSize, pagination.pageNum, inputValue]);

  return (
    <div className={curStyle["current-container"]}>
      {/* 头部统计 */}
      <Row gutter={16}>
        {totalStatics.map((item) => {
          return (
            <Col span={4} key={item.label}>
              <Card
                styles={{
                  body: {
                    ...setting.boxShadow,
                  },
                }}
              >
                <Flex vertical={true}>
                  <Space direction="vertical" size="middle">
                    <Flex justify="space-between">
                      <ProfileOutlined />
                      {item.label}
                    </Flex>
                    <Flex justify="flex-end" align="center">
                      <h2>{item.count}</h2>
                      {item.type === "down" ? (
                        <Tag color="red" bordered={false}>
                          {item.down}
                        </Tag>
                      ) : (
                        <Tag color="green" bordered={false}>
                          {item.up}
                        </Tag>
                      )}
                    </Flex>
                  </Space>
                </Flex>
              </Card>
            </Col>
          );
        })}
      </Row>
      <div style={{ margin: "0 12px 12px", overflow: "hidden" }}></div>
      {/* echarts 折柱混合图 */}
      <Row gutter={16}>
        <Col span={24}>
          <Card
            styles={{
              body: {
                ...setting.boxShadow,
                width: "auto",
                height: "200px",
                overflow: "hidden",
              },
            }}
          >
            <div ref={revenueRef} className={curStyle["echart-content"]}></div>
          </Card>
        </Col>
      </Row>
      <div style={{ margin: "0 12px 12px", overflow: "hidden" }}></div>
      {/* 表格 */}
      <Row gutter={16}>
        <Col span={24}>
          <Card
            styles={{
              body: {
                ...setting.boxShadow,
                height: "fit-content",
              },
            }}
          >
            <Flex
              className={curStyle["opera"]}
              align="center"
              justify="flex-end"
            >
              <Search
                placeholder="请输入站点名称"
                enterButton="查询"
                suffix={suffix}
                style={{ width: 300 }}
                onSearch={onSearch}
              />
            </Flex>
            <div style={{ margin: "0 12px 12px", overflow: "hidden" }}></div>
            <Flex className="content">
              <Table<DataType>
                style={{ width: "auto", flex: 1 }}
                columns={memoColumns}
                dataSource={tableData}
                loading={loading}
                scroll={{ x: 1200 }}
                pagination={{
                  current: pagination.pageNum,
                  pageSize: pagination.pageSize,
                  total: pagination.total,
                  onChange: pageOnChange,
                }}
              />
            </Flex>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Revenue;
