import React from 'react';
import { Skeleton, Flex, Space } from 'antd';
import { DotChartOutlined } from '@ant-design/icons';

const Fallback = () => {
  return (
    <Flex gap="middle">
        <Skeleton.Node active style={{ width: '200px',  height: '100vh' }} />
        <Flex gap="middle" vertical style={{overflow: 'hidden'}}>
            <Skeleton.Node active style={{ width: '90vw',  height: '70px' }}  />
            <Skeleton.Node active style={{ width: '90vw',  height: '86vh' }}  />
            <Skeleton.Node active style={{ width: '90vw',  height: '70px' }}  />
        </Flex>
    </Flex>
  )
}

export default Fallback
