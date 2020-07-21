import React from "react";
import VisitorStyle from './Visitor.module.scss';
export default () => {
    const data = [{
        title: '今日服务总人次：',
        count: '2,234'
    },{
        title: '近一个月服务总人次：',
        count: '2,234'
    },{
        title: '近一年服务总人次：',
        count: '2,234'
    },{
        title: '历史至今累计服务总人次：',
        count: '2,234'
    },];
    return <div className={VisitorStyle.visitor}>
        {data.map((item, index)=><div key={index}><span>{item.title}</span><span className={VisitorStyle.number}>{item.count}</span></div>)}
    </div>;
}