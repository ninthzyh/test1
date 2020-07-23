import React, { Component } from 'react'
import CreditStyle from '../Credit.module.scss'
import OneMap from '../mapController';
import FiveChart from './fiveChart/FiveChart';
import One from './One/One.js'
import Six from "./Six";
import Four from './four/FourAnimate'
import Three from './Three/Three.js'
import RedAndBlockList from './redAndBlockList/RedAndBlockList.js';
import CommonContainer from "components/CommonContainer";
class Index extends Component {
    render() {
        return (
            <div className={CreditStyle.container}>
                <CommonContainer Map={OneMap} containerStyle={CreditStyle}>
                    <div  className={CreditStyle.item}><One /></div>
                    <div className={CreditStyle.item}><Three /></div>
                    <div className={`${CreditStyle.item}  ${CreditStyle.noBottonPad}`}><RedAndBlockList /></div>
                    <div  className={CreditStyle.itemRight}><Four /></div>
                    <div className={CreditStyle.itemRight}><FiveChart /></div>
                    <div className={CreditStyle.itemRight}><Six /></div>
                </CommonContainer>
            </div>);

    }
}

export default Index;