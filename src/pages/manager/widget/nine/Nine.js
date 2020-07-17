
import React, { Component } from 'react'
import { Progress  } from 'antd';
import IconFont from '../../../../components/ChartHeader/ChartHeader.js'
import {nineList} from './NineData.js'
import './Nine.scss'
/**
 * title:组件声明区域
 */
class Nine extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list:nineList,
			activeType: 1,
		}
	}
	componentDidMount(){
		
	}
	changeContext = (type) => {
        this.setState({
            activeType: type
        })
    }
	render(){
		return (
			<div className='currentAffairsWrapNineChart'>
				<div className='headerNineChart'>
					<IconFont title={this.state.list.title}/>
				</div>
				<div className='topNineChart'>
                <ul>
                    <li onClick={this.changeContext.bind(this, 2)} className={`${this.state.activeType == 2 ? 'activeBtn' : 'defaultBtn'}`}>部件</li>
                    <li onClick={this.changeContext.bind(this, 1)} className={`${this.state.activeType == 1 ? 'activeBtn': 'defaultBtn'}`}>事件</li>
                </ul>
            </div>
				<div className='contentNineChart'>
					<div className='infoShowWrapNineChart'>
						{
							this.state.list.children.map((item,index)=>{
								return (
									<div className='infoShowNineChart' key={`${index}`}>
										<div className='infoTxtNineChart'>
											{/*左侧1、2、3圆形图标*/}
											<span className='rankingNineChart'>{index+1}</span>
											{/*市容环境等文本标签*/}
											<span className='ditchNineChart'>{item.ditch}</span>
										</div>
										<div className='progressNineChart'>
											{/* 进度条：渐变色 */}
											<Progress 
												strokeColor={{
													'0%': '#596AFF',
													'100%': '#34F4EA',
												}}
												strokeWidth={8}
												percent={item.proportion}
												showInfo={false} 
											/>
											{/*是否显示数字和上升/下降标识图*/}
											<span>{item.proportion}</span>
											{/* <img src={require(`public/${item.img}.svg`)}></img> */}{/*  */}
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

export default Nine