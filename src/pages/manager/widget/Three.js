import React, { Component } from 'react';
import ManagerStyle from '../Manager.module.scss'
import ChartHeader from '../../../components/ChartHeader/ChartHeader';

const top = [
    { title: '井盖', num: 341, unit: '个',line:'iconLine' },
    { title: '执法车辆', num: 18, unit: '辆',line:'iconLine2'},
    { title: '其他', num: 341, unit: '个',line:'iconLine3' },
]
const bottom = [
    { title: '路灯', num: 641, unit: '个',line:'iconLine' },
    { title: '环卫车辆', num: 38, unit: '辆',line:'iconLine2' },
    { title: '其他', num: 341, unit: '个',line:'iconLine3' }
]

export default class extends Component {
    iconList = () => {
        return top.map((itemImg, itemIndex) => {
            return <div className={ManagerStyle.itemImg} key={itemIndex}>
                <div className={ManagerStyle[itemImg.line]}> </div>
                <div className={ManagerStyle[`threeImg${itemIndex + 1}`]}></div>
                <div className={ManagerStyle.iconNum}>{itemImg.num}<span>{itemImg.iconUnit}</span></div>
                <div className={ManagerStyle.iconText}>{itemImg.title}</div>
            </div>
        })
    }
    iconList2 = () => {
        return bottom.map((itemImg, itemIndex) => {
            return <div className={ManagerStyle.itemImg} key={itemIndex}>
                <div className={ManagerStyle[itemImg.line]}> </div>
                <div className={ManagerStyle[`threeImg${itemIndex + 1}`]}></div>
                <div className={ManagerStyle.iconNum}>{itemImg.num}<span>{itemImg.iconUnit}</span></div>
                <div className={ManagerStyle.iconText}>{itemImg.title}</div>
            </div>
        })
    }
    render() {
        return <>
            <ChartHeader title='城市部件统计' />
            <div className={ManagerStyle.content} style={{display: 'flex',justifyContent: 'center',flexDirection: 'column',marginTop:10}}>
                <div className={ManagerStyle.threeWrapper}>
                    {this.iconList()}
                </div>
                <div className={ManagerStyle.threeWrapper}>
                    {this.iconList2()}
                </div>

            </div>
        </>
    }
}