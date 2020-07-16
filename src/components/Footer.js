import React, { Component } from 'react'
import FooterStyle from './Footer.module.scss'
import { Layout, } from 'antd';
import { connect } from 'react-redux';
const { Footer } = Layout;

class FooterBottom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
        }
        this.setCurrentIndex = this.setCurrentIndex.bind(this)
    }
    setCurrentIndex(event) {
        this.setState({
            currentIndex: parseInt(event.currentTarget.getAttribute('index'), 10)
        })
    }
    render() {
        let footerData = ['疫情防控', '疫情防控', '疫情防控', '疫情防控', '疫情防控', '疫情防控', '疫情防控', '疫情防控', '疫情防控', '疫情防控','疫情防控', '区块链'];
        let itemList = [];
        for(let i = 0; i < footerData.length; i++) {
        itemList.push(<li key={i}
                index={i} onClick={this.setCurrentIndex}
                ><span className={FooterStyle.FooterList} className={this.state.currentIndex === i ? `${FooterStyle.FooterActive} ${FooterStyle.FooterList}` : FooterStyle.FooterList}>{footerData[i]}</span>   <span className={FooterStyle.FooterVerLine}></span></li>);
        }
        // return <ul className="category">{itemList}</ul>
        return (<Footer className={FooterStyle.FooterPage}>
            <ul className={FooterStyle.FooterListBox}>
                {itemList}
                {/* {this.state.data.map((val,key) => {
                    return (<li key={key}>{val}<span className={FooterStyle.FooterVerLine}></span></li>)
                })} */}
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