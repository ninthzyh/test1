import React from 'react';
import ManagerStyle from '../Manager.module.scss';
import OneMap from '../mapController';


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
                    <div className={ManagerStyle.item}>1</div>
                    <div className={ManagerStyle.item}>

                    </div>
                    <div className={ManagerStyle.item}>3</div>
                </div>
                <div  className={ManagerStyle.rightWrapper}>
                    <div className={ManagerStyle.itemRight}>4</div>
                    <div className={ManagerStyle.itemRight}>5</div>
                    <div className={ManagerStyle.itemRight}></div>
                </div>
            </div>);

    }
}
export default Manager;