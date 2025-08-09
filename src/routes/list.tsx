
import { Navigate } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import NotFound from "../layout/NotFound";
import Login from "../layout/Login";
import DashBoard from "../views/dashBoard";
const routeList = [
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/home',
        element: <DefaultLayout/>,
        children: [
            { 
                path:'dashBoard',
                element: <DashBoard />
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