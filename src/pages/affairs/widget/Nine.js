import React, { Component } from 'react';
import AffairsStyle from '../Affairs.module.scss'
import ChartHeader from '../../../components/ChartHeader/ChartHeader';
import { Col, Row } from 'antd';

const img = [
    ['/img/affairs/invoice.png', '申报个人普票代开', '34'],
    ['/img/affairs/social.png', '社保征收', '10'],
    ['/img/affairs/tax.png', '新房契税征收', '2121']
]
export default class extends Component {
    iconList = () => {
        return img.map((itemImg, itemIndex) => {
            return <Col span={8} key={itemIndex}>

                {itemImg.map((item, index) => {
                    if (item.lastIndexOf('.') !== -1) {
                        return <div key={index}>
                            <img className={AffairsStyle.imgItem} src={item} />
                        </div>
                    } else {
                        if (isNaN(item)) {
                            return <div className={AffairsStyle.iconText}>{item}</div>
                        } else {
                            return <div className={AffairsStyle.iconNum}>{item}</div>
                        }

                    }

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