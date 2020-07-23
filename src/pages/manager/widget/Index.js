import React from 'react';
import ManagerStyle from '../Manager.module.scss';
import OneMap from '../mapController';
import One from './One';
import Two from './Two/Two';
import Three from './Three';
import Eleven from './Eleven';
import Four from './four/Four'
import FiveChart from './fiveChart/FiveChart';
import Six from "./Six";
import Ten from "./Ten";
import Nine from './nine/Nine';
import Twelve from './twelve/Twelve';
import Seven from './Seven';
import Eight from './Eight/Eight'
import CommonContainer from "components/CommonContainer";

class Manager extends React.Component {
    render() {
        return (
            <CommonContainer Map={OneMap} containerStyle={ManagerStyle} change={true}>
                <div className={ManagerStyle.item}><One /></div>
                <div className={ManagerStyle.item}><Two /></div>
                <div className={ManagerStyle.item}><Three /></div>
                <div className={ManagerStyle.itemRight}><Four /></div>
                <div className={ManagerStyle.itemRight}><FiveChart /></div>
                <div className={ManagerStyle.itemRight}><Six /></div>
                <div className={ManagerStyle.item}><Seven /></div>
                <div className={ManagerStyle.item}><Eight /></div>
                <div className={ManagerStyle.item}><Nine /></div>
                <div className={ManagerStyle.itemRight}><Ten /></div>
                <div className={ManagerStyle.itemRight}><Eleven /></div>
                <div className={ManagerStyle.itemRight}><Twelve /></div>
            </CommonContainer>);

    }
}
export default Manager;