import React, { Component } from "react"
import FourStyle from './Four.module.scss'
import ChartHeader from "components/ChartHeader/ChartHeader"
import ProgressInfo from './ProgressInfo'
import echarts from 'echarts';
class Four extends Component {
    constructor(props) {
        super(props)
        this.companyList=[
                {
                    name: "企业总数",
                    count: 46386,
                    progress: 87
                },
                {
                    name: "纳税A级企业数",
                    count: 36982,
                    progress: 70
                },
                {
                    name: "保险公司网点数",
                    count: 4,
                    progress: 10
                },
                {
                    name: "个体工商数",
                    count: 110,
                    progress: 35
                },
                {
                    name: "银行网点数",
                    count: 45,
                    progress: 17
                },
                {
                    name: "担保公司数",
                    count: 1,
                    progress: 4
                },
                {
                    name: "高新技术认证企业",
                    count: 7,
                    progress: 10
                }
            ]
        
    }
    componentDidMount() {
        this.init();
    }
    init() {
        let yArrayLeft = [];
        let yArrayRight = [];
        let yProgress = []
        // let yArrayLeft = this.companyList.map(item=>{
        //     array.push(item.name);
        //     return array;
        // })
        for(let item of this.companyList){
            yArrayLeft.push(item.name);
            yArrayRight.push(item.count);
            yProgress.push(item.progress)
        }
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('traffic_four'));
        let option = {
            grid: {
                left: '2%',
                right: '2%',
                bottom: '0',
                top: '5%',
                containLabel: true
            },
            animation: true,
            animationDuration: 3000,
            animationEasing: 'quadraticInOut',
            animationDurationUpdate: 3000,
            animationEasingUpdate: 'quadraticInOut',
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none'
                },
                formatter: function (params) {
                    return params[0].name + '<br/>' +
                        "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                        params[0].seriesName + ' : ' + Number((params[0].value)).toLocaleString() + ' <br/>'
                }
            },
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
                    textStyle: {
                        color: '#fff'
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
                        fontSize: '12'
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
                        barBorderRadius: 0,
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: 'rgb(57,89,255,1)'
                        }, {
                            offset: 1,
                            color: 'rgb(46,200,207,1)'
                        }]),
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
                // data: [5000, 5000, 50, 50, 50,50,50],
                itemStyle: {
                    normal: {
                        color: 'rgba(24,31,68,1)',
                        barBorderRadius: 0,
                    }
                },
            },
            ]
        };
        myChart.setOption(option)
    }
    render() {
        const title = '智慧金融';
        return (
            <div className={FourStyle.fourContainer}>
                <ChartHeader title={title} />
                <div id="traffic_four" className={FourStyle.itemBoxNew}></div>

            </div>
        )
    }
}

export default Four;