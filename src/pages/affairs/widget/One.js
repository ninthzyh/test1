import React, { Component } from "react"
import AffairsStyle from '../Affairs.module.scss'
import ChartHeader from "../../../components/ChartHeader/ChartHeader"

/*
疫情实时数据
*/

class One extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nowInfo: [
                {
                    "count": "8034",
                    "name": "绿码率"
                },
                {
                    "count": "572",
                    "name": "口罩佩戴率"
                },
                {
                    "count": "7",
                    "name": "消毒率"
                },
                {
                    "count": "1797",
                    "name": "体温检测率"
                },
            ]
        }
    }
    showInfo() {
        const colorArr = ['#34F486','#F6E56B','#737DED','#68EDFC']
        return (
            
            this.state.nowInfo.map((item, index) => {
                return (
                    <div className={AffairsStyle.infoItem} key={index}>
                        <div className={AffairsStyle.itemNumber} style={{color:colorArr[index]}}>{item.count}</div>
                        <div className={AffairsStyle.itemName}>{item.name}</div>
                    </div>
                )
            })
        )
    }
    render() {
        const title = '当日疫情服务';
        return (
            <div className={AffairsStyle.oneContainer}>
                <ChartHeader title={title}/>
                <div className={AffairsStyle.infoItemBox}>
                    {this.showInfo()}
                </div>

            </div>
        )
    }
}

export default One;