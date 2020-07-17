import React, { Component } from 'react';
import 'animate.css';
import $ from 'jquery';
import styles from './FarenBlackList.module.scss'
class FarenBlackList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            data: [
                {
                    companyName: '河南巨烽生物能源开发有限公司濮阳县分公司',
                    jieshao: '国家级高新技术企业,河南省节能减排示范企业，长期以来环保处理设施运行正常，污染物排放达到国家标准。',
                    time: '2017/8/15',
                    incentive: '优先办理环保行政许可;新建项目需要主要污染物排放指标时，优先调剂使用储备的排污总量指标；对符合相关环保专项资金支持范围的申报项目优先安排资金支持，建议金融机构予以优惠贷款利率,保险机构降低环境污染责任保险费率;优先安排符合环保科研指南的环保科研项目'
                },
                {
                    companyName: '河南巨烽生物能源开发有限公司濮阳县分公司',
                    jieshao: '国家级高新技术企业,河南省节能减排示范企业，长期以来环保处理设施运行正常，污染物排放达到国家标准。',
                    time: '2017/8/15',
                    incentive: '优先办理环保行政许可;新建项目需要主要污染物排放指标时，优先调剂使用储备的排污总量指标；对符合相关环保专项资金支持范围的申报项目优先安排资金支持，建议金融机构予以优惠贷款利率,保险机构降低环境污染责任保险费率;优先安排符合环保科研指南的环保科研项目'
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
                                    <div className={styles.jieshao}><span>介绍:</span><span>{item.jieshao}</span></div>
                                    <div className={styles.time}><span>发布时间:</span><span>{item.time}</span></div>
                                    <div className={styles.incentive}><span>激励措施:</span><span>{item.incentive}</span></div>
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




