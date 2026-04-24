import React, { useCallback, useState, useRef } from "react";
import { httpGet, httpPost } from "../utils/axios";

type RequestType = "Post" | "Get";
interface IresponseType<T> {
  code: number;
  data: {
    list: T;
    total: number;
  };
}
interface Iparams {
  pageNum: number;
  pageSize: number;
  [key: string]: any;
}
type FixParamsType = Iparams | object;
interface Ipage {
  pageNum: number;
  pageSize: number;
  total: number;
}
const useFetch: (p1: string, p2: RequestType, p3?: FixParamsType) => any[] = (
  curApi,
  method,
  params = {},
) => {
  const curApiRef = useRef<string>(curApi);
  const methodRef = useRef<RequestType>(method);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IresponseType<any[]> | undefined>(
    undefined,
  );
  const [paramsConfig, setParamsConfig] = useState<FixParamsType | object>({});
  const [pagination, setPagination] = useState<Ipage>({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  });
  const latestResultRef = useRef(result);
  const setCurrentParamsForDatas = (newParams: any = null) => {
    if (newParams) setParamsConfig(newParams);
  };
  const getDatas = useCallback(async (queryParams) => {
    setLoading(() => true);
    try {
      if (methodRef.current === "Get") {
        const { code, data } = (await httpGet(curApiRef.current)) as any;
        setLoading(() => false);
        console.log(code, data);
        if (code === 200) {
          const list = data.list.map((item: any, index: number) => ({
            ...item,
            index: index + 1,
          }));
          setResult(list);
          setPagination({
            ...pagination,
            total: data.total,
          });
          latestResultRef.current = list;
        } else {
          setResult(undefined);
          latestResultRef.current = undefined;
        }
      } else {
        console.log("当前的参数为-->", queryParams);
        const { code, data } = (await httpPost(
          curApiRef.current,
          queryParams,
        )) as any;
        setLoading(() => false);
        console.log(code, data);
        if (code === 200) {
          const list = data.list.map((item: any, index: number) => ({
            ...item,
            index: index + 1,
          }));
          setResult(list);
          setPagination({
            ...pagination,
            total: data.total,
          });
          latestResultRef.current = list;
        } else {
          setResult(undefined);
          latestResultRef.current = undefined;
        }
      }
    } catch (error) {
      setLoading(() => false);
      setResult(undefined);
      console.error(error);
      latestResultRef.current = undefined;
    }
  }, []);

  React.useEffect(() => {
    debugger
    // pageSize: pagination.pageSize, pageNum: pagination.pageNum
    getDatas({ ...params, ...paramsConfig,  });
    // pagination.pageSize, pagination.pageNum
  }, [params, paramsConfig, ]);

  return [
    result,
    pagination,
    setPagination,
    setCurrentParamsForDatas,
    loading,
    latestResultRef,
  ];
};

export default useFetch;
