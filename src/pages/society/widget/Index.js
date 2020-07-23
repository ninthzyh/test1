import React, { Component } from 'react';
import SocietyStyle from '../Society.module.scss';
import OneMap from '../mapController' ;
import One from './One/One';
import Two from './Two/Two.js';
import Three from './Three/Three.js';
import Four from './four/Four';
import Five from './Five/Five.js';
import Six from './Six.js';
import Seven from './Seven.js';
import Eight from './Eight/Eight';
import Nine from './nine/Nine';
import CommonContainer from "components/CommonContainer";
class Index extends Component {
    render() {
        return (
            <CommonContainer Map={OneMap} containerStyle={SocietyStyle} change={true}>
                <div className={SocietyStyle.item}><One/></div>
                <div className={SocietyStyle.item}><Two /></div>
                <div className={SocietyStyle.item}><Three /></div>
                <div className={SocietyStyle.itemRight}><Four/></div>
                <div className={SocietyStyle.itemRight}><Five/></div>
                <div className={SocietyStyle.itemRight}><Six/></div>
                <div className={SocietyStyle.item}><One/></div>
                <div className={SocietyStyle.item}><Two /></div>
                <div className={SocietyStyle.item}><Three /></div>
                <div className={SocietyStyle.itemRight}><Seven /></div>
                <div className={SocietyStyle.itemRight}><Eight /></div>
                <div className={SocietyStyle.itemRight}><Nine/></div>
            </CommonContainer>
        );
    }
}

export default Index
