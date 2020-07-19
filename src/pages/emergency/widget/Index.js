import React, { Component } from 'react'
import EmergencyStyle from '../Emergency.module.scss'
import OneMap from '../mapController';
import Two from "./Two"
import Six from "./six/Six"
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        return (
            <div className={EmergencyStyle.container}>
                <OneMap></OneMap>
                <div className={EmergencyStyle.leftWrapper}>
                    <div className={EmergencyStyle.item}>1</div>
                    <div className={EmergencyStyle.item}><Two/>

                    </div>
                    <div className={EmergencyStyle.item}><Two/></div>
                </div>
                <div  className={EmergencyStyle.rightWrapper}>
                    <div className={EmergencyStyle.itemRight}>4</div>
                    <div className={EmergencyStyle.itemRight}>5</div>
                    <div className={EmergencyStyle.itemRight}><Six/></div>
                </div>
            </div>);

    }
}
 
export default Index;