import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import style from './Three.module.scss'
import ChartHeader from 'components/ChartHeader/ChartHeader'
import { Row, Col } from 'antd'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'

export default class Three extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        {
          name: '新建设路',
          num: '21',
          unit: '条',
          color: '#FFC647',
        },
        {
          name: '新建设路',
          num: '26',
          unit: '公里',
          color: '#36EEEB',
        },
        {
          name: '新增集中供暖',
          num: '210万',
          unit: '平方米',
          color: '#596AFF',
        },
        {
          name: '新建卫生室',
          num: '60',
          unit: '个',
          color: '#C74D76',
        },
      ],
      circleNum: 0,
    }
  }
  state = {}
  getBlackRedListOption = () => {
    let blackRedListOption = {
      grid: {
        top: '20%',
        left: '11%',
        right: '7%',
        bottom: 18,
      },
      tooltip: {
        trigger: 'axis',//坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。 
        formatter: function (params) {
          var result = params[0].name + "<br>";
          params.forEach(function (item) {
            result += item.marker + " " + item.seriesName.substring(3, 7) + " : " + item.value + "%</br>";
          });
          return result;
        },
      },
      color: ['#FFC647'],
      legend: {
        data: ['近五年城镇化率'],
        icon: 'line',
        right: '7%',
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
            width: 0.5,
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
            width: 0.5,
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
          type: 'bar',
          barWidth: 13,
          itemStyle: {
            normal: {
              color: '#008CFF'
            }
          },
          data: [38.1, 39, 40.2, 41.7, 43.8],
        },
      ],
      animationDuration: 4000,
    }
    return blackRedListOption
  }
  componentDidMount() {
    //let chart = echarts.init(this.ID)
    //chart.setOption(this.getBlackRedListOption())

    let timeCircl = setInterval(() => {
      if (this.state.circleNum < 550) {
        this.state.circleNum += 50
        this.setState({
          circleNum: this.state.circleNum,
        })
      } else {
        clearInterval(timeCircl)
      }
    }, 5)
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
                  <Col span={6} key={index}>
                    <div className={style.box}>
                      <div className={style.svgContainer}>
                        <svg
                          version="1.1"
                          viewBox="0 0 200 200"
                          preserveAspectRatio="xMinYMin meet"
                        >
                          <circle
                            fill="none"
                            stroke={item.color}
                            transform="rotate(-90 100 100)"
                            strokeDasharray={this.state.circleNum + ',720'}
                            strokeWidth="15"
                            strokeMiterlimit="10"
                            cx="100"
                            cy="100"
                            r="80"
                            opacity="0.6"
                          />
                          <text
                            x="50%"
                            y="45%"
                            fill={item.color}
                            fontSize="40"
                            textAnchor="middle"
                          >
                            {item.num}
                          </text>
                          <text
                            x="50%"
                            y="65%"
                            fill={item.color}
                            fontSize="30"
                            textAnchor="middle"
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
