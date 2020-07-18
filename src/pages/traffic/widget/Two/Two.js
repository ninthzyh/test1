import React, { Component } from 'react';
import styles from './Two.module.scss';
import ChartHeader from '../../../../components/ChartHeader/ChartHeader';
import 'swiper/dist/css/swiper.min.css';
import Swiper from 'swiper';
import trafic from 'img/traffic/trafic@2x.png'
import car from 'img/traffic/car.jpg'
import car2 from 'img/traffic/car2.jpg'
import car3 from 'img/traffic/car3.jpg'
let that = null;
class TrafficAccident extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: '交通事故',
                    status: '未处理',
                    img: car,
                    positon: '富春山路十字',
                    date: '2020年9月23日',
                    time: '18:00:00',
                    event: '违规超速'
                },
                {
                    name: '交通事故',
                    status: '未处理',
                    img: car2,
                    positon: '富春山路十字',
                    date: '2020年9月23日',
                    time: '18:00:00',
                    event: '违规超速'
                },
                {
                    name: '交通事故',
                    status: '未处理',
                    img: car3,
                    positon: '富春山路十字',
                    date: '2020年9月23日',
                    time: '18:00:00',
                    event: '违规超速'
                }
            ]
        }
    }
    componentDidMount() {
        that = this;
        this.swiper = new Swiper('#banner', {
            watchSlidesProgress: true,
            centeredSlides: false, // 选中slide居中显示
            autoplay: {
                delay: 2000
            },
            loop: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 0,//滑动时旋转角度
                stretch: 100,//聚合宽度
                depth: 300,//景深
                modifier: 2,//覆盖叠加层数
                slideShadows: false//是否阴影
            },
            navigation: {

                nextEl: '.swiper-button-next',

                prevEl: '.swiper-button-prev',

            },
            on: {

                setTransition: function (transition) {

                    for (var i = 0; i < this.slides.length; i++) {

                        var slide = this.slides.eq(i)

                        slide.transition(transition);

                    }



                }

            }

        })
    }
    render() {
        let dom = this.state.data.map((item, index) => {
            return (
                <div key={index} className='swiper-slide' >
                    <div className={styles.container}>
                        <div className={styles.headerBox}>
                            <div className={styles.headerLeft}><span className={styles.iconImg}><img src={trafic} /></span><span>{item.name}</span></div>
                            <div className={styles.headerRight}>{item.status}</div>
                        </div>
                        <div className={styles.content}>
                            <div className={styles.imgBox}><img src={item.img} /></div>
                            <div className={styles.traficDes}>
                                <p>{item.positon}</p>
                                <p>{item.date}</p>
                                <p>{item.time}</p>
                                <p>{item.event}</p>
                            </div>
                        </div>
                        <div className={`${styles.imageborder} ${styles.imageborder1}`}></div>
                        <div className={`${styles.imageborder} ${styles.imageborder2}`}></div>
                        <div className={`${styles.imageborder} ${styles.imageborder3}`}></div>
                        <div className={`${styles.imageborder} ${styles.imageborder4}`}></div>
                    </div>
                </div>
            )
        })
        return (<div className={styles.TrafficAccidentPage}>
            <ChartHeader title='突发交通事件' />
            <div className='banner swiper-container' id="banner">
                <div className='swiper-wrapper wrap'>
                    {dom}
                </div>

                {/* <div className='page swiper-pagination'></div> */}

                <div className='btn'>

                    <div className={`swiper-button-prev ${styles.swiperBtn}`}></div>

                    <div className={`swiper-button-next ${styles.swiperBtn}`}></div>

                </div>

            </div>
        </div>);
    }
}

export default TrafficAccident;