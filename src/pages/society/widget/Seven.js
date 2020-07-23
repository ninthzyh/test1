import React, { Component } from 'react';
import SocietyStyle from '../Society.module.scss';
import ChartHeader from '../../../components/ChartHeader/ChartHeader';
// import echarts from 'echarts/lib/echarts'
// import 'echarts/lib/chart/line'
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts'; //导入 echarts 模块

export default class Seven extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    getOption = ( ) => {
        return {
            tooltip: {
                trigger: 'axis',
            },
            title:{
                text:'金额',
                top: 42,
                textStyle: {
                    fontSize: 12,
                    fontFamily: 'PingFangSC-Regular,PingFang SC',
                    fontWeight: 400,
                    color: '#4B8CD3',
                },
            },
            legend: [
                {
                    icon: 'line',
                    itemWidth: 25,
                    left: 18,
                    top: 13,
                    textStyle: {
                        fontsize: 12,
                        fontfamily: 'PingFangSC-Regular,PingFang SC',
                        fontweight: 400,
                        color: '#FFFFFF',
                    },
                    data: ['城镇低保标准（元/年）']
                },
                {
                    icon: 'line',
                    itemWidth: 25,
                    left: 205,
                    top: 13,
                    textStyle: {
                        fontsize: 12,
                        fontfamily: 'PingFangSC-Regular,PingFang SC',
                        fontweight: 400,
                        color: '#FFFFFF',
                    },
                    data: ['农村低保标准（元/年）']
                }
            ],
            grid: {
                bottom: '8%',
                top: '32%',
                right: '8%',
                left: '3%',
                containLabel: true
            },
            animationDuration: 3000,
            xAxis: {
                type: 'category',
                data: ['2017年', '2018年', '2019年', '2020年'],
                boundaryGap: false,
                axisLabel: {
                    textStyle: {
                        color: '#FFFFFF',
                        fontFamily: 'PingFangSC-Regular,PingFang SC',
                        fontStyle: 'normal',
                        fontweight: 400,
                        fontSize: 12,
                    },
                },
                axisTick: {
                    show: true,
                },
                axisLine: {
                    show: false
                }
            },
            yAxis: [
                {
                    type: 'value',
                    // splitNumber: 5,
                    max: 7000,
                    min: 3000,
                    axisLabel: {
                        textStyle: {
                            color: '#FFFFFF',
                            fontFamily: 'PingFangSC-Regular,PingFang SC',
                            fontStyle: 'normal',
                            fontweight: 400,
                            fontSize: 10,
                        },
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#134C78',
                            type: 'dashed'//背景线设置为虚线
                        }
                    }

                }
            ],
            series: [
                {
                    name: '城镇低保标准（元/年）',
                    type: 'line',
                    symbolSize: 0,
                    areaStyle: {
                        color: {
                            colorStops: [{
                                offset: 0, color: 'rgba(255, 186, 0,0.38)'
                            }, {
                                offset: 1, color: 'rgba(255, 186, 0,0.12)'
                            }],
                        }
                    },
                    lineStyle: {
                        color: 'rgba(255, 186, 0,0.38)',
                        width: window.lineWidth
                    },
                    itemStyle: {
                        color: 'rgba(255, 186, 0, 1)',
                    },
                    data: [5160, 5640, 6240, 6840],
                }, 
                {
                    name:  '农村低保标准（元/年）',
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
                                offset: 0, color: 'rgba(45, 215, 96,1)'
                            }, {
                                offset: 1, color: 'rgba(45, 215, 96,0)'
                            }],
                        }
                    },
                    lineStyle: {
                        color: 'rgba(45, 215, 96,1)',
                        width: window.lineWidth
                    },
                    itemStyle: {
                        color: 'rgba(45, 215, 96,1)',
                    },
                    data: [3210, 3450, 3860, 4260],
                },

            ],
        }
    };

    // componentDidMount() {
    //     let chart = echarts.init(this.ID)
    //     chart.setOption(this.getOption(this.state.data))
    // }

    render() {
        return (
            <>
                <ChartHeader title='低保标准' />
                <div className={SocietyStyle.content}>
                    {/* <div ref={ID => this.ID = ID} style={{ width: '100%', height: '120%' }}></div> */}
                    <ReactEcharts
                        option={this.getOption( )}
                        style={{ width: '100%', height: '120%' }} />
                </div>
            </>
        )
    }
}
