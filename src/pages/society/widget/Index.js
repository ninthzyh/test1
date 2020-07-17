import React, { Component } from 'react'
import SocietyStyle from '../Society.module.scss'
import OneMap from '../mapController';
import 'animate.css';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
        }
    }
    componentDidMount() {
        this.showChange();
    }

    showChange = () => {
        setTimeout(()=>{
            this.setState({
                show: !this.state.show
            }, this.showChange)
        },window.interval)
    };

    getClassName = (show,position) => `${SocietyStyle[`${position.toLowerCase()}Wrapper`]} ${show ? `animate__animated animate__backOut${position}` : `animate__animated animate__backIn${position}`}`;

    render() {
        const { show } = this.state;
        return (
            <div className={SocietyStyle.container}>
                <OneMap/>
                <div className={SocietyStyle.leftWrapper}>
                    <div className={SocietyStyle.item}>1</div>
                    <div className={SocietyStyle.item}>2</div>
                    <div className={SocietyStyle.item}>3</div>
                </div>
                <div style={!show ? {display: 'none'} : {}} className={this.getClassName(!show,'Right')}>
                    <div className={SocietyStyle.itemRight}>4</div>
                    <div className={SocietyStyle.itemRight}>5</div>
                    <div className={SocietyStyle.itemRight}>6</div>
                </div>
                <div style={show ? {display: 'none'} : {}} className={this.getClassName(show,'Right')}>
                    <div className={SocietyStyle.itemRight}>7</div>
                    <div className={SocietyStyle.itemRight}>8</div>
                    <div className={SocietyStyle.itemRight}>9</div>
                </div>
            </div>);
    }
}

export default Index
