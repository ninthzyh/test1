import React from 'react';
import ManagerStyle from '../Manager.module.scss';
import Six from "./Six";
import OneMap from '../mapController';
import One from './One';
import FiveChart from './fiveChart/FiveChart';
import Four from './four/Four'
import Three from './Three';
import { T } from 'antd/lib/upload/utils';
class Manager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div className={ManagerStyle.container}>
                <OneMap></OneMap>
                <div className={ManagerStyle.leftWrapper}>
                    <div className={ManagerStyle.item}><One /></div>
                    <div className={ManagerStyle.item}>

                    </div>
                    <div className={ManagerStyle.item}><Three/></div>
                </div>
                <div  className={ManagerStyle.rightWrapper}>
                    <div className={ManagerStyle.itemRight}><Four/></div>
                    <div className={ManagerStyle.itemRight}><FiveChart /></div>
                    <div className={ManagerStyle.itemRight}><Six /></div>
                    <div className={ManagerStyle.itemRight}></div>
                    <div className={ManagerStyle.itemRight}></div>
                </div>
            </div>);

    }
}
export default Manager;