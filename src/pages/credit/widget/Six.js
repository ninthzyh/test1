import React, { Component } from 'react'
import CreditStyle from '../Credit.module.scss'
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className={CreditStyle.six}>
                <div className={CreditStyle.bg}>
                    <img src="/img/credit/news.png" width={'80%'} alt=""/>
                </div>
                <marquee direction='up'>
                    <p>7月15日，全市文化旅游大会召开，深入学习贯彻习近平总书记视察河 南重要讲话和关于文化旅游融合发展的重要指示精神，认真贯彻省委十 届十一次全会暨省委工作会议精神，全面落实全省文化旅游大会精神， 动员全市上下坚定文化自信、抢抓战略机遇，发挥自身优势、主动担当</p>
                </marquee>
            </div>);
    }
}