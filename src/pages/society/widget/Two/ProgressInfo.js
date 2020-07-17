import React, { Component } from 'react'
import { Progress, Row, Col } from 'antd'
import './overWriteProgress.scss'
import FourStyle from './Two.module.scss'
export default class ProgressInfo extends Component {
  render() {
    const { item } = this.props
    return (
      <Row className={FourStyle.progressInfo}>
        <Col span={3}>
          <div className={FourStyle.name}>{item.name}</div>
        </Col>
        <Col span={17}>
          <Progress
            className="progress"
            strokeColor={{
              '0%': '#596AFF',
              '100%': '#34F4EA',
            }}
            trailColor={'#34F4EA'}
            strokeWidth={6}
            percent={item.progress}
            showInfo={false}
          />
        </Col>
        <Col span={3} offset={1}>
          <div
            className={FourStyle.count}
            style={{ color: item.color.toLocaleString() }}
          >
            {item.count.toLocaleString()}
          </div>
        </Col>
      </Row>
    )
  }
}
