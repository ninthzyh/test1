import React, { Component } from 'react'
import SocietyStyle from '../Society.module.scss';
import ChartHeader from '../../../components/ChartHeader/ChartHeader';
const top = [
  {
    pic: require("img/society/six1.png"),
    name: "游乐园",
    num: 5,
    unit: "个",
    color: 'rgba(83,240,217,1)'
  },
  {
    pic: require("img/society/six2.png"),
    name: "绿地面积",
    num: '60万',
    unit: "平方米",
    color: 'rgba(54,171,96,1)'
  },
]
const bottom = [
  {
    pic: require("img/society/six3.png"),
    name: "足球场",
    num: 8,
    unit: "个",
    color: 'rgba(126,207,78,1)'
  },
  {
    pic: require("img/society/six4.png"),
    name: "市民健身中心",
    num: 12,
    unit: "个",
    color: 'rgba(252,137,2,1)'
  },
]

export default class extends Component {
  iconList = () => {
    return top.map((itemImg, itemIndex) => {
      return <div className={SocietyStyle.itemImg} key={itemIndex} style={{ color: itemImg.color }}>
        <div>
          <img src={itemImg.pic} className={SocietyStyle.pic} />
          <div className={SocietyStyle.name}>{itemImg.name}</div>
        </div>
        <div className={SocietyStyle.num}>{itemImg.num}<span className={SocietyStyle.unit}>{itemImg.unit}</span></div>
      </div>
    })
  }
  iconList2 = () => {
    return bottom.map((itemImg, itemIndex) => {
      return <div className={SocietyStyle.itemImg} key={itemIndex} style={{ color: itemImg.color }}>
        <div>
          <img src={itemImg.pic} className={SocietyStyle.pic} />
          <div className={SocietyStyle.name}>{itemImg.name}</div>
        </div>
        <div className={SocietyStyle.num}>{itemImg.num}<span className={SocietyStyle.unit}>{itemImg.unit}</span></div>
      </div>
    })
  }

  render() {
    return (
      <div className={SocietyStyle.six}>
        <ChartHeader title="城市建设" />
        <div className={SocietyStyle.content} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <div className={SocietyStyle.text}>近一年新增城市建设数量</div>
          <div className={SocietyStyle.sixWrapper}>
            {this.iconList()}
          </div>
          <div className={SocietyStyle.sixWrapper}>
            {this.iconList2()}
          </div>
        </div>
      </div>
    )
  }
}
