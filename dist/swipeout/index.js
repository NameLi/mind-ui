let Instances = []

Component({
  externalClasses: ['custom-class'],

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  data: {
    btnWidth: 0,
    preventTouch: false,
    isMoving: false,
    touchStart: {}, // 记录滑动起始位置，模拟tap使用
    startX: 0, // 滑动起始pageX
    offset: 0, // 移动距离
    bounceTime: .5, // 回弹动画默认时长，单位秒
    setStyle: '', // 设置滑动位置的样式
    buttonStyle: '', // 按钮滑动位置
  },

  lifetimes: {
    created() {
      Instances.push(this)
    },

    ready() {
      const query = this.createSelectorQuery()
      query.select('.m-swipeout__button-group').boundingClientRect()

      query.exec(res => {
        this.data.btnWidth = res[0].width

        const buttonStyle = `transform: translate3d(${this.data.btnWidth}px, 0, 0);`

        this.setData({
          buttonStyle
        })
      })
    },

    detached() {
      Instances = Instances.filter(item => item !== this)
    },
  },

  methods: {
    // 开启滑动菜单
    _openSwipe(sec = this.data.bounceTime) {
      this.swipeMove(-this.data.btnWidth, sec)
      this.triggerEvent('onSwipeEnd', true)
    },

    // 关闭滑动菜单
    _closeSwipe(sec = this.data.bounceTime) {
      this.swipeMove(0, sec)
      this.triggerEvent('onSwipeEnd', false)
    },

    close() {
      this._closeSwipe(0)
    },

    // 设置滑块位置
    swipeMove(offset = 0, sec = 0) {
      this.data.offset = offset

      const transform = `transform: translate3d(${offset}px, 0, 0);`
      const transition = this.data.isMoving ? '' : `transition: ${sec}s cubic-bezier(0.18, 0.89, 0.32, 1);`

      const setStyle = transform + transition

      const buttonStyle = `transform: translate3d(${this.data.btnWidth + offset}px, 0, 0);`

      this.setData({
        setStyle,
        buttonStyle
      })
    },

    touchEndSwipe(sec, ratio = 0.4) {
      const offset = this.data.offset
      const limitDis = this.data.btnWidth

      if (Math.abs(offset) > limitDis * ratio) {
        this._openSwipe(sec)

        this.triggerEvent('change', this)
        this.triggerEvent('open', this)

      } else {
        this._closeSwipe(sec)
        this.triggerEvent('close', this)
      }
    },


    // 拖动起始
    handleTouchstart(e) {
      if (!this.data.btnWidth) {
        const query = this.createSelectorQuery()
        query.select('.m-swipeout__button-group').boundingClientRect()

        query.exec(res => {
          const btnWidth = res[0].width
          this.data.btnWidth = btnWidth
        })
      }

      Instances.forEach(item => {
        if (item !== this) {
          if (item.data.offset !== 0) {
            item._closeSwipe()
            this.data.preventTouch = true
            return
          }
          item._closeSwipe()
        }
      })

      // 如果其它组件有打开，则阻止滑动
      if (this.data.isOpen && this.data.offset === 0) {
        this.data.preventTouch = true
        this.triggerEvent('onSwipeStart')
        return
      }

      this.data.isMoving = true
      this.data.startOffset = this.data.offset
      const touch = e.touches[0]
      this.data.touchStart = e // 记录起始点击信息，模拟点击事件
      this.data.startX = touch.pageX
    },

    // 拖动
    handleTouchmove(e) {

      if (this.data.preventTouch) return // 如果其它组件有打开，则阻止滑动

      const touch = e.touches[0]
      const direction = this.data.startX > touch.pageX ? 'left' : 'right'

      const moveDis = touch.pageX - this.data.startX
      const offset = this.data.startOffset + moveDis

      // 解决滑动不彻底导致位置瑕疵，
      // 例如：向右关闭滑动过快，offset 已超出范围，但实际未到达边缘时，重置位置
      if (direction === 'right' && offset > 0 && this.data.offset !== 0) {
        this._closeSwipe()
      } else if (direction === 'left' && Math.abs(offset) > this.data.btnWidth && offset !== -this.data.btnWidth) {
        this._openSwipe()
      }

      // 已展开或关闭状态，向滑动时重写起始位置的pageX值，以便向滑动时能立即响应滑动效果
      if (
        (direction === 'left' && Math.abs(this.data.startOffset) === this.data.btnWidth) ||
        (direction === 'right' && Math.abs(this.data.startOffset) === 0)
      ) {
        this.data.startX = touch.pageX
        return
      }

      // 向左滑动后又向右滑动，且超出范围时重写起始位置值，以便再向左滑动时能立即响应
      if (direction === 'left' && offset >= 0) {
        this.data.startX = touch.pageX
        return
      }

      if (offset > 0 || Math.abs(offset) > this.data.btnWidth) return

      this.swipeMove(offset)
    },

    // 拖动结束
    handleTouchend(e) {

      // 如果其它组件有打开，则阻止滑动
      if (this.data.preventTouch) {
        this.data.preventTouch = false
        return
      }

      this.data.isMoving = false

      const touch = e.touches[0] || e.changedTouches[0]

      const direction = this.data.startX > touch.pageX ? 'left' : 'right'

      // 模拟点击事件
      // 1.touchstart 时间与 touchend 时间间隔小于 200ms； 
      // 2.touchstart 位置与 touchend 相较不大于 5px； 
      // 如果为模拟点击事件且滑动关闭状态，向父组件传递 click 事件
      const start = this.data.touchStart
      const absX = Math.abs(start.touches[0].pageX - touch.pageX)
      const absY = Math.abs(start.touches[0].pageY - touch.pageY)
      const stamp = Math.abs(e.timeStamp - start.timeStamp)

      if (absX < 10 && absY < 10 && stamp <= 300) {
        if (this.data.offset === 0) {
          this.triggerEvent('click')
          this._closeSwipe(0)
        } else {
          this._closeSwipe()
        }
        return
      }

      // 设置回弹动画时长
      const bounceTime = this.data.bounceTime // 回弹动画默认时长
      let moveDistance = Math.abs(touch.pageX - this.data.startX) //  移动距离
      let bounceSec = parseInt(moveDistance / this.data.btnWidth * bounceTime) // 回弹动画时间，单位秒
      if (bounceSec > bounceTime / 2) bounceSec = bounceTime - bounceSec // 时长过半则取反
      bounceSec = bounceSec.toFixed(2)

      const ratio = direction == 'left' ? .4 : .6 // 划开时滑动过40%离开时就展开，关闭时右划超40%离开时关闭

      this.touchEndSwipe(bounceSec, ratio)
    }
  }
})