import React, { Component } from 'react';
import AffairsStyle from '../Affairs.module.scss'
import ChartHeader from '../../../components/ChartHeader/ChartHeader';

const img = [
    {title: '居民医疗信息变更',num: 34},
    { title: '医疗报销', num: 2918 },
    { title: '城乡居民养老保险', num: 20 }
]
export default class extends Component {
    iconList = () => {
        return img.map((itemImg, itemIndex) => {
            return <div className={AffairsStyle.itemImg} key={itemIndex}>
                <div className={AffairsStyle[`elevenImg${itemIndex+1}`]}></div>
                <div className={AffairsStyle.iconText}>{itemImg.title}</div>
                <div className={AffairsStyle.iconNum}>{itemImg.num}</div>
            </div>
        })
    }
    render() {
        return <>
            <ChartHeader title='人社局' />
            <div className={AffairsStyle.content}>
                <div className={AffairsStyle.iconWrapper}>
                    {this.iconList()}
                </div>

            </div>
        </>
    }
}