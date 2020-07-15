import React from 'react';
// import './index.css';
import { Layout, Icon } from 'antd';
import HomeImg from 'img/home/home.svg'
import ManagerStyle from '../Manager.module.scss';
import OneMap from '../mapController';

const { Content } = Layout;

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
                <div className={ManagerStyle.page}>
                    <div className={ManagerStyle.wrapper}>
                        <div className={ManagerStyle.item}>1</div>
                        <div className={ManagerStyle.item}>

                        </div>
                        <div className={ManagerStyle.item}>3</div>
                    </div>
                    <div className={ManagerStyle.wrapper}>
                        <div className={ManagerStyle.itemRight}>4</div>
                        <div className={ManagerStyle.itemRight}>5</div>
                        <div className={ManagerStyle.itemRight}>6</div>
                    </div>
                </div>
            </div>);

    }
}
export default Manager;