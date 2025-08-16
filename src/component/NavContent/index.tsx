import React, { useRef, useState } from 'react';
import { Button, Tabs } from 'antd';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
const defaultPanes = Array.from({ length: 2 }).map((_, index) => {
  const id = String(index + 1);
    //   children: `Content of Tab Pane ${index + 1}`,
  return { label: `Tab ${id}`,  key: id };
});
const NavContent: React.FC = () => {
  const [items, setItems] = useState(defaultPanes);
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
