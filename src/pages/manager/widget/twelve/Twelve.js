import React, { Component } from "react"
import ChartHeader from "components/ChartHeader/ChartHeader"
import { Row, Col } from 'antd'
import TwelveStyle from './Twelve.module.scss'
import creditImg from 'img/manager/credit.png';
class Twelve extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                {
                    image: creditImg,
                    type: "施工工地-文明施工",
                    address: "河南省濮阳市濮阳县文留镇34号",
                    desc: "文明施工事件需要处理",
                    time: "2020-05-05 11：38：29"
                },
                {
                    image: creditImg,
                    type: "施工工地-文明施工",
                    address: "河南省濮阳市濮阳县文留镇34号",
                    desc: "文明施工事件需要处理",
                    time: "2020-05-05 11：38：29"
                },
            ],
            animate: false,
            speed: 20,
            marqueeHeight: 0,   //滚动区域高度
            time: null,
            delay: 0
        }
    }
    componentDidMount() {
        if (this.state.list.length > 2) {
            this.box2.innerHTML = this.box1.innerHTML
            this.scrollUp(this.msgBox);
        }
    }
    scrollUp = (msgBox) => {
        this.setState = {
            marqueeHeight: msgBox.offsetHeight - 30
        }
        msgBox.scrollTop = 0;
        msgBox.innerHTML += msgBox.innerHTML
        let startScroll = () => {
            this.state.time = setInterval(scrollUp, this.state.speed)
            msgBox.scrollTop++;
        }
        let scrollUp = () => {
            if (msgBox.scrollTop % this.state.marqueeHeight == 0) {
                clearInterval(this.state.time)
                setTimeout(startScroll, this.state.delay)
            } else {
                msgBox.scrollTop++;
                if (msgBox.scrollTop >= msgBox.scrollHeight / 2) {
                    msgBox.scrollTop = 0;
                }
            }
        }
        setTimeout(startScroll, this.state.delay)

    }
    getList(list) {
        return (
            list.map((item, index) => {
                return (
                    <div className={TwelveStyle.item} key={index}>
                        <div className={TwelveStyle.left}>
                            <img src={item.image} className={TwelveStyle.image} />
                        </div>
                        <div className={TwelveStyle.right}>
                            <div className={TwelveStyle.type}>{item.type}</div>
                            <div className={TwelveStyle.info}>地点：{item.address}</div>
                            <div className={TwelveStyle.info}>描述：{item.desc}</div>
                            <div className={TwelveStyle.info}>时间：{item.time}</div>
                        </div>
                    </div>
                )
            })

        )
    }
    render() {
        const title = '信用动态';
        const { animate } = this.state;
        return (
            <div className={TwelveStyle.twelveContainer}>
                <ChartHeader title={title} />
                <div className={`${TwelveStyle.infoBox} ${animate ? TwelveStyle.anim : ''}}`} ref={msg => this.msgBox = msg}>
                    <div ref={box => this.box1 = box}>
                        {this.getList(this.state.list)}
                    </div>
                    <div ref={box => this.box1 = box} ref={box => this.box2 = box}></div>

                </div>

            </div>

        )
    }

}

export default Twelve;