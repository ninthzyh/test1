/**
 * @Auto: 王小祥
 * @Date: 2020/7/17
 * @Description: 民生模块-财政收入
 * @LastEditors: 王小祥
 * @LastEditTime: 2020/7/17
 */

import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import IconFont from '../../../../components/ChartHeader/ChartHeader.js'
import {fiveList} from './fiveData.js'
import './five.scss'

class Five extends Component{
	constructor(props) {
		super(props)
		this.state = {
			list:fiveList
		}
	}
	// <ReactEcharts/>
	render(){
		return (
			<div className='currentSocietyWrapFive'>
				<div className='headerFive'>
					<IconFont title={this.state.list.title}/>
				</div>
				<div className='contentFive'>
					<div className='contentHeaderFive'>
						<div className='brokenLineWrapFive'>
							<div className='yellowLineFive'><span></span><h5>近五年人均可支配增长率</h5></div>
							<div className='blueLineFive'><span></span><h5>近五年全县生产值增长率</h5></div>
						</div>
						<div className='columnarWrapFive'>
							<div className='yellowColumnarFive'><span></span><h5>近五年居民可支配收入</h5></div>
							<div className='blueColumnarFive'><span></span><h5>近五年全县生产总值</h5></div>
						</div>
					</div>
					<div className='dataViewFive'>
						<ReactEcharts
							option={this.state.list.option}
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

export default Five
