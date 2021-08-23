/*
 * @Author: YangTao
 * @Date: 2021-08-23 19:01:39
 * @LastEditTime: 2021-08-23 19:10:10
 * @LastEditors: YangTao
 * @Description: 
 * @FilePath: \react-util-components\src\components\AnimatedImage\index.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
import React, { Component, Fragment } from 'react'

class AnimatedImage extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    currentIndex: 0,
    blobList: [],
    currentBlob: null,
    timer: 0,
    isPlay: true,
  }
  animationFrame = null
  componentDidMount() {
    this.setState({ blobList: new Array(this.props.images.length).fill(null) })
    this.loadBlob()
    this.animationFrame = window.requestAnimationFrame(this.renderFrame)
  }
  // componentWillUnmount() {
  //   // cancelAnimationFrame(this.animationFrame)
  // }
  componentWillUnmount() {
    cancelAnimationFrame(this.animationFrame)
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentIndex !== this.state.currentIndex) {
      this.loadBlob()
    }
  }
  // 刷新动画
  renderFrame = (timestamp) => {
    let { timer, currentIndex, isPlay } = this.state
    let { images, fpsInterval = 1000 / 12, loopInterval = 0 } = this.props

    if (isPlay) {
      let newIndex = (currentIndex + 1) % images.length
      if (newIndex === 0 && loopInterval) {
        // 最后一帧计算循环间隔
        if (timestamp - timer >= fpsInterval + loopInterval) {
          timer = timestamp
          this.setState({ currentIndex: newIndex, timer })
        }
      } else {
        if (timestamp - timer >= fpsInterval) {
          timer = timestamp
          this.setState({ currentIndex: newIndex, timer })
        }
      }
    }
    window.requestAnimationFrame(this.renderFrame)
  }
  // 使用blob加载图片
  loadBlob = () => {
    let { currentIndex, blobList } = this.state
    let { images } = this.props
    if (!blobList[currentIndex]) {
      // 远程加载并缓存blob
      fetch(images[currentIndex])
        .then((response) => {
          return response.blob()
        })
        .then((blob) => {
          let currentBlob = URL.createObjectURL(blob)
          blobList[currentIndex] = currentBlob
          this.setState({ blobList: [...blobList], currentBlob })
        })
    } else {
      this.setState({ currentBlob: blobList[currentIndex] })
    }
  }
  render() {
    let { className = null, style = null, onClick = null } = this.props
    let { currentBlob } = this.state
    return <img src={currentBlob} className={className} onClick={onClick} style={style} alt="" />
  }
}

export default AnimatedImage
