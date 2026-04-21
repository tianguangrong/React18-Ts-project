import React, { useCallback, useEffect, useRef, useState } from "react";
import curStyle from "./index.module.scss";
import setting from "../../globalSetting";
import { Flex, Card, Select, Row, Col, Segmented, Button, Tag } from "antd";
import { httpGet, httpPost } from "../../utils/axios/index";
import imgFree from "@/assets/img/free.png";
import outline from "@/assets/img/outline.png";
import ing from "@/assets/img/ing.png";

const actions: React.ReactNode[] = [
  <Button type="text" size="small" disabled>
    暂无预警
  </Button>,
  <Button size="small" type="text">
    维保
  </Button>,
  <Button size="small" type="link">
    使用记录
  </Button>,
];
const Management: React.FC = () => {
  const [datas, setDatas] = useState<any[] | []>([]);
  const [option, setOption] = useState<any[] | []>([]);
  const [statusList, setStatusList] = useState<string[] | []>([]);
  const [statusObjectList, setStatusObjectList] = useState<any[] | []>([]);
  const [cardList, setCardList] = useState<any[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const hasUseMemoRef = useRef<boolean>(false);

  const handleChange = (id: string[]) => {
    hasUseMemoRef.current = false;
    if (!id.length) return getCurrentDataForRequest();
    setLoading(() => true);
    const currentDatas = id.map((i) => {
      const cur = datas.filter((item) => {
        return i === item.id;
      });
      return cur.map((iii) => iii.list);
    });
    setTimeout(() => {
      setCardList(currentDatas.map((item) => item[0]));
      setLoading(false);
    }, 600);
  };
  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  const filterStatusForLabel = (status: number) => {
    if (!(status + "")) return "未知";
    if (!statusObjectList.length) return;
    const cur = statusObjectList.find((item) => +item.value === status);
    return cur.label;
  };
  const filterStatusForId = (value: string):number => {
    if (!value) return 0;
    if (!statusObjectList.length) return 0;
    const cur = statusObjectList.find((item) => {
      return item.label === value
    });
    return cur.value;
  };
  // 请求接口数据
  const getCurrentDataForRequest = useCallback(async () => {
    if (hasUseMemoRef.current) return;
    setLoading(() => true);
    try {
      const { code, data } = (await httpPost("/api/currentList", {})) as any;
      if (code === 200) {
        setDatas(data);
        setOption(
          data.map((item: { [key: string]: any }) => ({
            value: item.id,
            label: item.name,
          })),
        );
        console.log(
          data.map(
            (item: { id: string; name: string; list: any[] }) => item.list,
          ),
        );

        console.log(
          `selected----00000`,
          data.map(
            (item: { id: string; name: string; list: any[] }) => item.list,
          ),
        );
        setCardList(
          data.map(
            (item: { id: string; name: string; list: any[] }) => item.list,
          ),
        );
      }
      hasUseMemoRef.current = true;
      setLoading(() => false);
    } catch (error) {
      setLoading(() => false);
      console.error(error);
    }
  }, []);
  // const getCurrentDataForRequest: () => void = async () => {
  //   setLoading(() => true);
  //   try {
  //     const { code, data } = (await httpPost("/api/currentList", {})) as any;
  //     if (code === 200) {
  //       setDatas(data)
  //       setOption(
  //         data.map((item: { [key: string]: any }) => ({
  //           value: item.id,
  //           label: item.name,
  //         })),
  //       );
  //       console.log(
  //         data.map(
  //           (item: { id: string; name: string; list: any[] }) => item.list,
  //         ),
  //       );

  //       console.log(`selected----00000`, data.map(
  //           (item: { id: string; name: string; list: any[] }) => item.list,
  //         ),);
  //       setCardList(
  //         data.map(
  //           (item: { id: string; name: string; list: any[] }) => item.list,
  //         )
  //       );
  //     }
  //     setLoading(() => false);
  //   } catch (error) {
  //     setLoading(() => false);
  //     console.error(error);
  //   }
  // };
  const getCurrentStatusForRequest: () => void = async () => {
    try {
      const { code, data } = (await httpGet("/api/currentStatus", {})) as any;
      if (code === 200) {
        setStatusList(
          data.map((item: { value: number; label: string }) => item.label),
        );
        setStatusObjectList(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onSegmentedChange = (value: string) => {
    hasUseMemoRef.current = false;
    const id = filterStatusForId(value);
    if (value === '全部') return getCurrentDataForRequest();
    setLoading(() => true);
    const currentDatas = cardList.filter((item) => {
      return id === item.status;
    });
    // setTimeout(() => {
    //   setCardList(currentDatas.map((item) => item[0]));
    //   setLoading(false);
    // }, 600);
    // setLoading(() => false);
    // console.log("Segmented", currentDatas); // string
    // debugger
  };
  // /api/currentStatus
  useEffect(() => {
    if (!hasUseMemoRef.current) {
      getCurrentDataForRequest();
      getCurrentStatusForRequest();
    }
    return () => {};
  }, []);

  // useEffect(() => {
  //   alert(1);
  //   return () => {};
  // }, [searchValue]);

  return (
    <Flex vertical gap={"small"} className={curStyle["current-container"]}>
      <Card
        styles={{
          body: {
            ...setting?.boxShadow,
            padding: "12px",
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
      <Card
        styles={{
          body: {
            ...setting?.boxShadow,
            padding: "12px",
          },
        }}
      >
        <Segmented<string>
          options={statusList}
          defaultValue="全部"
          onChange={onSegmentedChange}
        />
      </Card>
      <Card
        loading={loading}
        style={{ flex: 1 }}
        styles={{
          body: {
            ...setting?.boxShadow,
            padding: "12px",
            height: "100%",
          },
        }}
      >
        <Row gutter={24} style={{ height: "100%" }}>
          {cardList.map((item: any) => {
            return item.map((curItem: any, index: number) => {
              return (
                <Col span={6} style={{ marginBottom: "8px", padding: "0 4px" }}>
                  <Card
                    key={index}
                    actions={actions}
                    style={{ minWidth: "100%" }}
                  >
                    <Card.Meta
                      avatar={
                        <>
                          <div>
                            <Tag
                              bordered={false}
                              color={
                                curItem.status === 6
                                  ? "error"
                                  : curItem.status === 4
                                    ? "orange"
                                    : curItem.status === 5
                                      ? "cyan"
                                      : curItem.status === 2
                                        ? "green"
                                        : "processing"
                              }
                            >
                              {filterStatusForLabel(curItem.status)}
                            </Tag>
                            {}
                          </div>
                          <div>
                            <img
                              style={{ margin: "8px" }}
                              src={
                                curItem.status === 6
                                  ? outline
                                  : curItem.status === 2
                                    ? ing
                                    : imgFree
                              }
                              width={30}
                              height={30}
                            />
                          </div>
                          <div>
                            {curItem.percent ? (
                              <Tag color="green" bordered={false}>
                                {curItem.percent}
                              </Tag>
                            ) : (
                              ""
                            )}
                          </div>
                        </>
                      }
                      title={curItem.id}
                      description={
                        <>
                          <div>
                            <span>电压：</span>
                            <span>
                              {curItem.status !== 6 ? curItem.voltage : "- -"}
                            </span>
                          </div>
                          <div>
                            <span>电流：</span>
                            <span>
                              {curItem.status !== 6 ? curItem.current : "- -"}
                            </span>
                          </div>
                          <div>
                            <span>功率：</span>
                            <span>
                              {curItem.status !== 6 ? curItem.power : "- -"}
                            </span>
                          </div>
                          <div>
                            <span>温度：</span>
                            <span>
                              {curItem.status !== 6 ? curItem.tem : "- -"}
                            </span>
                          </div>
                        </>
                      }
                    />
                  </Card>
                </Col>
              );
            });
          })}
        </Row>
      </Card>
    </Flex>
  );
};

export default Management;
