import React, { Component, createRef } from 'react'
import CreditStyle from '../Credit.module.scss';
import ChartHeader from 'components/ChartHeader/ChartHeader';
import img from 'img/credit/news.png';
export default class extends Component {
    constructor(props) {
        super(props);
        this.marquee = createRef();
        this.img = createRef();
        this.p = createRef();
        this.state={
            top:0
        }
    }
    componentDidMount() {
        const parentHeight = this.marquee.current.clientHeight;
        const imgHeight = this.img.current.height;
        const pHeight = this.p.current.clientHeight;
        if(parentHeight - imgHeight - pHeight < 10){
            this.scroll(parentHeight, imgHeight, pHeight);
        }
    }

    scroll = (parent, img, p) => {
        setTimeout(()=>{
            let {top} = this.state;
            top -= 2;
            if(top <= parent - img - p - 50){
                top = 0
            }
            this.setState({
                top
            });
            this.scroll(parent, img, p);
        },100)
    };

    render() {
        const {top} = this.state;
        const style = {
            position:'relative',
            top
        };
        return (
            <div className={CreditStyle.six}>
                <ChartHeader title='信用动态' />
                <div ref={this.marquee} className={CreditStyle.marquee}>
                    <img style={style} ref={this.img} src={img} height='63%' alt=""/>
                    <p style={style} ref={this.p}>7月15日，全市文化旅游大会召开，深入学习贯彻习近平总书记视察河 南重要讲话和关于文化旅游融合发展的重要指示精神，认真贯彻省委十 届十一次全会暨省委工作会议精神，全面落实全省文化旅游大会精神， 动员全市上下坚定文化自信、抢抓战略机遇，发挥自身优势、主动担当</p>
                </div>
            </div>);
    }
}