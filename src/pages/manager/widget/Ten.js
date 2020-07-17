import React, { Component } from 'react';
import ManagerStyle from '../Manager.module.scss';
import ChartHeader from '../../../components/ChartHeader/ChartHeader';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts'; //导入 echarts 模块

export default class Ten extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  getOption = () => {
    return {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            icon:'line',
            itemWidth:10,
            textStyle:{
                fontsize:6,
                fontfamily:'Source Han Sans SC',
                fontweight:300,
                color:'#C9D0D5',
                },
                right:'5%',
            data: ['案件上报数量', '案件处置数量', '案件结案数量']
        },
        grid: {
            bottom: '1%',
            top: '20%',
            right:'1%',
            left:'1%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: ['1月', '2月', '3月','4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月','12月'],
            axisLabel: { 
                textStyle: {

                    color: '#FFFFFF',
                    fontFamily: 'Source Han Sans SC',
                    fontStyle: 'normal',
                    fontweight:400,
                    fontSize: 10,
                    opacity:0.5
                },
                //rotate:50,
            },
            axisTick:{
                show: false,
            },
            axisLine:{
                lineStyle:{
                    color:'#E5E9ED',
                    opacity:0.2
                }
            },
            splitLine: { 
                show: false,
                lineStyle: {
                    color: '#E5E9ED',
                // 	opacity:0.1
                }
            }
        },
        yAxis: [
            {
                type: 'value',
                splitNumber: 5,
                axisLabel: {
                    formatter: function(){

                        return "";
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#E5E9ED',
                        opacity:0.2
                    }
                },
                axisTick:{
                    show: false
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#E5E9ED',
                    // 	opacity:0.1
                    }
                }
    
            }
        ],
        series: [
            {
                name: '案件上报数量',
                type: 'line',
                symbol:"none",
                itemStyle: {
                    normal: {
                        color:'rgba(58,132,255,1)',
                        lineStyle: {
                            color: "rgba(58,132,255,0.75)",
                            width:1
                        },
                        areaStyle: { 
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: 'rgba(58,132,255,0)'
                            }, {
                                offset: 1,
                                color: 'rgba(58,132,255,0.15)'
                            }]),
                        }
                    }
                },
                data: [ 8, 7.5 , 7, 7.3, 7.6, 6.3, 5, 3.7, 5.1, 6.5, 4.5, 2.5]
            },
            {
                name: '案件处置数量',
                type: 'line',
                symbol:"none",
                itemStyle: {
                    normal: {
                        color:'rgba(250,217,61,1)',
                        lineStyle: {
                            color: "rgba(250,217,61,0.75)",
                            width:1
                        },
                        areaStyle: { 
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: 'rgba(250,217,61,0)'
                            }, {
                                offset: 1,
                                color: 'rgba(250,217,61,0.15)'
                            }]),
                        }
                    }
                },
                data: [6, 6.4,6.8,6.2,5.6,6,6.4,6.8,6,5.2,4.4,5.2]
            },
            {
                name: '案件结案数量',
                type: 'line',
                symbol:"none",
                itemStyle: {
                    normal: {
                        color:'rgba(255,80,124,1)',
                        lineStyle: {
                            color: "rgba(255,80,124,0.75)",
                            width:1
                        },
                        areaStyle: { 
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: 'rgba(255,80,124,0)'
                            }, {
                                offset: 1,
                                color: 'rgba(255,80,124,0.15)'
                            }]),
                        }
                    }
                },
                data: [2.5, 3.5,4.5,4,3.5,4,4.5,5,4,3,3.8,4.6]
            }
        ]
    }
  };


  render() {
    return (
        <>
            <ChartHeader title='年度案件统计趋势' />
            <div className={ManagerStyle.content}>
                <ReactEcharts
                    option={this.getOption()}
                    style={{ width: '100%', height: '100%' , top: '5%'}} />
            </div>


        </>
    )
}
}
