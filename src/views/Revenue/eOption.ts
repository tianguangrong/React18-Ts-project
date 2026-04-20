const option = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#999",
      },
    },
  },
  toolbox: {
    feature: {
      // dataView: { show: true, readOnly: false },
      // magicType: { show: true, type: ['line', 'bar'] },
      // restore: { show: true },
      // saveAsImage: { show: true }
    },
  },
  legend: {
    left: "center",
    top: "0",
    data: ["销售", "访问量"],
  },
  xAxis: [
    {
      type: "category",
      data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
      axisPointer: {
        type: "shadow",
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "销售",
      min: 0,
      // max: 250,
      interval: 50,
      axisLabel: {
        formatter: "{value}",
      },
    },
    {
      type: "value",
      name: "访问量",
      // min: 0,
      // max: 100,
      // interval: 5,
      axisLabel: {
        formatter: "{value}",
      },
    },
  ],
  series: [
    {
      name: "销售",
      type: "bar",
      tooltip: {
        valueFormatter: function (value: number) {
          return value as number;
        },
      },
      data: [],
    },
    {
      name: "访问量",
      type: "line",
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value: number) {
          return value as number;
        },
      },
      data: [],
    },
  ],
};
export default option;
