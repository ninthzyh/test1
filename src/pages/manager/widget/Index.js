import React from 'react';
// import './index.css';
import { Layout, Icon } from 'antd';
import HomeImg from 'img/home/home.svg'
import ManagerStyle from '../Manager.module.scss';
import OneMap from '../mapController';
import CreditStyle from "../../credit/Credit.module.scss";
import Six from "../../credit/widget/Six";

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
                <div className={CreditStyle.leftWrapper}>
                    <div className={CreditStyle.item}>1</div>
                    <div className={CreditStyle.item}>

                    </div>
                    <div className={CreditStyle.item}>3</div>
                </div>
                <div  className={CreditStyle.rightWrapper}>
                    <div className={CreditStyle.itemRight}>4</div>
                    <div className={CreditStyle.itemRight}>5</div>
                    <div className={CreditStyle.itemRight}><Six /></div>
                </div>
            </div>);

    }
}
export default Manager;