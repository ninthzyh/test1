import echarts from 'echarts'
let colors = ['#FFFFFF', '#4B8CD3', '#675bba','#3F404B'];
export const fiveList = {
	title: '财政收入',
	option: {
		color: colors,
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross'
			}
		},
		toolbox: {
			feature: {
				dataView: {
					show: true,
					readOnly: false
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		xAxis: [{
			type: 'category',
			axisTick: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: colors[3]
				}
			},
			axisLabel: {
				textStyle: {
					color: colors[0]
				}
			},
			data: ['2016年', '2017年', '2018年', '2019年', '2020年']
		}],
		yAxis: [{
			type: 'value',
			name: '数量',
			min: 0,
			max: 1000,
			position: 'left',
			nameTextStyle: {
				padding: [0, 0, 0, -40] // 四个数字分别为上右下左与原位置距离
			},
			axisTick: {
				show: false,
				lineStyle: {
					color: colors[0]
				}
			},
			axisLine: {
				show: false,
				lineStyle: {
					color: colors[1]
				}
			},
			axisLabel: {
				formatter: '{value}',
				textStyle: {
					color: colors[0]
				}
			}
		}],
		series: [{
				name: '近五年人均可支配增长率',
				type: 'bar',
				barWidth:10,
				data: [200, 400, 500, 600, 570],
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0.5,
							color: '#FFCF33'
						}, {
							offset: 1,
							color: '#F2C041'
						}]),
					}
				}
			},
			{
				name: '近五年全县生产总值',
				type: 'bar',
				barWidth:10,
				data: [500, 700, 780, 830, 760],
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0.5,
							color: '#0026FF'
						}, {
							offset: 1,
							color: '#2F5FFF'
						}])
					}
				}
			}
		]
	}
}
