import React, { Component } from 'react'
import AffairsStyle from '../Affairs.module.scss'
import OneMap from '../mapController';
import One from './One.js';
import Two from './Two';
import Seven from './Seven';
import Three from './serviceNumber/Three';
import 'animate.css';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }
    componentDidMount() {
        this.showChange();
    }

    showChange = () => {
        // setTimeout(()=>{
        //     this.setState({
        //         show: !this.state.show
        //     }, this.showChange)
        // },5000)
    };

    render() {
        const {show} = this.state;
        return (
            <div className={AffairsStyle.container}>
                <OneMap></OneMap>
                <div style={!show ? {display: 'none'} : {}} className={`${AffairsStyle.page} ${show ? 'animate__animated animate__backInLeft' : 'animate__animated animate__backOutLeft'}`}>
                    <div className={AffairsStyle.wrapper}>
                        <div className={AffairsStyle.item}><One/></div>
                        <div className={AffairsStyle.item}>
                            <Two />
                        </div>
                        <div className={AffairsStyle.item}><Three/></div>
                    </div>
                    <div className={AffairsStyle.wrapper}>
                        <div className={AffairsStyle.itemRight}>1</div>
                        <div className={AffairsStyle.itemRight}>2</div>
                        <div className={AffairsStyle.itemRight}>3</div>
                    </div>
                </div>
                <div style={show ? {display: 'none'} : {}} className={`${AffairsStyle.page} ${show ? 'animate__animated animate__backOutLeft' : 'animate__animated animate__backInLeft'}`}>
                    <div className={AffairsStyle.wrapper}>
                        <div className={AffairsStyle.item}><Seven/></div>
                        <div className={AffairsStyle.item}>
                            <Two />
                        </div>
                        <div className={AffairsStyle.item}>3</div>
                    </div>
                    <div className={AffairsStyle.wrapper}>
                        <div className={AffairsStyle.itemRight}>13212312</div>
                        <div className={AffairsStyle.itemRight}>2</div>
                        <div className={AffairsStyle.itemRight}>3</div>
                    </div>
                </div>
            </div>);
    }
}

export default Index;