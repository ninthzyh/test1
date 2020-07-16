import React, { Component } from 'react';
import echarts from 'echarts';
import style from './Three.module.scss';
import ChartHeader from '../../../../components/ChartHeader/ChartHeader';

export default class Three extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        var number = [{
            name: '罚款缴纳 2323人',
            value: 45
        }, {
            name: '出入境自主办理2323人 35%',
            value: 55

        }];

        var data = [];
        var color = ['#006ced','#00ffff']
        for (var i = 0; i < number.length; i++) {
            data.push({
                value: number[i].value,
                name: number[i].name,
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        shadowBlur: 20,
                        borderColor: color[i],
                        shadowColor: color[i]
                    }
                }
            }, {
                value: 2,
                name: '',
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        color: 'rgba(0, 0, 0, 0)',
                        borderColor: 'rgba(0, 0, 0, 0)',
                        borderWidth: 0
                    }
                }
            });
        }
        var seriesOption = [{
            name: '',
            type: 'pie',
            clockWise: false,
            radius: [50, 60],
            center:['50%','50%'],
            hoverAnimation: false,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        // padding: [0, -20],
                        position: 'outer',
                        color: '#ddd',
                        formatter: function (params) {
                            // var percent = 0;
                            // var total = 0;
                            // for (var i = 0; i < number.length; i++) {
                            //     total += number[i].value;
                            // }
                            // percent = ((params.value / total) * 100).toFixed(0);
                            if (params.name !== '') {
                                let length = params.name.length;
                                return params.name.slice(0,5)+ '\n' + params.name.slice(5-length);
                            } else {
                                return '';
                            }
                        },
                    },
                    labelLine: {
                        length: 20,
                        length2: 10,
                        show: true,
                        color: '#00ffff'
                    }
                }
            },
            data: data
        }];
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('serviceNumber'));
        // 绘制图表
        myChart.setOption({
            color: color,
            title: {
                text: '办理总量',
                top: '45%',
                textAlign: "center",
                left: "49%",
                textStyle: {
                    color: '#00ffff',
                    fontSize: 15,
                    fontWeight: '400'
                }
            },
            grid:{
                top:"50%"
            },
            graphic: {
                elements: [{
                    type: "image",
                    z: 3,
                    style: {
                        // image: img,
                        width: 200,
                        height: 200
                    },
                    left: 'center',
                    top: 'center',
                    position: [50, 50]
                }]
            },
            tooltip: {
                show: false
            },
            toolbox: {
                show: false
            },
            series: seriesOption
        });
        window.onresize = myChart.onresize;
    }
    render() {
        return (
            <div className={style.serviceNumber}>
                 <ChartHeader title='特色服务总量' />
                <div id="serviceNumber" className={style.content}></div>
            </div>);
    }
}
