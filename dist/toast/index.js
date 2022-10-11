const defaults_data = {
  visible: false,
  show: false,
  mask: false,
  ghost: true,
  message: '',
  position: 'middle', //top middle bottom
  duration: 2000,
  image: '',
  icon: '',
  iconColor: '#fff',
  iconSize: 80,
  type: '',
  zIndex: -1
}

Component({
  externalClasses: ['custom-class'],

  options: {
    addGlobalClass: true,
  },

  data: {
    ...defaults_data,
    transformStyle: '',
  },

  ready() {
    const windowInfo = wx.getWindowInfo()
    const { screenHeight, windowHeight, statusBarHeight } = windowInfo;

    // 自定义导航栏
    if (screenHeight === windowHeight) {
      let customBarH = 44;
      let capsule = wx.getMenuButtonBoundingClientRect();

      if (capsule) {
        customBarH = capsule.bottom + capsule.top + 4 - statusBarHeight;
      }

      this.setData({
        transformStyle: `margin-top: ${customBarH + 'px'}`
      })
    }
  },

  methods: {
    open(options) {
      const {
        type = '',
        icon = '',
        image = '',
        duration = 2000,
        position = 'middle',
        mask = false,
        ghost = true,
        zIndex = 2001
      } = options

      this.setData({
        ...options,
        type,
        icon,
        image,
        mask,
        ghost,
        position,
        visible: true,
        zIndex
      }, () => {
        this.setData({
          show: true
        })
      })

      if (this.timer) clearTimeout(this.timer)

      if (duration) {
        this.timer = setTimeout(() => {
          this.close()
          this.timer = null
        }, duration)
      }
    },

    handleHide() {

    },

    close() {
      this.setData({
        ...defaults_data
      })
    }
  }
})