import React from 'react';
// import './index.css';
import { Layout, Icon } from 'antd';
import HomeImg from 'img/home/home.svg'
import ManagerStyle from '../Manager.module.scss';
import OneMap from '../mapController';
import Six from "../../credit/widget/Six";
import One from './One';

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
                {/* <OneMap></OneMap> */}
                <div className={ManagerStyle.leftWrapper}>
                    <div className={ManagerStyle.item}><One /></div>
                    <div className={ManagerStyle.item}>

                    </div>
                    <div className={ManagerStyle.item}>3</div>
                </div>
                <div  className={ManagerStyle.rightWrapper}>
                    <div className={ManagerStyle.itemRight}>4</div>
                    <div className={ManagerStyle.itemRight}>5</div>
                    <div className={ManagerStyle.itemRight}><Six /></div>
                </div>
            </div>);

    }
}
export default Manager;