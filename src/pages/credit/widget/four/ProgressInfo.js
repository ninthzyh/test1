import React, { Component } from "react"
import { Progress, Row, Col } from 'antd'
import './overWriteProgress.scss'
import FourStyle from './Four.module.scss'
export default class ProgressInfo extends Component {
    render() {
        const { item } = this.props;
        return (
            <Row className={FourStyle.progressInfo}>
                <Col span={7} >
                    <div className={FourStyle.name}>{item.name}</div>
                </Col>
                <Col span={12} offset={1}>
                        <Progress
                            className='progress'
                            strokeColor={{
                                '0%': '#596AFF',
                                '100%': '#34F4EA',
                            }}
                            trailColor={
                                '#34F4EA'
                            }
                            strokeWidth={6}
                            percent={item.progress}
                            showInfo={false}
                        />

                </Col>
                <Col span={3} offset={1}>
                    <div className={FourStyle.count}>{item.count.toLocaleString()}</div>
                </Col>
            </Row>
        )
    }
}