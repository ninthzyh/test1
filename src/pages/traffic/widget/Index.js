import React, { Component } from 'react'
import TrafficStyle from '../Traffic.module.scss'
import LineChart from './LineChart';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className={TrafficStyle.page}>
                <div>
                    <div className={TrafficStyle.item}>1</div>
                    <div className={TrafficStyle.item}>
                        <LineChart />
                    </div>
                    <div className={TrafficStyle.item}>3</div>
                </div>
                <div>
                    <div className={TrafficStyle.item}>1</div>
                    <div className={TrafficStyle.item}>2</div>
                    <div className={TrafficStyle.item}>3</div>
                </div>
            </div>
        );
    }
}

export default Index;