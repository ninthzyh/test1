import React, { Component } from 'react';
import $ from 'jquery';
import styles from './FarenRedList.module.scss'
class FarenRedList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            data: [
                {
                    companyName: '濮阳林氏化学新材料股份有限公司',
                    jieshao: '企业诚信纳税',
                },
                {
                    companyName: '河南省凯利来食品有限公司',
                    jieshao: '企业诚信纳税',
                },{
                    companyName: '河南省中容食品有限公司',
                    jieshao: '企业诚信经营',
                },{
                    companyName: '濮阳市众享福华食品有限公司',
                    jieshao: '企业诚信经营',
                },{
                    companyName: '濮阳县挥公大道张氏濮阳会馆酒店',
                    jieshao: '企业诚信经营',
                },{
                    companyName: '濮阳市协和大药房连锁有限公司第三药店',
                    jieshao: '企业诚信经营',
                },{
                    companyName: '河南东森生物科技有限公司',
                    jieshao: '企业诚信经营',
                },{
                    companyName: '濮阳华信置业有限公司',
                    jieshao: '企业诚信经营',
                },
            ]
        }
    }
    componentDidMount = () => {
        setTimeout(() => {
            this.lunbo1()
        }, 2500)
    }
    componentWillUnmount = () => {
        let ticker1 = $("#ticker1");
        ticker1.children().stop();
        ticker1 = null;
        this.setState({
            show: !this.state.show
        })
    }
    animator = (currentItem) => {
        let that = this
        var distance = currentItem.height();
        var duration = (distance + parseInt(currentItem.css("marginTop"))) / 0.025;
        currentItem.stop().animate({ marginTop: -distance }, duration, "linear", function () {
            currentItem.appendTo(currentItem.parent()).css("marginTop", 0);
            that.animator(currentItem.parent().children(":first"));
        });
    };
    lunbo1 = () => {
        let that = this
        //轮播滚动
        let ticker1 = $("#ticker1");
        ticker1.children().filter("li").each(function () {
            var dt = $(this),
                container = $("<div>");
            dt.next().appendTo(container);
            dt.prependTo(container);
            container.appendTo(ticker1);
        });
        ticker1.css("overflow", "hidden");

        that.animator(ticker1.children(":first"));
        ticker1.mouseenter(function () {
            ticker1.children().stop();
        });
        ticker1.mouseleave(function () {
            that.animator(ticker1.children(":first"));
        });
    }
    render() {
        const { show } = this.state;
        return (
            <>
                <ul id="ticker1" className={`${styles.ticker}  ${show ? `animate__animated animate__slideInLeft` : `animate__animated animate__slideOutRight`}`}>
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
export default FarenRedList;




