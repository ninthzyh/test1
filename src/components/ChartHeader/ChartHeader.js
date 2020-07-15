import React, { Component } from 'react';
import ChartHeaderStyle from './ChartHeader.module.scss'

export default class extends Component {
    
    click = () => {
        if(!this.props.onClick) return;
        this.props.onClick();
    }

    render() {
        const {title} = this.props;
        return (
            <div className={ChartHeaderStyle.headerWrapper}>
                <div className={ChartHeaderStyle.titleWrapper}>
                    <div className={ChartHeaderStyle.icon}></div>
                    <div className={ChartHeaderStyle.title}>{title || '标题'}</div>
                </div>
                <div  className={ChartHeaderStyle.rightIconWrapper} onClick={this.click}>
                    <div className={ChartHeaderStyle.rightIcon}></div>
                </div>
            </div>

        )
    }
}