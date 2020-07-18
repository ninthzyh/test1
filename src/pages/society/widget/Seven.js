import React, { Component } from 'react';
import SocietyStyle from '../Society.module.scss';
import ChartHeader from '../../../components/ChartHeader/ChartHeader';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts'; //导入 echarts 模块

export default class Seven extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  getOption = () => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
            textStyle: {
                color: '#fff'
            }

        },
    },
    legend:{
        data: ['男', '女'],
        textStyle:{
            fontsize:20,
            fontfamily:'PingFangSC-Regular,PingFang SC',
            fontweight:400,
            color:'#FFFFFF',
            lineheight:17,
            },
        icon:'rect',
        right:'10%',
        top:'3%',
        itemWidth:14,
        itemHeight:14,
    },
    grid: {
      bottom: '1%',
      top: '15%',
      right:'5%',
      left:'5%',
      containLabel: true
  },
    // calculable: true,
    xAxis: [{
        type: 'category',
        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,0.1)'
            }
        },
        splitLine: {
            show: false
        },
        axisTick: {
            show: true
        },
        splitArea: {
            show: false
        },
        axisLabel: {
            interval: 0,
            color:'rgba(255,255,255)',
            fontSize:10
        },
        data: [
                '≤10',
                '11-20',
                '21-30',
                '31-40',
                '41-50',
                '51-60',
                '≥61'],
    }],
    yAxis: [{
        type: 'value',
        name:'人口数量',
        nameTextStyle: {
             color: '#4B8CD3',
             fontSize:12,
             fontfamily:'PingFangSC-Regular,PingFang SC',
             fontWeight: 'bolder'
         },
        splitLine: {
            show: true,
            lineheight:1,
            lineStyle:{
              color:'rgba(255,255,255,0.2)',
            }     
        },
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            interval: 0,
            color:'rgba(255,255,255)',
            fontSize:10

        },
        splitArea: {
            show: false
        },

    }],
    series: [{
            name: '男',
            type: 'bar',
            stack: '总量',
            barMaxWidth: 35,
            label: {
                show: true,
                position: 'top',
                textStyle: {
                color: '#5967FF',
                fontSize:10,
                }
            },
            itemStyle: {
                normal: {
                    color: 
                    {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(89,103,255,1)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(89,103,255,0.24)' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                }
            },
            data: [570,550,530,480,300,240,310],
        },

        {
            name: '女',
            type: 'bar',
            stack: '总量',
            barWidth:20,
            label: {
                show: true,
                position: 'top',
                textStyle: {
                color: '#EE1C63',
                fontSize:10,
                }
            },
            itemStyle: {
                normal: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(238,28,99,1)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(238,28,99,0.24)' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    },
                    barBorderRadius: 0
                }
            },
            data: [570,550,530,480,300,240,310]
        }, 
    ]
    }
  };


  render() {
    return (
      <div className={SocietyStyle.content}>
        <ChartHeader title='养老服务人员性别年龄分布' />
        <ReactEcharts style={{ width: '100%', height: '100%', top:'5%'}} option={this.getOption()} />
      </div>
    );
  }
}
