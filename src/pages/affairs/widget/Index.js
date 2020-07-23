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
import CommonContainer from "components/CommonContainer";
class Index extends Component {
    render() {
        return (
            <CommonContainer Map={OneMap} containerStyle={AffairsStyle} showVisitor={true} change={true}>
                <div className={AffairsStyle.item}><One/></div>
                <div className={AffairsStyle.item}><Two /></div>
                <div className={AffairsStyle.item}><Three /></div>
                <div className={AffairsStyle.itemRight}><Four /></div>
                <div className={AffairsStyle.itemRight}><Fives /></div>
                <div className={AffairsStyle.itemRight}><SixChart /></div>
                <div className={AffairsStyle.item}><Seven/></div>
                <div className={AffairsStyle.item}><Eight /></div>
                <div className={AffairsStyle.item}><Nine /></div>
                <div className={AffairsStyle.itemRight}><FourChart/></div>
                <div className={AffairsStyle.itemRight}><Eleven/></div>
                <div className={AffairsStyle.itemRight}><Twelve/></div>
            </CommonContainer>
        );
    }
}

export default Index
