import React, { Component } from 'react'
import AffairsStyle from '../Affairs.module.scss'
import OneMap from '../mapController';
import Two from './Two';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className={AffairsStyle.container}>
                <OneMap></OneMap>
                <div className={AffairsStyle.page}>
                    <div className={AffairsStyle.wrapper}>
                        <div className={AffairsStyle.item}>1</div>
                        <div className={AffairsStyle.item}>
                            <Two />
                        </div>
                        <div className={AffairsStyle.item}>3</div>
                    </div>
                    <div className={AffairsStyle.wrapper}>
                        <div className={AffairsStyle.item}>1</div>
                        <div className={AffairsStyle.item}>2</div>
                        <div className={AffairsStyle.item}>3</div>
                    </div>
                </div>
            </div>);
    }
}

export default Index;