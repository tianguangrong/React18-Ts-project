import React, { useEffect, useState, startTransition } from 'react';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import type{  NavStateType, Path, IUserType } from '../../types';
import { useNavigate } from 'react-router-dom';
import { findCurrentRouteObjectByuseLocation } from '../../utils'
import { updateCurrentActivePathname } from '../../store/slices/navSlice';
const NavContent: React.FC = () => {
  const navigate = useNavigate();
  const dispath = useDispatch()
  const { datas: { homeRouteList } = {} } = useSelector((state: IUserType) => state.user)
  const { navStacks, currentActivePath } = useSelector((state:{nav: NavStateType}) => state.nav);
  useEffect(() => {
    startTransition(() => {
      let navList: Array<{label: string, key: string}> | [] = []
      navStacks.map((nav:Path) => {
        navList = [...navList!, {
          key: nav.path,
          label: nav.label
        }]
        console.log('currentActivePath 0000--->', currentActivePath);
        setItems(navList);
        setActiveKey(currentActivePath.path)
      });
    });
  }, [navStacks, currentActivePath])
  const [items, setItems] = useState<Array<{label: string, key: string}>| undefined >();
  const [activeKey, setActiveKey] = useState<string | undefined>();
  const onChange = (key:string) => {
   const path = key.slice(1)
   const curPath = findCurrentRouteObjectByuseLocation(homeRouteList, key);
   dispath(updateCurrentActivePathname({path:curPath.url, label: curPath.name}))
   navigate(path, {replace: false})
  }
  return (
    <>
      <Tabs
        tabBarStyle={{marginBottom: '0px'}}
        hideAdd
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        items={items}
      />
    </>
  )
}

export default NavContent
