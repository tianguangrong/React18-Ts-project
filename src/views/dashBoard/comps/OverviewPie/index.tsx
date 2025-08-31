import React, { useEffect, useRef, useState } from 'react'
import { httpGet } from '../../../../utils/axios';
import * as echarts from 'echarts';
import {Spin} from 'antd'
import style from './index.module.scss'

const OverviewPie = () => {
    
    const option = {
        legend: {
            data: [''],
            left: 'left'
        },
        radar: {
            indicator: [
                { name: '' },
            ]
        },
        series: [
            {
                type: 'radar',
                data: [
                    {
                        value: [0],
                        name: '',
                    },
                ]
            }
        ]
    };
    const radorRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading ] = useState(false);
    let pieInstance:echarts.ECharts | null = null
    const initPieChart = () => {
        pieInstance = echarts.init(radorRef.current);
        pieInstance.setOption(option)
    }
    const initRadorData = async() => {
        setLoading(true);
        try {
            const { code, data } = await httpGet('/api/get-device-sumary').finally(() => {
                    setLoading(false)
                }) as any;
            if (code === 200) {
                console.log(data.category.map((item: string) => ({ name: item})));
                option.legend.data = data.legend;
                option.radar.indicator = data.category.map((item: string) => ({ name: item}));
                option.series[0].data[0].value = data.record;
                option.series[0].data[0].name = data.legend[0];
                initPieChart()
            }
        } catch (error) {
            setLoading(false)
        }
    }
    useEffect(() => {
        initRadorData();
        window.addEventListener('resize',() => {
            pieInstance?.resize();
        })
        return pieInstance?.dispose();
    }, [])
    return (
        <Spin spinning={loading}>
            <div className={style['pie-content']} ref={radorRef}></div>
        </Spin>
    )
}

export default OverviewPie
