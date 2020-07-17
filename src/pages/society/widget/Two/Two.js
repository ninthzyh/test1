import React, { Component } from 'react'
import TwoStyle from './Two.module.scss'
import ChartHeader from 'components/ChartHeader/ChartHeader'
import ProgressInfo from './ProgressInfo'

class Two extends Component {
  constructor(props) {
    super(props)
    this.state = {
      companyList: [
        {
          name: '医疗',
          count: '21.2%',
          progress: 87,
          color: '#F45B5B',
        },
        {
          name: '住房',
          count: '16.4%',
          progress: 70,
          color: '#05DEFF',
        },
        {
          name: '出行',
          count: '12.5%',
          progress: 55,
          color: '#05DEFF',
        },
        {
          name: '服务',
          count: '10.5%',
          progress: 45,
          color: '#FFFFFF',
        },
        {
          name: '卫生',
          count: '9.3%',
          progress: 35,
          color: '#FFFFFF',
        },
      ],
    }
  }
  showCompatList() {
    return this.state.companyList.map((item, index) => {
      return <ProgressInfo item={item} key={index} />
    })
  }
  render() {
    const title = '民生关注话题Top5'
    return (
      <div className={TwoStyle.TwoContainer}>
        <ChartHeader title={title} />
        <div className={TwoStyle.itemBox}>{this.showCompatList()}</div>
      </div>
    )
  }
}

export default Two
