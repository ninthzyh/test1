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
		animation: true,
		animationDuration: 1500,
		animationEasing: 'exponentialOut',
		animationDurationUpdate: 1500,
		animationEasingUpdate: 'cubicOut',
		xAxis: [
			{
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
			},
			{
				type: 'value',
				max: 500,
				show:	false
			}
		],
		yAxis: [{
			type: 'value',
			name: '数量',
			min: 0,
			max: 1000,
			position: 'left',
			nameTextStyle: {
				padding: [0, 0, 0, -40] // 四个数字分别为上右下左与原位置距离
			},
			splitLine: {
				show: true,
				lineStyle:{
					color: colors[3],
					width: 1,
					type: 'solid'
				}
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
				name: '居民可支配收入',
				type: 'bar',
				barWidth:10,
				data: [200, 400, 500, 600, 570],
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0.5,
							color: '#56F4EC'
						}, {
							offset: 1,
							color: '#56F4EC'
						}]),
					}
				}
			},
			{
				name: '全县生产总值',
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
			},
			{
				name: '人均可支配增长率',
        xAxisIndex: 1,
				type: 'line',
				barWidth:10,
				data: [200, 400, 500, 600, 570],
				lineStyle:{
					color:'#F49C34'
				},
				itemStyle: {
					normal : {
						color:'#FFCF33',
						position: 'top',
						padding: [0, 0, 0, -40]
					}
				}
			},
			{
				name: '全县生产值增长率',
        xAxisIndex: 1,
				type: 'line',
				barWidth:10,
				data: [500, 700, 780, 830, 760],
				lineStyle:{
					color:'#4EFCDC'
				},
				itemStyle: {
					normal : {
						color:'#4EFCDC'
					}
				}
			}
		]
	}
}
fiveList.option.series[2].data = fiveList.option.series[2].data.map((x, i) => [43 + i * 100, x])
fiveList.option.series[3].data = fiveList.option.series[3].data.map((x, i) => [58 + i * 100, x])
