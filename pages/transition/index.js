Page({
  data: {
    isShow: false,
    animation: ""
  },

  animationTap(e) {
    const animation = e.target.dataset.type;
    this.setData({
      animation,
    }, () => [
      this.setData({
        isShow: true
      })
    ])

    setTimeout(() => {
      this.setData({
        isShow: false
      })
    }, 600)
  }
})