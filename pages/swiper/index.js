Page({
  data: {
    currentDot: 0,
    swiperList: [{
      id: 0,
      bgcolor: '#FF6A7E'
    }, {
      id: 1,
      bgcolor: '#57C6FF'
    }, {
      id: 2,
      bgcolor: '#FFAF48'
    }, {
      id: 3,
      bgcolor: '#FF7E5F'
    }, {
      id: 4,
      bgcolor: '#48E3C5'
    }]
  },

  // 设置轮播图当前所在滑块的 index
  swiperIdxHandle(e) {
    this.setData({
      currentDot: e.detail.current
    })
  },
})