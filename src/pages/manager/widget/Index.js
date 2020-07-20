import React from 'react';
import ManagerStyle from '../Manager.module.scss';
import OneMap from '../mapController';
import One from './One';
import Two from './Two/Two';
import Three from './Three';
// import { T } from 'antd/lib/upload/utils';
import Eleven from './Eleven';
import Four from './four/Four'
import FiveChart from './fiveChart/FiveChart';
import Six from "./Six";
import Ten from "./Ten";
import Nine from './nine/Nine';
import Twelve from './twelve/Twelve';
import Seven from './Seven';
import Eight from './Eight/Eight'

class Manager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }
    componentDidMount() {
        // this.showChange();
    }

    showChange = () => {
        setTimeout(() => {
            this.setState({
                show: !this.state.show
            }, this.showChange)
        }, window.interval)
    };
    getClassName = (show, position) => `${ManagerStyle[`${position.toLowerCase()}Wrapper`]} ${show ? `animate__animated animate__slideIn${position}` : `animate__animated animate__slideIn${position}`}`;

    render() {
        const { show } = this.state;
        return (
            <div className={ManagerStyle.container}>
                {/*<OneMap />*/}
                <div style={!show ? { display: 'none' } : {}} className={this.getClassName(!show, 'Left')}>
                    <div className={ManagerStyle.item}><One /></div>
                    <div className={ManagerStyle.item}><Two /></div>
                    <div className={ManagerStyle.item}><Three /></div>
                </div>
                <div style={!show ? { display: 'none' } : {}} className={this.getClassName(!show, 'Right')}>
                    <div className={ManagerStyle.itemRight}><Four /></div>
                    <div className={ManagerStyle.itemRight}><FiveChart /></div>
                    <div className={ManagerStyle.itemRight}><Six /></div>
                </div>
                <div style={show ? { display: 'none' } : {}} className={this.getClassName(show, 'Left')}>
                    <div className={ManagerStyle.item}><Seven /></div>
                    <div className={ManagerStyle.item}><Eight /></div>
                    <div className={ManagerStyle.item}><Nine /></div>
                </div>
                <div style={show ? { display: 'none' } : {}} className={this.getClassName(show, 'Right')}>
                    <div className={ManagerStyle.itemRight}><Ten /></div>
                    <div className={ManagerStyle.itemRight}><Eleven /></div>
                    <div className={ManagerStyle.itemRight}><Twelve /></div>
                </div>
            </div>);

    }
}
export default Manager;