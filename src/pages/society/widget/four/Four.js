import React, { Component } from "react"
import FourStyle from './Four.module.scss'
import ChartHeader from "components/ChartHeader/ChartHeader"
import ReactEcharts from 'echarts-for-react';
class Four extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                { value: 1567, name: '居家为老服务人数' },
                { value: 1467, name: '社区为老服务人数' },
                { value: 1367, name: '机构为老服务人数' }
            ]
        }
    }
    getOption(list) {
        const dataArr = [];
        for(let i in list) {
            dataArr.push(list[i]);
        }
        return {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: '10%',
                top: '45%',
                itemGap:15,
                data: dataArr,
                textStyle:{//图例文字的样式
                    color:'#fff',
                    
                }
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '50%',
                    center: ['33%', '50%'],
                    color: ['#6648FF', '#FFA243', '#16CEB9'],
                    roseType: 'radius',
                    data: list,
                    label: {
                        formatter: '{c}人',
                        color:'#FFFFFF',
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    }

    render() {
        return (
            <div className={FourStyle.fourContainer}>
                <ChartHeader title='养老服务' />
                <ReactEcharts  style={{ width: '100%', height: '80%' }} option={this.getOption(this.state.list)} />

            </div>

        )
    }

}

export default Four;