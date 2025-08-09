import { menulist, menulist2 } from './mockMenuList';
import Mock from 'mockjs';

Mock.setup({
  timeout: '200-900'
})
Mock.mock('https://www.demo.com/api/alarm-static', 'get', (options: any) => {
  return {
    code: 200,
    message: 'success',
    data: [
      {
        content: '迁西县高速路口中国石化通讯中断',
        timestamp: '2025-08-02 20:46',
        size: 'large',
        type: 'primary',
        icon: 'BellFilled',
        color: '#bd2843ff',
      },
      {
        content: '迁安建安路口中国石化通讯异常',
        timestamp: '2025-07-23 20:46',
        color: '#0bbd87',
      },
      {
        content: '迁西火箭源路中国石化通讯异常',
        timestamp: '2025-04-03 20:46',
        size: 'large',
        color: '#0bbd87',
      },
      {
        content: '迁西西环路路中国石化通讯异常',
        timestamp: '2025-04-03 20:46',
        size: 'large',
      },
    ]
  }
})
Mock.mock('https://www.demo.com/api/income-static', 'get', (options: any) => {
  return {
    code: 200,
    message: 'success',
    data: [
      {
        city: '广州',
        income: 52457,
        type: 'up',
        percent: '24%',
        color: '#67C23A',
      },
      {
        city: '上海',
        income: 323234,
        type: 'down',
        percent: '24%',
        color: '#E6A23C'
      },
      {
        city: '佛山',
        income: 74569,
        type: 'down',
        percent: '25%',
        color: 'rgb(200, 201, 204)'
      },
      {
        city: '珠海',
        income: 17540,
        type: 'up',
        percent: '24%'
      },
      {
        city: '深圳',
        income: 989521,
        type: 'down',
        percent: '21%'
      },
      {
        city: '唐山',
        income: 779521,
        type: 'up',
        percent: '14%'
      },
      {
        city: '迁安',
        income: 17540,
        type: 'up',
        percent: '35%'
      },
      {
        city: '四川',
        income: 989521,
        type: 'down',
        percent: '21%'
      },
      {
        city: '合肥',
        income: 779521,
        type: 'dowm',
        percent: '9%'
      },
      {
        city: '武汉',
        income: 17540,
        type: 'up',
        percent: '24%'
      },
    ]
  }
})
Mock.mock('https://www.demo.com/api/get-power-static', 'get', ()=> {
  return {
      code: 200,
      message: 'success',
      data: {
        legend: ['充电量', '充电时长', '充电功率'],
        category:['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
        record: {
          charges: [120, 132, 101, 134, 90, 230, 210],
          chargeTime: [220, 182, 191, 234, 290, 330, 310],
          chargeRate: [150, 232, 201, 154, 190, 330, 410],
        }
      }
    }
})
Mock.mock('https://www.demo.com/api/get-device-sumary', 'get', () => {
  return {
      code: 200,
      message: 'success',
      data: {
        legend: ['设备总览'],
        category: [ '闲置数',  '报废数', '更换数', '维修数', '故障数', '使用数' ],
        record: [4200, 3000, 20000, 35000, 50000, 18000]
      }
    }
})
Mock.mock('https://www.demo.com/api/login', 'post', (options: any) => {
  
  const { username, password } = JSON.parse(options.body);
  console.log('options', username, password);
  debugger
  if (username === 'admin' && password === 'admin123.') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        token: 'DSADD12312dfsdfsTOCVKENSADA121FSDF',
        username: '田广荣',
        role: 'admin',
        homeRouteList: menulist,
      }
    }
  } else if (username === 'user' && password === 'user123.') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        token: 'DSADD12312dfsdfsTOCVKENSADA121FSDFTSDAS',
        username: '田予安',
        role: 'user',
        homeRouteList: menulist2
      }
    }
  } else {
    return {
      code: 401,
      message: '用户名或密码错误',
      data: null,
    }
  }

})