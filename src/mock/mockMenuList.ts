

//管理员权限菜单
export const menulist = [
    {
      name: "数据看板",
      url: "/dashboard",
    },
    {
      name: "充电站管理",
      url: "/chargingstation",
      children: [
        {
          name: "充电站监控",
          url: "/chargingstation/monitor",
        },
        {
          name: "营收统计",
          url: "/chargingstation/revenue",
        },
        {
          name: "充电桩管理",
          url: "/chargingstation/management",
        }
      ]
    },
    {
      name: "电子地图",
      url: "/map",
    },
    {
      name: "运营管理",
      url: "/operations",
      children: [
        {
          name: "订单管理",
          url: "/operations/orders",
        },
        {
          name: "订单详情",
          url: "/operations/detail",
        },
        {
          name: "计费管理",
          url: "/operations/total",
        },
      ]
    },
    {
      name: "报警管理",
      url: "/alarm",
    },
    {
      name: "会员卡管理",
      url: "/equipment",
    },
    {
      name: "招商管理",
      url: "/investmentManagement",
    },
    {
      name: "系统设置",
      url: "/system",
    },
  
    {
      name: "个人中心",
      url: "/personal",
    },
]
//运营专员的菜单
export const menulist2 = [
    {
      name: "数据看板",
      url: "/dashboard",
    },
    {
      name: "充电站管理",
      url: "/chargingstation",
      children: [
        {
          name: "充电站监控",
          url: "/chargingstation/monitor",
        },
        {
          name: "营收统计",
          url: "/chargingstation/revenue",
        },
        {
          name: "充电桩管理",
          url: "/chargingstation/fault",
        }
      ]
    },
    {
      name: "电子地图",
      url: "/map",
    },
    {
      name: "运营管理",
      url: "/operations",
      children: [
        {
          name: "订单管理",
          url: "/operations/orders",
        },
        {
          name: "订单详情",
          url: "/operations/detail",
        },
        {
          name: "计费管理",
          url: "/operations/total",
        },
      ]
    },
    {
      name: "报警管理",
      url: "/alarm",
    },
    {
      name: "会员卡管理",
      url: "/equipment",
    },  
    {
      name: "个人中心",
      url: "/personal",
    },
]