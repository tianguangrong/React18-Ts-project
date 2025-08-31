import React from 'react';
import RSStyle from './index.module.scss';
import { Col, Row, Statistic } from 'antd';
import flash from '../../../../assets/img/flash.png';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
interface itemProps {
    imgSrc: string,
    title: string,
    errRate: number,
    errDeviNum: number,
    type: string,
    yest: number,
    rate: string
}
const Item: React.FC<itemProps> = ({
    imgSrc,
    title,
    errRate,
    errDeviNum,
    type,
    yest,
    rate,
}) => {
  return (
    <>
        <Statistic title={title} value={errRate} />
        <img src={imgSrc} alt="" />
        <h2>{rate}</h2>
        <Statistic title="异常设备" value={errDeviNum} />
        <div>相较昨日: {yest}%
            {
                type === 'up' ? <ArrowUpOutlined  style={{color: 'green'}}/>:<ArrowDownOutlined style={{color: 'red'}}/>
            }
        </div>
    </>
  )
}

export default Item
