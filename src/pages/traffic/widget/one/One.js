import React, { Component } from 'react';
import OneStyle from './One.module.scss';
import ChartHeader from '../../../../components/ChartHeader/ChartHeader';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts'; //导入 echarts 模块

export default class One extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: ['红绿灯', '公交站牌', '摄像头', '测速点', '卡口系统', '交通诱导牌', '区间测速', '加油站'],
            Data: [68, 88, 64, 78, 70, 62, 56, 53],
        }
    }

    getOption = (data, name) => {
        return {
            tooltip: {
                // formatter: '{b} : {c}',
            },
            grid: {
                top: '22%',
                left: '7%',
                right: '3%',
                bottom: '16%',
            },
            animation: true,
            animationDuration: 3000,
            animationEasing: 'quinticInOut',
            animationDurationUpdate: 3000,
            animationEasingUpdate: 'quinticInOut',
            color: '#0091FF',
            xAxis: {
                type: 'category',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: "rgba(237,237,237,1)",
                        fontSize: 11,
                    },
                    interval: 0,
                    rotate: -23,
                },
                data: name,
            },
            yAxis: {
                type: 'value',
                max: 88,
                min: 0,
                interval: 22, //刻度间隔
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: "rgba(237,237,237,1)",
                        fontSize: 11,
                    },
                },
                axisTick: {
                    show: false
                },
                show: true,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#134C78',
                        type: 'dashed'//背景线设置为虚线
                    }
                }
            },
            series: [
                {
                    type: 'bar',
                    barWidth: 13,//柱图宽度
                    data: data,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 1, color: '#008CFF' },                   //柱图渐变色
                                    { offset: 0, color: '#15F2FF' },                   //柱图渐变色
                                ]
                            )
                        },
                    }
                }
            ]
        }
    };


    render() {
        return (
            <div className={OneStyle.fiveMain}>
                <ChartHeader title='基础设施' />
                <div className={OneStyle.chart}>
                    <ReactEcharts style={{ width: '100%', height: '115%' }} option={this.getOption(this.state.Data, this.state.Name)} />
                </div>
            </div>
        );
    }
}
