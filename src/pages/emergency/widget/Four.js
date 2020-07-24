import React, { Component } from 'react';
import ReactEcharts from "echarts-for-react";
import AffairsStyle from '../../affairs/Affairs.module.scss'
import ChartHeader from 'components/ChartHeader/ChartHeader';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';

export default class extends Component {
    componentDidMount() {
        let chart = echarts.init(this.ID)
        chart.setOption(this.getOption())
    }

    getOption = () => {
        let option = {
            tooltip: {
                trigger: 'axis',
            },
            grid: {
                bottom: '0%',
                top: '30%'
            },
            legend:{
                top:'5%',
                right: 0,
                data:[
                    {
                    name: '直接经济损失',
                    icon: 'line',
                    textStyle:{
                        color: '#C9D0D5',
                    }
                },
                // {
                //     name:'受灾人次',
                //     icon: 'line',
                //     textStyle:{
                //         color: '#C9D0D5',
                //     }
                // }
                ],
            },
            xAxis: [{
                type: 'category',
                data: ['2016', '2017', '2018', '2019', '2020'],
                // boundaryGap: false,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                         color: "rgba(255,255,255,1)",
                        type: "solid"
                    },
                },
                axisTick:{
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    show: true,
                    splitNumber: 15,
                    textStyle: {
                        color: "rgba(255,255,255,.5)",
                        fontSize: '12',
                    },
                },
            }],
            yAxis: [{
                nameTextStyle: {
                    color: '#4B8CD3'
                },
                type: 'value',
                axisLabel: {
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
                    show:false
                }
            }],
            series: [
            {
                name: '直接经济损失',
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: {
                        colorStops: [{
                                offset: 0, color: 'rgba(89, 106, 255,0.38)'
                            }, {
                                offset: 0, color: 'rgba(52, 244, 234,0.12)' 
                            }],
                    }
                        
                },
                itemStyle: {
        
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 1, 0, 0,
                                        [
                                            { offset: 0, color: 'rgba(89, 106, 255, 1)' },
                                            { offset: 1, color: 'rgba(52, 244, 234, 1)' }
        
                                        ]
                                    )
                                }
                            },
                            barMaxWidth: 20,
                            label: {
                        show: true,
                        position: 'top',
                        color: '#fff'

                    },
                            data: [120, 200, 150, 80, 70],
                },
                // {
                //     name: '受灾人次',
                //     type: 'line',
                //     symbolSize: 0,
                //     areaStyle: {
                //         color: {
                //             colorStops: [{
                //                 offset: 0, color: 'rgba(235, 100, 255,0.38)'
                //             }, {
                //                 offset: 1, color: 'rgba(235, 100, 255,0.12)' 
                //             }],
                //         }
                //     },
                //     lineStyle: {
                //         color: '#EB64FF',
                //         width: window.lineWidth
                //     },
                //     data: [ 90, 150, 140, 210, 90],
                // }
            ]
        }
        return option
    }
    render() {
        return (
            <>
                <ChartHeader title='财产损失情况' />
                <div className={AffairsStyle.content}>
                    <div ref={ID => this.ID = ID} style={{ width: '100%', height: '100%' }}></div>
                </div>


            </>

        )
    }
}