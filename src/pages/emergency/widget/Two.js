import React, { Component } from 'react';
import EmergencyStyle from '../Emergency.module.scss';
import ChartHeader from '../../../components/ChartHeader/ChartHeader';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts'; //导入 echarts 模块

export default class Two extends Component {
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
                fontsize:12,
                fontfamily:'Source Han Sans SC',
                fontweight:300,
                color:'#C9D0D5',
                },
                right:'2%',
            data: ['公共卫生事件', '社会安全', '自然灾害', '事故灾害']
        },
        grid: {
            bottom: '1%',
            top: '15%',
            right:'3%',
            left:'8%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['2016', '2017', '2018','2019', '2020'],
            axisLabel: { 
                textStyle: {
                    color: '#FFFFFF',
                    fontFamily: 'Source Han Sans SC',
                    fontStyle: 'normal',
                    fontweight:400,
                    fontSize: 12,
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
                name: '公共卫生事件',
                type: 'line',
                symbol:"none",
                itemStyle: {
                    normal: {
                        color:'rgba(58,132,255,1)',
                        lineStyle: {
                            color: "rgba(58,132,255,1)",
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
                data: [ 6.5, 4.8,  7.6, 3.7, 6.5]
            },
            {
                name: '社会安全',
                type: 'line',
                symbol:"none",
                itemStyle: {
                    normal: {
                        color:'rgba(250,217,61,1)',
                        lineStyle: {
                            color: "rgba(250,217,61,1)",
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
                data: [6,6.8,5.6,6.8,4.4]
            },
            {
                name: '自然灾害',
                type: 'line',
                symbol:"none",
                itemStyle: {
                    normal: {
                        color:'rgba(255,35,0,1)',
                        lineStyle: {
                            color: "rgba(255,35,0,1)",
                            width:1
                        },
                        areaStyle: { 
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: 'rgba(255,35,0,0)'
                            }, {
                                offset: 1,
                                color: 'rgba(255,35,0,0.15)'
                            }]),
                        }
                    }
                },
                data: [2.5,4.5,3.5,5,3.8]
            },
            {
                name: '事故灾害',
                type: 'line',
                symbol:"none",
                itemStyle: {
                    normal: {
                        color:'rgba(251,55,225,1)',
                        lineStyle: {
                            color: "rgba(251,55,225,1)",
                            width:1
                        },
                        areaStyle: { 
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: 'rgba(251,55,225,0)'
                            }, {
                                offset: 1,
                                color: 'rgba(251,55,225,0.15)'
                            }]),
                        }
                    }
                },
                data: [4.8,3.6,5.2,3.4,4.2]
            },
        ]
    }
  };


  render() {
    return (
        <>
            <ChartHeader title='应急类型分布' />
            <div className={EmergencyStyle.content}>
                <ReactEcharts
                    option={this.getOption()}
                    style={{ width: '100%', height: '100%' , top: '5%'}} />
            </div>


        </>
    )
}
}
