import React, { useEffect, useState } from 'react';
import { type SetStateAction } from 'react';
import { Layout, theme } from 'antd';
const { Header } = Layout;
import classNames from 'classnames';
import headerStyle from './index.module.scss';
import { Badge, Space, Dropdown, message, } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import  type {IUserType} from '../../types';
import { clearUser } from '../../store/slices/loginSlice'

const items: MenuProps['items'] = [
  {
    label: '个人中心',
    key: '1',
  },
  {
    label: '退出登录',
    key: '2',
  },
];
const HeaderContent: React.FC = () => {
    const [ username, setUsername ]   = useState('')
    const { datas = {} } = useSelector((state:IUserType) => state.user);
    const dispatch  = useDispatch()
    // const navigate = useNavigate()
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const onClick: MenuProps['onClick'] = ({ key }) => {
        if (+key === 2) {
            dispatch(clearUser(null));
            // navigate('/login', {replace: true})
        }
    };
    useEffect(() => {
        if (datas) {
            setUsername(datas.username || '')
        }
    }, [datas])
    return (
        <>
            <Header style={{ background: colorBgContainer}} className={classNames(headerStyle['header-content'])}>
                <div className={headerStyle['h-left']}></div>
                <div className={headerStyle['h-space']}></div>
                <div className={headerStyle['h-right']}>
                    <Space size={'middle'}>
                        <Badge dot>
                            <BellOutlined style={{ fontSize: 16 }}/>
                        </Badge>
                        <Dropdown menu={{ items, onClick }}>
                            <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <span>欢迎你</span>, 
                                <span>{ username }</span>
                                <DownOutlined />
                            </Space>
                            </a>
                        </Dropdown>
                    </Space>
                </div>
            </Header>
        </>
    )
}

export default HeaderContent
