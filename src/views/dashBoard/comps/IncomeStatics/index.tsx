import React, { Suspense, useEffect, useState } from 'react';
import { httpGet } from '../../../../utils/axios';
import style from './index.module.scss'
import {Spin} from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

const IncomeStatics = () => {
    const [ incomeDatas, setIncomeDatas ] = useState([]);
        const [loading, setLoading ] = useState(false);
    const getIncomeStaticsDatas= async() => {
        setLoading(true);
        try {
            const { code, data } = await httpGet('/api/income-static').finally(() => {
                setLoading(false)
            }) as any;
            if(code === 200) {
                setIncomeDatas(data)
            }
        } catch (error) {
            setIncomeDatas([])
            setLoading(false);
        }
        
    }
    const bedgeStyle: React.CSSProperties = ({
        width: '20px',
        height: '20px',
        textAlign: 'center',
        lineHeight: '18px',
        borderRadius: '50%',
    })
    useEffect(()=>{
        getIncomeStaticsDatas()
    },[])
    return (
        
        <Spin spinning={loading}>
        {
            incomeDatas.map((icome: {
                type: string,
                city: string,
                percent: string,
                color: string,
                income: number,
            }, index) => {
                return <div className={style['income-item']} key={icome.city}>
                    <span className={style['item']} style={{
                        ...bedgeStyle,
                        background: icome.color,
                        color: icome.color ? 'white' : '#000'
                    }}>{+index + 1}</span>
                    <span  className={style['item']}>{icome.city}</span>
                    <span style={{flex: '1'}}></span>
                    <span className={style['item']}>{icome.income}</span>
                    <span className={style['item']}>{icome.percent}</span>
                    { icome.type === 'up' ? <ArrowUpOutlined style={{color: 'green'}}/> : <ArrowDownOutlined style={{color: 'red'}}/> }
                </div>
            })
        }
        </Spin>
    )
}

export default IncomeStatics
