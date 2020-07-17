import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import HeaderStyle from './Header.module.scss'
import { Layout, Menu, Icon, Modal } from 'antd';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types'

class HeaderTop extends Component {
    constructor(props) {
        super(props);
        var today = new Date(),
            date = today.getFullYear() + '年' + (today.getMonth() + 1) + '月' + today.getDate() + '日',
            week = "星期" + ["日", "一", "二", "三", "四", "五", "六"][today.getDay()];
        this.state = {
            route: props.route,
            date: date,
            week: week,
        }
    }
    componentDidMount() {
        // console.dir(this.props.hasMenu)
    }
    confirm = () => {
        Modal.confirm({
            title: '确认退出登录？',
            content: '',
            okText: '确认',
            cancelText: '取消',
            onOk: this.hideModal,
            onCancel: this.showModal
        });
    }

    showModal = () => {
    };
    hideModal = () => {
        this.props.PayDecrease()
    };

    render() {
        const { PayIncrease, PayDecrease } = this.props;
        return (<div className={HeaderStyle.HeaderPage}>
            <div className={HeaderStyle.leftBox} ><span className={HeaderStyle.logoBox}></span></div>
            <div className={HeaderStyle.rightBox} >
                <span className={HeaderStyle.weatherpicBox}></span>
                <span className={HeaderStyle.dateBox}>{this.state.date}</span>
                <span className={HeaderStyle.weekBox}>{this.state.week}</span>
                <span className={HeaderStyle.temperatureBox}>{window.weather.temperature}</span>
                <span className={HeaderStyle.weatherBox}>{window.weather.weathername}</span>
            </div> 
            {<div className={HeaderStyle.headLine} ></div> }

        </div>);
    }
}
const mapStateToProps = (state) => {
    return {
        tiger: state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        PayIncrease: () => {
            dispatch({ type: "涨工资" })
        },
        PayDecrease: () => {
            dispatch({ type: "扣工资" })
        }
    }
}
// export default HeaderTop;
export default connect(mapStateToProps, mapDispatchToProps)(HeaderTop);