import {
  Flex,
  Space,
  Input,
  Select,
  Card,
  Col,
  Row,
  Button,
  Popconfirm,
  Statistic,
  Table,
  notification,
} from "antd";
import React, { Component } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import style from "./index.module.scss";
import type { TableProps } from "antd";
import { httpGet, httpPost } from "@utils/axios";
import EditMonitor from "./comps/editMonitor/index.tsx";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
interface DataType {
  key: React.Key;
  id?: string;
  index: number;
  name: string;
  city: string;
  fast: number | null;
  slow: number | null;
  status: number | null;
  now: number | null;
  fault: number | null;
  person: string;
  tel: string | null;
  opera?: any;
}
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const statusOptions = [
  { value: 1, label: "空闲中" },
  { value: 2, label: "使用中" },
  { value: 3, label: "待维修" },
  { value: 4, label: "维护中" },
];


export default class Monitor extends Component {
  // options:Array<any> = []
  state: {
    inputSelectType: string;
    inputValue: string;
    monitorStatus: null | number;
    loading: boolean;
    open: boolean;
    pagination: {
      pageNum: number;
      pageSize: number;
      total: number;
    };
    datas: DataType[];
    row: any;
  };
  constructor(props: any) {
    super(props);
    this.state = {
      inputSelectType: "id",
      inputValue: "",
      monitorStatus: null,
      loading: false,
      open: false,
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      datas: [],
      row: null,
    };
  }
  onChangeSelectClicker = (value: any) => {
    const state = {
      ...this.state,
      inputSelectType: value,
      inputValue: "",
    };
    this.setState(state);
  };
  inputChangeClicker = (value: string) => {
    this.setState({
      ...this.state,
      inputValue: value,
    });
    console.log("value", this.state.inputValue);
  };
  handleMonitorStatusChangeClicker = (value: number) => {
    console.log("value3", value);
    this.setState({
      ...this.state,
      monitorStatus: value,
    });
  };
  reset() {
    this.setState({
      ...this.state,
      inputSelectType: "id",
      inputValue: "",
      monitorStatus: null,
    });
  }
  pageOnChange = (pageNum: number, pageSize: number) => {
    console.log("pagination", pageNum, pageSize);
    const pagination = this.state.pagination;
    this.setState(
      {
        pagination: {
          ...pagination,
          pageNum,
          pageSize,
        },
      },
      () => {
        this.getMonitorDatas();
      },
    );
  };
  getMonitorDatas = async (): Promise<void> => {
    const { inputSelectType, inputValue, monitorStatus } = this.state;
    const pagination = this.state.pagination;
    const datas = {
      pageSize: pagination.pageSize,
      page: pagination.pageNum,
      id: inputSelectType === "id" ? inputValue.trim() : null,
      name: inputSelectType === "name" ? inputValue.trim() : null,
      status: monitorStatus,
    };
    try {
      this.setState({ loading: true });
      const {
        code,
        data: { list = [], total: resTotal = 0 },
      } = await httpPost("/api/stationList", datas);
      if (Object.is(code, 200)) {
        const datas =
          list?.map<DataType>((item: any, index: number) => {
            return {
              ...item,
              key: index,
              index: +index + 1,
            };
          }) ?? [];
        const { pageNum, pageSize } = this.state.pagination;
        console.log("datas", datas, resTotal);
        this.setState({
          datas,
          pagination: {
            total: resTotal,
            pageNum,
            pageSize,
          },
        });
        this.setState({ loading: false });
      }
    } catch (error) {
      this.setState({ loading: false });
      console.log("error", error);
    }
  };
  componentDidMount(): void {
    this.getMonitorDatas();
  }
  onHandleConfirmClicker():void {
    notification.success({
      message: '成功',
      description: '删除成功'
    })
  }
  openMonitorDrawerClicker = (flag: boolean, row: any) => {
    this.setState({ open: flag, row: row });
  };
  render() {
    const columns: TableProps<DataType>["columns"] = [
      {
        title: "序号",
        dataIndex: "index",
        key: "index",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "站点名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "站点ID",
        dataIndex: "id",
        key: "id",
      },

      {
        title: "所属城市",
        dataIndex: "city",
        key: "city",
      },
      {
        title: "快充数",
        dataIndex: "fast",
        key: "fast",
      },
      {
        title: "慢充数",
        dataIndex: "slow",
        key: "slow",
      },
      {
        title: "状态",
        key: "status",
        dataIndex: "status",
        render: (_, { status }) => (
          <>
            {statusOptions.find((item) => item.value === status)?.label ?? (
              <span style={{ color: "lightgray" }}>未知</span>
            )}
          </>
        ),
      },
      {
        title: "正在充电数",
        dataIndex: "now",
        key: "now",
      },
      {
        title: "故障数",
        dataIndex: "slow",
        key: "slow",
      },
      {
        title: "责任人",
        dataIndex: "person",
        key: "person",
      },
      {
        title: "责任人电话",
        dataIndex: "tel",
        key: "tel",
      },

      {
        title: "操作",
        key: "opera",
        render: (_, row: any) => {
          return (
            <Space size="middle">
              <Button
                color="primary"
                variant="text"
                onClick={() => this.openMonitorDrawerClicker(true, row)}
              >
                编辑
              </Button>
              <Popconfirm
                title="数据删除"
                description="你确定要删除该条数据吗？"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                cancelText="取消"
                okText="确定"
                onConfirm={this.onHandleConfirmClicker.bind(this)}
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
    const boxShadow = { boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.12)" };
    const {
      inputSelectType,
      inputValue,
      monitorStatus,
      datas,
      pagination,
      loading,
    } = this.state;
    console.log("pagination", pagination);

    const cardPadding = {
      body: {
        padding: "6px 12px",
      },
    };
    return (
      <>
        <div className={style["monitor-container"]}>
          <Flex vertical gap="small" style={{ height: "100%" }}>
            <Card style={boxShadow} styles={cardPadding}>
              <Row gutter={16}>
                <Col span={8}>
                  <Flex style={{ flex: "1" }}>
                    <Input
                      value={inputValue}
                      onChange={(e) => this.inputChangeClicker(e.target.value)}
                      placeholder={`请根据${
                        inputSelectType === "name" ? "名称" : "ID"
                      }查询数据`}
                    />
                    <Select
                      value={inputSelectType}
                      onChange={(e) => this.onChangeSelectClicker(e)}
                      options={[
                        {
                          value: "id",
                          label: "按照ID查询",
                        },
                        {
                          value: "name",
                          label: "按名称查询",
                        },
                      ]}
                    />
                  </Flex>
                </Col>

                <Col span={8}>
                  <Flex style={{ flex: "1" }}>
                    <Select
                      value={monitorStatus}
                      placeholder="请选择充电站监控状态"
                      style={{ width: "100%" }}
                      onChange={this.handleMonitorStatusChangeClicker}
                      options={statusOptions}
                    />
                  </Flex>
                </Col>
                <Col span={8}>
                  <Flex
                    gap="small"
                    style={{ flex: "1", justifyContent: "flex-end" }}
                  >
                    <Button
                      type="primary"
                      onClick={this.getMonitorDatas}
                      icon={<SearchOutlined></SearchOutlined>}
                    >
                      查 询
                    </Button>
                    <Button onClick={this.reset.bind(this)}>重 置</Button>
                  </Flex>
                </Col>
              </Row>
            </Card>
            <Card style={boxShadow} styles={cardPadding}>
              <Row gutter={38} justify="space-around">
                <Col flex={1}>
                  <Statistic title="累计充电量(度)" value={112893} />
                </Col>
                <Col flex={1} style={{ textAlign: "center" }}>
                  <Statistic title="累计充电次数(次)" value={89893} />
                </Col>
                <Col flex={1} style={{ textAlign: "right" }}>
                  <Statistic title="服务区域(个)" value={193} />
                </Col>
              </Row>
            </Card>

            <Card style={boxShadow} styles={cardPadding}>
              <Row gutter={16}>
                <Col span={24}>
                  <Button
                    onClick={() => this.openMonitorDrawerClicker(true, null)}
                    type="primary"
                  >
                    <PlusOutlined />
                    新增充电站
                  </Button>
                </Col>
              </Row>
            </Card>
            <Card
              style={{
                ...boxShadow,
                height: 'auto',
              }}
              styles={cardPadding}
            >
              {/* 
              onChange={this.tableOnChange} */}
              <Table<DataType>
                style={{ width: "100%", flex: 1 }}
                columns={columns}
                dataSource={datas}
                loading={loading}
                pagination={{
                  current: pagination.pageNum,
                  pageSize: pagination.pageSize,
                  total: pagination.total,
                  onChange: this.pageOnChange,
                }}
              />
            </Card>
          </Flex>
        </div>
        <EditMonitor
          open={this.state.open}
          row={this.state.row}
          onClose={this.openMonitorDrawerClicker}
        />
      </>
    );
  }
}
