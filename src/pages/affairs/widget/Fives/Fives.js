import React, { Component } from 'react'
import echarts from 'echarts'
import style from './Fives.module.scss'
import ChartHeader from '../../../../components/ChartHeader/ChartHeader'

export default class Fives extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    let number = [
      {
        name: '轻症\n500人\n50%',
        value: 50,
      },
      {
        name: '重症\n100人\n10%',
        value: 10,
      },
      {
        name: '治愈\n350人\n35%',
        value: 35,
      },
      {
        name: '死亡\n50人\n5%',
        value: 5,
      },
    ]

    let data = []
    let color = ['#00FFFF', '#FF5B00', '#FFE000', '#006CED']
    for (let i = 0; i < number.length; i++) {
      data.push(
        {
          value: number[i].value,
          name: number[i].name,
          itemStyle: {
            normal: {
              borderWidth: 1,
              shadowBlur: 20,
              borderColor: color[i],
              shadowColor: color[i],
            },
          },
        },
        {
          value: 2,
          name: '',
          itemStyle: {
            normal: {
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
              color: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(0, 0, 0, 0)',
              borderWidth: 0,
            },
          },
        }
      )
    }
    let seriesOption = [
      {
        name: '',
        type: 'pie',
        clockWise: false,
        radius: [50, 60],
        center: ['50%', '55%'],
        hoverAnimation: false,
        itemStyle: {
          normal: {
            label: {
              show: true,
              fontsize: 8,
              position: 'outer',
              color: '#ddd',
              formatter: function (params) {
                let percent = 0
                let total = 0
                for (let i = 0; i < number.length; i++) {
                  total += number[i].value
                }
                percent = ((params.value / total) * 100).toFixed(0)
                if (params.name !== '') {
                  return params.name
                } else {
                  return ''
                }
              },
            },
            labelLine: {
              length: 20,
              length2: 10,
              show: true,
              color: '#00ffff',
            },
          },
        },
        data: data,
      },
    ]
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(this.refs.epidemicTrends)
    // 绘制图表
    myChart.setOption({
      color: color,
      animation: true,
      animationDuration: 4000,
      animationEasing: 'linear',
      animationDurationUpdate: 4000,
      animationEasingUpdate: 'linear',
      title: {
        text: '死亡率2.53%',
        top: '50%',
        textAlign: 'center',
        left: '49%',
        textStyle: {
          color: '#00ffff',
          fontSize: 14,
          fontWeight: '400',
        },
      },
      grid: {
        top: '50%',
      },
      graphic: {
        elements: [
          {
            type: 'image',
            z: 3,
            style: {
              width: 200,
              height: 200,
            },
            left: 'center',
            top: 'center',
            position: [50, 50],
          },
        ],
      },
      tooltip: {
        show: false,
      },
      toolbox: {
        show: false,
      },
      series: seriesOption,
    })
    window.onresize = myChart.onresize
  }
  render() {
    return (
      <div className={style.epidemicTrends}>
        <ChartHeader title="本地疫情趋势分析" />
        <div ref="epidemicTrends" className={style.content}></div>
      </div>
    )
  }
}
