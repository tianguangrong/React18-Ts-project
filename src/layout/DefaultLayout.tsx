import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function DefaultLayout() {
  const { datas, status } = useSelector((state:any) => state.user);
  const { token } = datas || {};
  console.log('log', datas);
  const PriviteRoute = () => {
    if (token) {
      return <Outlet/>;
    }
    return <Navigate to={'/'}/>
  }
  return (
    <div>
      defaultLayout pages
      <PriviteRoute />
    </div>
  )
}
