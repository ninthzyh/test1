import React, { Component } from "react"
import ChartHeader from "components/ChartHeader/ChartHeader"
import {  Row, Col } from 'antd'
import TwelveStyle from './Twelve.module.scss'
import creditImg from 'img/manager/credit.png';
class Four extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list:[
                {
                    image:creditImg,
                    type:"施工工地-文明施工",
                    address:"河南省濮阳市濮阳县文留镇34号",
                    desc:"文明施工事件需要处理",
                    time:"2020-05-05 11：38：29"
                },
                {
                    image:creditImg,
                    type:"施工工地-文明施工",
                    address:"河南省濮阳市濮阳县文留镇34号",
                    desc:"文明施工事件需要处理",
                    time:"2020-05-05 11：38：29"
                },
            ]
        }
    }
    
    getList(list) {
        return (
            list.map((item, index) => {
                return (
                    <div className={TwelveStyle.item}  key={index}>
                        <div className={TwelveStyle.left}>
                            <img src={item.image} className={TwelveStyle.image}/>
                        </div>
                        <div className={TwelveStyle.right}>
                            <div className={TwelveStyle.type}>{item.type}</div>
                            <div className={TwelveStyle.info}>{item.address}</div>
                            <div className={TwelveStyle.info}>{item.desc}</div>
                            <div className={TwelveStyle.info}>{item.time}</div>
                        </div>
                    </div>
                )
            })
            
        )
    }
    render() {
        const title = '信用动态';
        return (
            <div className={TwelveStyle.twelveContainer}>
                <ChartHeader title={title}/>
                <div className={TwelveStyle.infoBox}>
                    {this.getList(this.state.list)}
                </div>
                
            </div>

        )
    }

}

export default Four;