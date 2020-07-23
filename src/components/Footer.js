import React, { Component } from 'react'
import FooterStyle from './Footer.module.scss'
import { Layout, } from 'antd';
const { Footer } = Layout;

export default class FooterBottom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
        };
        this.footerData = window.menubar;
    }

    componentDidMount() {
        const item = this.footerData.findIndex(item=>item.path.indexOf(this.props.history.location.pathname) !== -1);
        this.setState({
            currentIndex: item
        })
    }

    setCurrentIndex = (event) => {
        this.setState({
            currentIndex: parseInt(event.currentTarget.getAttribute('index'), 10)
        })
    };

    render() {
        return (<Footer className={`${FooterStyle.FooterPage} ${this.props.className}`}>
            <ul className={FooterStyle.FooterListBox}>
                {
                    this.footerData.map((item,i)=><li key={i} onClick={this.setCurrentIndex}>
                        <span className={this.state.currentIndex === i ? `${FooterStyle.FooterActive}` : FooterStyle.FooterList} onClick={() => window.open(item.path)}>{item.name}</span>
                    </li>)
                }
            </ul>
            <span className={FooterStyle.logo}/>
        </Footer>);
    }
}