import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import style from './Three.module.scss'
import ChartHeader from 'components/ChartHeader/ChartHeader'
import { Row, Col } from 'antd'

export default class Three extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        {
          name: '新建设路',
          num: '200',
          unit: '条',
          color: '#FFC647',
        },
        {
          name: '新建设路',
          num: '800',
          unit: '公里',
          color: '#36EEEB',
        },
        {
          name: '新增集中供暖',
          num: '2900',
          unit: '平方米',
          color: '#596AFF',
        },
        {
          name: '新建卫生室',
          num: '10',
          unit: '个',
          color: '#C74D76',
        },
      ],
    }
  }
  state = {}
  getBlackRedListOption = () => {
    let blackRedListOption = {
      grid: {
        top: '20%',
        left: '10%',
        right: '3%',
        bottom: 18,
      },
      tooltip: {
        trigger: 'axis',
      },
      color: ['#FFC647'],
      legend: {
        data: ['近五年城镇化率'],
        icon: 'line',
        left: 'right',
        itemWidth: 10,
        textStyle: {
          fontSize: 11,
          color: '#fefefe',
        },
      },
      xAxis: {
        type: 'category',
        nameTextStyle: {
          color: '#fefefe',
        },
        axisLabel: {
          interval: 0,
          show: true,
          textStyle: {
            color: '#fefefe',
            fontSize: 11,
          },
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(155,155,155,0.45)',
            width: 1,
          },
        },
        data: ['2016年', '2017年', '2018年', '2019年', '2020年'],
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: true,
          formatter: '{value} %',
          textStyle: {
            color: '#fefefe',
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
          name: '近五年城镇化率',
          symbol: 'none',
          type: 'line',
          data: [23, 40, 50, 69, 78],
        },
      ],
    }
    return blackRedListOption
  }

  render() {
    const title = '新农村建设'
    return (
      <div className={style.Three}>
        <ChartHeader title={title} />
        <div className={style.content}>
          <div className={style.top}>
            <Row>
              {this.state.data.map((item, index) => {
                return (
                  <Col span={6}>
                    <div className={style.box}>
                      <div className={style.svgContainer}>
                        <svg
                          version="1.1"
                          viewBox="0 0 200 200"
                          preserveAspectRatio="xMinYMin meet"
                          class="svg-content"
                        >
                          <circle
                            fill="none"
                            stroke={item.color}
                            stroke-width="15"
                            stroke-miterlimit="10"
                            cx="100"
                            cy="100"
                            r="80"
                            opacity="0.6"
                          />
                          <text
                            x="50%"
                            y="45%"
                            fill={item.color}
                            font-size="40"
                            text-anchor="middle"
                          >
                            {item.num}
                          </text>
                          <text
                            x="50%"
                            y="65%"
                            fill={item.color}
                            font-size="30"
                            text-anchor="middle"
                          >
                            {item.unit}
                          </text>
                        </svg>
                      </div>
                      <div className={style.nameBox}>{item.name}</div>
                    </div>
                  </Col>
                )
              })}
            </Row>
          </div>
          <div className={style.bottom}>
            <ReactEcharts
              option={this.getBlackRedListOption()}
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
