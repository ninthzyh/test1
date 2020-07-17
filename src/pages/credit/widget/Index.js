import React, { Component } from 'react'
import CreditStyle from '../Credit.module.scss'
import OneMap from '../mapController';
import FiveChart from './fiveChart/FiveChart';
import One from './One/One.js'
import Six from "./Six";
import Four from './four/Four'
import Three from './Three/Three.js'
import RedAndBlockList from './redAndBlockList/RedAndBlockList.js'
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className={CreditStyle.container}>
                <OneMap></OneMap>
                <div className={CreditStyle.leftWrapper}>
                    <div className={CreditStyle.item}>
                        <One />
                    </div>
                    <div className={CreditStyle.item}>
                        <Three />
                    </div>
                    <div className={`${CreditStyle.item}  ${CreditStyle.noBottonPad}`}><RedAndBlockList /></div>
                </div>
                <div className={CreditStyle.rightWrapper}>
                    <div className={CreditStyle.itemRight}><Four /></div>
                    <div className={CreditStyle.itemRight}><FiveChart /></div>
                    <div className={CreditStyle.itemRight}><Six /></div>
                </div>
            </div>);

    }
}

export default Index;