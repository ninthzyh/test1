import React, { Component } from "react"
import FourStyle from './Four.module.scss'
import ChartHeader from "components/ChartHeader/ChartHeader"
import ProgressInfo from './ProgressInfo'

class Four extends Component {
    constructor(props) {
        super(props)
        this.state = {
            companyList:[
                {
                    name:"企业总数",
                    count: 46386,
                    progress:87
                },
                {
                    name:"纳税A级企业数",
                    count: 36982,
                    progress:70
                },
                {
                    name:"保险公司网点数",
                    count: 4,
                    progress:10
                },
                {
                    name:"个体工商数",
                    count: 110,
                    progress:35
                },
                {
                    name:"银行网点数",
                    count: 45,
                    progress:17
                },
                {
                    name:"担保公司数",
                    count: 1,
                    progress:4
                },
                {
                    name:"高新技术认证企业",
                    count: 7,
                    progress:10
                }
            ]
        }
    }
    showCompatList(){
        return (
            this.state.companyList.map((item, index) => {
                return (
                    <ProgressInfo item={item} key={index}/>
                )
            })
            
        )
    }
    render() {
        const title = '智慧金融';
        return(
            <div className={FourStyle.fourContainer}>
                <ChartHeader title={title}/>
                <div className={FourStyle.itemBox}>
                    {this.showCompatList()}
                </div>
                
            </div>
        )
    }
}

export default Four;