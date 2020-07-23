import React, { Component } from 'react'
import TrafficStyle from '../Traffic.module.scss'
import OneMap from '../mapController';
import One from './one/One';
import Two from './Two/Two'
import Three from './Three';
import Four from './Four/Four'
import Five from './Five';
import Six from './Six';
import CommonContainer from "components/CommonContainer";
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <CommonContainer Map={OneMap} containerStyle={TrafficStyle}>
                <div className={TrafficStyle.item}><One/></div>
                <div className={TrafficStyle.item}><Two/></div>
                <div className={TrafficStyle.item}><Three/></div>
                <div className={TrafficStyle.itemRight}><Four/></div>
                <div className={TrafficStyle.itemRight}><Five/></div>
                <div className={TrafficStyle.itemRight}><Six/></div>
            </CommonContainer>);

    }
}

export default Index;