import React, { Component } from 'react'
import style from './Three.module.scss'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'

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
        data: ['19年四季度', '20年一季度', '20年二季度'],
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
          itemStyle: {
            normal: {
              lineStyle: {
                width: window.lineWidth,
              },
            },
          },
          data: [17, 18, 14],
        },
        {
          name: '黑榜总数',
          symbol: 'none',
          type: 'line',
          itemStyle: {
            normal: {
              lineStyle: {
                width: window.lineWidth,
              },
            },
          },
          data: [23, 23, 23],
        },
      ],
      animationDuration: 4000,
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
        data: ['2014', '2015', '2016', '2017', '2018', '2019', '2020'],
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
          itemStyle: {
            normal: {
              lineStyle: {
                width: window.lineWidth,
              },
            },
          },
          data: [20,29,42,45,50, 52, 40],
        },
        {
          name: '土地或房产判决',
          symbol: 'none',
          type: 'line',
          itemStyle: {
            normal: {
              lineStyle: {
                width: window.lineWidth,
              },
            },
          },
          data: [1,2,1,2,1, 2, 1],
        },
        {
          name: '企业强制执行资产',
          symbol: 'none',
          type: 'line',
          itemStyle: {
            normal: {
              lineStyle: {
                width: window.lineWidth,
              },
            },
          },
          data: [12,9,58,60,43, 26, 15],
        },
      ],
      animationDuration: 4000,
    }
    return courtDecisionOption
  }
  componentDidMount() {
    let chart1 = echarts.init(this.ID1)
    chart1.setOption(this.getBlackRedListOption())
    let chart2 = echarts.init(this.ID2)
    chart2.setOption(this.getCourtDecisionOption())
  }
  render() {
    return (
      <div className={style.Three}>
        <div className={style.headerWrapper}>
          <div className={style.titleWrapper}>
            <div className={style.icon}></div>
            <div className={style.title1}>季度红黑榜趋势</div>
            <div className={style.title2}>法院判决年趋势</div>
          </div>
          <div className={style.rightIconWrapper} onClick={this.click}>
            <div className={style.rightIcon}></div>
          </div>
        </div>
        <div className={style.content}>
          <div className={style.left}>
            <div
              ref={(ID1) => (this.ID1 = ID1)}
              style={{ width: '100%', height: '100%' }}
            ></div>
          </div>
          <div className={style.right}>
            <div
              ref={(ID2) => (this.ID2 = ID2)}
              style={{ width: '100%', height: '100%' }}
            ></div>
          </div>
        </div>
      </div>
    )
  }
}
