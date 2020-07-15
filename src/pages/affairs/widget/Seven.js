import React, { Component } from 'react'
import ReactEcharts from "echarts-for-react";
import echarts from 'echarts/lib/echarts';
import ChartHeader from 'components/ChartHeader/ChartHeader';


export default class RowBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowBar: [134,564,1034],
            yList: [],
            seriseName: '',
            defaultChoose: 'care'
        }
    }
    componentDidMount() {
        this.setState({
            yList: ['房产局综合受理', '住房公积金','档案查询' ],
            seriseName: '关爱'

        })

    }
    getOption = () => {
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                top: '5%',
                bottom: '2%',
                containLabel: true,
            },

            xAxis: {
                "axisLine": {       //y轴
                    "show": false

                },
                "axisTick": {       //y轴刻度线
                    "show": false
                },
                "show": false,
                type: 'value'
            },
            yAxis: {
                axisLabel: {
                    textStyle: {
                        color: "rgba(255,255,255,1)",
                        fontSize: '12',
                    },
                },
                "axisLine": {       //y轴
                    "show": false

                },
                "axisTick": {       //y轴刻度线
                    "show": false
                },
                type: 'category',
                data: this.state.yList
            },
            series: [
                {
                    name: this.state.seriseName,
                    type: 'bar',
                    barCateGoryGap: '20%',
                    barWidth: 8,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 7,
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 1, 0,
                                [
                                    { offset: 0, color: '#2170E6' },
                                    { offset: 1, color: '#55CCF3' }

                                ]
                            )
                        }
                    },
                    label: {
                        show: true,
                        position: ['100%', '0%'],
                        color: '#fff'

                    },
                    data: this.state.rowBar
                }
            ]
        }
        return option
    }
    render() {
        return (
            <>
                <ChartHeader title='服务人次年度趋势图' />
                <ReactEcharts
                    option={this.getOption()}
                    notMerge={true}
                    lazyUpdate={true}
                    style={{ width: '100%', height: '100%' }}
                />
            </>
        )
    }
}