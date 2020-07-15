import React, { Component } from 'react'
import AffairsStyle from '../Affairs.module.scss'
import OneMap from '../mapController'
import Two from './Two'
import One from './One.js'
import Three from './serviceNumber/Three'
import Fives from './Fives.js'
import SixChart from './sixChart/SixChart';
import Four from './Four/Four.js'
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: 'one',
    }
  }
  render() {
    const { show } = this.state
    return (
      <div className={AffairsStyle.container}>
        <OneMap></OneMap>
        {show === 'one' ? (
          <div className={AffairsStyle.page}>
            <div className={AffairsStyle.wrapper}>
              <div className={AffairsStyle.item}>
                <One />
              </div>
              <div className={AffairsStyle.item}>
                <Two />
              </div>
              <div className={AffairsStyle.item}>
                <Three />
              </div>
            </div>
            <div className={AffairsStyle.wrapper}>
              <div className={AffairsStyle.itemRight}>
								<Four/>
							</div>
              <div className={AffairsStyle.itemRight}>
                <Fives />
              </div>
              <div className={AffairsStyle.itemRight}><SixChart/></div>
            </div>
          </div>
        ) : (
          <div className={AffairsStyle.page}>
            <div className={AffairsStyle.wrapper}>
              <div className={AffairsStyle.item}>
                <One />
              </div>
              <div className={AffairsStyle.item}>
                <Two />
              </div>
              <div className={AffairsStyle.item}>3</div>
            </div>
            <div className={AffairsStyle.wrapper}>
              <div className={AffairsStyle.itemRight}>1</div>
              <div className={AffairsStyle.itemRight}>2</div>
              <div className={AffairsStyle.itemRight}>3</div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Index
