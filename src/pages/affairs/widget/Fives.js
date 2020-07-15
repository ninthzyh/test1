import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import TrafficStyle from '../Affairs.module.scss'
import ChartHeader from '../../../components/ChartHeader/ChartHeader'

export default class Fives extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  getOption = () => {
    let option = {
      color: ['#00FFFF', '#FF5B00', '#FFE000', '#006CED'],
      graphic: {
        type: 'text',
        left: 'center',
        top: '60%',
        style: {
          text: '死亡率8%',
          fill: '#00FFFF',
        },
      },
      series: [
        {
          type: 'pie',
          hoverAnimation: false,
          radius: ['62%', '67%'],
          center: ['50%', '65%'],
          itemStyle: {
            normal: {
              borderWidth: 10,
              borderColor: 'rgba(0, 0, 0, 0)',
            },
            emphasis: {
              borderWidth: 10,
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.8)',
            },
          },
          roundCap: true,
          label: {
            formatter: '{b} {c}人 {d}%',//{b}\n{c}人\n{d}%
            color: '#fff',
          },
          data: [
            { value: 100, name: '重症' },
            { value: 320, name: '治愈' },
            { value: 80, name: '死亡' },
            { value: 500, name: '轻症' },
          ],
          barGap: '-100%',
          z: 2,
        },
      ],
    }
    return option
  }
  //初始化
  componentDidMount() {
    console.log(this.refs.box)
  }
  render() {
    return (
      <div ref="box">
        <ChartHeader title="本地疫情趋势分析" />
        <div className={TrafficStyle.content}>
          <ReactEcharts
            option={this.getOption()}
            notMerge={true}
            lazyUpdate={true}
            style={{ height: '100%', width: '100%' }}
          />
        </div>
      </div>
    )
  }
}
