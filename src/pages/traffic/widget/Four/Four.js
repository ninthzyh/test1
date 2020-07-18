import React, { Component } from "react"
import FourStyle from './Four.module.scss'
import ChartHeader from "components/ChartHeader/ChartHeader"

class Four extends Component {
    constructor(props) {
        super(props)
        this.state = {
            infoList:[
                {
                    pic:require("img/traffic/four1.png"),
                    name:"社会公共停车位",
                    count: 8769,
                    unit:"个"
                },
                {
                    pic:require("img/traffic/four2.png"),
                    name:"充电桩",
                    count: 124,
                    unit:"个"
                },
                {
                    pic:require("img/traffic/four3.png"),
                    name:"平均停车时长",
                    count: 24,
                    unit:"h"
                },
                {
                    pic:require("img/traffic/four4.png"),
                    name:"建筑配建停车场",
                    count: 98,
                    unit:"个"
                },
            ]
        }
    }

    showInfo() {
        return (            
            this.state.infoList.map((item, index) => {
                return (
                    <div className={FourStyle.infoItem} key={index}>                 
                        <img src={item.pic} className={FourStyle.itemPic}/>               
                        <div className={FourStyle.itemName}>{item.name}</div>
                        <div className={FourStyle.itemNumber}>{item.count}<span><div className={FourStyle.itemUnit}>{item.unit}</div></span></div>
                    </div>
                )
            })
        )
    }
    render() {
        const title = '智慧停车';
        return(
            <div className={FourStyle.fourContainer}>
                <ChartHeader title={title}/>
                <div className={FourStyle.infoItemBox}>
                    {this.showInfo()}
                </div>
                
            </div>
        )
    }
}

export default Four;