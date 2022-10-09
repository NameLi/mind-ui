Component({
  externalClasses: ['custom-class'],

  options: {
    addGlobalClass: true,
    multipleSlots: true
  },

  relations: {
    '../sticky/index': {
      type: 'parent',
      linked(parent) {
        this.parent = parent
        this.setData({
          offsetTop: parent.data.absOffsetTop
        })
      },
      unlinked() {
        this.parent = null
      }
    }
  },

  properties: {
    name: {
      type: String,
      value: ''
    }
  },

  data: {
    headerH: 0,
    top: 0,
    height: 0,
    isFixed: false,
    zIndex: 9,
  },

  methods: {
    // 页面滚动判断组件距离顶部距离是否改吸顶
    updateScrollTopChange(scrollTop) {
      const { top, height, name, offsetTop } = this.data

      let isFixed = scrollTop + offsetTop >= top && scrollTop < top + height

      if (this.data.isFixed !== isFixed) {

        if (isFixed && name) {
          this.parent.triggerEvent('change', name)
        }

        this.setData({
          isFixed
        })
      }
    },

    // 更新元素高度
    updateRect(zIndex, index) {
      this.getHeaderHeight()

      const className = '.m-sticky-item';

      setTimeout(() => {
        const query = wx.createSelectorQuery().in(this);

        query.select(className).boundingClientRect(rect => {

          const { top, height } = rect

          this.data.top = top
          this.data.height = height
          this.setData({
            zIndex
          })

        }).exec()
      }, 0)
    },

    getHeaderHeight() {
      const className = '.m-sticky-item__header'

      const query = wx.createSelectorQuery().in(this)

      query.select(className).boundingClientRect(rect => {
        this.setData({
          headerH: rect.height
        })
      }).exec()
    }
  }
})