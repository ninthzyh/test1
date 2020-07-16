import React, { Component } from 'react'
import FooterStyle from './Footer.module.scss'
import { Layout, } from 'antd';
import { connect } from 'react-redux';
const { Footer } = Layout;

class FooterBottom extends Component {
    constructor(props) {
        super(props);
        const data = ['疫情防控', '疫情防控', '疫情防控', '疫情防控', '疫情防控', '区块链'];
        this.state = {
            data: data,

        }
    }

    render() {
        return (<Footer className={FooterStyle.FooterPage}>
            <ul className={FooterStyle.FooterListBox}>
                {this.state.data.map((val,key) => {
                    return (<li key={key}>{val}{val !== '区块链'?<span className={FooterStyle.FooterVerLine}></span>:''}</li>)
                })}
            </ul>

        </Footer>);
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