import React, { Component } from 'react';
import AffairsStyle from '../Affairs.module.scss'
import ChartHeader from '../../../components/ChartHeader/ChartHeader';
import { Col, Row } from 'antd';

const img = [
    {title: '综合窗口统计出证区',num: 34},
    { title: '结婚登记', num: 10 },
    { title: '离婚登记', num: 20 }
]
export default class extends Component {
    iconList = () => {
        return img.map((itemImg, itemIndex) => {
            return <div className={AffairsStyle.itemImg} key={itemIndex}>
                <div className={AffairsStyle[`eightImg${itemIndex+1}`]}></div>
                <div className={AffairsStyle.iconText}>{itemImg.title}</div>
                <div className={AffairsStyle.iconNum}>{itemImg.num}</div>
            </div>
        })
    }
    render() {
        return <>
            <ChartHeader title='民政局' />
            <div className={AffairsStyle.content}>
                <div className={AffairsStyle.iconWrapper}>
                    {this.iconList()}
                </div>

            </div>
        </>
    }
}