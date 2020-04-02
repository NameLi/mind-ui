App({
  onLaunch: function () {

    // 获取设备信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.isIOS = e.system.includes('iOS')

        const statusBarH = e.statusBarHeight            // 状态栏高度 单位 px
        this.globalData.statusBarH = statusBarH

        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.customBar = capsule
          this.globalData.customBarH = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.customBarH = e.statusBarHeight + 44;
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    isIOS: false,
    
    customBarH: 70,
    statusBarH: 20,
    customBar: {}
  }
})