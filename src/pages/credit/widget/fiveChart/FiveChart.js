import React, { Component } from 'react';
import FiveChartStyle from './FiveChart.module.scss';
import CustomImg from 'img/affairs/custom2.svg';
import ChartHeader from '../../../../components/ChartHeader/ChartHeader';
import ReactEcharts from 'echarts-for-react';

export default class FiveChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TimesData: ['2017', '2018', '2019', '2020'],
      countsData: [19, 32, 88, 64],
      nowInfo: [
        {
          "count": "21",
          "name": "连接委办局"
        },
        {
          "count": "243432",
          "name": "共享交换条数"
        },
        {
          "count": "0",
          "name": "服务企业次数"
        },
        {
          "count": "0",
          "name": "次均业务办理时间"
        }
      ]
    }
  }

  showInfo() {
    return (

      this.state.nowInfo.map((item, index) => {
        return (
          <div className={FiveChartStyle.infoItem} key={index}>
            <div className={FiveChartStyle.itemName}>{item.name}</div>
            <div className={FiveChartStyle.itemNumber}>{item.count}</div>
          </div>
        )
      })
    )
  }

  getOption = (Times, counts) => {
    return {
      grid: {
        top: '5%',
        left: '15%',
        right: '4%',
        bottom: 16,
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "rgba(255,255,255,1)",
            fontSize: 11,
          },
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(155,155,155,0.45)',
            width: 1,    
          }
        },
        data: Times
      },
      yAxis: {
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "rgba(255,255,255,1)",
            fontSize: 11,
          },
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(155,155,155,0.45)',
            width: 1,  
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'solid',
            width: 1,
            color: "rgba(155,155,155,0.45)",
          }
        }

      },
      series: [{
        type: 'line',
        symbol: "none",//不显示折线上圆圈点
        lineStyle: { color: "rgba(64,253,251,1)", width: 2 },
        data: counts
      }]
    };
  }

  render() {
    return (
      <div className={FiveChartStyle.fiveMain}>
        <ChartHeader title='服务企业次数历史累计趋势' />
        <div className={FiveChartStyle.infoItemBox}>
          {this.showInfo()}
        </div>
        <div className={FiveChartStyle.chart}>
          <ReactEcharts style={{ width: '100%', height: '100%' }} option={this.getOption(this.state.TimesData, this.state.countsData)} />
        </div>
      </div>
    );
  }
}
