//管理员权限菜单
export const menulist = [
  {
    name: "数据看板",
    hidden: false,
    url: "/dashboard",
  },
  {
    name: "充电站管理",
    hidden: false,
    url: "/chargingstation",
    children: [
      {
        name: "充电站监控",
        hidden: false,
        url: "/chargingstation/monitor",
      },
      {
        name: "营收统计",
        hidden: false,
        url: "/chargingstation/revenue",
      },
      {
        name: "充电桩管理",
        hidden: false,
        url: "/chargingstation/management",
      },
    ],
  },
  {
    name: "电子地图",
    url: "/map",
    hidden: false,
  },
  {
    name: "运营管理",
    url: "/operations",
    hidden: false,
    children: [
      {
        name: "订单管理",
        hidden: false,
        url: "/operations/orders",
      },
      {
        name: "订单详情",
        hidden: true,
        url: "/operations/detail",
      },
      {
        name: "计费管理",
        hidden: false,
        url: "/operations/total",
      },
    ],
  },
  {
    name: "报警管理",
    hidden: false,
    url: "/alarm",
  },
  {
    name: "会员卡管理",
    hidden: false,
    url: "/equipment",
  },
  {
    name: "招商管理",
    hidden: false,
    url: "/investmentManagement",
  },
  {
    name: "系统设置",
    hidden: false,
    url: "/system",
  },

  {
    name: "个人中心",
    hidden: false,
    url: "/personal",
  },
];
//运营专员的菜单
export const menulist2 = [
  {
    name: "数据看板",
    hidden: false,
    url: "/dashboard",
  },
  {
    name: "充电站管理",
    url: "/chargingstation",
    hidden: false,
    children: [
      {
        name: "充电站监控",
        hidden: false,
        url: "/chargingstation/monitor",
      },
      {
        name: "营收统计",
        hidden: false,
        url: "/chargingstation/revenue",
      },
      {
        name: "充电桩管理",
        hidden: false,
        url: "/chargingstation/fault",
      },
    ],
  },
  {
    name: "电子地图",
    url: "/map",
    hidden: false,
  },
  {
    name: "运营管理",
    url: "/operations",
    hidden: false,
    children: [
      {
        name: "订单管理",
        url: "/operations/orders",
        hidden: false,
      },
      {
        name: "订单详情",
        hidden: true,
        url: "/operations/detail",
      },
      {
        name: "计费管理",
        hidden: false,
        url: "/operations/total",
      },
    ],
  },
  {
    name: "报警管理",
    hidden: false,
    url: "/alarm",
  },
  {
    name: "会员卡管理",
    hidden: false,
    url: "/equipment",
  },
  {
    name: "个人中心",
    hidden: false,
    url: "/personal",
  },
];
