import React, { Component } from "react"
import NineStyle from './Nine.module.scss'
import ChartHeader from "components/ChartHeader/ChartHeader"
import ReactEcharts from 'echarts-for-react';
class Nine extends Component {
    data=[{
        pic:require("img/society/nine1.png"),
        title:'新建、改扩建幼儿园数',
        num: 9,
        color:'rgba(244,234,42,1)'
    },{
        pic:require("img/society/nine2.png"),
        title:'新增学位数',
        num: 8000,
        color:'rgba(4,99,250,1)'
    },{
        pic:require("img/society/nine3.png"),
        title:'新增学校数',
        num: 17,
        color:'rgba(5,222,255,1)'
    }];

    render() {
        return (
            <div className={NineStyle.nineContainer}>
                <ChartHeader title='教育设施建设' />
                <div className={NineStyle.six}>
                    <div className={NineStyle.title}>近一年新增教育设施数量</div>
                {
                    this.data.map((item,  index)=><div key={item.title} className={NineStyle.container}>
                        <img src={item.pic} className={NineStyle.pic}/>
                        <div className={NineStyle.title}>{item.title}</div>
                        <div className={NineStyle.num} style={{ color: item.color }}>{item.num}</div>
                    </div>)
                }
                </div>

            </div>

        )
    }

}

export default Nine;