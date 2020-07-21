import React, { Component } from 'react';
import ManagerStyle from '../Manager.module.scss'
import ChartHeader from '../../../components/ChartHeader/ChartHeader';
import { Icon } from 'antd';
import CountUp from 'react-countup';
const countUpProps = {
    star: 0,
    duration: 10,
    decimals: 0,
    useEasing: true,
    useGrouping: true,
    }

const list = [
    { title: '上报数', num: 234, day: '-7.5%', week: '-7.5%', month: '-7.5%',numColor:'color1' },
    { title: '立案数', num: 234, day: '-7.5%', week: '-7.5%', month: '-7.5%',numColor:'color2'},
    { title: '处置数', num: 561, day: '-7.5%', week: '-7.5%', month: '-7.5%',numColor:'color3' },
    { title: '结案数', num: 742, day: '-7.5%', week: '-7.5%', month: '-7.5%',numColor:'color4' },

]
export default class extends Component {
    sevenList = () => {
        return list.map((itemImg, itemIndex) => {
            return <div className={ManagerStyle.itemImg} key={itemIndex}>
                <div className={ManagerStyle[itemImg.numColor]}><CountUp delay={1} end={itemImg.num} {...countUpProps}/></div>
                <div className={ManagerStyle.title}>{itemImg.title}</div>
                <div className={ManagerStyle.day}>日:{itemImg.day}<Icon type="arrow-down" /></div>
                <div className={ManagerStyle.week}>周:{itemImg.week}<Icon type="arrow-down" /></div>
                <div className={ManagerStyle.month}>月:{itemImg.month}<Icon type="arrow-up" /></div>
            </div>
        })
    }
    render() {
        return <>
            <ChartHeader title='昨日运行情况' />
            <div className={ManagerStyle.sevenContent}>
                <div className={ManagerStyle.sevenWrapper}>
                    {this.sevenList()}
                </div>
            </div>
        </>
    }
}