

import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import React from 'react';
//管理员权限菜单
export const menulist = [
    {
      name: "数据看板",
      url: "/dashboard",
      icon: ''
    },
    {
      name: "充电站管理",
      url: "/chargingstation",
      icon: "",
      children: [
        {
          name: "充电站监控",
          url: "/chargingstation/monitor",
          icon: ""
        },
        {
          name: "营收统计",
          url: "/chargingstation/revenue",
          icon: ""
        },
        {
          name: "充电桩管理",
          url: "/chargingstation/management",
          icon: ""
        }
      ]
    },
    {
      name: "电子地图",
      url: "/map",
      icon: ""
    },
    {
      name: "运营管理",
      url: "/operations",
      icon: "",
      children: [
        {
          name: "订单管理",
          url: "/operations/orders",
          icon: "",
        },
        {
          name: "订单详情",
          url: "/operations/detail",
          icon: ""
        },
        {
          name: "计费管理",
          url: "/operations/total",
          icon: ""
        },
      ]
    },
    {
      name: "报警管理",
      url: "/alarm",
      icon: ""
    },
    {
      name: "会员卡管理",
      url: "/equipment",
      icon: ""
    },
    {
      name: "招商管理",
      url: "/investmentManagement",
      icon: ""
    },
    {
      name: "系统设置",
      url: "/system",
      icon: ""
    },
  
    {
      name: "个人中心",
      url: "/personal",
      icon: ''
    },
]
//运营专员的菜单
export const menulist2 = [
    {
      name: "数据看板",
      url: "/dashboard",
      icon: ""
    },
    {
      name: "充电站管理",
      url: "/chargingstation",
      icon: "",
      children: [
        {
          name: "充电站监控",
          url: "/chargingstation/monitor",
          icon: ""
        },
        {
          name: "营收统计",
          url: "/chargingstation/revenue",
          icon: ""
        },
        {
          name: "充电桩管理",
          url: "/chargingstation/fault",
          icon: ""
        }
      ]
    },
    {
      name: "电子地图",
      url: "/map",
      icon: ""
    },
    {
      name: "运营管理",
      url: "/operations",
      icon: "",
      children: [
        {
          name: "订单管理",
          url: "/operations/orders",
          icon: "",
        },
        {
          name: "订单详情",
          url: "/operations/detail",
          icon: ""
        },
        {
          name: "计费管理",
          url: "/operations/total",
          icon: ""
        },
      ]
    },
    {
      name: "报警管理",
      url: "/alarm",
      icon: ""
    },
    {
      name: "会员卡管理",
      url: "/equipment",
      icon: ""
    },  
    {
      name: "个人中心",
      url: "/personal",
      icon: ""
    },
]