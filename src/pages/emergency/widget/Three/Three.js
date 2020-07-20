import React, { Component } from 'react'
import style from './Three.module.scss'
import ChartHeader from 'components/ChartHeader/ChartHeader'
import warningLight_big from 'img/emergency/warningLight_big.png'
import accident from 'img/emergency/accident.mp4'

export default class Three extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  Jitter = () => {
    let oImg = this.refs.img
    let pos = 0
    let arr = []
    let num = 0
    let timer = null
    let top = []
    for (let i = 0; i < 20; i++) {
      if (i < 10) {
        top.push(i * 4)
      } else {
        top.push(80 - i * 4)
      }
    }
    for (let i = 20; i > 0; i -= 2) {
      arr.push(i, -i)
    }
    top.push(0)
    arr.push(0)
    clearInterval(timer)

    timer = setInterval(() => {
      oImg.style.left = pos + arr[num] - top[num] / 2 + 'px'
      oImg.style.top = -10 - top[num] / 2 + 'px'
      oImg.style.width = 60 + top[num] + 'px'
      num++
      if (num === arr.length) {
        clearInterval(timer)
      }
    }, 60)
  }

  getvideoprogress = () => {
    setTimeout(() => {
      let vid = this.refs.videos
      let currentTime = vid.currentTime.toFixed(1)
      if (currentTime > 2.9 && currentTime < 3.2) {
        this.Jitter()
      }
      this.getvideoprogress()
    }, 200)
  }
  componentDidMount = () => {
    let theThis = this
    this.refs.videos.src = accident
    //this.getvideoprogress()
    this.refs.videos.addEventListener('play', function (e) {
      theThis.getvideoprogress()
    })
  }
  render() {
    const title = '交通事故'
    return (
      <div className={style.Three}>
        <ChartHeader title={title} />
        <div className={style.content}>
          <div className={style.imgbox}>
            <div>
              <img ref="img" src={warningLight_big} />
            </div>
          </div>
          <div className={style.videoBox}>
            <video
              id="video"
              ref="videos"
              src={accident}
              autoPlay="autoplay"
              loop="loop"
              muted="muted"
              height="100%"
              width="100%"
            ></video>
          </div>
        </div>
      </div>
    )
  }
}
