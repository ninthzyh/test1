import React, { Component } from 'react';
import EmergencyStyle from '../Emergency.module.scss';
import OneMap from '../mapController';
import One from './One/One';
import Two from "./Two";
import Three from './Three/Three.js';
import Four from './Four';
import Five from "./Five";
import Six from "./six/Six";
import CommonContainer from "components/CommonContainer";
class Index extends Component {
    render() {
        return (
            <CommonContainer Map={OneMap} containerStyle={EmergencyStyle}>
                <div className={EmergencyStyle.item}><One /></div>
                <div className={EmergencyStyle.item}><Two /></div>
                <div className={EmergencyStyle.item}><Three /></div>
                <div className={EmergencyStyle.itemRight}><Four /></div>
                <div className={EmergencyStyle.itemRight}><Five/></div>
                <div className={EmergencyStyle.itemRight}><Six /></div>
            </CommonContainer>
        )
    }
}

export default Index;