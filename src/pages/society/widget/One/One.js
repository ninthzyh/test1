import React, { Component } from 'react';
import ChartHeader from '../../../../components/ChartHeader/ChartHeader';
import ReactEcharts from "echarts-for-react";
import echarts from 'echarts/lib/echarts';
import styles from './One.module.scss';
class One extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    getOption = () => {
        const option = {
            grid: {
                left: '15%',
                top: '35%',
                bottom: '15%',
                right: '10%',
            },
            tooltip: {
                trigger: 'axis'
            },
            color: ['rgba(79, 117, 248, 1)', 'rgba(199, 77, 118, 1)', 'rgba(255, 198, 71, 1)'],
            legend: {
                x: 'center',//可设定图例在左、右、居中
                y: '10%',
                data: [
                    {
                        name: '失业人员再就业人数',
                        textStyle: {
                            fontSize: 10,
                            fontWeight: 'bolder',
                            color: '#fff'
                        },
                        icon: 'line'
                    },
                    {
                        name: '新增就业人数',
                        textStyle: {
                            fontSize: 10,
                            fontWeight: 'bolder',
                            color: '#fff'
                        },
                        icon: 'line'
                    },
                    {
                        name: '就业农村劳动力转移就业人数',
                        textStyle: {
                            fontSize: 10,
                            fontWeight: 'bolder',
                            color: '#fff'
                        },
                        icon: 'line'
                    }
                ]
                // data: ['近五年失业人员再就业人数', '近五年新增就业人数', '就业农村劳动力转移就业人数']
            },
            xAxis: {
                type: 'category',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#6A989E',
                    }
                },
                axisLabel: {
                    inside: false,
                    textStyle: {
                        color: '#fff',// x轴颜色
                        fontWeight: 'normal',
                        fontSize: '10',
                        lineHeight: 20
                    }

                },
                data: ['2016年', '2017年', '2018年', '2019年', '2012年']
            },
            yAxis: {
                // name: '数量',
                type: 'value',
                position: 'left',
                max: 1000,
                min: 0,
                splitNumber: 5,
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 10,
                },
                splitLine: {
                    lineStyle: {
                        type: 'solid',
                        width: '0.5',
                        color: 'rgba(135,140,147,0.5)',
                    }
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value}',
                    color: '#fff',
                    fontSize: '10',
                }
            },
            series: [
                {
                    name: '失业人员再就业人数',
                    type: 'line',
                    symbol: 'none',
                    data: [120, 132, 101, 134, 90],
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(79, 117, 248, 1)',
                                width: 2,
                            }
                        }
                    },
                },
                {
                    name: '新增就业人数',
                    type: 'line',
                    symbol: 'none',
                    data: [400, 182, 190, 600, 900],
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(199, 77, 118, 1)',
                                width: 2,
                            }
                        }
                    },
                },
                {
                    name: '就业农村劳动力转移就业人数',
                    type: 'line',
                    symbol: 'none',
                    data: [300, 500, 700, 710, 810],
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 198, 71, 1)',
                                width: 2,
                            }
                        }
                    },
                },
            ]
        };
        return option
    }
    render() {
        return (<div className={styles.OnePage}>
            <ChartHeader title='就业创业' />
            <div className={styles.echartsBox}>
                <ReactEcharts
                    option={this.getOption()}
                    notMerge={true}
                    lazyUpdate={true}
                    style={{ width: '100%', height: '100%' }} />
            </div>
        </div>);
    }
}

export default One;