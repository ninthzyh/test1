import React, { Component } from 'react'
import {Progress} from 'antd';
import ChartHeader from 'components/ChartHeader/ChartHeader';
import AffairsStyle from '../Affairs.module.scss';
import '../../../assets/css/antd.rewrite.scss';
import up from 'img/affairs/up.svg';
import decline from 'img/affairs/decline.svg';


export default class RowBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progressData:[
                {
                    title:'档案查询',
                    proportion:'1,034',
                    percent: 80,
                    img:up
                },
                {
                    title:'住房公积金',
                    proportion:564,
                    percent: 67,
                    img:decline
                },
                {
                    title:'房产局综合受理',
                    proportion:134,
                    percent: 50,
                    img:decline
                }
            ]
        }
    }
    render() {
        const { progressData } = this.state;
        return (
            <>
                <ChartHeader title='服务人次年度趋势图' />
                <div className={AffairsStyle.serviceContainer}>
                    {progressData.map((item, index)=>(<div key={index} className={AffairsStyle.serviceWrapper}>
                        <div className={AffairsStyle.before}><span className={AffairsStyle.number}>{index + 1}</span>{item.title}</div>
                        <Progress
                            strokeColor={{
                                '0%': '#0C97FC',
                                '100%': '#18FFFF',
                            }}
                            status='active'
                            className={AffairsStyle.progress}
                            strokeWidth={6}
                            percent={item.percent}
                            showInfo={false} />
                        <div className={AffairsStyle.after}>{item.proportion}
                            <img className={AffairsStyle.img} src={item.img} /></div>
                    </div>))}
                </div>

            </>
        )
    }
}