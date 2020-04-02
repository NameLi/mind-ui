const app = getApp()

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  
  properties: {
    loading: {
      type: Boolean,
      value: false
    },

    // 背景色
    bgcolor: {
      type: String,
      default: ''
    },
    // 返回按钮与字体色
    backColor: {
      type: String,
      default: '#000'
    },
    // 标题文字色
    color: {
      type: String,
      default: '#000'
    },
    // 标题
    title: {
      type: String,
      default: ''
    },

    // 是否显示返回按钮
    back: {
      type: Boolean,
      default: false
    },

    delta: {
      type: Number,
      default: 1
    },

    // 是否显示返回按钮，默认跟随平台，ios居中对其，Android左对齐
    align: {
      type: String,
      default: 'center'
    },

    // 背景图片地址
    bgImage: {
      type: String,
      default: ''
    },
  },

  observers: {
    bgcolor(val) {
      if(val) {
        if (val.includes('gradient')) {
          this.setData({
            bgColorStyle: `background-image: ${val};`
          })
        } else {
          this.setData({
            bgColorStyle: `background-color: ${val};`
          })
        }
      } else {
        this.setData({
          bgColorStyle: ''
        })
      }
    },

    bgImage(val) {
      if (val) {
        this.setData({
          bgColorStyle: '',
          bgImageStyle: `background-image: url("${val}")`
        })
      } else {
        
        this.setData({
          bgImageStyle: ''
        })
      }
    },

    align(val) {
      if(val) {
        this.setData({
          titleAlignClass: val
        })
      } else {
        if (!this.data.align && app.globalData.isIOS) {
          this.setData({
            titleAlignClass: 'center'
          })
        } else {
          this.setData({
            titleAlignClass: ''
          })
        }
      }
    },

    color(val) {
      if(val) {
        this.setData({
          titleColorStyle: `color: ${val}`
        })
      } else {
        this.setData({
          titleColorStyle: ''
        })
      }
    }
  },
  
  data: {
    statusBarH: app.globalData.statusBarH,
    customBarH: app.globalData.customBarH,
    custom: app.globalData.customBar,
    titleAlignStyle: '',
    titleColorStyle: '',
    bgColorStyle: '',
    bgImageStyle: '',
  },

  attached() {
    if (!this.data.titleAlign && app.globalData.isIOS) {
      this.setData({
        titleAlignClass: 'center'
      })
    }
  },
  
  methods: {
    BackPage() {
      wx.navigateBack({
        delta: this.data.delta
      });
    }
  }
})