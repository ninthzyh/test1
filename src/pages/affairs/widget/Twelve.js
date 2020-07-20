import React, { Component } from "react"
import AffairsStyle from '../Affairs.module.scss'
import ChartHeader from "../../../components/ChartHeader/ChartHeader"
import twelve1Icon from "img/affairs/twelve1.gif"
import twelve2Icon from "img/affairs/twelve2.gif"

/*
工商局
*/

class Twelve extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nowInfo: [
                {
                    "count": "439",
                    "name": "工商综合受理",
                    "pic": twelve1Icon
                },
                {
                    "count": "20",
                    "name": "特种设备受理",
                    "pic": twelve2Icon
                },
            ]
        }
    }img
    showInfo() {
        return (            
            this.state.nowInfo.map((item, index) => {
                return (
                    <div className={AffairsStyle.infoItem} key={index}>                    
                        <img src={item.pic} className={AffairsStyle.itemPic}/>               
                        <div className={AffairsStyle.itemName}>{item.name}</div>
                        <div className={AffairsStyle.itemNumber}>{item.count}</div>
                    </div>
                )
            })
        )
    }
    render() {
        const title = '工商局';
        return (
            <>
                <ChartHeader title={title}/>
                <div className={AffairsStyle.twelveBox}>
                    {this.showInfo()}
                </div>
            </>
        )
    }
}

export default Twelve;