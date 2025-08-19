import React, { useEffect, useState, useTransition } from 'react'
import { Layout, Menu,  } from 'antd';
import menuStyle from './index.module.scss'
const { Sider } = Layout;
// import classNames from 'classnames';
import { type SetStateAction } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { IUserType, NavStateType } from '../../types';
import { useLocation, useNavigate } from 'react-router-dom';
import routeList from '../../routes/list';
import { updateCurrentActivePathname, addToNavStack } from '../../store/slices/navSlice';

const resetRouterList = (list: object[], flag?: boolean): object[] => {
  const originList = routeList && routeList[1].children || [];
  
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
  //  const { currentActivePath } = useSelector((state:{
  //     nav: NavStateType
  //   }) => state.nav)
  const [ routerList, setRouterList ] = useState<SetStateAction<any> | null>(null);
  const { pathname } = useLocation();
  
  const [ activePath, setActivePath ] = useState('')
  const [isPending, startTransition ] = useTransition()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // 通过useLocation()获取当前路由对象
  const findCurrentRouteObjectByuseLocation = (list: any[] = [], target: string = ''):any => {
    for (const item of list) {
      if (item.url === target) {
        return item
      }
      if (item.children) {
        const result = findCurrentRouteObjectByuseLocation(item.children, target);
        if (result) return result
      }
    }
  }
  useEffect(() => {
    if (datas) {
      const { homeRouteList = [] } = datas;
      const newRouterList = resetRouterList(structuredClone(homeRouteList), true)
      startTransition(() => {
        setRouterList(newRouterList)
      });
      const currentActivePathname = pathname.split('home')[1] + '' || '/dashboard';
      const curtPathObject = findCurrentRouteObjectByuseLocation(newRouterList, currentActivePathname)
      
      
      setActivePath(currentActivePathname);
      dispatch(updateCurrentActivePathname({path: curtPathObject.url, label: curtPathObject.name}))
      dispatch(addToNavStack({path: curtPathObject.url, label: curtPathObject.name}))
    }
  }, [])
  const handleSelect = (keys: any) => {
    const currentPath = keys.key.slice(1)
    const { homeRouteList = [] } = datas;
    const curtPathObject = findCurrentRouteObjectByuseLocation(homeRouteList, keys.key)
    dispatch(updateCurrentActivePathname({path: curtPathObject.url, label: curtPathObject.name}))
    dispatch(addToNavStack({path: curtPathObject.url, label: curtPathObject.name}))
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
