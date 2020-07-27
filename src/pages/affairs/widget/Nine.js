import React, { Component } from 'react';
import AffairsStyle from '../Affairs.module.scss'
import ChartHeader from '../../../components/ChartHeader/ChartHeader';
import { Col, Row } from 'antd';

const img = [
    {
        title: '申报个人普票代开',
        num: 1683
    }, {
        title: '社保征收',
        num: 714
    }, {
        title: '新房契税征收',
        num: 96
    }
]
export default class extends Component {
    iconList = () => {
        return img.map((itemImg, itemIndex) => {
            return <div className={AffairsStyle.itemImg} key={itemIndex}>
                <div className={AffairsStyle[`nineImg${itemIndex + 1}`]} ></div>
                <div className={AffairsStyle.iconText}>{itemImg.title}</div>
                <div className={AffairsStyle.iconNum}>{itemImg.num}</div>
            </div>
        })
    }
    render() {
        return <>
            <ChartHeader title='税务局' />
            <div className={AffairsStyle.content}>
                <div className={AffairsStyle.iconWrapper}>
                    {this.iconList()}
                </div>

            </div>
        </>
    }
}