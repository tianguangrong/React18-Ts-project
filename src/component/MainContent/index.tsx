import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Layout, theme } from 'antd';
import { Outlet, Navigate } from 'react-router-dom';
const { Content } = Layout;
import NavContent from '../NavContent';
import mainStyle from './index.module.scss'
const MainContent: React.FC = () => {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
  const { datas, status } = useSelector((state:any) => state.user);
  const { token } = datas || {};
  const PriviteRoute = () => {
    if (token) {
      return <Outlet/>;
    }
    return <Navigate to={'/'}/>
  }
  return (
    <>
        <Content style={{ margin: '12px 12px 0' }}>
            <div
                style={{
                height: '100%',
                border: borderRadiusLG,
                background: colorBgContainer,
                display: 'flex',
                flexDirection: 'column',
                }}
            >
                <Fragment>
                    <NavContent />
                </Fragment>
                <div className={mainStyle['define-router-content']}>
                    <PriviteRoute />
                </div>
            </div>
        </Content>
    </>
  )
}

export default MainContent
