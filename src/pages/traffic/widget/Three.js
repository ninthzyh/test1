import React, { Component } from 'react';
import TrafficStyle from '../Traffic.module.scss'
import ChartHeader from '../../../components/ChartHeader/ChartHeader';
// import 

const list = [
    { camera: require("img/traffic/three1.png"), name: "长安路", pic: require('img/traffic/three2.png') },
    { camera: require("img/traffic/three1.png"), name: "富春山路", pic: require('img/traffic/three3.png') },

]

export default class extends Component {

    threeList() {
        return (
            list.map((item, index) => {
                return (
                    <div className={TrafficStyle.infoItem} key={index}>
                        <div className={TrafficStyle.header}>
                            <img src={item.camera} className={TrafficStyle.camera} />
                            <div className={TrafficStyle.name}>{item.name}</div>
                        </div>
                        <div className={TrafficStyle.pic} >
                            <img src={item.pic} alt='1' />
                        </div>
                    </div>
                )
            })
        )
    }

    render() {
        return <>
            <ChartHeader title='交通视频展示' />
            <div className={TrafficStyle.three}>
                <div className={TrafficStyle.threeWrapper}>
                    {this.threeList()}
                </div>
            </div>
        </>
    }
}