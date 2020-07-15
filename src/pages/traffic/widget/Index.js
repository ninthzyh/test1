import React, { Component } from 'react'
import TrafficStyle from '../Traffic.module.scss'
import Two from '../../affairs/widget/Two';
import OneMap from '../mapController';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className={TrafficStyle.container}>
                <OneMap></OneMap>
                <div className={TrafficStyle.page}>
                    <div className={TrafficStyle.wrapper}>
                        <div className={TrafficStyle.item}>1</div>
                        <div className={TrafficStyle.item}>
                            <Two />
                        </div>
                        <div className={TrafficStyle.item}>3</div>
                    </div>
                    <div className={TrafficStyle.wrapper}>
                        <div className={TrafficStyle.item}>4</div>
                        <div className={TrafficStyle.item}>5</div>
                        <div className={TrafficStyle.item}>6</div>
                    </div>
                </div>
                
            </div>);

    }
}

export default Index;