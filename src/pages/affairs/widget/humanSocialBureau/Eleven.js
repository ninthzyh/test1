import React, { Component } from 'react';
import style from './Eleven.module.scss';
import ChartHeader from '../../../../components/ChartHeader/ChartHeader';

export default class Eleven extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className={style.humanSocialBureau}>
                <ChartHeader title='人社局' />
                <div className={style.content}>
                    <div className={style.frame}>
                        <img src="../img/affairs/eleven1.png" alt="1" className={style.pic} />
                        <div className={style.text}>居民医疗信息变更</div>
                        <div className={style.bottomText}>34</div>
                    </div>
                    <div className={style.frame}>
                        <img src="../img/affairs/eleven2.png" alt="2" className={style.pic} />
                        <div className={style.text}>医疗报销</div>
                        <div className={style.bottomText}>2918</div>
                    </div>
                    <div className={style.frame}>
                        <img src="../img/affairs/eleven3.png" alt="3" className={style.pic} />
                        <div className={style.text}>城乡居民养老保险</div>
                        <div className={style.bottomText}>20</div>
                    </div>
                </div>
            </div>
            );
    }
}
