import React, { Component } from 'react'
import TrafficStyle from '../Traffic.module.scss'
import OneMap from '../mapController';
import Four from './Four/Four'
import One from './one/One';
import Three from './Three';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className={TrafficStyle.container}>
                <OneMap></OneMap>
                <div className={TrafficStyle.leftWrapper}>
                    <div className={TrafficStyle.item}><One/></div>
                    <div className={TrafficStyle.item}><One/>

                    </div>
                    <div className={TrafficStyle.item}><Three/></div>
                </div>
                <div  className={TrafficStyle.rightWrapper}>
                    <div className={TrafficStyle.itemRight}><Four/></div>
                    <div className={TrafficStyle.itemRight}><Four/></div>
                    <div className={TrafficStyle.itemRight}>6</div>
                </div>
            </div>);

    }
}

export default Index;