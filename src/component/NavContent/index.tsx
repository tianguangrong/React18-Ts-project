import React, { useEffect, useState, startTransition, useMemo } from 'react';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import type{  NavStateType, Path, IUserType } from '../../types';
import { useNavigate } from 'react-router-dom';
import { findCurrentRouteObjectByuseLocation } from '../../utils'
import { updateCurrentActivePathname } from '../../store/slices/navSlice';
import { clearNavStacks } from '../../store/slices/navSlice'
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const NavContent: React.FC = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [flag, setFlag ] = useState(false)
  const { datas = {} } = useSelector((state: IUserType) => state.user)
  const { navStacks, currentActivePath } = useSelector((state:{nav: NavStateType}) => state.nav);
  const homeRouteList = datas && datas.homeRouteList || []
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
  }, [navStacks, currentActivePath]);
  useEffect(() => {
    if (flag) {
      navigate(currentActivePath.path.slice(1));
      setFlag(false)
    }
  }, [currentActivePath])
  const [items, setItems] = useState<Array<{label: string, key: string}>| undefined >();
  const [activeKey, setActiveKey] = useState<string | undefined>();
  const onChange = (key:string) => {
   const path = key.slice(1)
   const curPath = findCurrentRouteObjectByuseLocation(homeRouteList, key);
   dispath(updateCurrentActivePathname({path:curPath.url, label: curPath.name}))
   navigate(path, {replace: false})
  }
  const onEdit = (targetPathUrl: TargetKey, action: 'add' | 'remove') => {
    if (action === 'remove') {
      const curPath = findCurrentRouteObjectByuseLocation(homeRouteList, targetPathUrl as string);
      dispath(clearNavStacks({path:curPath.url, label: curPath.name}));
      setFlag(true)
    }
  }
  return (
    <>
      <Tabs
        tabBarStyle={{marginBottom: '0px'}}
        hideAdd
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        type="editable-card"
        items={items}
      />
    </>
  )
}

export default NavContent
