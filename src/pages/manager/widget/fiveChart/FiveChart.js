import React, { Component } from 'react';
import FiveChartStyle from './FiveChart.module.scss';
import ChartHeader from '../../../../components/ChartHeader/ChartHeader';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts'; //导入 echarts 模块

export default class FiveChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      Data: [50, 68, 74, 45, 51, 23, 22],
    }
  }

  getOption = (data, name) => {
    return {
      title: {
        text: '渣土清扫面积/万m²',
        left: 15,
        top: 5,
        textStyle: {
          fontSize: 14,
          fontFamily: 'Microsoft YaHei',
          fontWeight: 'bold',
          color: 'rgba(64,253,251,1)',
        },
      },
      tooltip: {
        formatter: '{b} : {c}m²',
      },
      grid: {
        top: '22%',
        left: '11%',
        right: '3%',
        bottom: 20,
      },
      animation:  true,
      animationDuration: 1000,
      animationEasing: 'quinticInOut',
      animationDurationUpdate: 1000,
      animationEasingUpdate: 'quinticInOut',
      color: '#0091FF',
      xAxis: {
        type: 'category',
        axisLine: {
          // lineStyle: {
          //   color: '#134C78',
          //   width: 1,    
          // },
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "rgba(237,237,237,1)",
            fontSize: 11,
          },
        },
        data: name,
      },
      yAxis: {
        type: 'value',
        max: 88,
        min: 0,
        interval: 22, //刻度间隔
        axisLine: {
          // lineStyle: {
          //   color: '#134C78',
          //   width: 1,    
          // },
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "rgba(237,237,237,1)",
            fontSize: 11,
          },
        },
        axisTick: {
          show: false
        },
        show: true,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#134C78',
            type: 'dashed'//背景线设置为虚线
          }
        }
      },
      series: [
        {
          type: 'bar',
          barWidth: 13,//柱图宽度
          data: data,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 1, color: '#008CFF' },                   //柱图渐变色
                  { offset: 0, color: '#15F2FF' },                   //柱图渐变色
                ]
              )
            },
            // emphasis: {
            //     color: new echarts.graphic.LinearGradient(
            //         0, 0, 0, 1,
            //         [
            //             {offset: 0, color: '#71C8B1'},                  //柱图高亮渐变色
            //             {offset: 1, color: '#06B5D7'}                   //柱图高亮渐变色
            //         ]
            //     )
            // }
          }
        }
      ],
    }
  };


  render() {
    return (
      <div className={FiveChartStyle.fiveMain}>
        <ChartHeader title='市容环卫' />
        <div className={FiveChartStyle.title}>
          <span className={FiveChartStyle.title1}>市环卫人员总数</span>
          <span className={FiveChartStyle.title2}> 123人</span>
          <span className={FiveChartStyle.title3}>机械化作业车辆</span>
          <span className={FiveChartStyle.title2}> 65辆</span>
        </div>
        <div className={FiveChartStyle.chart}>
          <ReactEcharts style={{ width: '100%', height: '100%' }} option={this.getOption(this.state.Data, this.state.Name)} />
        </div>
      </div>
    );
  }
}
