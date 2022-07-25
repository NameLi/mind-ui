Page({
  data: {
    scrollTop: 0,
    canUseCssSticky: false
  },

  onChange({ detail }) {
    console.log(detail)
  },

  canUseCssSticky({ detail }) {
    this.setData({
      canUseCssSticky: detail
    })
  },

  //页面滚动执行方式
  onPageScroll({ scrollTop }) {
    if (this.data.canUseCssSticky) return

    this.setData({
      scrollTop
    })
  }
});