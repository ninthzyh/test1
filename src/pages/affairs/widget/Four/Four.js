/**
 * @Auto: 王小祥
 * @Date: 2020/7/15
 * @Description: 事务模块-当日办事渠道排行
 * @LastEditors: 王小祥
 * @LastEditTime: 2020/7/15
 */

/**
 * title:资源加载区域
 * @[React,Component]:引进React类及其组件类模块
 * @four:引进当前组件样式设置模块
 * @Progress:引进进度条组件
 */
import React, { Component } from 'react'
import { Progress  } from 'antd';
import './four.scss'

/**
 * title:组件声明区域
 */
class Four extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	componentDidMount(){
		
	}
	render(){
		return (
			<div className='currentAffairsWrap'>
				<div className='header'>
					<div className="headerContent">
						<div className='leftChildrenContent'>
							<img className='icon'></img>
							<h5 className='title'>当日办事渠道排行</h5>
						</div>
						<img className='iconRight'></img>
					</div>
					<div className="headerEmbellishLine">
						<div className="leftLine"></div>
						<div className="rightLine"></div>
					</div>
				</div>
				<div className='content'>
					<div className='contentHeader'>
						<span></span>
					</div>
					<div className='infoShowWrap'>
						<div className='infoShow'>
							<div className='infoTxt'>
								<div className='rankingDitchWrap'>
									<span></span>
									<span></span>
								</div>
								<span>12.5</span>
							</div>
							<div className='progress'></div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}