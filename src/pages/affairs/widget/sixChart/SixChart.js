import React, { Component } from 'react';
import SixChartStyle from './SixChart.module.scss';
import CustomImg from 'img/affairs/custom2.svg';
import ChartHeader from '../../../../components/ChartHeader/ChartHeader';

class SixChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className={SixChartStyle.sixMain}>
        <ChartHeader title='县长信箱' />
        <div className={SixChartStyle.title}>
          <span className={SixChartStyle.title1}>本年度(2020年) 已收到来信</span>
          <span className={SixChartStyle.title2}>36件</span>
          <span className={SixChartStyle.title3}>，已办理</span>
          <span className={SixChartStyle.title4}>31件</span>
        </div>
        <div className={SixChartStyle.bottem}>
          <div className={SixChartStyle.text}>
            <span><img className={SixChartStyle.imgItem} src={CustomImg} alt=""></img></span>
            <span className={SixChartStyle.bottemItem}>针对疫情期间幼儿园学费是否退费的感谢信</span>
          </div>
          <div className={SixChartStyle.text}>
            <span><img className={SixChartStyle.imgItem} src={CustomImg} alt=""></img></span>
            <span className={SixChartStyle.bottemItem}>关于濮阳县第五小学师生交通安全事宜</span>
          </div>
          <div className={SixChartStyle.text}>
            <img className={SixChartStyle.imgItem} src={CustomImg} alt=""></img>
            <span className={SixChartStyle.bottemItem}>濮阳县机关幼儿园搬迁</span>
          </div>
        </div>
      </div>
    );
  }
}

export default SixChart;