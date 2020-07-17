import React, { Component } from "react"
import FourStyle from './Four.module.scss'
import ChartHeader from "components/ChartHeader/ChartHeader"
import ReactEcharts from 'echarts-for-react';
import 'echarts-liquidfill'
import {  Row, Col } from 'antd'
class Four extends Component {
    constructor(props) {
        super(props)
        this.state = {
            echartInfo: "检测 合格率76%",
            list:[
                {
                    name:"餐饮油烟巡查单位",
                    count:"34"
                },
                {
                    name:"餐饮油烟检测单位",
                    count:"12"
                },
            ]
        }
    }
    getOption(value) {
        return {
            series: [{
                type: 'liquidFill',
                radius: '100%',
                data: [0.5, 0.4],
                name: 'Liquid Fill',
                backgroundStyle: {
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [
                            {
                                offset: 0, color: 'transparent' // 0% 处的颜色
                            },
                            {
                                offset: 0.7, color: 'transparent' // 70% 处的颜色
                            },
                            {
                                offset: 1, color: 'rgba(244,119,27,0.3)' // 100% 处的颜色
                            }
                        ],
                        globalCoord: false // 缺省为 false
                    },
                   
                },
                label: {
                    position: ['50%', '37%'],
                    formatter: function() {
                        return '检测\n合格率76%';
                    },
                    fontSize: 13,
                    color: '#fff'
                },
                itemStyle: {
                    color: 'rgba(244,119,27,0.3)',
                    borderWidth: '1px',
                    borderColor: '#B16326'
                },
                outline: {
                        show: false
                    }
                }],
            tooltip: {
                show: true
            }
        };
    }
    getListItem(list) {
        return (
            list.map((item, index) => {
                return (
                    <Col className={FourStyle.listItem}  key={index}>
                        <div className={FourStyle.name}>{item.name}</div>
                        <div className={FourStyle.count}>{item.count}</div>
                        <div className={FourStyle.item}>家</div>
                    </Col>
                )
            })
            
        )
    }
    render() {
        return (
            <div className={FourStyle.fourContainer}>
            <ChartHeader title='餐饮油烟'/>
            <Row  align='middle' className={FourStyle.middleBox}>
                <Col span={14} >
                    <Row >
                        {this.getListItem(this.state.list)}
                    </Row>
                </Col>
                <Col span={9} offset={1}>
                <ReactEcharts class={FourStyle.echart} style={{width:'100%',height:'100%'}} option={this.getOption(this.state.echartInfo)} />
                <div className={FourStyle.box1}>
                    <div className={FourStyle.box2}>
                        <div className={FourStyle.box3}>
                        </div>
                    </div>
                </div>
                </Col>
            </Row>
                
            </div>

        )
    }

}

export default Four;