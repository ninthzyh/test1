import React, { Component } from 'react';
import AffairsStyle from '../Affairs.module.scss'
import ChartHeader from '../../../components/ChartHeader/ChartHeader';
import { Col, Row } from 'antd';

const img = [
    ['/img/affairs/statistic.png','1'], ['/img/affairs/marry.png','1'], ['/img/affairs/divorce.png','1']
]
export default class extends Component {
    iconList = () => {
        return img.map((itemImg, itemIndex) => {
            return <Col span={8} key={itemIndex}>
            {console.log(itemImg)}
                {itemImg.map((item, index) => {
                    return <div key={index}>
                        <img src={item} />
                        <div></div>
                    </div>
                })}
            </Col>
        })
    }
    render() {
        return <>
            <ChartHeader title='民政局' />
            <div className={AffairsStyle.content}>
                <div className={AffairsStyle.iconWrapper}>
                    <Row>
                        {this.iconList()}
                    </Row>
                </div>

            </div>
        </>
    }
}