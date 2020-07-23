
import React, { Component } from 'react'
import SocietyStyle from '../Society.module.scss'
import OneMap from '../mapController';
import Eight from './Eight/Eight' 
import One from './One/One'
import Two from './Two/Two.js'
import Seven from './Seven.js'
import Three from './Three/Three.js'
import Six from './Six.js'
import Four from './four/Four'
import Five from './Five/Five.js'
import Nine from './nine/Nine'
import ManagerStyle from "../../manager/Manager.module.scss";
import FiveChart from "../../manager/widget/fiveChart/FiveChart";
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
                <div style={!show ? { display: 'none' } : {}} className={this.getClassName(!show, 'Left')}>
                    <div className={SocietyStyle.item}><One/></div>
                    <div className={SocietyStyle.item}><Two /></div>
                    <div className={SocietyStyle.item}><Three /></div>
                </div>
                <div style={show ? { display: 'none' } : {}} className={this.getClassName(show, 'Left')}>
                    <div className={SocietyStyle.item}><One/></div>
                    <div className={SocietyStyle.item}><Two /></div>
                    <div className={SocietyStyle.item}><Three /></div>
                </div>
                <div style={!show ? {display: 'none'} : {}} className={this.getClassName(!show,'Right')}>
                    <div className={SocietyStyle.itemRight}><Four/></div>
                    <div className={SocietyStyle.itemRight}><Five/></div>
                    <div className={SocietyStyle.itemRight}><Six/></div>
                </div>
                <div style={show ? {display: 'none'} : {}} className={this.getClassName(show,'Right')}>
                    <div className={SocietyStyle.itemRight}><Seven /></div>
                    <div className={SocietyStyle.itemRight}><Eight /></div>
                    <div className={SocietyStyle.itemRight}><Nine/></div>
                </div>
            </div>);
    }
}

export default Index
