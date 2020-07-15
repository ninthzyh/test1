import React, { Component } from 'react'
import EmergencyStyle from '../Emergency.module.scss'
import OneMap from '../mapController';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        return (
            <div className={EmergencyStyle.container}>
                <OneMap></OneMap>
                <div className={EmergencyStyle.page}>
                    <div className={EmergencyStyle.wrapper}>
                        <div className={EmergencyStyle.item}>1</div>
                        <div className={EmergencyStyle.item}>

                        </div>
                        <div className={EmergencyStyle.item}>3</div>
                    </div>
                    <div className={EmergencyStyle.wrapper}>
                        <div className={EmergencyStyle.itemRight}>4</div>
                        <div className={EmergencyStyle.itemRight}>5</div>
                        <div className={EmergencyStyle.itemRight}>6</div>
                    </div>
                </div>
            </div>);

    }
}
 
export default Index;