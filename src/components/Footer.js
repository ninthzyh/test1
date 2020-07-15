import React, { Component } from 'react'
import HeaderStyle from './Header.module.scss'
import { Layout, } from 'antd';
import { connect } from 'react-redux';
const { Footer } = Layout;

class FooterBottom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            route: props.route,

        }
    }

    render() {
        return <Footer className={HeaderStyle.header}>
                footer
        </Footer>
    }
}
const mapStateToProps = (state) => {
    return {
        tiger: state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
// export default HeaderTop;
export default connect(mapStateToProps, mapDispatchToProps)(FooterBottom);