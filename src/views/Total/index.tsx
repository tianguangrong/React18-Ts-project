import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
  useDeferredValue,
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
  Form,
  Tree,
  Empty,
  type FormProps,
  type TreeDataNode,
  type PopconfirmProps,
  type TableColumnsType,
  type TableProps,
  type TreeProps,
} from "antd";
import curStyle from "./index.module.scss";
import setting from "../../globalSetting";
import useFetch from "../../hooks/useFetch";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Search } = Input;
const { RangePicker } = DatePicker;
const formatValue = "YYYY-MM-DD HH:mm:ss";

type dateRangeType = {
  dateValues: any[];
  chargingFee: string;
};
interface FieldType<T> {
  templateName: string;
  serviceFee: string;
  parkingFee: string;
  mark: string;
  timeRangeFee: T[];
}
const formateTreeDatas = (datas: any[], parentKey?: string) => {
  return datas.map<any>((item: any, index: number) => {
    const res = {
      ...item,
      title: item.label,
      disableCheckbox: item.label.includes("充电站") ? false : true,
      key: parentKey ? parentKey + "-" + index : index,
    };
    delete res.label;
    if (Object.hasOwnProperty.call(item, "children")) {
      return {
        ...res,
        children: formateTreeDatas(item.children, res.key + ""),
      };
    }
    return {
      ...res,
    };
  });
};
const filterTreeDatas = (
  value: string,
  originTreeDatas: TreeDataNode[],
  datas: TreeDataNode[] = [],
) => {
  for (const item of originTreeDatas) {
    if ((item.title as string).indexOf(value) >= 0) {
      datas.push(item);
    } else {
      if (item.children) {
        filterTreeDatas(value, item.children, originTreeDatas);
      }
    }
  }
};

const Total: React.FC = () => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const originTreeDatas = useRef<TreeDataNode[]>([]);
  const dedouncedValue = useDebouncedValue(searchValue, 500);
  const usedeferredSearchValue = useDeferredValue(dedouncedValue);
  const currentTreeNode = useRef<any>(null);
  const [form] = Form.useForm();

  const { result, requestCurrentDatasByApi, loading } = useFetch(
    "/api/cityList",
    "Post",
  );

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  useEffect(() => {
    if (result && result.length) {
      const res = formateTreeDatas(result) as TreeDataNode[];
      originTreeDatas.current = res;
      console.log("formateTreeDatas(result)", res);
      setTreeData(() => res);
    }
  }, [result]);

  useEffect(() => {
    requestCurrentDatasByApi({});
  }, []);

  useEffect(() => {
    if (usedeferredSearchValue) {
      const datas: TreeDataNode[] = [];
      filterTreeDatas(
        usedeferredSearchValue,
        JSON.parse(JSON.stringify(originTreeDatas.current)),
        datas,
      );
      setTreeData(() => datas);
      setExpandedKeys(datas.map((node) => node.key));
    } else {
      setTreeData(() => JSON.parse(JSON.stringify(originTreeDatas.current)));
      setExpandedKeys([]);
      setAutoExpandParent(false);
    }
  }, [usedeferredSearchValue]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(() => value);
  };
  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    const { checked, node } = info;
    setCheckedKeys(() => {
      if (checked) {
        currentTreeNode.current = node;
        form.setFieldValue("templateName", currentTreeNode.current.title);
        return [node.key];
      }
      currentTreeNode.current = null;
      return [];
    });
  };
  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    const {
      selected,
      node: { key, disableCheckbox },
    } = info;
    const cur = selectedKeys[0];
    if (!disableCheckbox) {
      setCheckedKeys((prev) => {
        if (prev.includes(key)) {
          currentTreeNode.current = null;
          return [];
        }
        currentTreeNode.current = info.node;
        form.resetFields();
        form.setFieldValue("templateName", currentTreeNode.current.title);
        return [key];
      });
    }
    setExpandedKeys((prev) => {
      if (!selected) {
        if (prev.includes(key)) {
          return prev.filter((item) => item != key);
        } else {
          return [...prev, key];
        }
      } else {
        if (prev.includes(cur)) {
          return prev.filter((item) => item != key);
        }
        return [...prev, ...selectedKeys];
      }
    });
    console.log("onSelect", selectedKeys, info);
  };
  const onFinish: FormProps<FieldType<dateRangeType>>["onFinish"] = async (
    values,
  ) => {
    console.log("values", values);
  };
  const resetField = () => {
    form.resetFields();
    form.setFieldValue("templateName", currentTreeNode.current.title);
  };
  return (
    <Flex className={curStyle["current-container"]} vertical={false}>
      <Flex
        className={curStyle["left-content"]}
        style={{
          ...setting.boxShadow,
        }}
      >
        <div className={curStyle["padding"]}>
          <Search
            allowClear
            style={{ marginBottom: 8, width: "100%" }}
            placeholder="请输入搜索内容"
            onChange={onChange}
          />
          <Card
            style={{ flex: 1, border: "none", overflowY: "auto" }}
            styles={{
              body: {
                height: "100%",
              },
            }}
            loading={loading}
          >
            {treeData.length > 0 ? (
              <Tree
                checkable
                checkStrictly
                blockNode
                onExpand={onExpand}
                checkedKeys={checkedKeys}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onSelect={onSelect}
                onCheck={onCheck}
                treeData={treeData}
              />
            ) : (
              <Empty style={{ marginTop: "20vh" }} description="暂无数据" />
            )}
          </Card>
        </div>
      </Flex>
      <Flex
        flex={1}
        vertical
        style={{
          ...setting.boxShadow,
          padding: "12px",
        }}
      >
        <div className={curStyle["form-title"]}>
          {/* <span>{currentTreeNode.current?.title}</span> */}
          <span>计费模板</span>
        </div>
        <div className={curStyle["form-content"]}>
          {currentTreeNode.current ? (
            <Form
              name="dynamic_form_nest_item"
              form={form}
              initialValues={{
                templateName: "",
                serviceFee: "0",
                parkingFee: "0",
                mark: "",
                timeRangeFee: [
                  {
                    dateValues: [],
                    chargingFee: "",
                  },
                ],
              }}
              style={{ maxWidth: 800 }}
              autoComplete="off"
              onFinish={onFinish}
            >
              <Form.Item
                name="templateName"
                label="模板名称"
                rules={[{ required: true, message: "请输入模板名称" }]}
              >
                <Input readOnly placeholder="请输入模板名称" />
              </Form.Item>
              <Form.List name="timeRangeFee">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "dateValues"]}
                          label={"时间区间" + (index + 1)}
                          rules={[
                            { required: true, message: "请添加时间区间" },
                          ]}
                        >
                          <RangePicker
                            placeholder={["开始日期", "结束日期"]}
                            allowClear
                            style={{ maxWidth: 360 }}
                            showTime
                            format={formatValue}
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          label={"电费" + (index + 1)}
                          name={[name, "chargingFee"]}
                          rules={[
                            {
                              required: true,
                              message: "请输入每度需要收取的费用",
                            },
                          ]}
                        >
                          <Input
                            style={{ width: 260 }}
                            placeholder="请输入每度需要收取的费用"
                            suffix="元/每度"
                          />
                        </Form.Item>
                        {index > 0 ? (
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        ) : null}
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="primary"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      >
                        添加时间区间
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.Item
                name="serviceFee"
                label="服务费"
                rules={[{ required: true, message: "请输入服务费" }]}
              >
                <Input
                  style={{ width: "50%" }}
                  placeholder="请输入服务费"
                  suffix="元"
                />
              </Form.Item>
              <Form.Item
                name="parkingFee"
                label="停车费"
                rules={[{ required: true, message: "请输入停车费" }]}
              >
                <Input
                  style={{ width: "50%" }}
                  placeholder="请输入停车费"
                  suffix="元"
                />
              </Form.Item>
              <Form.Item name="mark" label="特殊备注">
                <Input.TextArea placeholder="请输入..." />
              </Form.Item>
            </Form>
          ) : (
            <Empty style={{ marginTop: "20vh" }} description="暂无数据" />
          )}
        </div>
        <Flex justify="flex-end" className={curStyle["form-submit"]}>
          <Button
            type="primary"
            onClick={form.submit}
            disabled={!currentTreeNode.current}
          >
            创建
          </Button>
          <span style={{ padding: "2px" }}></span>
          <Button onClick={resetField} disabled={!currentTreeNode.current}>
            重 置
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Total;
