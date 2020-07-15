import React, { Component } from 'react'
import TrafficStyle from '../Traffic.module.scss'
import LineChart from './LineChart';
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
                    <div>
                        <div className={TrafficStyle.item}>1</div>
                        <div className={TrafficStyle.item}>
                            <LineChart />
                        </div>
                        <div className={TrafficStyle.item}>3</div>
                    </div>
                    <div>
                        <div className={TrafficStyle.item}>4</div>
                        <div className={TrafficStyle.item}>5</div>
                        <div className={TrafficStyle.item}>6</div>
                    </div>
                </div>
            </div>);

    }
}

export default Index;