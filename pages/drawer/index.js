Page({
  data: {
    showLeft: false,
    showRight: false,
    showTop: false,
    showBottom: false,
    showCloseBottom: false,
  },

  // 左边抽屉
  toggleLeft() {
    this.setData({
      showLeft: !this.data.showLeft
    })
  },

  // 右边抽屉
  toggleRight() {
    this.setData({
      showRight: !this.data.showRight
    })
  },

  // 上边抽屉
  toggleTop() {
    this.setData({
      showTop: !this.data.showTop
    })
  },

  // 下边抽屉
  toggleBottom() {
    this.setData({
      showBottom: !this.data.showBottom
    })
  },

  // 点击蒙层不可关闭
  toggleMaskBottom() {
    this.setData({
      showCloseBottom: !this.data.showCloseBottom
    })
  }
});