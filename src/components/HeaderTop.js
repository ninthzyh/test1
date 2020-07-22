import React, { Component } from 'react'
import HeaderStyle from './Header.module.scss'
import { Layout, Menu, Icon, Modal } from 'antd';
import { connect } from 'react-redux';

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
            name: '濮阳县智慧城市运行监测子系统-城市管理',
        }
    }
    componentDidMount() {
        // console.dir(this.props.hasMenu)
        console.log(window.location.hash)
        if (window.location.hash == '#/index/traffic') {
            this.setState({
                name: '濮阳县智慧城市运行监测子系统-交通出行'
            })
        } else if (window.location.hash == '#/index/manager') {
            this.setState({
                name: '濮阳县智慧城市运行监测子系统-城市管理'
            })
        } else if (window.location.hash == '#/index/credit') {
            this.setState({
                name: '濮阳县智慧城市运行监测子系统-信用体系'
            })
        } else if (window.location.hash == '#/index/affairs') {
            this.setState({
                name: '濮阳县智慧城市运行监测子系统-政府服务'
            })
        } else if (window.location.hash == '#/index/emergency') {
            this.setState({
                name: '濮阳县智慧城市运行监测子系统-城市应急'
            })
        } else if (window.location.hash == '#/index/society') {
            this.setState({
                name: '濮阳县智慧城市运行监测子系统-社会民生'
            })
        } else {
            this.setState({
                name: '濮阳县智慧城市运行监测子系统-社会民生'
            })
        }

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
        return (
            <div className={HeaderStyle.HeaderPage}>
                <div className={HeaderStyle.centerBox} >
                    <div className={HeaderStyle.logoBox} ></div>
                    <div className={HeaderStyle.titleBox}>
                        <div className={HeaderStyle.title} >{this.state.name}</div>

                    </div>
                    <div className={HeaderStyle.rightBox} >
                        <span className={HeaderStyle.weatherpicBox}></span>
                        <span className={HeaderStyle.dateBox}>{this.state.date}</span>
                        <span className={HeaderStyle.weekBox}>{this.state.week}</span>
                        <span className={HeaderStyle.temperatureBox}>{window.weather.temperature}</span>
                        <span className={HeaderStyle.weatherBox}>{window.weather.weathername}</span>
                    </div>
                </div>
            </div>
        );
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