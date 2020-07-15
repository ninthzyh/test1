import React, { Component } from 'react';
import echarts from 'echarts';
import style from './Eleven.module.scss';
import ChartHeader from '../../../../components/ChartHeader/ChartHeader';

export default class Eleven extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    render() {
        return (
            <div className={style.humanSocialBureau}>
                 <ChartHeader title='人社局' />
                <div className={style.content}></div>
            </div>);
    }
}
