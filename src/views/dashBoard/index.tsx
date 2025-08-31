import React from 'react';
import { Flex, Card } from 'antd';
import classNames from 'classnames';
import dashBstyle from './index.module.scss';
import RunStatus from './comps/RunStatus';
import repair from '../../assets/img/repair.png';
import daily from '../../assets/img/daily.png';
import progress from '../../assets/img/progress.png';
import total from '../../assets/img/total.png';
import money from '../../assets/img/money.png';
import remain from '../../assets/img/remain.png';
import PowerStatics from './comps/PowerStatics';
import OverviewPie from './comps/OverviewPie';
import IncomeStatics from './comps/IncomeStatics';
import FaultAlarm from './comps/FaultAlarm';



const dashBoard: React.FC = () => {
  const { Meta } = Card;
  const deviceOverview = [
    {
      img: repair,
      label:'设备维修'
    },
    {
      img: daily,
      label:'每日日报'
    },
    {
      img: progress,
      label:'任务进度'
    },
    {
      img: total,
      label:'营收占比'
    },
    {
      img: money,
      label:'营收统计'
    },
    {
      img: remain,
      label:'待办事务'
    },
  ]
  return (
      <Flex gap="middle" align="start" className={classNames(dashBstyle['dashboard-container'])}>
        <Flex className={classNames(dashBstyle['left-content'])} vertical gap={'middle'}>
          <Card title="今日设备运行状态" className={dashBstyle['run-status-box']}>
              <RunStatus/>
          </Card>
          <Card title="设备功能总览" className={classNames(dashBstyle['slice-box'])}>
            <Flex align='center' justify="space-around">
              {
                deviceOverview.map(item => {
                  return <div key={item.label} style={{textAlign: 'center'}}>
                    <div><img src={item.img} title={item.label} /></div>
                    <div>{item.label}</div>
                  </div>
                })
              }
            </Flex>
          </Card>
          <Card title="充电量统计" className={classNames(dashBstyle['charge-power-static-box'])}>
              <PowerStatics/>
          </Card>
        </Flex>
        <Flex className={classNames(dashBstyle['right-content'])}  vertical gap={'middle'}>
          <Card title="总览图表" className={dashBstyle['overview-pie']}>
            <OverviewPie/>
          </Card>
          <Card title="营收统计" className={dashBstyle['income-statics']}>
            <IncomeStatics/>
          </Card>
          <Card title="故障报警" className={dashBstyle['fault-alarm']}>
            <FaultAlarm/>
          </Card>
        </Flex>
      </Flex>
  )
}

export default dashBoard

