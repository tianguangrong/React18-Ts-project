import React, { useEffect, useRef, useState, startTransition } from 'react';
import { Button, Tabs } from 'antd';
import { useSelector } from 'react-redux';
import type{  NavStateType, Path } from '../../types';
import { addToNavStack } from '../../store/slices/navSlice';
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
const defaultPanes = Array.from({ length: 2 }).map((_, index) => {
  const id = String(index + 1);
    //   children: `Content of Tab Pane ${index + 1}`,
  return { label: `Tab ${id}`,  key: id };
});
const NavContent: React.FC = () => {
  const { navStacks } = useSelector((state:{nav: NavStateType}) => state.nav);
  useEffect(() => {
    // console.log('currentActivePath 0000--->', navStacks);
    startTransition(() => {
      let navList: Array<{label: string, key: string}> | [] = []
      navStacks.map((nav:Path) => {
        navList = [...navList!, {
          key: nav.path,
          label: nav.label
        }]
        console.log('currentActivePath 0000--->', navList);
        setItems(navList)
      });
    })
    // const navList = navStacks
  }, [navStacks])
  const [items, setItems] = useState<Array<{label: string, key: string}>| undefined >();
  const [activeKey, setActiveKey] = useState(defaultPanes[0].key);
  const onChange = () => {

  }
  const onEdit = () => {
    
  }
  return (
    <>
      <Tabs
        tabBarStyle={{marginBottom: '0px'}}
        hideAdd
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
        items={items}
      />
    </>
  )
}

export default NavContent
