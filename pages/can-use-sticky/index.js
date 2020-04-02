Page({
  data: {
    canUseCssSticky: false
  },

  canUseCssSticky({ detail }) {
    this.setData({
      canUseCssSticky: detail
    })
  }
})