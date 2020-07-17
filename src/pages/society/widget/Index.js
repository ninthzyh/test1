import React, { Component } from 'react'
import SocietyStyle from '../Society.module.scss'
import OneMap from '../mapController';
import Five from './Five/Five.js'
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className={SocietyStyle.container}>
                <OneMap>sadfsd</OneMap>
                <div className={SocietyStyle.leftWrapper}>
                    <div className={SocietyStyle.item}>1</div>
                    <div className={SocietyStyle.item}>

                    </div>
                    <div className={SocietyStyle.item}>3</div>
                </div>
                <div  className={SocietyStyle.rightWrapper}>
                    <div className={SocietyStyle.itemRight}>4</div>
                    <div className={SocietyStyle.itemRight}>
											<Five/>
										</div>
                    <div className={SocietyStyle.itemRight}></div>
                </div>
            </div>);
    }
}

export default Index;