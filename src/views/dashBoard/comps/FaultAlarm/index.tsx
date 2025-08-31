import React from 'react';
import style from './index.module.scss';
import { SmileOutlined, BellFilled,  } from '@ant-design/icons';
import { Timeline, Card, Statistic } from 'antd';

const FaultAlarm = () => {
  return (
    <Timeline
    items={[
      {
        color: 'red',
        dot: <BellFilled />,
        children: (
           <>
                <p>2025-08-30 22:08</p>
                <Card>
                    <strong>迁西县高速路口中国石化通讯中断</strong>
                </Card>
            </>
           
        ),
      },
      {
        children: (
           <>
                <p>2025-08-23 04:46</p>
                <Card>
                    <strong>迁安建安路口中国石化通讯异常</strong>
                </Card>
            </>
        ),
      },
      {
        color: 'gray',
        children: (
           <>
                <p>2025-08-20 17:16</p>
                <Card>
                    <strong>迁西火箭源路中国石化通讯异常</strong>
                </Card>
            </>
        ),
      },
      {
        color: 'gray',
        children: (
           <>
                <p>2025-08-02 07:36</p>
                <Card>
                    <strong>迁西西环路路中国石化通讯异常</strong>
                </Card>
            </>
        ),
      },
    ]}
  />
  )
}

export default FaultAlarm
