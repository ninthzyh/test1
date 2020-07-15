import React, { Component } from 'react'
import CreditStyle from '../Credit.module.scss'
import OneMap from '../mapController';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className={CreditStyle.container}>
                <OneMap></OneMap>
                <div className={CreditStyle.page}>
                    <div>
                        <div className={CreditStyle.item}>1</div>
                        <div className={CreditStyle.item}>

                        </div>
                        <div className={CreditStyle.item}>3</div>
                    </div>
                    <div>
                        <div className={CreditStyle.item}>4</div>
                        <div className={CreditStyle.item}>5</div>
                        <div className={CreditStyle.item}>6</div>
                    </div>
                </div>
            </div>);

    }
}

export default Index;