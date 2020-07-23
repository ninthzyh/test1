import React, { Component } from "react"
import FourStyle from './Four.module.scss'
import ChartHeader from "components/ChartHeader/ChartHeader"
import ReactEcharts from 'echarts-for-react';
const top = [
    {
        // pic: require("img/society/house.png"),
        name: "养老机构数",
        num: 23,
        color: 'rgba(239,168,8,1)'
    },
    {
        // pic: require("img/society/bed.png"),
        name: "床位总数",
        num: '1115',
        color: 'rgba(45,153,137,1)'
    },
]
const list = [
    { value: 70, name: '城镇居民养老\n保险参保人数', num: '400万' },
    { value: 30, name: '城乡居民养老\n保险参保人数', num: '300万' }
]
class Four extends Component {
    iconList = () => {
        return top.map((itemImg, itemIndex) => {
            return <div className={FourStyle.itemImg} key={itemIndex}>

                {/* <img src={itemImg.pic} className={FourStyle.pic} /> */}
                <div className={FourStyle[`fourImg${itemIndex + 1}`]}></div>
                <span className={FourStyle.name}>{itemImg.name}</span>
                <span className={FourStyle.num}>{itemImg.num}</span>
            </div>
        })
    }
    getOption(list) {
        return {
            grid: {
                top: '100%'
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: '80%',
                    center: ['50%', '50%'],
                    color: ['#08E3F8', '#FFC647',],
                    roseType: 'radius',
                    data: list,
                    label: {
                        position: 'outside',
                        normal: {
                            show: true,
                            // position: 'outer',
                            color: '#ddd',
                            formatter: function (params) {
                                if (params.name !== '') {
                                    // return params.name 
                                    // return '{a|params.data.num}'
                                    // '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
                                    //return "{a|" + params.name + "}\n{b|" + params.data.num + "}"
                                    return '{a| ' + params.name + '} \n' + '{b| ' + params.data.num + '}';
                                } else {
                                    return '';
                                }
                            },
                            rich: {
                                b: {
                                    fontSize: 20,
                                    // fontFamily: 'PingFangSC-Medium,PingFang SC',
                                    // fontWeight: 500,
                                    lineHeight: 28

                                },
                                a: {
                                    fontSize: 12,
                                    // fontFamily: 'PingFangSC-Medium,PingFang SC',
                                    // fontWeight: 400,
                                    lineHeight: 17
                                }
                            }
                        }
                    },
                }
            ]
        }
    }

    render() {
        return (
            <div className={FourStyle.fourContainer}>
                <ChartHeader title='养老服务' />
                <div className={FourStyle.content}>
                    <div className={FourStyle.wrap}>
                        <div className={FourStyle.top}>
                            {this.iconList()}
                        </div>
                        <div className={FourStyle.middle}>
                            <span className={FourStyle.text}>居民养老保险参保人数</span>
                            <span className={FourStyle.num}>700万</span>
                        </div>
                        < ReactEcharts style={{ height: '100%', paddingTop: '10px' }} option={this.getOption(list)} />
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