import React, { Component } from 'react';
import styles from './RedAndBlockList.module.scss';
import FarenRedList from './FarenRedList.js'
import FarenBlackList from './FarenBlackList.js'
import ZiranrenBlackList from './ZiranrenBlackList.js'
import ChartHeader from "../../../../components/ChartHeader/ChartHeader"
class RedAndBlockList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeType: 1,
        }
    }
    componentDidMount = () => {
    }

    changeContext = (type) => {
        this.setState({
            activeType: type
        })
    }

    render() {
        const title = '红黑榜名单';
        return (<div className={styles.RedAndBlockList}>
            <ChartHeader title={title} />
            <div className={styles.topNav}>
                <ul>
                    <li onClick={this.changeContext.bind(this, 3)} className={`${this.state.activeType == 3 ? styles['activeBtn'] : styles['defaultBtn']}`}>自然人黑名单</li>
                    <li onClick={this.changeContext.bind(this, 2)} className={`${this.state.activeType == 2 ? styles['activeBtn'] : styles['defaultBtn']}`}>法人黑名单</li>
                    <li onClick={this.changeContext.bind(this, 1)} className={`${this.state.activeType == 1 ? styles['activeBtn'] : styles['defaultBtn']}`}>法人红名单</li>
                </ul>
            </div>
            <div className={styles.conentBox}>
                {
                    this.state.activeType == 1 ?
                        <FarenRedList key={FarenRedList} /> : this.state.activeType == 2 ?
                            <FarenBlackList key={FarenBlackList} /> : this.state.activeType == 3 ?
                                <ZiranrenBlackList key={ZiranrenBlackList} /> : null
                }
                <div className={styles.showdow}></div>
            </div>
        </div>);
    }
}

export default RedAndBlockList;