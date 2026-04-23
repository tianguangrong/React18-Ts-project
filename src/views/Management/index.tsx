import React, { useCallback, useEffect, useRef, useState } from "react";
import curStyle from "./index.module.scss";
import setting from "../../globalSetting";
import {
  Flex,
  Card,
  Select,
  Row,
  Col,
  Segmented,
  Button,
  Tag,
  Spin,
  Empty,
} from "antd";
import { httpGet, httpPost } from "../../utils/axios/index";
import imgFree from "@/assets/img/free.png";
import outline from "@/assets/img/outline.png";
import ing from "@/assets/img/ing.png";
import Record from "./comps/recod";

type record = {
  time: string;
  msg: string;
};
interface IchargingItem<T> {
  id: string;
  voltage: string;
  current: string;
  power: string;
  tem: string;
  status: number;
  record?: T;
}

const Management: React.FC = () => {
  const [datas, setDatas] = useState<any[] | []>([]);
  const [option, setOption] = useState<any[] | []>([]);
  const [statusList, setStatusList] = useState<string[] | []>([]);
  const [cardList, setCardList] = useState<any[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [segmentedValue, setSegmentedValue] = useState<string>("全部");
  const [selectValue, setSelectValue] = useState<string[]>([]);
  const hasUseMemoRef = useRef<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [detail, setDetail] = useState<IchargingItem<record> | undefined>();

  const lastestSegementedValue = useRef<string>(segmentedValue);
  const lastestStatusObjectList = useRef<Array<any>>([]);
  const lastestSelectValue = useRef<Array<string>>([]);

  const handleChange = (id: string[]) => {
    setSelectValue(id);
    lastestSelectValue.current = id;
    hasUseMemoRef.current = false;
    if (!id.length) return getCurrentDataForRequest();
    setLoading(() => true);
    const currentDatas = id.map((i) => {
      const cur = datas.filter((item) => {
        return i === item.id;
      });
      return cur.map((iii) => iii.list);
    });
    const results = currentDatas.map((item) => item[0]);
    setTimeout(() => {
      if (segmentedValue === "全部") {
        setCardList(results);
      } else {
        const id = filterStatusForId(segmentedValue);
        console.log(
          results.map((item) => {
            return item.filter((itm: any) => id === +itm.status);
          }),
        );
        setCardList(
          results.map((item) => {
            return item.filter((itm: any) => id === +itm.status);
          }),
        );
      }
      hasUseMemoRef.current = true;
      setLoading(false);
    }, 600);
  };
  const filterStatusForLabel = (status: number) => {
    if (!(status + "")) return "未知";
    if (!lastestStatusObjectList.current.length) return;
    const cur = lastestStatusObjectList.current.find(
      (item) => +item.value === status,
    );
    return cur?.label ?? "未知";
  };
  const filterStatusForId = (value: string): number => {
    if (!value) return 0;
    if (!lastestStatusObjectList.current.length) return 0;
    const cur = lastestStatusObjectList.current.find((item) => {
      return item.label === value;
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
        const results = data.map(
          (item: { id: string; name: string; list: any[] }) => item.list,
        );
        if (
          lastestSegementedValue.current === "全部" &&
          lastestSelectValue.current.length === 0
        ) {
          setCardList(results);
        } else if (
          lastestSegementedValue.current !== "全部" &&
          lastestSelectValue.current.length === 0
        ) {
          const id = filterStatusForId(lastestSegementedValue.current);
          setCardList(
            results.map((item) => {
              return item.filter((itm: any) => id === +itm.status);
            }),
          );
        } else if (
          lastestSelectValue.current.length > 0 &&
          lastestSegementedValue.current === "全部"
        ) {
          const res = lastestSelectValue.current
            .map((i) => {
              const cur = results.filter((item: any) => {
                return item.filter((itm: any) => i === itm.id);
              });
              return cur;
            })
            .map((item: any) => item[0]);
          setCardList(res);
        }
      }
      hasUseMemoRef.current = true;
      setLoading(() => false);
    } catch (error) {
      setLoading(() => false);
      console.error(error);
    }
  }, []);
  const getCurrentStatusForRequest: () => void = async () => {
    try {
      const { code, data } = (await httpGet("/api/currentStatus", {})) as any;
      if (code === 200) {
        setStatusList(
          data.map((item: { value: number; label: string }) => item.label),
        );
        lastestStatusObjectList.current = data;
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onSegmentedChange = (value: string) => {
    setSegmentedValue(value);
    lastestSegementedValue.current = value;
    hasUseMemoRef.current = false;
    const id = filterStatusForId(value);
    if (value === "全部") return getCurrentDataForRequest();
    setLoading(() => true);
    const originDatas = datas.map(
      (item: { id: string; name: string; list: any[] }) => item.list,
    );
    const currentDatas = originDatas.map((item) => {
      return item.filter((itm: any) => id === +itm.status);
    });
    setTimeout(() => {
      if (!lastestSelectValue.current.length) {
        setCardList(currentDatas);
      } else {
        const results = lastestSelectValue.current
          .map((i) => {
            const cur = currentDatas.filter((item: any) => {
              return item.filter((itm: any) => i === itm.id);
            });
            return cur;
          })
          .map((item) => item[0]);
        console.log(results);
        setCardList(results);
      }
      hasUseMemoRef.current = true;
      setLoading(false);
    }, 600);
  };
  const isEmptyDatasFlag = (datas: any[]): boolean => {
    if (!datas.length) return true;
    let flag = false;
    for (const item of datas) {
      if (Array.isArray(item)) {
        flag = isEmptyDatasFlag(item);
      }
    }
    return flag;
  };
  useEffect(() => {
    if (!hasUseMemoRef.current) {
      getCurrentDataForRequest();
      getCurrentStatusForRequest();
    }
    return () => {};
  }, []);
  const onClose = (): void => {
    setOpen(() => false);
  };
  const handleRecordDetailClicker = (row: IchargingItem<record>) => {
    console.log(row);
    setDetail(row);
    setOpen(() => true);
  };
  return (
    <>
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
                value={selectValue}
                style={{ width: "100%" }}
                optionFilterProp="label"
                filterOption
                placeholder="请选择"
                onChange={handleChange}
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
            value={segmentedValue}
            onChange={onSegmentedChange}
          />
        </Card>
        <Card
          style={{ flex: 1 }}
          styles={{
            body: {
              ...setting?.boxShadow,
              padding: "12px",
              height: "100%",
            },
          }}
        >
          <Spin
            spinning={loading}
            wrapperClassName={curStyle["spining-content"]}
          >
            {!isEmptyDatasFlag(cardList) ? (
              <Row
                gutter={24}
                style={{ height: "100%", width: "calc(100vw - 260px)" }}
              >
                {cardList.map((item: any) => {
                  return item.map((curItem: any, index: number) => {
                    return (
                      <Col
                        span={6}
                        style={{ marginBottom: "8px", padding: "0 4px" }}
                      >
                        <Card
                          key={index}
                          actions={[
                            <Button type="text" size="small" disabled>
                              暂无预警
                            </Button>,
                            <Button size="small" type="text">
                              维保
                            </Button>,
                            <Button
                              size="small"
                              onClick={() => handleRecordDetailClicker(curItem)}
                              type="link"
                            >
                              使用记录
                            </Button>,
                          ]}
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
                                    {curItem.status !== 6
                                      ? curItem.voltage
                                      : "- -"}
                                  </span>
                                </div>
                                <div>
                                  <span>电流：</span>
                                  <span>
                                    {curItem.status !== 6
                                      ? curItem.current
                                      : "- -"}
                                  </span>
                                </div>
                                <div>
                                  <span>功率：</span>
                                  <span>
                                    {curItem.status !== 6
                                      ? curItem.power
                                      : "- -"}
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
            ) : (
              <Empty style={{marginTop: '20vh'}} description="暂无数据" />
            )}
          </Spin>
        </Card>
      </Flex>
      <Record open={open} detail={detail} onClose={onClose} filterStatusForLabel={filterStatusForLabel}></Record>
    </>
  );
};

export default Management;
