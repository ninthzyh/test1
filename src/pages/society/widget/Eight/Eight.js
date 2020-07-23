import React from 'react';
import EightStyle from './Eight.module.scss';
import ChartHeader from 'components/ChartHeader/ChartHeader';

export default  class Eight extends React.Component {
    data=[{
        title:'发放城镇居民最低生活保障金',
        value: 928.78,
        unit: '万元'
    },{
        title:'城镇享受最低生活保障人数',
        value: 0.253,
        unit: '万人'
    },{
        title:'发放农村最低生活保障金',
        value: 7623.12,
        unit: '万元'
    },{
        title:'农村享受最低保障人数',
        value: 3.7,
        unit: '万人'
    },{
        title:'发放城乡医疗救助资金',
        value: 3583.34,
        unit: '万元'
    },{
        title:'救助人次',
        value: 10,
        unit: '万人'
    }
];

    render() {
        return (
            <div className={EightStyle.EightContainer}>
                <ChartHeader title='低保服务' />
                <div className={EightStyle.Eight}>
                {
                    this.data.map((item,  index)=><div key={item.title} className={EightStyle.container}>
                        <div className={EightStyle.title}>{item.title}</div>
                        <div className={EightStyle.value}>{item.value}<span className={EightStyle.title1}>{item.unit}</span></div>
                    </div>)
                }
                </div>
            </div>);

    }
}
