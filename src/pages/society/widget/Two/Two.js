import React, { Component } from 'react';
import ChartHeader from '../../../../components/ChartHeader/ChartHeader';
import ReactEcharts from "echarts-for-react";
import echarts from 'echarts/lib/echarts';
import styles from './Two.module.scss';

export default class Two extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  getOption = () => {
    const option = {
      grid: {
        left: '15%',
        top: '25%',
        bottom: '18%',
        right: '10%',
      },
      tooltip: {
        trigger: 'axis',//坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用 
        formatter: function (params) {
          // 移除重复的数据
          for (var i = 0; i < params.length; i++) {
            for (var j = params.length - 1; j > i; j--) {
              if (params[j].data == params[i].data) {
                params.splice(j, 1);
                break;
              }
            }
          }
          // 
          var result = params[0].name + "<br>";
          params.forEach(function (item) {
            result += item.marker + " " + item.seriesName.substring(3,6) + " : " + item.value + "%</br>";
          });
          return result;
        },
      },
      color: ['#1FFFF3'],
      legend: [
        {
          icon: 'line',
          itemWidth: 25,
          left: '39%',
          top: 11,
          textStyle: {
            fontsize: 12,
            fontfamily: 'Microsoft YaHei',
            fontweight: 400,
            color: '#fff'
          },
          data: ['近五年失业率']
        }
      ],
      xAxis: [{
        type: 'category',
        color: '#59588D',
        data: ['2016年', '2017年', '2018年', '2019年', '2020年'],
        axisLabel: {
          color: '#FFFFFF',
          textStyle: {
            fontSize: 12
          },
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(107,107,107,0.37)',
          }
        },
        axisTick: {
          show: false
        },
      }],
      yAxis: [{
        axisLabel: {
          formatter: '{value}%',
          color: '#FFFFFF',
          textStyle: {
            fontSize: 10
          },
        },
        max: 3.0,
        min: 2.0,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: '#3F404B',
            type: 'solid',
          }
        }
      }],
      series: [
        {
          name: '近五年失业率',
          type: 'bar',
          data: [2.7, 2.8, 2.8, 2.9, 2.9],
          barWidth: 13,
          itemStyle: {
            normal: {
              color:
                new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 1, color: 'rgba(242,192,65,0.05)' },
                    { offset: 0, color: 'rgba(255,207,51,1)' },
                  ]),
              barBorderRadius: 7
            },
          },
        }
      ]
    };
    return option
  }
  render() {
    return (<div className={styles.TwoPage}>
      <ChartHeader title='就业统计' />
      <div className={styles.echartsBox}>
        <ReactEcharts
          option={this.getOption()}
          notMerge={true}
          lazyUpdate={true}
          style={{ width: '100%', height: '110%' }} />
      </div>
    </div>);
  }
}

