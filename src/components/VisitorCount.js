import React from "react";
import VisitorStyle from './Visitor.module.scss';
export default () => {
    const data = [{
        title: '今日服务总人次：',
        count: '56'
    },{
        title: '近一个月服务总人次：',
        count: '1,232'
    },{
        title: '近一年服务总人次：',
        count: '6,378'
    },{
        title: '历史至今累计服务总人次：',
        count: '9,954'
    },];
    return <div className={`animate__animated animate__backInDown ${VisitorStyle.visitor}`}>
        {data.map((item, index)=><div key={index}><span>{item.title}</span><span className={VisitorStyle.number}>{item.count}</span></div>)}
    </div>;
}