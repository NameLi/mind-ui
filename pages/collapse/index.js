Page({
  data: {
    switch1: false,
    switch2: false,
    switch3: false,
  },

  onReady() {
    this.setData({
      switch1: true
    })
  },

  handleSwitch1(e) {
    this.setData({
      switch1: !this.data.switch1
    })
  },

  handleSwitch2(e) {
    this.setData({
      switch2: !this.data.switch2
    })
  },

  handleSwitch3(e) {
    this.setData({
      switch3: !this.data.switch3
    })
  },
})