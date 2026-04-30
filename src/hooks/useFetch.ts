import React, { useCallback, useState, useRef } from "react";
import { httpGet, httpPost } from "../utils/axios";
import type { AxiosResponse } from "axios";

type RequestType = "Post" | "Get";
interface IresponseType<T> extends AxiosResponse {
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
function useFetch<
  U = Record<string, string | number | boolean | number[] | string[] | object>,
>(curApi: string, method: RequestType, initParams?: Record<string, any>): any {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<U[]>([]);
  const [pagination, setPagination] = useState<Ipage>({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  });
  const latestResultRef = useRef(result);
  // const setCurrentParamsForDatas = (
  //   newParams: Record<string, string | number> | undefined = undefined,
  // ) => {
  //   if (newParams) setParamsConfig(newParams);
  // };
  const getDatas = useCallback(
    async (queryParams: Record<string, string | number>) => {
      setLoading(() => true);
      try {
        let requestLink;
        if (method === "Get") {
          requestLink = httpGet;
        } else {
          requestLink = httpPost;
        }
        const { code, data } = (await requestLink(
          curApi,
          queryParams || {},
        )) as IresponseType<U[]>;
        setLoading(() => false);
        if (code === 200) {
          if (Array.isArray(data.list)) {
            const list = data.list.map<U>((item: U, index: number) => ({
              ...item,
              index: index + 1,
              key: index + 1,
            }));
            setResult(list);
            latestResultRef.current = list;
          } else {
            setResult([data.list]);
            latestResultRef.current = [data.list];
          }
          setPagination((prev) => ({
            ...prev,
            total: data.total,
          }));
        } else {
          setResult([]);
          latestResultRef.current = [];
        }
      } catch (error) {
        setLoading(() => false);
        setResult([]);
        console.error(error);
        latestResultRef.current = [];
      }
    },
    [curApi, method],
  );

  // React.useEffect(() => {
  //   let queryParams = {};
  //   if (initParams) {
  //     queryParams = {
  //       pageSize: pagination.pageSize,
  //       pageNum: pagination.pageNum,
  //       ...initParams,
  //       ...paramsConfig,
  //     };
  //   } else {
  //     queryParams = {
  //       pageSize: pagination.pageSize,
  //       pageNum: pagination.pageNum,
  //       ...paramsConfig,
  //     };
  //   }

  //   console.log("queryParams", queryParams);
  //   getDatas(queryParams);
  // }, [
  //   getDatas,
  //   initParams,
  //   paramsConfig,
  //   pagination.pageSize,
  //   pagination.pageNum,
  // ]);
  const requestCurrentDatasByApi = useCallback((params: any = {}) => {
    
    const queryParams = {
      pageSize: pagination.pageSize,
      pageNum: pagination.pageNum,
      ...params,
    };
    console.log(queryParams);
    debugger
    getDatas(queryParams);
  }, [pagination.pageSize,pagination.pageNum, getDatas]);
  return {
    result,
    pagination,
    setPagination,
    requestCurrentDatasByApi,
    loading,
    latestResultRef,
  };
}

export default useFetch;
