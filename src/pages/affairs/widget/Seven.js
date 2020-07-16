import React, { Component } from 'react'
import {Progress} from 'antd';
import ChartHeader from 'components/ChartHeader/ChartHeader';
import AffairsStyle from '../Affairs.module.scss'


export default class RowBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progressData:[
                {
                    title:'档案查询',
                    proportion:1034,
                    percent: 80
                },
                {
                    title:'住房公积金',
                    proportion:564,
                    percent: 67
                },
                {
                    title:'房产局综合受理',
                    proportion:134,
                    percent: 50
                }
            ]
        }
    }
    render() {
        const { progressData } = this.state;
        return (
            <>
                <ChartHeader title='服务人次年度趋势图' />
                {progressData.map((item, index)=>(<div className={AffairsStyle.serviceWrapper}>
                    <div className={AffairsStyle.before}><span className={AffairsStyle.number}>{index + 1}</span>{item.title}</div>
                    <Progress
                        strokeColor={{
                            '0%': '#596AFF',
                            '100%': '#34F4EA',
                        }}
                        className={AffairsStyle.progress}
                        strokeWidth={8}
                        percent={item.percent}
                        showInfo={false} />
                        <div className={AffairsStyle.after}>{item.proportion}</div>
                </div>))}
            </>
        )
    }
}