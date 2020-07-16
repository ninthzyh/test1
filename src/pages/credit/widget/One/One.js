/**
 * @Auto: 王小祥
 * @Date: 2020/7/16
 * @Description: 信用模块-当日疫情服务
 * @LastEditors: 王小祥
 * @LastEditTime: 2020/7/16
 */

/**
 * title:资源加载区域
 * @[React,Component]:引进React类及其组件类模块
 * @one:引进当前组件样式设置模块
 * @Progress:引进进度条组件
 */
import React, { Component } from 'react'
import { Progress  } from 'antd';
import IconFont from '../../../../components/ChartHeader/ChartHeader.js'
import {oneList} from './oneData.js'
import './one.scss'

/**
 * title:组件声明区域
 */
class One extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list:oneList
		}
	}
	componentDidMount(){
		
	}
	render(){
		return (
			<div className='currentAffairsWrapOne'>
				<div className='headerOne'>
					<IconFont title={this.state.list.title}/>
				</div>
				<div className='contentOne'>
					<div className='contentHeaderOne'>
						<div className='headerTitleOne'>
							<h5>法人红名单</h5>
							<span>18</span>
						</div>
						<div className='headerTitleOne'>
							<h5>法人红名单</h5>
							<span>18</span>
						</div>
						<div className='headerTitleOne'>
							<h5>法人红名单</h5>
							<span>18</span>
						</div>
					</div>
					<div className='dataViewShowOne'>
						<div className='dataNameOne'>
							<h5>税务局</h5>
							<h5>市场监管局</h5>
							<h5>银行</h5>
						</div>
						<div className='dataViewOne'>
							<div className='leftProgress'></div>
							<div className='lineOne'></div>
							<div className='rightProgress'></div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default One