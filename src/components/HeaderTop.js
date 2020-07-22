import React, { Component } from 'react'
import HeaderStyle from './Header.module.scss'
import { connect } from 'react-redux';

class HeaderTop extends Component {
    constructor(props) {
        super(props);
        let today = new Date(),
            date = today.getFullYear() + '年' + (today.getMonth() + 1) + '月' + today.getDate() + '日',
            week = "星期" + ["日", "一", "二", "三", "四", "五", "六"][today.getDay()];
        this.state = {
            date: date,
            week: week,
            name: '濮阳县智慧城市运行监测子系统-城市管理',
        }
    }
    componentDidMount() {
        const titleMap = {
            '#/index/traffic': '濮阳县智慧城市运行监测子系统-交通出行',
            '#/index/manager': '濮阳县智慧城市运行监测子系统-城市管理',
            '#/index/credit': '濮阳县智慧城市运行监测子系统-信用体系',
            '#/index/affairs': '濮阳县智慧城市运行监测子系统-政府服务',
            '#/index/emergency': '濮阳县智慧城市运行监测子系统-城市应急',
            '#/index/society': '濮阳县智慧城市运行监测子系统-社会民生',
        };
        this.setState({
            name: titleMap[window.location.hash]
        })
    }

    render() {
        const { className } = this.props;
        return (
            <div className={`${HeaderStyle.HeaderPage} ${className}`}>
                <div className={HeaderStyle.centerBox} >
                    <div className={HeaderStyle.logoBox} />
                    <div className={HeaderStyle.titleBox}>
                        <div className={HeaderStyle.title} >{this.state.name}</div>

                    </div>
                    <div className={HeaderStyle.rightBox} >
                        <span className={HeaderStyle.weatherpicBox} />
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