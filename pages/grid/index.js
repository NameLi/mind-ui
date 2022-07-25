Page({
  data: {
    menus: [
      {
        icon: 'boy',
        text: '文字',
        iconColor: '#0181ff'
      }, {
        icon: 'love',
        text: '文字',
        dot: true,
        iconColor: '#EE5C42'
      }, {
        icon: 'girl',
        text: '文字',
        badgeValue: 100,
        iconColor: '#e54d42'
      }, {
        icon: 'star-fill',
        text: '跳转链接',
        url: '/pages/home/index',
        iconColor: '#f27a1d'
      }, {
        icon: 'star',
        text: '跳转链接',
        url: '/pages/home/index',
        iconColor: '#fcbe01'
      }
    ],
    columnCount: 3,
    borderSwitch: true,
    visible: false
  },

  handleSwitchModel() {
    this.setData({
      visible: !this.data.visible
    })
  },

  onClick(e) {
    const { name } = e.currentTarget.dataset
    this.setData({
      columnCount: name
    });
  },

  onColumnCountChange(e) {
    this.setData({
      columnCount: e.detail
    })
  },

  onBorderSwitchChange() {
    this.setData({
      borderSwitch: !this.data.borderSwitch
    })
  },

  onSwitchChange() {
    this.setData({
      switch: !this.data.switch
    })
  }
})