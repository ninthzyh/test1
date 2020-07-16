import React, { Component } from 'react'
import {Progress} from 'antd';
 import ChartHeader from 'components/ChartHeader/ChartHeader';


export default class RowBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <>
                <ChartHeader title='服务人次年度趋势图' />
                <div>

                </div>
                <Progress></Progress>
                <Progress></Progress>
                <Progress></Progress>
            </>
        )
    }
}