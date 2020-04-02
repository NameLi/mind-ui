import Modal from '../../dist/modal/modal'

Page({
  data: {
    checked: false,
    cardSwitch: false,
    borderSwitch: true,
    visible: false
  },


  handleSwitchModel() {
    this.setData({
      visible: !this.data.visible
    })
  },

  // 卡片式切换
  onCardSwitchChange() {
    this.setData({
      cardSwitch: !this.data.cardSwitch
    })
  },

  // 下边框切换
  onBorderSwitchChange() {
    this.setData({
      borderSwitch: !this.data.borderSwitch
    })
  },

  onSwitchChange() {
    this.setData({
      switch: !this.data.switch
    })
  },

  onClick(e) {
    console.log(e)
  }
})