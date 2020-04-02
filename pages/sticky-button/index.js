Page({
  data: {
    isOpen: true
  },

  onChange() {
    this.setData({
      isOpen: !this.data.isOpen
    })
  }
  
})