import { Flex, Space, Input, Select,Card,Col, Row, Button, Statistic, Table, Tag  } from 'antd'
import React, { Component } from 'react';
import style from './index.module.scss';
import type { TableProps } from 'antd';

import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
export default class Monitor extends Component {
  // options:Array<any> = []
  state: {
    inputSelectType: string,
    inputValue: string,
    monitorStatus: null | number
  }
  constructor(props:any) {
    super(props)
    this.state = {
      inputSelectType: 'id',
      inputValue: '',
      monitorStatus: null
    }
  }
  onChangeSelectClicker = (value: any) => {
    const state = {
      ...this.state,
      inputSelectType: value,
      inputValue: ''
    };
    this.setState(state);
  }
  inputChangeClicker = (value: string) => {
    this.setState({
      ...this.state,
      inputValue: value
    })
    console.log('value', this.state.inputValue);
  }
  handleMonitorStatusChangeClicker = (value: number) => {
    console.log('value3', value);
    this.setState({
      ...this.state,
      monitorStatus: value
    })
  }
  reset() {
    this.setState({
      ...this.state,
      inputSelectType: 'id',
      inputValue: '',
      monitorStatus: null
    });
  }
  tableOnChange = (pagination: any) => {
    console.log(pagination);
    
  }
  render() {
    const boxShadow = {boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.12)'};
    const { inputSelectType, inputValue, monitorStatus } = this.state
    return (
      <div className={style['monitor-container']}>
        <Flex vertical gap="small" style={{height: '100%'}}>
          <Card style={boxShadow}>
            <Row gutter={16}>
              <Col span={8}>
                <Flex style={{flex: '1'}}>
                  <Input value={inputValue} onChange={(e) => this.inputChangeClicker(e.target.value)} placeholder={`请根据${inputSelectType === 'name' ? '名称': 'ID'}查询数据`} />
                  <Select
                    value={inputSelectType}
                    onChange={(e) => this.onChangeSelectClicker(e)}
                    options={[
                      {
                        value: 'id',
                        label: '按照ID查询',
                      },
                      {
                        value: 'name',
                        label: '按名称查询',
                      },
                    ]} />
                </Flex>
              </Col> 
              
              <Col span={8}>
                <Flex style={{flex: '1'}}>
                  <Select
                    value={monitorStatus}
                    placeholder="请选择充电站监控状态"
                    style={{ width: '100%' }}
                    onChange={this.handleMonitorStatusChangeClicker}
                    options={[
                      { value: 1, label: '空闲中' },
                      { value: 2, label: '使用中' },
                      { value: 3, label: '待维修' },
                      { value: 4, label: '维护中' },
                    ]}
                    />
                </Flex>
              </Col>
              <Col span={8}>
                <Flex gap="small" style={{flex: '1',justifyContent: 'flex-end'}}>
                  <Button type="primary" icon={<SearchOutlined></SearchOutlined>}>查 询</Button>
                  <Button onClick={this.reset.bind(this)}>重 置</Button>
                </Flex>
              </Col>
                
            </Row>
          </Card>
          <Card style={boxShadow}>
            <Row gutter={16} justify="space-around">
              <Col flex={1}>
                <Statistic title="累计充电量(度)" value={112893} />
              </Col>
              <Col flex={1} style={{textAlign: 'center'}}>
                <Statistic title="累计充电次数(次)" value={89893} />
              </Col>
              <Col flex={1} style={{textAlign: 'right'}}>
                <Statistic title="服务区域(个)" value={193} />
              </Col>
            </Row>
          </Card>
          
          <Card style={boxShadow}>
            <Row gutter={16}>
              <Col span={24}>
                  <Button type="primary"><PlusOutlined />新增充电站</Button>
              </Col>
            </Row>
          </Card>
          <Card style={{
            ...boxShadow,
            height: '100%'
          }}>
              <Table<DataType> style={{width: '100%',flex: 1}}  onChange={this.tableOnChange} columns={columns} dataSource={data} />
          </Card>
          {/* <Card style={boxShadow}>
            <Row gutter={16}>分页</Row>
          </Card> */}
        </Flex>
      </div>
      
    )
  }
}
