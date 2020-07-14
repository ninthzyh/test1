import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import HeaderStyle from './Header.module.scss'
import { Layout, Menu, Icon, Avatar, Modal } from 'antd';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types'
const { Header } = Layout;
const { SubMenu } = Menu;

class HeaderTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            route: props.route,

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
        // const { PayIncrease, PayDecrease } = this.props;
        return <Header className={HeaderStyle.header}>
            <div className={HeaderStyle.title} ><NavLink to="/home"><span className={HeaderStyle.logoIcon + ' ' + HeaderStyle.logo}></span>濮阳市</NavLink></div>
            <Avatar className={HeaderStyle.avatar} style={{ backgroundColor: '#1890ff' }} icon="user" onClick={this.confirm} />

            {this.props.hasMenu ?
                <Menu
                    theme="dark"
                    mode="horizontal"
                    className={HeaderStyle.menu}
                    defaultSelectedKeys={['1']}
                    inlineIndent="30"
                    style={{ lineHeight: '64px' }}
                >
                    {/* <Menu.Item key="1"><NavLink to="/home/cesium/index"><span className={HeaderStyle.headerIcon + ' ' + HeaderStyle.home}></span>首页</NavLink></Menu.Item>                    */}
                    <Menu.Item key="2"><NavLink target="_blank" to="/index/manager">城市管理</NavLink></Menu.Item>
                    <Menu.Item key="3"><NavLink target="_blank" to="/index/traffic">交通出行</NavLink></Menu.Item>
                    <Menu.Item key="4"><NavLink target="_blank" to="/index/emergency">城市应急</NavLink></Menu.Item>
                    <Menu.Item key="2"><NavLink target="_blank" to="/index/credit">信用体系</NavLink></Menu.Item>
                    <Menu.Item key="3"><NavLink target="_blank" to="/index/affairs">后台管理</NavLink></Menu.Item>
                    <Menu.Item key="4"><NavLink target="_blank" to="/index/society">社会民生</NavLink></Menu.Item>
                </Menu> : null
            }
        </Header>
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