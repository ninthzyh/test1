import React, { Component } from 'react'
import AffairsStyle from '../Affairs.module.scss'
import OneMap from '../mapController';
import One from './One.js';
import Two from './Two';
import Seven from './Seven';
import Three from './Three';
import Fives from './Fives/Fives.js'
import SixChart from './sixChart/SixChart';
import Eight from './Eight';
import Four from './Four/Four.js'
import FourChart from './Four/FourChart/FourChart.js'
import Eleven from './Eleven';
import Twelve from './Twelve.js';
import Nine from './Nine';
import VisitorCount from "components/VisitorCount";
import CommonContainer from "components/CommonContainer";
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

    getClassName = (show,position) => `${AffairsStyle[`${position.toLowerCase()}Wrapper`]} ${show ? `animate__animated animate__backOut${position}` : `animate__animated animate__backIn${position}`}`;

    render() {
        const { show } = this.state;
        return (
            <div className={AffairsStyle.container}>
                <OneMap/>
                <div style={!show ? {display: 'none'} : {}} className={this.getClassName(!show,'Left')}>
                    <div className={AffairsStyle.item}><One/></div>
                    <div className={AffairsStyle.item}><Two /></div>
                    <div className={AffairsStyle.item}><Three /></div>
                </div>
                <div style={!show ? {display: 'none'} : {}} className={this.getClassName(!show,'Right')}>
                    <div className={AffairsStyle.itemRight}><Four /></div>
                    <div className={AffairsStyle.itemRight}><Fives /></div>
                    <div className={AffairsStyle.itemRight}><SixChart /></div>
                </div>
                <div style={show ? {display: 'none'} : {}} className={this.getClassName(show,'Left')}>
                    <div className={AffairsStyle.item}><Seven/></div>
                    <div className={AffairsStyle.item}><Eight /></div>
                    <div className={AffairsStyle.item}><Nine /></div>
                </div>
                <div style={show ? {display: 'none'} : {}} className={this.getClassName(show,'Right')}>
                    <div className={AffairsStyle.itemRight}><FourChart/></div>
                    <div className={AffairsStyle.itemRight}><Eleven/></div>
                    <div className={AffairsStyle.itemRight}><Twelve/></div>
                </div>
                <VisitorCount />
            </div>);
    }
}

export default Index
