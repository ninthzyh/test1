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
            color: ['rgba(255,198,71, 1)', 'rgba(79,117,248, 1)', 'rgba(199,77,118, 1)'],
            legend: [
                {
                    icon: 'line',
                    itemWidth: 25,
                    left: 23,
                    top: 11,
                    textStyle: {
                        fontsize: 12,
                        fontfamily: 'Microsoft YaHei',
                        fontweight: 400,
                        color: '#fff'
                    },
                    data: ['失业人员再就业人数']
                },
                {
                    icon: 'line',
                    itemWidth: 25,
                    left: 200,
                    top: 11,
                    textStyle: {
                        fontsize: 12,
                        fontfamily: 'Microsoft YaHei',
                        fontweight: 400,
                        color: '#fff'
                    },
                    data: ['就业农村劳动力转移就业人数']
                },
                {
                    icon: 'line',
                    itemWidth: 25,
                    left: 150,
                    top: 32,
                    textStyle: {
                        fontsize: 12,
                        fontfamily: 'Microsoft YaHei',
                        fontweight: 400,
                        color: '#fff'
                    },
                    data: ['新增就业人数']
                }
            ],
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
                data: ['2016年', '2017年', '2018年', '2019年', '2020年']
            },
            yAxis: {
                // name: '数量',
                type: 'value',
                position: 'left',
                // max: 1000,
                // min: 0,
                // splitNumber: 5,
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
                    data: [2985, 4200, 4700, 5380, 3700],
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255,198,71, 1)',
                                width: window.lineWidth,
                            }
                        }
                    },
                },
                {
                    name: '就业农村劳动力转移就业人数',
                    type: 'line',
                    symbol: 'none',
                    data: [5200, 6000, 6000, 5300, 10000],
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(79,117,248, 1)',
                                width: window.lineWidth,
                            }
                        }
                    },
                },
                {
                    name: '新增就业人数',
                    type: 'line',
                    symbol: 'none',
                    data: [14095, 60000, 12000, 10580, 13500],
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(199,77,118, 1)',
                                width: window.lineWidth,
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