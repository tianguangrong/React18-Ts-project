
import { Navigate } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import NotFound from "../layout/NotFound";
import Login from "../layout/Login";
import DashBoard from "../views/dashBoard";
import { useSelector } from "react-redux";
import React from "react";
// 创建登录守卫组建
const LoginGuard = (props:any) => {
    const { datas } = useSelector((state:any) => state.user);
    const { token } = datas || {};
    console.log('这是我在路由守卫里面查看的token', token);
    const element: React.ReactNode = props.element
    if (!token) {
        return element
    }
    return <Navigate to={'/home'} replace/>
}
const routeList = [
    {
        path: '/login',
        element: <LoginGuard element={<Login />} />
    },
    {
        path: '/home',
        element: <DefaultLayout/>,
        children: [
            { 
                path:'dashBoard',
                element:<DashBoard />
            },
            { 
                path:'',
                element: <Navigate to={'dashBoard'} />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    },
    {
        path:'/',
        element: <Navigate to={'/login'} />
    }
]
export default routeList;