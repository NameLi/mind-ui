const default_data = {
  title: '自定义 Header-bar',
  bgcolor: '',
  bgImage: '',
  titleColor: '',
  titleAlign: '',
  backColor: '',
  back: true,
  loading: false
}

Page({
  data: {
    ...default_data
  },

  handleCuntomLoading() {
    this.setData({
      loading: !this.data.loading
    })
  },

  handleCustomBgcolor() {
    const colors = ['#f8a52d', '#ff9902', '#a570f3', '#479eff', '#9ACD32', '#EE7942', '#EE7942']
    this.setData({
      bgcolor: colors[Math.floor(Math.random() * 7)]
    })
  },

  handleCustomBgcolorGradients() {
    this.setData({
      bgcolor: 'linear-gradient(45deg, #9000ff , #5e00ff)'
    })
  },

  handleCustomBgImage() {
    this.setData({
      bgImage: 'https://note-file.ixook.com/FiDc9WTfG9DwiFrbYRl6E6ljShqF'
    })
  },

  handleCustomTitleColor() {
    this.setData({
      titleColor: '#fff'
    })
  },

  handleCustomTitleAlign() {
    this.setData({
      titleAlign: this.data.titleAlign === '' ? 'center' : ''
    })
  },

  handleCustomBackColor() {
    this.setData({
      backColor: '#fff'
    })
  },

  handleCustomBack() {
    this.setData({
      back: !this.data.back
    })
  },


  handleCuntomTitle() {
    this.setData({
      title: ''
    })
  },


  // 重置
  handleReset() {
    this.setData({
      ...default_data
    })
  }
})