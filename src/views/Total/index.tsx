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
  Tree,
  Empty,
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

const { Search } = Input;

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
    // const cur = checkedKeys[0]
    const {
      checked,
      node: { key },
    } = info;
    setCheckedKeys(() => {
      if (checked) {
        return [key];
      }
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
          return [];
        }
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
        style={{
          ...setting.boxShadow,
        }}
      >
        2
      </Flex>
    </Flex>
  );
};

export default Total;
