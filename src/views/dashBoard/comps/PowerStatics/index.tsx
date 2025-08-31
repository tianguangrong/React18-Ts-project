import React, { useEffect, useRef, useState } from 'react';
import style from './index.module.scss'
import * as echarts from 'echarts';
import {httpGet} from '../../../../utils/axios';
const PowerStatics = () => {
    let option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['']
        },
        yAxis: {
        type: 'value'
        },
        series: [
        {
            name: '充电量',
            type: 'line',
            stack: 'Total',
            data: [0]
        },
        {
            name: '充电时长',
            type: 'line',
            stack: 'Total',
            data: [0]
        },
        {
            name: '充电功率',
            type: 'line',
            stack: 'Total',
            data: [0]
        }
        ]
    };
    const [data, setData] = useState(null)
    const fetchDatas = async () => {
        const {code, data, message} = await httpGet('/api/get-power-static') as any;
        if (code === 200) {
            setData(data)
            initChart(data)
            return;
        }
        setData(null)
    }
    const echartRef = useRef<HTMLDivElement>(null);
    let chartInstance:echarts.ECharts | null = null;
    const initChart = (data:any) => {
        if (data) {
            option.xAxis.data = data.category;
            option.series[0].data = data.record.charges;
            option.series[1].data = data.record.chargeTime;
            option.series[2].data = data.record.chargeRate;
        }
        chartInstance = echarts.init(echartRef.current);
        chartInstance.setOption(option);
    }
    const resize = () => {
        chartInstance?.resize()
    }
    useEffect(() => {
        fetchDatas();
        window.addEventListener('resize', resize)
        return chartInstance?.dispose()
    }, [])
    return (
        <div className={style['power-echarts-box']} ref={echartRef}>
        11
        </div>
    )
}

export default PowerStatics
