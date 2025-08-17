

import React from "react";
import { Navigate } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import NotFound from "../layout/NotFound";
import Login from "../layout/Login";
const DashBoard = React.lazy(() => import('../views/DashBoard'));
const PersonalCenter = React.lazy(() => import('../views/PersonalCenter'))
const Monitor = React.lazy(() => import('../views/Monitor'))
const Revenue = React.lazy(() => import('../views/Revenue'))
const Management = React.lazy(() => import('../views/Management'))
const Map = React.lazy(() => import('../views/Map'))
const Alarm = React.lazy(() => import('../views/Alarm'))
const Equipment = React.lazy(() => import('../views/Equipment'))
const InvestmentManagement = React.lazy(() => import('../views/InvestmentManagement'))
const System = React.lazy(() => import('../views/System'))
const Orders = React.lazy(() => import('../views/Orders'))
const Detail = React.lazy(() => import('../views/Detail'))
const Total = React.lazy(() => import('../views/Total'))
import { useSelector } from "react-redux";
import {
    FundTwoTone,
    ApiTwoTone,
    CarTwoTone,
    PhoneTwoTone,
    PoundCircleTwoTone,
    MoneyCollectTwoTone,
    IdcardTwoTone,
    HddTwoTone,
    SettingTwoTone
} from '@ant-design/icons';
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
};
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
                path:'dashboard',
                element:<DashBoard />,
                icon: <FundTwoTone />
            },
            { 
                path:'chargingstation/monitor',
                element:<Monitor />,
                icon:<ApiTwoTone />
                
            },
            { 
                path:'chargingstation/revenue',
                element:<Revenue />,
                icon:<ApiTwoTone />
            },
            { 
                path:'chargingstation/management',
                element:<Management />,
                icon:<ApiTwoTone />
            },

            { 
                path:'operations/orders',
                element:<Orders />,
                icon:<HddTwoTone />
                
            },
            { 
                path:'operations/detail',
                element:<Detail />,
                icon:<HddTwoTone />
            },
            { 
                path:'operations/total',
                element:<Total />,
                icon:<HddTwoTone />
            },

            { 
                path:'map',
                element:<Map />,
                icon: <CarTwoTone />
            },
            { 
                path:'alarm',
                element:<Alarm />,
                icon: <PhoneTwoTone />
            },
            { 
                path:'equipment',
                element:<Equipment />,
                icon: <PoundCircleTwoTone />
            },
            { 
                path:'investmentManagement',
                element:<InvestmentManagement />,
                icon: <MoneyCollectTwoTone />
            },
            { 
                path:'system',
                element:<System />,
                icon: <SettingTwoTone />
            },
            { 
                path:'personal',
                element:<PersonalCenter />,
                icon: <IdcardTwoTone />
            },
            { 
                path:'',
                element: <Navigate to={'dashboard'} />
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