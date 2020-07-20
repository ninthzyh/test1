import React, { Component } from 'react';
import TrafficStyle from '../Traffic.module.scss'
import ChartHeader from '../../../components/ChartHeader/ChartHeader';

//pic:require(window.trafficVideo.one)  pic:require('img/emergency/accident.mp4')
const list = [
    { camera: require("img/traffic/three1.png"), name: "长安路", pic:require('img/emergency/accident.mp4'),id:"videoOne" },
    { camera: require("img/traffic/three1.png"), name: "富春山路", pic:require('img/emergency/accident.mp4') ,id:"videoTwo" },

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
                            <video
                                id={item.id}
                                ref={item.id}
                                src={item.pic}
                                autoPlay="autoplay"
                                loop="loop"
                                muted="muted"
                            ></video>
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