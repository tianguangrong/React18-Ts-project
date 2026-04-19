import React from 'react'
import { Card, type CardProps, Flex, Row, Col, Tag, Space } from 'antd'
import {
  ProfileOutlined
} from '@ant-design/icons';
interface Istatics {
  label: string,
  type: string,
  count: number,
  down?: number,
  up?: string

}
const totalStatics: Istatics[] = [{
  label: '今日总收入（元）',
  type: 'down',
  count: 776571,
  down: -32
}, {
  label: '本月总收入（万元）',
  type: 'down',
  count: 57231,
  down: -32
}, {
  label: '会员卡储蓄金额（元）',
  type: 'up',
  count: 9545,
  up: '+32'
}, {
  label: '服务费总额（元）',
  type: 'up',
  count: 776571,
  up: '+12'
}, {
  label: '停车费总额（元）',
  type: 'down',
  count: 358,
  down: -3
}, {
  label: '电费总金额（元）',
  type: 'up',
  count: 76575,
  up: '+32'
},]
const Revenue: React.FC = (props) => {
  const baseStyle: React.CSSProperties = {
    width: '25%',
    height: 54,
  };
  const boxShadow = { boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.12)" };
  return (
    <>
      {/* 头部统计 */}
      <Row gutter={16}>
        {
          totalStatics.map(item => {
            return (<Col span={4} key={item.label}>
              <Card styles={{
                body: {
                  ...boxShadow
                }
              }}>
                <Flex vertical={true}>
                  <Space direction="vertical" size="middle">
                    <Flex justify='space-between' >
                      <ProfileOutlined />
                      {item.label}
                    </Flex>
                    <Flex justify='flex-end' align='center' >
                      <h2>{item.count}</h2>
                      {

                        item.type === 'down' ?
                          <Tag color="red" bordered={false}>{item.down}</Tag>
                          :
                          <Tag color="green" bordered={false}>{item.up}</Tag>
                      }

                    </Flex>
                  </Space>
                </Flex>
              </Card>
            </Col>)
          })
        }
      </Row>
      {/*  */}
    </>
  )
}

export default Revenue
