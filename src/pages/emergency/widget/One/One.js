import React, { Component } from 'react';
import styles from './One.module.scss'
import ChartHeader from "../../../../components/ChartHeader/ChartHeader"
import jinggao from 'img/emergency/jinggao@2x.png'
import shebeiwanhaoshuai from 'img/emergency/shebeiwanhaoshuai@2x.png'
import lianwangdanwei from 'img/emergency/lianwangdanwei(1)@2x.png'
import shebeijianguan2 from 'img/emergency/shebeijianguan2@2x.png'
import yujing from 'img/emergency/yujing@2x.png'
class One extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<div className={styles.onePage}>
            <ChartHeader title={'概览'} />
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.topBox}>
                        <div className={styles.blockBox}>
                            <div className={styles.iconBox}><img src={jinggao} /></div>
                            <div className={styles.name}>告警处理率</div>
                            <div className={styles.value}>99.9%</div>
                        </div>
                        <div className={styles.blockBox}>
                            <div className={styles.iconBox}><img src={yujing} /></div>
                            <div className={styles.name}>预警</div>
                            <div className={styles.value}>287</div>
                        </div>
                        <div className={styles.blockBox}>
                            <div className={styles.iconBox}><img src={lianwangdanwei} /></div>
                            <div className={styles.name}>联网单位</div>
                            <div className={styles.value}>820</div>
                        </div>
                    </div>
                    <div className={styles.bottomBox}>
                        <div className={styles.blockBox} style={{ 'marginLeft': '15%' }}>
                            <div className={styles.iconBox}><img src={shebeiwanhaoshuai} /></div>
                            <div className={styles.name}>设备完好率</div>
                            <div className={styles.value}>62%</div>
                        </div>
                        <div className={styles.blockBox} style={{ 'marginRight': '15%' }}>
                            <div className={styles.iconBox}><img src={shebeijianguan2} /></div>
                            <div className={styles.name}>监控设备</div>
                            <div className={styles.value}>739</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default One;