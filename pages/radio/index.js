Page({
  data: {
    radio: '选项1'
  },

  onChange({ detail }) {
    this.setData({
      radio: detail
    })
  }
})