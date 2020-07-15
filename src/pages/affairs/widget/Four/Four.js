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
import IconFont from '../../../../components/ChartHeader/ChartHeader.js'
import {fourList} from './fourData.js'
import './four.scss'
console.log(fourList)
/**
 * title:组件声明区域
 */
class Four extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list:fourList
		}
	}
	componentDidMount(){
		
	}
	render(){
		return (
			<div className='currentAffairsWrap'>
				<div className='header'>
					<IconFont title={this.state.list.title}/>
				</div>
				<div className='content'>
					<div className='contentHeader'>
						{
							this.state.list.header.map((item,index)=>{
								return <span key={`${index}`}>{item}</span>
							})
						}
					</div>
					<div className='infoShowWrap'>
						{
							this.state.list.children.map((item,index)=>{
								return (
									<div className='infoShow' key={`${index}`}>
										<div className='infoTxt'>
											<div className='rankingDitchWrap'>
												<span className='ranking'>{index+1}</span>
												<span className='ditch'>{item.ditch}</span>
											</div>
											<span className='proportion'>{item.proportion + '%'}</span>
										</div>
										<div className='progress'>
											<Progress 
												strokeColor={{
													'0%': '#596AFF',
													'100%': '#34F4EA',
												}}
												strokeWidth={8}
												percent={item.proportion} 
												showInfo={false} 
										/>
										</div>
									</div>
								)
							})
						}
					</div>
				</div>
			</div>
		)
	}
}

export default Four