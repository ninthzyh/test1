import React, { Component } from 'react';
import AffairsStyle from '../../affairs/Affairs.module.scss'
import ChartHeader from 'components/ChartHeader/ChartHeader';
import echarts from 'echarts/lib/echarts' 
import 'echarts/lib/chart/line'


export default class extends Component {

    getOption = () => {
        let option = {
            tooltip: {
                trigger: 'axis',
            },
            grid: {
                bottom: '10%',
                top: '20%'
            },
            legend: {
                top: '5%',
                right: 0,
                data: [{
                    name: '当日公交车客流',
                    icon: 'line',
                    textStyle: {
                        color: '#9FCEFF',
                    }
                }, {
                    name: '当日出租车客流',
                    icon: 'line',
                    textStyle: {
                        color: '#9FCEFF',
                    }
                }],
            },
            xAxis: [{
                type: 'category',
                data: ['', '4:00', '8:00', '12:00', '20:00', '20:00'],
                boundaryGap: false,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: "rgba(255,255,255,1)",
                        type: "solid"
                    },
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
                nameTextStyle: {
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
                    name: '当日公交车客流',
                    type: 'line',
                    symbolSize: 0,
                    areaStyle: {
                        color: {
                            colorStops: [{
                                offset: 0, color: 'rgba(71,200,255,0.38)'
                            }, {
                                offset: 1, color: 'rgba(71,200,255,0.12)'
                            }],
                        }
                    },
                    lineStyle: {
                        color: '#47C8FF',
                        width: window.lineWidth
                    },
                    itemStyle: {
                        color: '#34F4EB',
                    },
                    data: [50, 48, 90, 80, 150, 120],
                }, {
                    name: '当日出租车客流',
                    type: 'line',
                    symbolSize: 0,
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(51,30,255,1)'
                            }, {
                                offset: 1, color: 'rgba(51,30,255,0)'
                            }],
                        }
                    },
                    lineStyle: {
                        color: '#1738ff',
                        width: window.lineWidth
                    },
                    itemStyle: {
                        color: '#26029B',
                    },
                    data: [100, 90, 150, 140, 210, 90],
                },

            ],
            animationDuration: 4000
        };
        return option
    }
    componentDidMount() {
        let chart = echarts.init(this.ID)
        chart.setOption(this.getOption())
    }
    render() {
        return (
            <>
                <ChartHeader title='公共交通客流量' />
                <div className={AffairsStyle.content}>
                    <div ref={ID => this.ID = ID} style={{ width: '100%', height: '100%' }}></div>
                </div>


            </>

        )
    }
}