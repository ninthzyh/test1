import React, { Component } from 'react'
import EmergencyStyle from '../Emergency.module.scss'
import OneMap from '../mapController';
import Four from './Four';
import One from './One/One'
import Two from "./Two"
import Six from "./six/Six"
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className={EmergencyStyle.container}>
                {/* <OneMap></OneMap> */}
                <div className={EmergencyStyle.leftWrapper}>
                    <div className={EmergencyStyle.item}><One /></div>
                    <div className={EmergencyStyle.item}><Two />

                    </div>
                    <div className={EmergencyStyle.item}>3</div>
                </div>
                <div className={EmergencyStyle.rightWrapper}>
                    <div className={EmergencyStyle.itemRight}><Four /></div>
                    <div className={EmergencyStyle.itemRight}>5</div>
                    <div className={EmergencyStyle.itemRight}><Six /></div>
                </div>
            </div>);

    }
}

export default Index;