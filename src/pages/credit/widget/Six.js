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
            top -= 1;
            if(top <= parent - img - p - 50){
                top = 0
            }
            this.setState({
                top
            });
            this.scroll(parent, img, p);
        },50)
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
                    <div style={style} ref={this.p}>
                        <p align="left">7月15日，全市文化旅游大会召开，深入学习贯彻习近平总书记视察河 南重要讲话和关于文化旅游融合发展的重要指示精神，认真贯彻省委十 届十一次全会暨省委工作会议精神，全面落实全省文化旅游大会精神， 动员全市上下坚定文化自信、抢抓战略机遇，发挥自身优势、主动担当</p>
                        <p align="left">1.濮阳成功开出第一张财政电子票据</p>
                        <p align="left">7月15日，我市第一张财政电子票据在市不动产登记中心开出，标志着我市财政电子票据管理系统正式上线运行，开启了财政电子票据“零跑腿”服务新模式，成为全省第四个开出财政电子票据的省辖市。</p>
                        <p align="left">2.中原银行濮阳分行上半年信贷投放22.6亿元</p>
                        <p align="left">今年年初以来，面对突发新冠肺炎疫情，中原银行濮阳分行创新产品，加大投放力度，急事急办全力支持复工复产，全面践行“六稳”“六保”，助推地方经济发展。截至6月底，中原银行濮阳分行信贷投放22.6亿元，向地方纳税7020万元。</p>
                    </div>
                   </div>
            </div>);
    }
}