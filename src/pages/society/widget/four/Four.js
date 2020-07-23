import React, { Component } from "react"
import FourStyle from './Four.module.scss'
import ChartHeader from "components/ChartHeader/ChartHeader"
import ReactEcharts from 'echarts-for-react';
const top = [
    {
        name: "养老机构数",
        num: 23,
        color: 'rgba(239,168,8,1)'
    },
    {
        name: "床位总数",
        num: 1115,
        color: 'rgba(45,153,137,1)'
    },
]
const list = [
    { value: 12.83, name: '城镇居民养老\n保险参保人数' },
    { value: 57.73, name: '城乡居民养老\n保险参保人数' }
]
class Four extends Component {
    iconList = () => {
        return top.map((itemImg, itemIndex) => {
            return <div className={FourStyle.itemImg} key={itemIndex}>
                <div className={FourStyle[`fourImg${itemIndex + 1}`]}></div>
                <span className={FourStyle.name}>{itemImg.name}</span>
                <span className={FourStyle.num}>{itemImg.num}</span>
            </div>
        })
    }
    // getOption(list) {
    //     return {
    //         grid: {
    //             top: '120%'
    //         },
    //         series: [
    //             {
    //                 name: '',
    //                 type: 'pie',
    //                 radius: '80%',
    //                 center: ['50%', '50%'],
    //                 color: ['#08E3F8', '#FFC647',],
    //                 roseType: 'radius',
    //                 data: list,
    //                 label: {
    //                     position: 'outside',
    //                     normal: {
    //                         show: true,
    //                         color: '#ddd',
    //                         formatter: function (params) {
    //                             if (params.name !== '') {
    //                                 return '{a| ' + params.name + '} \n' + '{b| ' + params.data.num + '}';
    //                             } else {
    //                                 return '';
    //                             }
    //                         },
    //                         rich: {
    //                             b: {
    //                                 fontSize: 20,
    //                                 fontWeight: 500,
    //                                 lineHeight: 28

    //                             },
    //                             a: {
    //                                 fontSize: 12,
    //                                 fontWeight: 400,
    //                                 lineHeight: 17
    //                             }
    //                         }
    //                     }
    //                 },
    //             }
    //         ]
    //     }
    // }
    getOption(list) {
        return {
            series: [
                {
                    name: '',
                    type: 'pie',
                    hoverAnimation: false,
                    radius: '70%',
                    center: ['50%', '65%'],
                    color: ['#08E3F8', '#FFC647',],
                    roseType: 'radius',
                    data: list,
                    label: {
                        normal: {
                            show: true,
                            position: 'outer',
                            color: '#ddd',
                            formatter: function (params) {
                                if (params.name !== '') {
                                    return '{a| ' + params.name + '} \n' + '{b| ' + params.data.value + '万' + '}';
                                } else {
                                    return '';
                                }
                            },
                            rich: {
                                b: {
                                    fontSize: 20,
                                    fontWeight: 500,
                                    lineHeight: 28

                                },
                                a: {
                                    fontSize: 12,
                                    fontWeight: 400,
                                    lineHeight: 17
                                }
                            }
                        },
                    },
                },
                {
                    name: '',
                    type: 'pie',
                    hoverAnimation: false,
                    radius: '70%',
                    center: ['50%', '65%'],
                    roseType: 'radius',
                    data: list,
                    label: {
                        normal: {
                            show: true,
                            position: 'inner',
                            color: '#ddd',
                            formatter: function (params) {
                                var percent = 0;
                                var total = 0;
                                for (var i = 0; i < list.length; i++) {
                                    total += list[i].value;
                                }
                                percent = ((params.value / total) * 100).toFixed(0);
                                if (params.name !== '') {
                                    return percent + '%';
                                } else {
                                    return '';
                                }
                            },
                            rich: {
                                a: {
                                    fontSize: 14,
                                    fontFamily: 'PingFangSC- Regular, PingFang SC',
                                    fontWeight: 400,
                                    color: 'rgba(255, 255, 255, 1)',
                                    lineHeight: 20,

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
                            <span className={FourStyle.num}>70.56万</span>
                        </div>
                        < ReactEcharts style={{ height: '100%' }} option={this.getOption(list)} />
                    </div>
                </div>
            </div>

        )
    }

}

export default Four;
