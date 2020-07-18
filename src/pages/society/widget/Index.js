import React, { Component } from 'react'
import SocietyStyle from '../Society.module.scss'
import OneMap from '../mapController';
import Eight from './Eight';
import Two from './Two/Two.js'
import Three from './Three/Three.js'
import 'animate.css';
import Six from './Six.js'
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }
    componentDidMount() {
        // this.showChange();
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
                    <div className={SocietyStyle.item}><Two /></div>
                    <div className={SocietyStyle.item}><Three /></div>
                </div>
                <div style={!show ? {display: 'none'} : {}} className={this.getClassName(!show,'Right')}>
                    <div className={SocietyStyle.itemRight}>4</div>
                    <div className={SocietyStyle.itemRight}>5</div>
                    <div className={SocietyStyle.itemRight}><Six/></div>
                </div>
                <div style={show ? {display: 'none'} : {}} className={this.getClassName(show,'Right')}>
                    <div className={SocietyStyle.itemRight}>7</div>
                    <div className={SocietyStyle.itemRight}><Eight /></div>
                    <div className={SocietyStyle.itemRight}>9</div>
                </div>
            </div>);
    }
}

export default Index
