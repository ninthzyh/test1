import React, { Component } from "react"
import ChartHeader from "components/ChartHeader/ChartHeader"
import SixStyle from './Six.module.scss'
import news1Img from 'img/emergency/news1.png';
import news2Img from 'img/emergency/news2.png';
export default class Six extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list:[
                {
                    image:news1Img,
                    type:"施工工地-文明施工",
                    address:"河南省濮阳市濮阳县文留镇34号河南省濮阳市濮阳县文留镇34号河南省濮阳市濮阳县文留镇34号",
                    // desc:"河南省濮阳市濮阳县文留镇34号",
                    // time:"2020-05-05 11：38：29"
                },
                {
                    image:news2Img,
                    type:"施工工地-文明施工",
                    address:"河南省濮阳市濮阳县文留镇34号河南省濮阳市濮阳县文留镇34号河南省濮阳市濮阳县文留镇34号",
                    // desc:"河南省濮阳市濮阳县文留镇34号",
                    // time:"2020-05-05 11：38：29"
                },
            ]
        }
    }
    
    getList(list) {
        return (
            list.map((item, index) => {
                return (
                    <div className={SixStyle.item}  key={index}>
                        <div className={SixStyle.left}>
                            <img src={item.image} className={SixStyle.image}/>
                        </div>
                        <div className={SixStyle.right}>
                            <div className={SixStyle.type}>{item.type}</div>
                            <div className={SixStyle.info}>{item.address}</div>
                            {/* <div className={SixStyle.info}>{item.desc}</div>
                            <div className={SixStyle.info}>{item.time}</div> */}
                        </div>
                    </div>
                )
            })
            
        )
    }
    render() {
        const title = '新闻动态';
        return (
            <div className={SixStyle.sixContainer}>
                <ChartHeader title={title}/>
                <div className={SixStyle.infoBox}>
                    {this.getList(this.state.list)}
                </div>
                
            </div>

        )
    }

}
