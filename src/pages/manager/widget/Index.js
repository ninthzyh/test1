import React from 'react';
import ManagerStyle from '../Manager.module.scss';
import OneMap from '../mapController';
import One from './One';
import Two from './Two/Two';
import Three from './Three';
import Four from './four/Four'
import FiveChart from './fiveChart/FiveChart';
import Six from "./Six";
import Twelve from './twelve/Twelve'
class Manager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false
        }
    }
    componentDidMount() {
        this.showChange();
    }

    showChange = () => {
        setTimeout(()=>{
            this.setState({
                show: !this.state.show
            }, this.showChange)
        },5000)
    };
    getClassName = (show,position) => `${ManagerStyle[`${position.toLowerCase()}Wrapper`]} ${show ? `animate__animated animate__backOut${position}` : `animate__animated animate__backIn${position}`}`;

    render() {
        const { show } = this.state;
        return (
            <div className={ManagerStyle.container}>
                {/* <OneMap/> */}
                <div style={!show ? {display: 'none'} : {}} className={this.getClassName(!show,'Left')}>
                    <div className={ManagerStyle.item}><One /></div>
                    <div className={ManagerStyle.item}><Two /></div>
                    <div className={ManagerStyle.item}><Three/></div>
                </div>
                <div style={!show ? {display: 'none'} : {}} className={this.getClassName(!show,'Right')}>
                    <div className={ManagerStyle.itemRight}><Four /></div>
                    <div className={ManagerStyle.itemRight}><FiveChart /></div>
                    <div className={ManagerStyle.itemRight}><Six /></div>
                </div>
                <div style={show ? {display: 'none'} : {}} className={this.getClassName(show,'Left')}>
                    <div className={ManagerStyle.item}><One /></div>
                    <div className={ManagerStyle.item}><Two /></div>
                    <div className={ManagerStyle.item}><Three/></div>
                </div>
                <div style={show ? {display: 'none'} : {}} className={this.getClassName(show,'Right')}>
                    <div className={ManagerStyle.itemRight}><Four /></div>
                    <div className={ManagerStyle.itemRight}><FiveChart /></div>
                    <div className={ManagerStyle.itemRight}><Twelve /></div>
                </div>
            </div>);

    }
}
export default Manager;