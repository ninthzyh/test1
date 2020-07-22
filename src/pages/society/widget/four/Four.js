import React, { Component } from "react"
import FourStyle from './Four.module.scss'
import ChartHeader from "components/ChartHeader/ChartHeader"
import ReactEcharts from 'echarts-for-react';
const top = [
    {
      pic: require("img/society/six1.png"),
      name: "养老机构数",
      num: 23,
      color: 'rgba(239,168,8,1)'
    },
    {
      pic: require("img/society/six2.png"),
      name: "床位总数",
      num: '1115',
      color: 'rgba(45,153,137,1)'
    },
  ]
const  list= [
    { value: 70, name: '城镇居民养老\n保险参保人数',num:'400万' },
    { value: 30, name: '城乡居民养老\n保险参保人数',num:'300万' }
]
class Four extends Component {
    iconList = () => {
        return top.map((itemImg, itemIndex) => {
          return <div className={FourStyle.itemImg} key={itemIndex}>
            <div>
                <img src={itemImg.pic} className={FourStyle.pic}/>
                <span className={FourStyle.name}>{itemImg.name}</span>
                <span className={FourStyle.num} style={{color:itemImg.color}}>{itemImg.num}</span></div>
          </div>
        })
      }
      getOption(list) {
        const dataArr = [];
        for(let i in list) {
            dataArr.push(list[i]);
        }
        return {
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: '80%',
                    center: ['50%', '70%'],
                    color: ['#08E3F8','#FFC647', ],
                    roseType: 'radius',
                    data: list,
                    textStyle:{
                        fontSize:'100px',
                        fontFamily:'PingFangSC-Regular,PingFang-SC',
                        fontWeight:400,
                        lineHeight:'17px',
                        formatter: function(params) {
                            // percent = ((params.value / total) * 100).toFixed(0);
                            if(params.name !== '') {
                                return '{a |+ {params.name} + a}'+'\n' + '{ b |' +params.num;
                            }else {
                                return '';
                            }
                        },



                    },
                    label: {
                        rich:{
                            a:{
                                color:'red',
                                fontSize:'20px',
                                fontFamily:'PingFangSC-Medium,PingFang SC',
                                fontWeight:500,
                                lineHeight:'28px'
                            },
                            b:{
                                fontSize:'12px',
                                fontFamily:'PingFangSC-Medium,PingFang SC',
                                fontWeight:400,
                                lineHeight:'17px'
                            }
                        }
                    
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    }

    render() {
        return (
            <div className={FourStyle.fourContainer}>
                <ChartHeader title='养老服务' />
                <div className={FourStyle.content}>
                    <div className={FourStyle.top}>
                        {this.iconList()}
                    </div>
                    <div className={FourStyle.middle}>
                        <span className={FourStyle.text}>居民养老保险参保人数</span>
                        <span className={FourStyle.num}>700万</span>
                    </div>
                    <div className={FourStyle.bottom}>
                        < ReactEcharts  style={{height: '100%' }} option={this.getOption(list)} />
                    </div>
                </div>
            </div>

        )
    }

}

export default Four;

//数字字体
// font-size:20px;
// font-family:PingFangSC-Medium,PingFang SC;
// font-weight:500;
// color:rgba(8,227,248,1);
// line-height:28px;
//文字字体
// font-size:12px;
// font-family:PingFangSC-Regular,PingFang SC;
// font-weight:400;
// color:rgba(8,227,248,1);
// line-height:17px;