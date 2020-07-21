import React, { Component } from "react"
import AffairsStyle from '../Affairs.module.scss'
import ChartHeader from "../../../components/ChartHeader/ChartHeader"

/*
工商局
*/
const img = [
    {title: '工商综合受理',num: 439},
    { title: '特种设备受理', num: 20 }
]
class Twelve extends Component {
    showInfo() {
        return img.map((itemImg, itemIndex) => {
            return <div className={AffairsStyle.itemImg} key={itemIndex}>
                <div className={AffairsStyle[`twelveImg${itemIndex+1}`]}></div>
                <div className={AffairsStyle.iconText}>{itemImg.title}</div>
                <div className={AffairsStyle.iconNum}>{itemImg.num}</div>
            </div>
        })
    }
    render() {
        const title = '工商局';
        return (
            <>
            <ChartHeader title={title} />
                <div className={AffairsStyle.content}>
                    
                    <div className={AffairsStyle.iconWrapper}>
                        {this.showInfo()}
                    </div>
                </div>
            </>
        )
    }
}

export default Twelve;