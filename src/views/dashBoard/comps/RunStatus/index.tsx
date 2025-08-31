import React from 'react';
import RSStyle from './index.module.scss';
import { Col, Row } from 'antd';
import Item from './item';
import flash from '../../../../assets/img/flash.png';
import flash2 from '../../../../assets/img/flash2.png';
import flash3 from '../../../../assets/img/flash3.png';

const RunStatus = () => {
  return (
    <Row gutter={16} className={RSStyle['content']}>
      <Col span={9}>
        <Item rate='72/79' imgSrc={flash} title="充电桩使用率" errRate={11175} errDeviNum={12} type='dowm' yest={24}/>
      </Col>
      <Col span={9}>
        
        <Item rate='5/15' imgSrc={flash2} title="充电柜使用率" errRate={11175} errDeviNum={18} type='dowm' yest={21}/>
      </Col>
      <Col span={6}>
        
        <Item rate='44/80' imgSrc={flash3} title="充电站使用率" errRate={11175} errDeviNum={5} type='up' yest={28}/>
      </Col>
    </Row>
  )
}

export default RunStatus
