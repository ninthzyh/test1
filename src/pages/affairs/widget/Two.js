import React, { Component } from 'react';
import AffairsStyle from '../Affairs.module.scss'
import ChartHeader from 'components/ChartHeader/ChartHeader';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';

export default class Two extends Component {

    componentDidMount() {
        let chart = echarts.init(this.ID)
        chart.setOption(this.getOption())
    }
    getOption = () => {
        let option = {

            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            grid: {
                bottom: '10%',
                top: '20%'
            },
            xAxis: [{
                type: 'category',
                data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(255,255,255,.1)",
                        width: 1,
                        type: "solid"
                    },
                },

                axisTick: {
                    show: false,
                },
                axisLabel: {
                    interval: 0,
                    show: true,
                    splitNumber: 15,
                    textStyle: {
                        color: "rgba(255,255,255,1)",
                        fontSize: '12',
                    },
                },
            }],
            yAxis: [{
                name: '数量',
                nameTextStyle: {//y轴上方单位的颜色
                    color: '#4B8CD3'
                },
                type: 'value',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: "rgba(255,255,255,1)",
                        fontSize: '12',
                    },
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(255,255,255,.1	)",
                        width: 1,
                        type: "solid"
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.1)",
                    }
                }
            }],
            series: [

                {
                    name: '每月出行次数',
                    type: 'line',
                    areaStyle: {
                        // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(52,244,235,0.72)'// 0% 处的颜色
                            }, {
                                offset: 1, color: 'rgba(52,244,235,0)' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    },
                    lineStyle: {
                        color: '#34F4EB',
                        width: window.lineWidth
                    },
                    itemStyle: {
                        color: '#34F4EB',
                        opacity: 1,
                        barBorderRadius: 5,
                    },
                    barWidth: '35%', //柱子宽度
                    data: [500, 600, 780, 930, 1050, 1000, 900, 820, 780, 810, 800, 810],
                }
            ],
            animationDuration: 2000
        };
        return option
    }
    render() {
        return (
            <>
                <ChartHeader title='服务人次年度趋势图' />
                <div className={AffairsStyle.content}>
                    <div ref={ID => this.ID = ID} style={{ width: '100%', height: '100%' }}></div>
                </div>


            </>

        )
    }
}