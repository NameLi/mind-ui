Page({
  data: {
    checkbox: true,
    result: ['a', 'b'],
    result2: []
  },

  onChange({detail}) {
    this.setData({
      checkbox: detail
    })
  },

  onGroupChange({ detail }) {
    this.setData({ 
      result: detail 
    })
  },

  onGroupChange2({ detail }) {
    this.setData({
      result2: detail
    })
  }
})