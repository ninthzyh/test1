import React from 'react';
import ManagerStyle from '../Manager.module.scss';
import ChartHeader from 'components/ChartHeader/ChartHeader';

class Manager extends React.Component {
    data=[{
        title:'网格员',
        people: 4,
        text: '13/17人',
        rate: 53
    },{
        title:'执法人员',
        people: 3,
        text: '10/21人',
        rate: 42
    },{
        title:'环卫人员',
        people: 5,
        text: '76/80人',
        rate: 76
    }];

    getPeople = (people, num) => [...new Array(6)].map((item,index)=>index<people? <img key={index} src={require(`img/manager/people${num+1}.png`)} alt=""/>:<img key={index} src={require(`img/manager/people${num+4}.png`)} alt=""/>);

    render() {
        return (
            <div className={ManagerStyle.sixContainer}>
                <ChartHeader title='服务人次年度趋势图' />
                <div className={ManagerStyle.six}>
                {
                    this.data.map((item,  index)=><div key={item.title} className={ManagerStyle.container}>
                        <div className={ManagerStyle.title}>{item.title}</div>
                        <div className={ManagerStyle.imgContainer}>{this.getPeople(item.people, index)}</div>
                        <div className={ManagerStyle.title}>{item.text}</div>
                        <div className={ManagerStyle.rate}>{item.rate}%</div>
                    </div>)
                }
                </div>
            </div>);

    }
}
export default Manager;