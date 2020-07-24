import React, { Component } from "react"
import FourStyle from './Four.module.scss'
import ChartHeader from "components/ChartHeader/ChartHeader"
import ProgressInfo from './ProgressInfo'
import echarts from 'echarts';
class Four extends Component {
    constructor(props) {
        super(props)
        this.companyList = [
            {
                name:"企业总数",
                count: 613,
                progress:61.3
            },
            {
                name:"纳税A级企业数",
                count: 5,
                progress:0.5
            },
            {
                name:"保险公司网点数",
                count: 45,
                progress:4.5
            },
            {
                name:"个体工商数",
                count: 982,
                progress:98.2
            },
            {
                name:"银行网点数",
                count: 110,
                progress:11
            },
            {
                name:"担保公司数",
                count: 1,
                progress:0.1
            },
            {
                name:"高新技术认证企业",
                count: 7,
                progress:0.7
            }
        ]

    }
    componentDidMount() {
        this.init();
    }
    init() {
        let yArrayLeft = [];
        let yArrayRight = [];
        let yProgress = [];
        let bgArr = [];
        // let yArrayLeft = this.companyList.map(item=>{
        //     array.push(item.name);
        //     return array;
        // })
        for (let item of this.companyList) {
            yArrayLeft.push(item.name);
            yArrayRight.push(item.count);
            yProgress.push(item.progress);
            bgArr.push(100);
        }
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('traffic_four'));
        let option = {
            grid: {
                top: '2%',
                bottom: -15,
                right: 10,
                left: -70,
                containLabel: true
            },
            animation: true,
            animationDuration: 3000,
            animationEasing: 'quadraticInOut',
            animationDurationUpdate: 3000,
            animationEasingUpdate: 'quadraticInOut',
            // tooltip: {
            //     trigger: 'axis',
            //     axisPointer: {
            //         type: 'none'
            //     },
            //     formatter: function (params) {
            //         return params[0].name + '<br/>' +
            //             "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
            //             params[0].seriesName + ' : ' + Number((params[0].value)).toLocaleString() + ' <br/>'
            //     }
            // },
            // backgroundColor: 'rgb(20,28,52)',
            xAxis: {
                show: false,
                type: 'value'
            },
            yAxis: [{
                type: 'category',
                inverse: true,
                axisLabel: {
                    show: true,
                    align: 'left',
                    margin: 110,
                    textStyle: {
                        color: '#fff',
                    },
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                data: yArrayLeft
            }, {
                type: 'category',
                inverse: true,
                axisTick: 'none',
                axisLine: 'none',
                show: true,
                axisLabel: {
                    textStyle: {
                        color: '#3ED5DE',
                        fontSize: '12',
                    },
                    formatter: function (value) {
                        if (value >= 10000) {
                            return (value / 10000).toLocaleString() + '';
                        } else {
                            return value.toLocaleString();
                        }
                    },
                },
                data: yArrayRight
            }],
            series: [{
                name: '金额',
                type: 'bar',
                zlevel: 1,
                itemStyle: {
                    normal: {
                        
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: 'rgb(57,89,255,1)'
                        }, {
                            offset: 1,
                            color: 'rgb(46,200,207,1)'
                        }]),
                        barBorderRadius: 0,
                    },
                },
                barWidth: 5,
                data: yProgress
            },
            {
                name: '背景',
                type: 'bar',
                barWidth: 5,
                barGap: '-100%',
                // data:  yArrayRight,
                data: bgArr,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: 'rgb(57,89,255,0.3)'
                        }, {
                            offset: 1,
                            color: 'rgb(46,200,207,0.3)'
                        }]),
                        barBorderRadius: 0,
                    }
                },
            },
            ]
        };
        myChart.setOption(option);
    }
    render() {
        const title = '总体概览';
        return (
            <div className={FourStyle.fourContainer}>
                <ChartHeader title={title} />
                <div id="traffic_four" className={FourStyle.itemBoxNew}></div>

            </div>
        )
    }
}

export default Four;