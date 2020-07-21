import React, { Component } from 'react';
import TrafficStyle from '../Traffic.module.scss';
import ChartHeader from '../../../components/ChartHeader/ChartHeader';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts'; //导入 echarts 模块

export default class Five extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [ //三大景区人流分布
                ['product', '闯红灯车辆', '车辆压线', '不按导向线行驶', '不系安全带', '斑马线未礼让行人', '车辆违停'],
                ['0:00', 90, 260, 60, 190, 400, 160],
                ['2:00', 80, 250, 52, 210, 450, 170],
                ['4:00', 120, 240, 90, 180, 390, 140],
                ['6:00', 160, 270, 131, 140, 350, 111],
                ['8:00', 140, 280, 112, 130, 380, 110],
                ['10:00', 130, 190, 105, 90, 420, 70],
                ['12:00', 280, 360, 220, 110, 370, 80],
                ['14:00', 270, 380, 200, 130, 310, 100],
                ['16:00', 310, 190, 245, 140, 280, 110],
                ['18:00', 320, 360, 280, 110, 250, 80],
                ['20:00', 330, 390, 300, 90, 210, 60],
                ['22:00', 340, 410, 315, 70, 200, 40]
            ],
        }
    }

    getOption = (dataSource) => {
        return {
            tooltip: {
                trigger: 'axis',
                // backgroundColor: 'rgba(255,255,255,0.7)',
                // textStyle: {
                //     color: '#000000'
                // }
            },
            legend: [
                {
                    icon: 'line',
                    itemWidth: 15,
                    left: 13,
                    top: 13,
                    textStyle: {
                        fontsize: 12,
                        fontfamily: 'Microsoft YaHei',
                        fontweight: 400,
                        color: 'rgba(159,206,255,1)',
                    },
                    data: ['闯红灯车辆']
                },
                {
                    icon: 'line',
                    itemWidth: 15,
                    left: 130,
                    top: 13,
                    textStyle: {
                        fontsize: 12,
                        fontfamily: 'Microsoft YaHei',
                        fontweight: 400,
                        color: 'rgba(159,206,255,1)',
                    },
                    data: ['车辆压线']
                },
                {
                    icon: 'line',
                    itemWidth: 15,
                    left: 280,
                    top: 13,
                    textStyle: {
                        fontsize: 12,
                        fontfamily: 'Microsoft YaHei',
                        fontweight: 400,
                        color: 'rgba(159,206,255,1)',
                    },
                    data: ['不按导向线行驶']
                },
                {
                    icon: 'line',
                    itemWidth: 15,
                    left: 13,
                    top: 35,
                    textStyle: {
                        fontsize: 12,
                        fontfamily: 'Microsoft YaHei',
                        fontweight: 400,
                        color: 'rgba(159,206,255,1)',
                    },
                    data: ['不系安全带']
                },
                {
                    icon: 'line',
                    itemWidth: 15,
                    left: 130,
                    top: 35,
                    textStyle: {
                        fontsize: 12,
                        fontfamily: 'Microsoft YaHei',
                        fontweight: 400,
                        color: 'rgba(159,206,255,1)',
                    },
                    data: ['斑马线未礼让行人']
                },
                {
                    icon: 'line',
                    itemWidth: 15,
                    left: 280,
                    top: 35,
                    textStyle: {
                        fontsize: 12,
                        fontfamily: 'Microsoft YaHei',
                        fontweight: 400,
                        color: 'rgba(159,206,255,1)',
                    },
                    data: ['车辆违停']
                },
            ],
            grid: {
                bottom: '3%',
                top: '36%',
                right: '7%',
                left: '2%',
                containLabel: true
            },
            // animation: true,
            // animationDuration: 5000,
            // animationEasing: 'quinticInOut',
            // animationDurationUpdate: 5000,
            // animationEasingUpdate: 'quinticInOut',
            dataset: { source: dataSource },
            color: ['#47C8FF', '#2C00BB', '#FFC900', '#00FF5A', '#FF00FF', '#FA0029'],
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    interval: 1,//0代表显示所有x轴标签显示
                    textStyle: {
                        color: 'rgba(234,244,255,1)',
                        fontFamily: 'Microsoft YaHei',
                        fontStyle: 'normal',
                        fontweight: 400,
                        fontSize: 14,
                    },
                },
                axisTick: {
                    show: true,
                },
                axisLine: {
                    lineStyle: {
                        color: '#7389B9',
                        opacity: 0.1
                    }
                }
            },
            yAxis: [
                {
                    // color:'#7389B9',
                    type: 'value',
                    splitNumber: 5,
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(234,244,255,1)',
                            fontFamily: 'Microsoft YaHei',
                            fontStyle: 'normal',
                            fontweight: 400,
                            fontSize: 14,
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#7389B9',
                            opacity: 1.0
                        }
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
                    type: 'line',
                    symbol: "none",
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1
                            }
                        }
                    },
                    markline: {
                        animation: true,
                        animationDuration: 25000,
                        animationEasing: 'quinticInOut',
                        animationDurationUpdate: 1000,
                        animationEasingUpdate: 'quinticInOut',
                    }
                },
                {
                    type: 'line',
                    symbol: "none",
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1
                            }
                        }
                    },
                    markline: {
                        animation: true,
                        animationDuration: 25000,
                        animationEasing: 'quinticInOut',
                        animationDurationUpdate: 1000,
                        animationEasingUpdate: 'quinticInOut',
                    }
                },
                {
                    type: 'line',
                    symbol: "none",
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1
                            }
                        }
                    },
                    markline: {
                        animation: true,
                        animationDuration: 25000,
                        animationEasing: 'quinticInOut',
                        animationDurationUpdate: 1000,
                        animationEasingUpdate: 'quinticInOut',
                    }
                },
                {
                    type: 'line',
                    symbol: "none",
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1
                            }
                        }
                    },
                    markline: {
                        animation: true,
                        animationDuration: 25000,
                        animationEasing: 'quinticInOut',
                        animationDurationUpdate: 1000,
                        animationEasingUpdate: 'quinticInOut',
                    }
                },
                {
                    type: 'line',
                    symbol: "none",
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1
                            }
                        }
                    },
                    markline: {
                        animation: true,
                        animationDuration: 25000,
                        animationEasing: 'quinticInOut',
                        animationDurationUpdate: 1000,
                        animationEasingUpdate: 'quinticInOut',
                    }
                },
                {
                    type: 'line',
                    symbol: "none",
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1
                            }
                        }
                    },
                    markline: {
                        animation: true,
                        animationDuration: 25000,
                        animationEasing: 'quinticInOut',
                        animationDurationUpdate: 1000,
                        animationEasingUpdate: 'quinticInOut',
                    }
                },
            ]
        }
    };


    render() {
        return (
            <>
                <ChartHeader title='交通违章事件' />
                <div className={TrafficStyle.content}>
                    <ReactEcharts
                        option={this.getOption(this.state.data)}
                        style={{ width: '100%', height: '120%' }} />
                </div>
            </>
        )
    }
}
