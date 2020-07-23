import React, { Component } from 'react';
import $ from 'jquery';
import styles from './ZiranrenBlackList.module.scss'
class FarenBlackList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            data: [
                {
                    companyName: '房国银',
                    jieshao: '住濮阳市濮阳县渠村乡渠村集村',
                    time: '2020年3月19日',
                    incentive: '借款合同纠纷'
                },
                {
                    companyName: '张海山',
                    jieshao: '住濮阳县城关镇东关街',
                    time: '2019年12月31日',
                    incentive: '民间借贷纠纷'
                },
                {
                    companyName: '刘省委',
                    jieshao: '住濮阳县户部寨乡黑马庄村',
                    time: '2019年12月31日',
                    incentive: '民间借贷纠纷'
                },
            ]
        }
    }
    componentDidMount = () => {
        setTimeout(() => {
            this.lunbo3()
        }, 2500)
    }
    componentWillUnmount = () => {
        let ticker3 = $("#ticker3");
        ticker3.children().stop();
        ticker3 = null;
        this.setState({
            show: !this.state.show
        })
    }
    animator = (currentItem) => {
        let that = this
        var distance = currentItem.height();
        var duration = (distance + parseInt(currentItem.css("marginTop"))) / 0.025;
        currentItem.animate({ marginTop: -distance }, duration, "linear", function () {
            currentItem.appendTo(currentItem.parent()).css("marginTop", 0);
            that.animator(currentItem.parent().children(":first"));
        });
    };
    lunbo3 = () => {
        //轮播滚动
        let that = this
        let ticker3 = $("#ticker3");
        ticker3.children().filter("li").each(function () {
            var dt = $(this),
                container = $("<div>");
            dt.next().appendTo(container);
            dt.prependTo(container);
            container.appendTo(ticker3);
        });
        ticker3.css("overflow", "hidden");
        that.animator(ticker3.children(":first"));
        ticker3.mouseenter(function () {
            ticker3.children().stop();
        });
        ticker3.mouseleave(function () {
            that.animator(ticker3.children(":first"));
        });
    }

    render() {
        const { show } = this.state;
        return (
            <>
                <ul id="ticker3" className={`${styles.ticker}  ${show ? `animate__animated animate__slideInLeft` : `animate__animated animate__slideOutRight`}`}>
                    {/* <marquee direction="up" scrollamount='3' behavior="scroll" > */}
                    {
                        this.state.data.map((item, index) => {
                            return (
                                <li key={index}>
                                    <div className={styles.companyName}><span>名称:</span><span>{item.companyName}</span></div>
                                    <div className={styles.jieshao}><span>简介:</span><span>{item.jieshao}</span></div>
                                    <div className={styles.time}><span>处罚时间:</span><span>{item.time}</span></div>
                                    <div className={styles.incentive}><span>处罚事由:</span><span>{item.incentive}</span></div>
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




