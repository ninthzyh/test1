import React, { Component } from 'react'
import CreditStyle from '../Credit.module.scss'
import OneMap from '../mapController';
import FiveChart from './fiveChart/FiveChart';
import One from './One/One.js'
import Six from "./Six";
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
											<One/>
										</div>
                    <div className={CreditStyle.item}>

                    </div>
                    <div className={CreditStyle.item}>3</div>
                </div>
                <div  className={CreditStyle.rightWrapper}>
                    <div className={CreditStyle.itemRight}>4</div>
                    <div className={CreditStyle.itemRight}><FiveChart /></div>
                    <div className={CreditStyle.itemRight}><Six /></div>
                </div>
            </div>);

    }
}

export default Index;