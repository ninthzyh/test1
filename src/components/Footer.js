import React, { Component } from 'react'
import FooterStyle from './Footer.module.scss'
import { Layout, } from 'antd';
const { Footer } = Layout;

export default class FooterBottom extends Component {
    constructor(props) {
        super(props);
        this.footerData = window.menubar;
    }

    changeRouter = (path) => {
        const {history} = this.props;
        if(path.indexOf('http') !== -1){
            window.open(path);
            return;
        }
        history.push(path);
    };

    render() {
        const currentIndex = this.footerData.findIndex(item=>item.path.indexOf(this.props.history.location.pathname) !== -1) || 0;

        return (<Footer className={`${FooterStyle.FooterPage} ${this.props.className}`}>
            <ul className={FooterStyle.FooterListBox}>
                {
                    this.footerData.map((item,i)=><li key={i} className={currentIndex === i ? FooterStyle.active : {} }>
                        <span className={currentIndex === i ? `${FooterStyle.FooterActive}` : FooterStyle.FooterList} onClick={() => this.changeRouter(item.path)}>{item.name}</span>
                    </li>)
                }
            </ul>
            <span className={FooterStyle.logo}/>
        </Footer>);
    }
}