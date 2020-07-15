import React, { Component } from 'react';
import ReactEcharts from "echarts-for-react";
import TrafficStyle from '../Traffic.module.scss'

export default class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {}
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
            legend: {
                bottom: '0%',
                data: ['每月出行次数'],
                textStyle: {
                    color: "rgba(255,255,255,1)",
                    fontSize: '12',
                },
            },
            xAxis: [{
                type: 'category',
                data: ['<=10', '11-20', '31-40', '41-50', '>=61'],
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
                name: '人口数量',
                nameTextStyle: {//y轴上方单位的颜色
                    color: 'rgba(255,255,255,1)'
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
                                offset: 0, color: '#1681EF' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#4471BD' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    },
                    lineStyle: {
                        color: '#2f89cf',
                    },
                    itemStyle: {
                        color: '#0DB8F8',
                        opacity: 1,
                        barBorderRadius: 5,
                    },
                    barWidth: '35%', //柱子宽度
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                }
            ]
        };
        return option
    }
    btn=(e,type)=>{

        console.log(e.target,type)
        e.target.className += TrafficStyle.active
    }
    render() {
        return (
            <div>
                <div>
                    <button className={TrafficStyle.radioButton && TrafficStyle.active} value="diagosis" onClick={(e)=>this.btn(e,'diagosis')}>确诊</button>
                    <button className={TrafficStyle.radioButton} value="cure" onClick={(e)=>this.btn(e,'cure')}>治愈</button>
                    <button className={TrafficStyle.radioButton} value="death" onClick={(e)=>this.btn(e,'death')}>死亡</button>
                    <button className={TrafficStyle.radioButton} value="now" onClick={(e)=>this.btn(e,'now')}>现有</button>
                </div>
                <div className={TrafficStyle.content}>
                    <ReactEcharts
                        option={this.getOption()}
                        notMerge={true}
                        lazyUpdate={true}
                        style={{ width: '100%', height: '100%' }} />
                </div>
                <div className={TrafficStyle.title}>确诊病例跟踪分析</div>
            </div>

        )
    }
}