
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export const LoginGuard = (props:any) => {
    const { datas } = useSelector((state:any) => state.user);
    const { token } = datas || {};
    console.log('这是我在路由守卫里面查看的token', token);
    const element: React.ReactNode = props.element
    if (!token) {
        return element
    }
    return <Navigate to={'/home'} replace/>
};