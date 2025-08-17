import React, { useEffect, useState, useTransition } from 'react'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, type MenuProps } from 'antd';
import menuStyle from './index.module.scss'
const { Header, Content, Footer, Sider } = Layout;
import classNames from 'classnames';
import { type SetStateAction } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { IUserType } from '../../types';
import { useLocation, useNavigate } from 'react-router-dom';
import routeList from '../../routes/list';
import { updateCurrentActivePathname } from '../../store/slices/navSlice';

const resetRouterList = (list: any[], flag?: boolean): object[] => {
  const originList = routeList && routeList[1].children || []
  console.log('originList', originList);
  
  const result = list.map((item: any) => {
      const url = item.url.split('/')[1];
     const targetRouterList = originList.map(item => {
      if (item.path.includes(url)) {
        return item
      }
     }).filter(Boolean)
    
      Object.assign(item, {
        key: item.url,
        label: item.name,
        icon: flag && targetRouterList[0]?.icon
      });
      if (Object.prototype.hasOwnProperty.call(item, 'children')) {
        resetRouterList(item.children, false)
      }
      return item;
  })

 return result
}
function MenuComent() {
  const {datas = {}} = useSelector((state:IUserType) => state.user);
   const {activePathname} = useSelector((state:{
      nav: {
        activePathname:string
      }
    }) => state.nav)
  const [ routerList, setRouterList ] = useState<SetStateAction<any> | null>(null);
  const { pathname } = useLocation();
  const [ activePath, setActivePath ] = useState('')
  const [isPending, startTransition ] = useTransition()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if (datas) {
      const { homeRouteList = [] } = datas;
      const newRouterList = resetRouterList(structuredClone(homeRouteList), true)
      startTransition(() => {
        setRouterList(newRouterList)
      });
      const currentActivePathname = pathname.split('home')[1] + '' || '/dashboard';
      console.log('newRouterList ------', newRouterList);
      
      setActivePath(currentActivePathname);
      dispatch(updateCurrentActivePathname(currentActivePathname))
    }
  }, [])
  const handleSelect = (keys: any) => {
    const currentPath = keys.key.slice(1)
    console.log(currentPath);
    setActivePath(keys?.key);
    navigate(currentPath);
    
  }
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
        <h2 className={menuStyle['logo-content']}>
          <img className={menuStyle['logo']} src="http://www.sinopecgroup.com/r/cms/jtyw/default/images/indexfootlogo.png" alt="" />
          中国石化</h2>
    </div>
    {
      !isPending ? <Menu onSelect={handleSelect} theme="dark" mode="inline" defaultSelectedKeys={[activePath]} selectedKeys={[activePath]} items={routerList} /> : <div style={{color: 'white', padding: '0 12px'}}>Menu Loading...</div>
    }
    
    </Sider>
  )
}

export default MenuComent
