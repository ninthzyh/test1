import React, { Component } from 'react'
import TrafficStyle from '../Traffic.module.scss'
import OneMap from '../mapController';
import Four from './Four/Four'
import One from './one/One';
import Two from './Two/Two'
import Six from './Six';
import Five from './Five';
import Three from './Three';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        console.dir(window.trafficVideo)
        return (
            <div className={TrafficStyle.container}>
                <OneMap></OneMap>
                <div className={TrafficStyle.leftWrapper}>
                    <div className={TrafficStyle.item}><One/></div>
                    <div className={TrafficStyle.item}>
                        <Two/>
                    </div>
                    <div className={TrafficStyle.item}><Three/></div>
                </div>
                <div  className={TrafficStyle.rightWrapper}>
                    <div className={TrafficStyle.itemRight}><Four/></div>
                    <div className={TrafficStyle.itemRight}><Five/></div>
                    <div className={TrafficStyle.itemRight}><Six/></div>
                </div>
            </div>);

    }
}

export default Index;