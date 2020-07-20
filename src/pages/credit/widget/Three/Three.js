import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import style from './Three.module.scss'

export default class Three extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  getBlackRedListOption = () => {
    let blackRedListOption = {
      grid: {
        top: '25%',
        left: '15%',
        right: '4%',
        bottom: 20,
      },
      tooltip: {
        trigger: 'axis',
      },
      color: ['#F7517F', '#6648FF'],
      legend: {
        data: ['红榜总数', '黑榜总数'],
        icon: 'line',
        itemWidth: 10,
        textStyle: {
          fontSize: 11,
          color: 'rgba(255,255,255,1)',
        },
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          interval: 0,
          show: true,
          textStyle: {
            color: 'rgba(255,255,255,1)',
            fontSize: 11,
          },
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(155,155,155,0.45)',
            width: 1,
          },
        },
        data: ['', '2020年第一季度', ''],
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: true,
          textStyle: {
            color: 'rgba(255,255,255,1)',
            fontSize: 11,
          },
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(155,155,155,0.45)',
            width: 1,
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'solid',
            width: 0.5,
            color: 'rgba(155,155,155,0.45)',
          },
        },
      },
      series: [
        {
          name: '红榜总数',
          symbol: 'none',
          type: 'line',
          data: [3, 9, 27],
        },
        {
          name: '黑榜总数',
          symbol: 'none',
          type: 'line',
          data: [2, 18, 22],
        },
      ],
    }
    return blackRedListOption
  }
  getCourtDecisionOption = () => {
    let courtDecisionOption = {
      grid: {
        top: '25%',
        left: '15%',
        right: '1%',
        bottom: 20,
      },
      tooltip: {
        trigger: 'axis',
      },
      color: ['#69F4FE', '#8948FF', '#FFC822'],
      legend: {
        data: ['经济纠纷判决', '土地或房产判决', '企业强制执行资产'],
        icon: 'line',
        itemWidth: 10,
        textStyle: {
          fontSize: 11,
          color: 'rgba(255,255,255,1)',
        },
      },
      xAxis: {
        type: 'category',
        data: ['2018', '2019', '2020'],
        axisLabel: {
          show: true,
          textStyle: {
            color: 'rgba(255,255,255,1)',
            fontSize: 11,
          },
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(155,155,155,0.45)',
            width: 1,
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: true,
          textStyle: {
            color: 'rgba(255,255,255,1)',
            fontSize: 11,
          },
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(155,155,155,0.45)',
            width: 1,
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'solid',
            width: 0.5,
            color: 'rgba(155,155,155,0.45)',
          },
        },
      },
      series: [
        {
          name: '经济纠纷判决',
          symbol: 'none',
          type: 'line',
          data: [45, 95, 65],
        },
        {
          name: '土地或房产判决',
          symbol: 'none',
          type: 'line',
          data: [5, 10, 5],
        },
        {
          name: '企业强制执行资产',
          symbol: 'none',
          type: 'line',
          data: [20, 30, 15],
        },
      ],
    }
    return courtDecisionOption
  }
  componentDidMount() {}
  render() {
    return (
      <div className={style.Three}>
        <div className={style.headerWrapper}>
          <div className={style.titleWrapper}>
            <div className={style.icon}></div>
            <div className={style.title1}>黑红榜季度趋势</div>
            <div className={style.title2}>法院判决年趋势</div>
          </div>
          <div className={style.rightIconWrapper} onClick={this.click}>
            <div className={style.rightIcon}></div>
          </div>
        </div>
        <div className={style.content}>
          <div className={style.left}>
            <ReactEcharts
              option={this.getBlackRedListOption()}
              notMerge={true}
              lazyUpdate={true}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className={style.right}>
            <ReactEcharts
              option={this.getCourtDecisionOption()}
              notMerge={true}
              lazyUpdate={true}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>
    )
  }
}
