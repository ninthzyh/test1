import React, { Component } from 'react';
import ManagerStyle from '../Manager.module.scss'
import ChartHeader from '../../../components/ChartHeader/ChartHeader';


const top = [
    { title: '井盖', num: 341, unit: '个' },
    { title: '执法车辆', num: 18, unit: '辆' },
    { title: '其他', num: 341, unit: '个' },
]
const bottom = [
    { title: '路灯', num: 641, unit: '个' },
    { title: '环卫车辆', num: 38, unit: '辆' },
    { title: '其他', num: 341, unit: '个' }
]

let divClassName;

export default class extends Component {
    iconList = () => {
        return top.map((itemImg, itemIndex) => {
            return <div className={ManagerStyle.itemImg} key={itemIndex}>
                 {
                    this.test(itemIndex) 
                }
                <div className={ManagerStyle[divClassName]}> </div>
                <div className={ManagerStyle[`threeImg${itemIndex + 1}`]}></div>
                <div className={ManagerStyle.iconNum}>{itemImg.num}<span>{itemImg.iconUnit}</span></div>
                <div className={ManagerStyle.iconText}>{itemImg.title}</div>
            </div>
        })
    }

    test = (value) => {
        switch (value) {
            case 0:
                divClassName = "iconLine";
                break;
            case 1:
                divClassName = "iconLine2";
                break;
            case 2:
                divClassName = "iconLine3";
                break;
        }
    }

    iconList2 = () => {
        return bottom.map((itemImg, itemIndex) => {
            return <div className={ManagerStyle.itemImg} key={itemIndex}>
                {
                    this.test(itemIndex) 
                }
                <div className={ManagerStyle[divClassName]}> </div>
                <div className={ManagerStyle[`threeImg${itemIndex + 1}`]}></div>
                <div className={ManagerStyle.iconNum}>{itemImg.num}<span>{itemImg.iconUnit}</span></div>
                <div className={ManagerStyle.iconText}>{itemImg.title}</div>
            </div>
        })
    }
    render() {
        return <>
            <ChartHeader title='城市部件统计' />
            <div className={ManagerStyle.content}>
                <div className={ManagerStyle.iconWrapper}>
                    {this.iconList()}
                </div>
                <div className={ManagerStyle.iconWrapper}>
                    {this.iconList2()}
                </div>

            </div>
        </>
    }
}