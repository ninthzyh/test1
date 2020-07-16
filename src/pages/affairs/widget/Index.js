import React, { Component } from 'react'
import AffairsStyle from '../Affairs.module.scss'
import OneMap from '../mapController';
import One from './One.js';
import Two from './Two';
import Seven from './Seven';
import Three from './serviceNumber/Three';
import 'animate.css';
import Fives from './Fives/Fives.js'
import SixChart from './sixChart/SixChart';
import Eight from './Eight';
import Four from './Four/Four.js'
import FourChart from './Four/FourChart/FourChart.js'
import Eleven from './humanSocialBureau/Eleven';
import Twelve from './Twelve.js';
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
        },5000)
    };

    getOneClassName = (show) => !show ? 'animate__animated animate__backOutLeft' : 'animate__animated animate__backInLeft';
    getTwoClassName = (show) => `${AffairsStyle.leftWrapper} ${show ? 'animate__animated animate__backOutLeft' : 'animate__animated animate__backInLeft'}`;

    render() {
        const { show } = this.state;
        return (
            <div className={AffairsStyle.container}>
                <OneMap></OneMap>
                <div style={!show ? {display: 'none'} : {}} className={`${AffairsStyle.leftWrapper} ${this.getOneClassName(show)}`}>
                    <div className={AffairsStyle.item}><One/></div>
                    <div className={AffairsStyle.item}><Two /></div>
                    <div className={AffairsStyle.item}><Three /></div>
                </div>
                <div style={!show ? {display: 'none'} : {}} className={`${AffairsStyle.rightWrapper} ${this.getOneClassName(show)}`}>
                    <div className={AffairsStyle.itemRight}><Four /></div>
                    <div className={AffairsStyle.itemRight}><Fives /></div>
                    <div className={AffairsStyle.itemRight}><SixChart /></div>
                </div>
                <div style={show ? {display: 'none'} : {}} className={`${AffairsStyle.leftWrapper} ${this.getTwoClassName(show)}`}>
                    <div className={AffairsStyle.item}><Seven/></div>
                    <div className={AffairsStyle.item}><Eight /></div>
                    <div className={AffairsStyle.item}>3</div>
                </div>
                <div style={show ? {display: 'none'} : {}} className={`${AffairsStyle.rightWrapper} ${this.getTwoClassName(show)}`}>
                    <div className={AffairsStyle.itemRight}><FourChart/></div>
                    <div className={AffairsStyle.itemRight}><Eleven/></div>
                    <div className={AffairsStyle.itemRight}><Twelve/></div>
                </div>
            </div>);
    }
}

export default Index
