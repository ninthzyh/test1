import React, { Component } from 'react'
import { Progress } from 'antd';
import ChartHeader from 'components/ChartHeader/ChartHeader';
import ManagerStyle from '../Manager.module.scss';
import '../../../assets/css/antd.rewrite.scss';


export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progressData: [
                {
                    title: '社会公众举报',
                    proportion: '999,999',
                    percent: 90,
                },
                {
                    title: '领导交办',
                    proportion: '999,999',
                    percent: 80,
                },
                {
                    title: '媒体曝光',
                    proportion: '999,999',
                    percent: 70,
                },
                {
                    title: '网上举报',
                    proportion: '999,999',
                    percent: 60,
                },
                {
                    title: '市民城管举报',
                    proportion: '999,999',
                    percent: 50,
                },
                {
                    title: '12319热线',
                    proportion: '999,999',
                    percent: 40,
                }
            ]
        }
    }
    render() {
        const { progressData } = this.state;
        return (
            <>
                <ChartHeader title='上报来源Top6' />
                <div className={ManagerStyle.serviceContainer}>
                    {progressData.map((item, index) => (<div key={index} className={ManagerStyle.serviceWrapper}>
                        <div className={ManagerStyle.before}>
                        <div>
                            {/* <span className={index > 2 ? ManagerStyle.number : ManagerStyle.oneNum}> */}
                            <span className={ManagerStyle[`number${index+1}`]}>
                            {index + 1}
                            </span>{item.title}</div>
                            <div className={ManagerStyle.after}>{item.proportion}</div>
                        </div>

                        <Progress
                            strokeColor={{
                                '0%': '#0C97FC',
                                '100%': '#18FFFF',
                            }}
                            status="active"
                            className={ManagerStyle.progress}
                            strokeWidth={6}
                            percent={item.percent}
                            showInfo={false} />

                    </div>))}
                </div>

            </>
        )
    }
}