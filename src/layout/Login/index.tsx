import React, { useState } from 'react'
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input,Space } from 'antd';
import loginStyle from './index.module.scss'
import title from '../../assets/img/title.jpeg';
import type { AppDispatch  } from '../../store'
// 获取redux中的方法
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../store/slices/loginSlice';
import { useNavigate } from 'react-router-dom';
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
const Login:React.FC = (props) => {
  interface IUserCallbackMes {
    username?: string,
    token?: string,
    role?: string,
    homeRouteList?: object[],
  };
  type fetchStatus = 'init' | 'loading' | 'fulfilled' | 'rejected';
  const dispatch = useDispatch<AppDispatch>()
  const [ curStatus, setCurStatus ] = useState('init')
  // const { datas, status, error } = useSelector((state:{user: { 
  //   datas: IUserCallbackMes | undefined;
  //   status: fetchStatus;
  //   error: string | null
  // }}) => state.user);
  // setCurStatus(status)
  const navigate = useNavigate()
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { username, password } = values
    const { payload: { token: myLoginToken }} = await dispatch(fetchUser({ username, password}));
    if (myLoginToken) {
      navigate('/home', { replace: true });
    }
    console.log('fdsdfsdfsdf--------', myLoginToken);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
  function reset():void {
    console.log('重置用户名密码');
    
  }
  return (
    <div className={loginStyle['login_container']}>
      <div className={loginStyle['content']}>
      <div className={loginStyle['title']}>
        <img src={title} alt=""/>
        <span>中国石化能源管理平台</span>
      </div>
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: false }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            name="username"
            rules={[{ required: true, message: '用户名为必填项！' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            name="password"
            rules={[{ required: true, message: '密码为必填项！' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item label={null} className={loginStyle['form-submit-group']}>
            <Space size={'middle'}>
              <Button type="primary" htmlType="submit">
                登 录
              </Button>
              <Button htmlType="reset">
                重 置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Login;
