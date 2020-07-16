import React, { Component } from 'react';
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
        let option =  {
            series: [{
                type: 'liquidFill',
                radius: '70%',
                center: ['50%', '40%'],
                data: [0.76, 0.76],
                backgroundStyle: {
                    borderWidth: 2,
                    borderColor: 'rgba(21,208,246,.28)',
                },
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 1,
                    color: 'rgba(73, 126, 255, 0.36)'
                }, {
                    offset: 0,
                    color: 'rgba(135, 241, 244, 0.7)'
                }]),
                itemStyle: {
                     shadowBlur: 0,
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                            offset: 1,
                            color: 'rgba(135, 241, 244, 0.7)'
                        }, {
                            offset: 0,
                            color: 'rgba(73, 192, 255, 0.7)'
                        }]),
                        opacity: 1,
                },
                outline: {
                    show: false
                },
                label: {
                    fontSize: 15,
                    formatter: function(v) {
                        return '绿化率'+(v.data * 100).toFixed(0) + "%";
                    },
                    align: 'center',
        
                }
            }]
        };

        return option
    }
    getList = () => {
        return leftChart.map((item, index) => {
            return <div key={index}>
                <div className={ManagerStyle.treeImg}></div>
                <div className={ManagerStyle.treeText}>{item.title}</div>
                <div className={ManagerStyle.treeNum}>
                    {item.num}
                    <span className={ManagerStyle.treeUnit}>{item.unit}</span>
                    <sup className={ManagerStyle.treeUnit}>{item.sup}</sup>
                </div>
            </div>
        })
    }
    render() {
        return <>
            <ChartHeader title='园林绿化' />
            <div className={ManagerStyle.content}>
                <div className={ManagerStyle.average}>
                    <div className={ManagerStyle.left}>
                        {this.getList()}
                    </div>
                    <div className={ManagerStyle.right}>
                        <ReactEcharts
                            option={this.getOption()}
                            notMerge={true}
                            lazyUpdate={true}
                            style={{ width: '100%', height: '100%' }} />
                    </div>
                </div>


            </div>


        </>

    }
}