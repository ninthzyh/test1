import React, { Component } from 'react';
import EmergencyStyle from '../Emergency.module.scss'
import ChartHeader from '../../../components/ChartHeader/ChartHeader';
// import 

const topList = [
    { name: '全年报警事件数', unit: '(万起)/同比', bigNum: '6.2', smallNum: '-7.23%'},
    { name: '全年有效警情事件数', unit: '(万起)/同比', bigNum: '2.7', smallNum: '43.5%' },
]
const bottomList = [
    { name: '全年接警处警数', unit: '(万起)/占比', bigNum: '6.2', smallNum: '100%' },
    { name: '全年报警事件结办', unit: '(万起)/占比', bigNum: '2.69', smallNum: '99.90%'},

]

export default class extends Component {

    listTop() {
        return (
            topList.map((item, index) => {
                return (
                    <div className={EmergencyStyle.infoItem} key={index}>
                        <div className={EmergencyStyle.name}>{item.name}</div>
                        <div className={EmergencyStyle.unit}>{item.unit}</div>
                        <div className={EmergencyStyle.num}>{item.bigNum}<span className={EmergencyStyle.smallNum}>{item.smallNum}</span></div>
                    </div>
                )
            })
        )
    }
    listBottom() {
        return (
            bottomList.map((item, index) => {
                return (
                    <div className={EmergencyStyle.infoItem} key={index}>
                        <div className={EmergencyStyle.name}>{item.name}</div>
                        <div className={EmergencyStyle.unit}>{item.unit}</div>
                        <div className={EmergencyStyle.num2}>{item.bigNum}<span className={EmergencyStyle.smallNum}>{item.smallNum}</span></div>
                    </div>
                )
            })
        )
    }
    render() {
        return <>
            <ChartHeader title='社会安全' />
            <div className={EmergencyStyle.content} style={{display: 'flex',justifyContent: 'center',flexDirection: 'column',marginTop:13}}>
                <div className={EmergencyStyle.five}>
                    {this.listTop()}
                </div>
                <div className={EmergencyStyle.five}>
                    {this.listBottom()}
                </div>

            </div>
        </>
    }
}