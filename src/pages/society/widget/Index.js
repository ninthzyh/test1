import React, { Component } from 'react'
import SocietyStyle from '../Society.module.scss'

import OneMap from '../mapController';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className={SocietyStyle.container}>
                <OneMap></OneMap>
                <div className={SocietyStyle.page}>
                    <div className={SocietyStyle.wrapper}>
                        <div className={SocietyStyle.item}>1</div>
                        <div className={SocietyStyle.item}>

                        </div>
                        <div className={SocietyStyle.item}>3</div>
                    </div>
                    <div className={SocietyStyle.wrapper}>
                        <div className={SocietyStyle.itemRight}>4</div>
                        <div className={SocietyStyle.itemRight}>5</div>
                        <div className={SocietyStyle.itemRight}>6</div>
                    </div>
                </div>
            </div>);

    }
}

export default Index;