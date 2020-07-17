import React, { Component } from 'react'
import FooterStyle from './Footer.module.scss'
import { Layout, } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
const { Footer } = Layout;

class FooterBottom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
        }
        this.setCurrentIndex = this.setCurrentIndex.bind(this)
        this.jumpTo = this.jumpTo.bind(this);
    }
    setCurrentIndex(event) {
        this.setState({
            currentIndex: parseInt(event.currentTarget.getAttribute('index'), 10)
        })
    }
    jumpTo = (menu) => {
        window.open(menu.path);
        // if (menu.type === "inner") {
        //     window.open(menu.path);
        //     // this.props.history.push(menu.path);
        // } else {
        //     window.open(menu.path, '_blank');
        // }
    }
    render() {
        let footerData = window.menubar;
        let itemList = [];
        for (let i = 0; i < footerData.length; i++) {
            itemList.push(<li key={i}
                index={i} onClick={this.setCurrentIndex}
            ><span className={FooterStyle.FooterList} className={this.state.currentIndex === i ? `${FooterStyle.FooterActive} ${FooterStyle.FooterList}` : FooterStyle.FooterList} onClick={() => this.jumpTo(footerData[i])}>{footerData[i].name}</span>   <span className={FooterStyle.FooterVerLine}></span></li>);
        }
        return (<Footer className={FooterStyle.FooterPage}>
            <ul className={FooterStyle.FooterListBox}>
                {itemList}
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
// export default FooterBottom;
export default connect(mapStateToProps, mapDispatchToProps)(FooterBottom);