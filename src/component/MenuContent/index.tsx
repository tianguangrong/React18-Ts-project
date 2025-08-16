import React from 'react'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import menuStyle from './index.module.scss'
const { Header, Content, Footer, Sider } = Layout;
import classNames from 'classnames';

const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
  }),
);
function MenuComent() {
  return (
    <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
            console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
        }}
        >
    <div className={menuStyle['demo-logo-vertical']}>
        <div></div>
    </div>
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
    </Sider>
  )
}

export default MenuComent
