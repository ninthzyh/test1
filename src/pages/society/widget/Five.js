import React, {Component} from 'react';
import ChartHeader from '../../../components/ChartHeader/ChartHeader';
import SocietyStyle from '../Society.module.scss';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
export default class extends Component{
    componentDidMount(){
        let chart = echarts.init(this.ID)
        chart.setOption(this.getOption())
    }
    getOption = () => {
        let option =   {
            tooltip: {
                trigger: 'axis',
            },
            grid: {
                bottom: '10%',
                top: '20%'
            },
            legend:{
                top:'5%',
                right: 0,
                data:[
                    {
                    name: '农村居民人均可支配增长率',
                    icon: 'line',
                    textStyle:{
                        color: '#fff',
                    }
                },
                {
                    name:'城镇居民人均可支配增长率',
                    icon: 'line',
                    textStyle:{
                        color: '#fff',
                    }
                },
                {
                    name: '农村居民可支配收入',
                    icon: 'bar',
                    textStyle:{
                        color: '#fff',
                    }
                },
                {
                    name:'城镇居民可支配收入',
                    icon: 'bar',
                    textStyle:{
                        color: '#fff',
                    }
                }],
            },
            xAxis: [{
                type: 'category',
                data: ['2018', '2019', '2020'],
                
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                         color: "rgba(255,255,255,1)",
                        type: "solid"
                    },
                },
                axisTick:{
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    show: true,
                    splitNumber: 15,
                    textStyle: {
                        color: "rgba(255,255,255,.5)",
                        fontSize: '12',
                    },
                },
            }],
            yAxis: [{
                nameTextStyle: {
                    color: '#4B8CD3'
                },
                type: 'value',
                axisLabel: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(255,255,255,.1	)",
                        width: 1,
                        type: "solid"
                    },
                },
                splitLine: {
                    show:false
                }
            }],
            series: [
            {
                name: '城镇居民可支配收入',
                type: 'bar',
                itemStyle: {
        
                                normal: {
                                    barBorderRadius: [10,10,0,0],
                                    color: new echarts.graphic.LinearGradient(
                                        0,  0, 0,1,
                                        [
                                            { offset: 0, color: 'rgba(255,207,51,1)' },
                                            { offset: 1, color: 'rgba(242,192,65,0.05)' }
        
                                        ]
                                    )
                                }
                            },
                            barMaxWidth: 20,
                            data: [150, 80, 70],
                },
                {
                name: '农村居民可支配收入',
                type: 'bar',
                itemStyle: {
                                normal: {
                                    barBorderRadius: [10,10,0,0],
                                    color: new echarts.graphic.LinearGradient(
                                        0,  0, 0,1,
                                        [
                                            { offset: 0, color: 'rgba(47,95,255,1)' },
                                            { offset: 1, color: 'rgba(0,38,255,0.28)' }
        
                                        ]
                                    )
                                },
                            },
                            barMaxWidth: 20,
                            data: [250, 180, 170],
                },
                
                {
                    name: '城镇居民人均可支配增长率',
                    type: 'line',
                    symbolSize: 10,
                     symbol: 'circle',
                    areaStyle: {
                        color: {
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(244,156,52,0.38)'
                            }, {
                                offset: 1, color: 'rgba(244,156,52, 0.12)' 
                            }],
                        }
                    },
                    lineStyle: {
                        color: '#F49C34',
                        width: window.lineWidth
                    },
                    itemStyle:{
                        color: '#F49C34',
                    },
                    data: [150, 80, 70],
                }
                , {
                    name: '农村居民人均可支配增长率',
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 10,
                    areaStyle: {
                        color: {
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(78,252,220,0.38)'
                            }, {
                                offset: 1, color: 'rgba(226,97,199,0.12)' 
                            }],
                        }
                    },
                    lineStyle: {
                        color: '#4EFCDC',
                        width: window.lineWidth
                    },
                    itemStyle:{
                        color: '#4EFCDC',
                    },
                    data: [250, 180, 170],
                }
            ]
        }
        return option
    }
    render(){
        return <>
        <ChartHeader />
        <div className={SocietyStyle.content}>
            <div ref={ID => this.ID = ID} style={{width: '100%', height: '100%'}}></div>
        </div>
        </>
    }
}