/**
 * @Auto: 王小祥
 * @Date: 2020/7/16
 * @Description: 信用模块-当日疫情服务-数据
 * @LastEditors: 王小祥
 * @LastEditTime: 2020/7/16
 */
export const oneList = {
	title: '当日疫情服务',
	header: [{
		
	}],
	options: {
		title: {
			text: '交错正负轴标签',
			subtext: 'From ExcelHome',
			sublink: 'http://e.weibo.com/1341556070/AjwF2AgQm'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {            // 坐标轴指示器，坐标轴触发有效
					type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		legend: {
			data: ['红榜', '黑帮']
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [{
			type: 'value',
			axisTick: {
				show: true
			}
		}],
		yAxis: [{
			type: 'category',
			axisTick: {
				show: false
			},
			data: ['税务局', '市场监管局', '人行', '文广局', '住建局', '农业农村局', '房地产管理局','法院']
		}],
		series: [
			{
				name: '红榜',
				type: 'bar',
				stack: '总量',
				label: {
					show: true
				},
				data: [2, 6, 1, 2, 4, 2, 1,0]
			},
			{
				name: '黑榜',
				type: 'bar',
				stack: '总量',
				label: {
					show: true,
					position: 'left'
				},
				data: [-1, -2, -1, -1, 0, 0, 0,-19]
			}
		]
	}
}
