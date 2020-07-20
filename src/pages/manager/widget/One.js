import React, { Component, Fragment } from 'react';
import ManagerStyle from '../Manager.module.scss'
import ChartHeader from 'components/ChartHeader/ChartHeader';
import ReactEcharts from "echarts-for-react";
import 'echarts-liquidfill/src/liquidFill.js'
import echarts from 'echarts/lib/echarts';

const leftChart = [
    {
        title: '人均绿化面积',
        num: 34,
        unit: ' m',
        sup: 2
    }
]
export default class extends Component {
    getOption = () => {
        let option = {
            series: [{
                type: 'liquidFill',
                radius: '100%',
                data: [0.5, 0.5],
                name: 'Liquid Fill',
                backgroundStyle: {
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [
                            {
                                offset: 0, color: 'transparent' // 0% 处的颜色
                            },
                            {
                                offset: 0.7, color: 'transparent' // 70% 处的颜色
                            },
                            {
                                offset: 1, color: 'rgba(21, 208, 246,0.3)' // 100% 处的颜色
                            }
                        ],
                        globalCoord: false // 缺省为 false
                    },

                },
                label: {
                    position: ['50%', '37%'],
                    formatter: '绿化率75%',
                    fontSize: 13,
                    color: '#fff',
                    align: 'center'
                },
                itemStyle: {
                    color: 'rgba(21, 208, 246,0.3)',
                    borderWidth: '1px',
                    borderColor: '#B16326'
                },
                outline: {
                    show: false
                }
            }]
        };

        return option
    }
    getList = () => {
        return leftChart.map((item, index) => {
            return <div className={ManagerStyle.left} key={index}>
                <div className={ManagerStyle.treeImg}></div>
                <p className={ManagerStyle.treeText}>{item.title}</p>
                <p className={ManagerStyle.treeNum}>
                    {item.num}
                    <span className={ManagerStyle.treeUnit}>{item.unit}</span>
                    <sup className={ManagerStyle.treeUnit}>{item.sup}</sup>
                </p>
            </div>
        })
    }
    render() {
        return <>
            <ChartHeader title='园林绿化' />
            <div className={ManagerStyle.content}>
                <div className={ManagerStyle.average}>
                    {this.getList()}
                    <div className={ManagerStyle.right}>
                        <ReactEcharts
                            option={this.getOption()}
                            notMerge={true}
                            lazyUpdate={true}
                            style={{ width: '100%', height: '100%' }} />
                        <div className={ManagerStyle.circleBig}>
                            <div className={ManagerStyle.circleMid}>
                                <div className={ManagerStyle.circleSmall}></div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>


        </>

    }
}