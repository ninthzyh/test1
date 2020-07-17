import React, { Component } from 'react';
import ReactEcharts from "echarts-for-react";
import echarts from 'echarts/lib/echarts';
import ChartHeader from '../../../../components/ChartHeader/ChartHeader';
import styles from './Eight.module.scss'
import jishichuzhishuai from 'img/manager/jishichuzhishuai@2x.png'
let angle = 0;//角度，用来做简单的动画效果的
let Timer = null

class Eight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: 0
        }
    }
    componentDidMount() {
        this.draw();
        Timer = setInterval(() => {
            //用setInterval做动画感觉有问题
            this.draw()
        }, 100);
    }
    componentWillUnmount() {
        window.clearInterval(Timer)
    }
    draw = () => {
        angle = angle + 3
        this.setState({
            angle: this.state.angle + 3
        })
    }
    getOption = () => {
        let that = this
        const option = {
            series: [
                {
                    type: 'gauge',
                    radius: '90%',
                    clockwise: false,
                    startAngle: '90',
                    endAngle: '-269.9999',
                    splitNumber: 40,
                    detail: {
                        // offsetCenter: [0, -20],
                        formatter: ' '
                    },
                    pointer: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: [
                                [0, 'transparent'],
                                [82 / 100, 'transparent'],
                                [1, 'transparent']
                            ],
                            width: 2
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        length: 2,
                        lineStyle: {
                            color: 'hsla(205, 91%, 52%, 0.6)',
                            width: 6
                        }
                    },
                    axisLabel: {
                        show: false
                    }
                },
                {
                    name: "ring5",
                    type: 'custom',
                    coordinateSystem: "none",
                    renderItem: function (params, api) {
                        return {
                            type: 'arc',
                            shape: {
                                cx: api.getWidth() / 2,
                                cy: api.getHeight() / 2,
                                r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.55,
                                startAngle: (0 + that.state.angle) * Math.PI / 180,
                                endAngle: (90 + that.state.angle) * Math.PI / 180
                            },
                            style: {
                                stroke: "#0CD3DB",
                                fill: "transparent",
                                lineWidth: 1.5
                            },
                            silent: true
                        };
                    },
                    data: [0]
                },
                {
                    name: "ring5",
                    type: 'custom',
                    coordinateSystem: "none",
                    renderItem: function (params, api) {
                        return {
                            type: 'arc',
                            shape: {
                                cx: api.getWidth() / 2,
                                cy: api.getHeight() / 2,
                                r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.55,
                                startAngle: (180 + that.state.angle) * Math.PI / 180,
                                endAngle: (270 + that.state.angle) * Math.PI / 180
                            },
                            style: {
                                stroke: "#0CD3DB",
                                fill: "transparent",
                                lineWidth: 1.5
                            },
                            silent: true
                        };
                    },
                    data: [0]
                },
                {
                    type: 'gauge',
                    radius: '75%',
                    clockwise: false,
                    startAngle: '90',
                    endAngle: '-269.9999',
                    splitNumber: 25,
                    detail: {
                        // offsetCenter: [0, -20],
                        formatter: ' '
                    },
                    pointer: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: [
                                [0, 'transparent'],
                                [82 / 100, 'transparent'],
                                [1, new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0.1,
                                    color: "hsla(205, 91%, 52%, 1)"
                                },
                                {
                                    offset: 1,
                                    color: "rgba(52, 244, 234, 1)"
                                }
                                ])]
                            ],
                            width: 6
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        length: 6,
                        lineStyle: {
                            color: 'rgba(17, 17, 17, 0.3)',
                            // colorStops: [{
                            //     offset: 0, color: 'red' // 0% 处的颜色
                            // }, {
                            //     offset: 1, color: 'blue' // 100% 处的颜色
                            // }],
                            width: 3
                        }
                    },
                    axisLabel: {
                        show: false
                    }
                },
                {
                    type: 'pie',
                    name: '内层细圆环',
                    radius: ['46%', '48%'],
                    hoverAnimation: false,
                    clockWise: false,
                    itemStyle: {
                        normal: {
                            color: '#72979B'
                        }
                    },
                    label: {
                        show: false
                    },
                    data: [100]
                },
                {
                    type: 'pie',
                    name: '内层环',
                    radius: [0, '43%'],
                    hoverAnimation: false,
                    clockWise: false,
                    itemStyle: {
                        normal: {
                            color: 'transparent'
                        }
                    },
                    label: {
                        show: false
                    },
                    data: [100]
                }

            ]
        }
        return option;
    }
    render() {
        return (<div className={styles.EightPage}>

            <ChartHeader title='月底案件处理率' />
            <div className={styles.echartsContainer}>
                <div className={styles.echartsBox}>
                    <ReactEcharts
                        option={this.getOption()}
                        notMerge={true}
                        lazyUpdate={true}
                        style={{ width: '100%', height: '100%' }} />
                    <div className={styles.imgICon}><img src={jishichuzhishuai} /></div>
                    <div className={styles.titlePannel}>
                        <div className={styles.titleName}>当月处置率</div>
                        <div className={styles.Namevalue}>83.8%</div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default Eight;