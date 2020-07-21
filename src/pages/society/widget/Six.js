import React, { Component } from 'react'
import echarts from 'echarts'
import SocietyStyle from '../Society.module.scss';
import ChartHeader from '../../../components/ChartHeader/ChartHeader';


export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    let number = [
      {
        name: '新增市民建设中心数\n23',
        value: 50,
      },
      {
        name: '新增足球场数\n23',
        value: 10,
      },
      {
        name: '新增绿地面积\n23',
        value: 15,
      },
      {
        name: '新增游乐园数\n23',
        value: 25,
      },
    ]

    let data = []
    let color = ['#006CED', '#FFE000', '#FF5B00', '#00FFFF']
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
        radius: [60, 70],
        center: ['50%', '50%'],
        hoverAnimation: true,
        itemStyle: {
          normal: {
            label: {
              show: true,
              fontsize: 8,
              position: 'outer',
              formatter: function (params) {
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
    let myChart = echarts.init(this.refs.urbanConstruction)
    // 绘制图表
    myChart.setOption({
      color: color,
      animation: true,
      animationDuration: 4000,
      animationEasing: 'linear',
      animationDurationUpdate:4000,
      animationEasingUpdate: 'linear',
      title: {
        text: '城市建设',
        top: '48%',
        textAlign: 'center',
        left: '49%',
        textStyle: {
          color: '#78F2FF',
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
  }
  render() {
    return (
      <div className={SocietyStyle.six}>
        <ChartHeader title="城市建设" />
        <div ref="urbanConstruction" className={SocietyStyle.content}></div>
      </div>
    )
  }
}
