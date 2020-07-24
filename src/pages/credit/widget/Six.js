import React, { Component, createRef } from 'react'
import CreditStyle from '../Credit.module.scss';
import ChartHeader from 'components/ChartHeader/ChartHeader';
import img1 from 'img/credit/news1.png';
import img2 from 'img/credit/news2.png';
export default class extends Component {
    constructor(props) {
        super(props);
        this.marquee = createRef();
        this.img = createRef();
        this.p = createRef();
        this.content = createRef();
        this.state={
            top:0
        }
    }
    componentDidMount() {
        const parentHeight = this.marquee.current.clientHeight;
        const childHeight = this.content.current.clientHeight;
        if(parentHeight - childHeight < 10){
            this.scroll(parentHeight, childHeight);
        }
    }

    scroll = (parent, childHeight) => {
        setTimeout(()=>{
            let {top} = this.state;
            top -= 1;
            if(top <= -childHeight-50){
                top = parent
            }
            this.setState({
                top
            });
            this.scroll(parent, childHeight);
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
                    <div style={style} ref={this.content}>
                        <p align="left">1.濮阳成功开出第一张财政电子票据</p>
                        <img src={img1} width='88%' alt=""/>
                        <p align="left">7月15日，我市第一张财政电子票据在市不动产登记中心开出，标志着我市财政电子票据管理系统正式上线运行，开启了财政电子票据“零跑腿”服务新模式，成为全省第四个开出财政电子票据的省辖市。</p>
                        <br/>
                        <p align="left">2.中原银行濮阳分行上半年信贷投放22.6亿元</p>
                        <img src={img2} width='88%' alt=""/>
                        <p align="left">今年年初以来，面对突发新冠肺炎疫情，中原银行濮阳分行创新产品，加大投放力度，急事急办全力支持复工复产，全面践行“六稳”“六保”，助推地方经济发展。截至6月底，中原银行濮阳分行信贷投放22.6亿元，向地方纳税7020万元。</p>
                    </div>
                   </div>
            </div>);
    }
}