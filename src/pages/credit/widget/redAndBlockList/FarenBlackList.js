import React, { Component } from 'react';
import $ from 'jquery';
import styles from './FarenBlackList.module.scss'
class FarenBlackList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            data: [
                {
                    companyName: '协能信息系统（濮阳）有限公司',
                    jieshao: '企业纳税失信',
                },
                {
                    companyName: '濮阳市佳一家食品有限公司',
                    jieshao: '生产经营失信',
                },
                {
                    companyName: '濮阳县国庆路宏济堂大药房',
                    jieshao: '生产经营失信',
                },
            ]
        }
    }
    componentDidMount = () => {
        setTimeout(() => {
            this.lunbo2()
        }, 2500)
    }
    componentWillUnmount = () => {
        let ticker2 = $("#ticker2");
        ticker2.children().stop();
        ticker2 = null;
        this.setState({
            show: !this.state.show
        })
    }
    animator = (currentItem) => {
        let that = this
        let distance = currentItem.height();
        let duration = (distance + parseInt(currentItem.css("marginTop"))) / 0.025;
        currentItem.stop().animate({ marginTop: -distance }, duration, "linear", function () {
            currentItem.appendTo(currentItem.parent()).css("marginTop", 0);
            that.animator(currentItem.parent().children(":first"));
        });
    };
    lunbo2 = () => {
        let that = this
        //轮播滚动
        let ticker2 = $("#ticker2");
        ticker2.children().filter("li").each(function () {
            var dt = $(this),
                container = $("<div>");
            dt.next().appendTo(container);
            dt.prependTo(container);
            container.appendTo(ticker2);
        });
        ticker2.css("overflow", "hidden");
        that.animator(ticker2.children(":first"));
        ticker2.mouseenter(function () {
            ticker2.children().stop();
        });
        ticker2.mouseleave(function () {
            that.animator(ticker2.children(":first"));
        });
    }
    render() {
        const { show } = this.state;
        return (
            <>
                <ul id="ticker2" className={`${styles.ticker}  ${show ? `animate__animated animate__slideInLeft` : `animate__animated animate__slideOutRight`}`}>
                    {/* <marquee direction="up" scrollamount='3' behavior="scroll"> */}
                    {
                        this.state.data.map((item, index) => {
                            return (
                                <li key={index}>
                                    <div className={styles.companyName}><span>名称:</span><span>{item.companyName}</span></div>
                                    <div className={styles.jieshao}><span>简介:</span><span>{item.jieshao}</span></div>
                                    {/* <div className={styles.time}><span>发布时间:</span><span>{item.time}</span></div>
                                    <div className={styles.incentive}><span>激励措施:</span><span>{item.incentive}</span></div> */}
                                </li>
                            )
                        })
                    }
                    {/* </marquee> */}
                </ul>
            </>
        );
    }

}
export default FarenBlackList;




