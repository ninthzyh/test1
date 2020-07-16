import React, { Component } from 'react'
import CreditStyle from '../Credit.module.scss'
import OneMap from '../mapController';
import One from './One/One.js'
// <OneMap></OneMap>
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className={CreditStyle.container}>
                
                <div className={CreditStyle.page}>
                    <div className={CreditStyle.wrapper}>
                        <div className={CreditStyle.item}>
													<One/>
												</div>
                        <div className={CreditStyle.item}>

                        </div>
                        <div className={CreditStyle.item}>3</div>
                    </div>
                    <div  className={CreditStyle.wrapper}>
                        <div className={CreditStyle.itemRight}>4</div>
                        <div className={CreditStyle.itemRight}>5</div>
                        <div className={CreditStyle.itemRight}>6</div>
                    </div>
                </div>
            </div>);

    }
}

export default Index;