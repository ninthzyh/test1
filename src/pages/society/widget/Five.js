import React, { Component,createRef } from 'react';
import ChartHeader from '../../../components/ChartHeader/ChartHeader';
import SocietyStyle from '../Society.module.scss';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts-liquidfill/src/liquidFill.js'

export default class extends Component {
    constructor(){
        super()
        this.chartRef = createRef()
        this.chartRefR = createRef()
    }
    componentDidMount() {
        let chart = echarts.init(this.chartRef.current)
        chart.setOption(this.getOption())
        let liquidChart = echarts.init(this.chartRefR.current)
        liquidChart.setOption(this.getLiquidOption())
    }
    getOption = () => {
        let option = {
            tooltip: {
                trigger: 'axis',
            },
            grid: {
                left: '20%',
                bottom: '15%',
                top:'25%',
            },
            xAxis: [{
                type: 'category',
                data: ['2018', '2019', '2020'],
                boundaryGap: ['120%', '120%'],
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: "rgba(255,255,255,1)",
                        type: "solid"
                    },
                },
                axisTick: {
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
                name: '数量/万',
                // min:'dataMin',
                // max:'dataMax',
                nameTextStyle: {
                    color: '#4B8CD3'
                },
                type: 'value',
                axisLabel: {
                    show: true,
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "rgba(255,255,255,1	)",
                        width: 1,
                        type: "solid"
                    },
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(63, 64, 75, .3)',
                    }
                },
            },
            {
                name: '增长率/%',
                min:8,
                max:10,
                nameTextStyle: {
                    color: '#4B8CD3'
                },
                type: 'value',
                axisLabel: {
                    show: true,
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "rgba(255,255,255,1	)",
                        width: 1,
                        type: "solid"
                    },
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(63, 64, 75, .3)',
                    }
                },
            }
        ],
            series: [
                {
                    name: '城镇居民可支配收入',
                    type: 'bar',
                    itemStyle: {

                        normal: {
                            barBorderRadius: [10, 10, 0, 0],
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: 'rgba(255,207,51,1)' },
                                    { offset: 1, color: 'rgba(242,192,65,0.05)' }

                                ]
                            )
                        }
                    },
                    barMaxWidth: 8,
                    data: [2.6, 2.8, 3.05],
                },
                {
                    name: '农村居民可支配收入',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            barBorderRadius: [10, 10, 0, 0],
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: 'rgba(47,95,255,1)' },
                                    { offset: 1, color: 'rgba(0,38,255,0.28)' }

                                ]
                            )
                        },
                    },
                    barMaxWidth: 8,
                    data: [1.2, 1.31, 1.42],
                },

                {
                    name: '城镇居民人均可支配增长率',
                    type: 'line',
                    symbolSize: 5,
                    symbol: 'circle',
                    yAxisIndex:1,
                    areaStyle: {
                        color: {
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(244,156,52,0.38)'
                            }, {
                                offset: 1, color: 'rgba(244,156,52, 0.12)'
                            }],
                        }
                    },
                    lineStyle: {
                        color: '#F49C34',
                        width: window.lineWidth
                    },
                    itemStyle: {
                        color: '#F49C34',
                    },
                    data: [9.5, 8.8, 9],
                }
                , {
                    name: '农村居民人均可支配增长率',
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 5,
                    yAxisIndex:1,
                    areaStyle: {
                        color: {
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(78,252,220,0.38)'
                            }, {
                                offset: 1, color: 'rgba(226,97,199,0.12)'
                            }],
                        }
                    },
                    lineStyle: {
                        color: '#4EFCDC',
                        width: window.lineWidth
                    },
                    itemStyle: {
                        color: '#4EFCDC',
                    },
                    data: [9.5, 9.1, 8.8],
                }
            ]
        }
        return option
    }
    getLiquidOption = () => {
        let option = {
            graphic: [{
                type: 'group',
                left: 'center',
                top: '50%',
                children: [{
                    type: 'text',
                    z: 100,
                    left: 'center',
                    top: 'middle',
                    style: {
                        fill: '#fff',
                        text: '民生支出\n\n  56亿元',
                        font: '13px Microsoft YaHei'
                    }
                }]
            }, {
                type: 'text',
                z: 100,
                left: 'center',
                top: '90%',
                style: {
                    fill: '#fff',
                    text: '同比增长 11.9%',
                    font: '13px Microsoft YaHei'
                }

            }, {
                type: 'text',
                z: 100,
                left: 'center',
                top: '5%',
                style: {
                    fill: '#00FFD1',
                    text: '占一般公共预算支出比重',
                    font: '13px Microsoft YaHei'
                }

            }, {
                type: 'text',
                z: 100,
                left: 'center',
                top: '35%',
                style: {
                    fill: '#fff',
                    text: '84%',
                    font: '18px Microsoft YaHei'
                }

            }],
            series: [{
                radius: '60%',
                type: 'liquidFill',
                center: ['50%', '50%'],
                data: [0.84],
                name: 'Liquid Fill',
                backgroundStyle: {
                    color: 'rgba(255,255,255,0)',
                },
                itemStyle: {
                    color: '#05846D',
                    borderWidth: '1px',
                    borderColor: '#05846D',
                },
                outline: {
                    show: true,
                    borderDistance: 4,
                    itemStyle: {
                        color: 'none',
                        borderColor: '#05846D',
                        borderWidth: 4,
                    }
                },
                label: {
                    normal: {
                        formatter: '',
                    }
                }
            }]
        };

        return option
    }
    render() {
        return <>
            <ChartHeader title="财政收入" />
            <div className={SocietyStyle.content}>
                <div className={SocietyStyle.fiveLegend}>
                        <div className={SocietyStyle.legendItem}><span className={SocietyStyle.lineY}></span><span>城镇居民人均可支配增长率</span></div>
                        <div className={SocietyStyle.legendItem}><span className={SocietyStyle.lineG}></span><span>农村居民人均可支配增长率</span></div>
                        <div className={SocietyStyle.legendItem}><span className={SocietyStyle.rectG}></span><span>城镇居民可支配收入</span></div>
                        <div className={SocietyStyle.legendItem}><span className={SocietyStyle.rectB}></span><span>农村居民可支配收入</span></div>
                </div>
                <div className={SocietyStyle.fiveChart}>

                    <div className={SocietyStyle.left}>
                        <div ref={this.chartRef} style={{ width: '100%', height: '100%' }}></div>
                    </div>
                    <div className={SocietyStyle.right}>
                        <div ref={this.chartRefR} style={{ width: '100%', height: '100%' }}></div>
                    </div>
                </div>
            </div>
        </>
    }
}