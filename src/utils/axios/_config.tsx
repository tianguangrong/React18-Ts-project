import axios,  { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosError, type AxiosResponse } from "axios";
import useToken from "../useToken";

const createServer:AxiosInstance =axios.create({
    baseURL: 'https://www.demo.com/',
    timeout: 10000
});
// 请求拦截器
createServer.interceptors.request.use((config:InternalAxiosRequestConfig) => {
    // if (config.url !== '/api/login') {
    //     debugger
    //     console.log('config----', config);
    //     const token = useToken();
    //     config.headers.Authorization = 'tianguangrong' +   token;
    // }
    return config
}, (error:AxiosError) => {});
// 返回拦截器
createServer.interceptors.response.use((config: AxiosResponse)=> {
    console.log('config--1--', config);
    return config.data;
},()=> {},)
// 抛出数据
export default createServer
