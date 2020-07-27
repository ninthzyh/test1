import React, { Component } from 'react';
import TwoChartStyle from './Two.module.scss';
import ChartHeader from '../../../../components/ChartHeader/ChartHeader';
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
        // formatter: '{b} : {c}m²',
        // backgroundColor:'rgba(255,255,255,0.8)',
        // textStyle:{
        //   color: '#000000'
        // }
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '20%',
        bottom: '15%',
        top:'25%',
    },
      animation: true,
      animationDuration: 1000,
      animationEasing: 'quinticInOut',
      animationDurationUpdate: 1000,
      animationEasingUpdate: 'quinticInOut',
      legend: {
        data: ['市容市貌', '渣土运输'],
        textStyle: {
          width: 48,
          height: 13,
          fontsize: 12,
          fontfamily: 'Microsoft YaHei',
          fontweight: 400,
          color: '#9FCEFF',
          lineheight: 16,
        },
        icon: 'rect',
        orient: 'vertical',
        itemWidth: 14,
        itemHeight: 14,
        itemGap: 15,
        right: 3,
        top: 0,

      },
      grid: {
        top: 70,
        left: 28,
        right: 0,
        bottom: 20,
      },
      xAxis:
      {
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
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        name:"执法次数/次",
        nameTextStyle: {
          color:'rgba(255,255,255,1)',
          fontSize:10
      },
        type: 'value',
        max: 88,
        min: 0,
        interval: 22, //刻度间隔
        // axisLine: {
        //   lineStyle: {
        //     color: '#134C78',
        //     width: 1,    
        //   }
        // },
        axisLine: {
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
          name: '市容市貌',
          type: 'bar',
          barWidth: 12.9,
          data: [33, 72, 60, 66, 60, 58, 50],
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#23E4FA' },
                  { offset: 1, color: '#24E5FB' },
                ]
              )
            },
          },
        },
        {
          name: '渣土运输',
          type: 'bar',
          barWidth: 12.9,
          data: [70, 88, 71, 74, 71, 64, 54],
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 1, color: '#0090FD' },
                  { offset: 0, color: '#008FFC' },
                ]
              )
            },
          },
        }
      ]
    }
  };


  render() {
    return (
      <div className={TwoChartStyle.twoBox}>
        <ChartHeader title='城市执法' />
        <div className={TwoChartStyle.title}>
          <span className={TwoChartStyle.title1}>执法人员总数</span>
          <span className={TwoChartStyle.title2}> 123人</span>
        </div>
        <div className={TwoChartStyle.title3}>
          <span className={TwoChartStyle.title4}>执法车辆总数</span>
          <span className={TwoChartStyle.title5}> 65辆</span>
        </div>
        <div className={TwoChartStyle.chart}>
          <ReactEcharts style={{ width: '100%', height: '100%', top: -40, }} option={this.getOption()} />
        </div>
      </div>
    );
  }
}
