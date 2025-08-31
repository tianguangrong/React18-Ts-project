
import React, { useEffect, useState } from 'react'
import createServer from "./_config";

const useRequestApi = (url: string , params: any, type: 'get' | 'post') => {
  const [ data, setData ] = useState<any>(null);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<string | null>(null);
  const load = async () => {
    try {
      setLoading(true);
      const fomaterParam = type === 'get' ? { params } : { data: params};
      const result = await createServer[type](url, fomaterParam)
      debugger
      setLoading(false);
      setData(result.data)
    } catch (error: any) {
      setError(error?.message || '请求错误')
    }
  }
  useEffect(() => {
    load()
  }, [params])
  return {data, loading, error}
}

export function httpPost(url: string, datas:any) {
  return createServer.post(url, datas)
}
export function httpGet(url: string, params?:any) {
  return createServer.get(url, {
    params: params,
  })
}

export default useRequestApi
