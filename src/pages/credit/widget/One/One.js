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
						{
							this.state.list.header.map((item)=>{
								return (
									<div className='headerTitleOne' key={item.name}>
										<h5>{item.name}</h5>
										<span className={item.className}>{item.number}</span>
									</div>
								)
							})
						}
					</div>
					<div className='tipTitleOne'>
						<span className='redAnnouncementOne'></span><span className='redkTxt'>红榜</span>
						<span className='blackAnnouncementOne'></span><span className='blackTxt'>黑榜</span>
					</div>
					<div className='dataViewShowOne'>
						<div className='dataViewOne'>
							<div className='leftProgressOne'>
								<div className='leftDataProgressOne'>
									{
										this.state.list.option.map((item)=>{
											return (
												<div className='leftDataProgressShowOne' key={item.name}>
													<h5>{item.name}</h5>
													<div className='progressDataShow' style={{width:(item.redAnnouncement * 5)}}><span>{item.redAnnouncement}</span></div>
												</div>
											)
										})
									}
								</div>
							</div>
							<div className='middleLineOne'></div>
							<div className='rightProgressOne'>
								<div className='rightDataProgressOne'>
									{
										this.state.list.option.map((item)=>{
											return (
												<div className='leftDataProgressShowOne' key={item.name}>
													<div className='progressDataShowRight' style={{width:(item.blackAnnouncement * 5)}}><span>{item.blackAnnouncement}</span></div>
												</div>
											)
										})
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default One