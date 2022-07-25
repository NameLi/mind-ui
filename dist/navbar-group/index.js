Component({
  externalClasses: ['custom-class'],

  relations: {
    '../navbar/index': {
      type: 'child',
      linked() {
        this._updateChildren()
      },
      unlinked() {
        this._updateChildren()
      }
    }
  },

  properties: {
    activeName: {
      type: [Number, String],
      value: ''
    },

    activeColor: {
      type: String,
      value: ''
    },

    lineWidth: {
      type: [Number, String],
      value: 0
    },

    lineColor: {
      type: String,
      value: ''
    },

    lineHeight: {
      type: Number,
      value: 6
    }
  },

  data: {
    baseLeft: 0,
    scrollLeft: 0,
    lineLeft: 0,
    activeLineWidth: 0,
    tabWidth: 0,
    timer: null,
  },

  methods: {
    _updateChildren() {
      // 防抖减少重复触发
      if (this.data.timer) {
        clearTimeout(this.data.timer)
        this.data.timer = null
      }

      this.data.timer = setTimeout(() => {

        let children = this.getRelationNodes('../navbar/index')
        this.children = children
        const len = children.length

        // 渲染完成后更新内容区域宽度
        if (len) {
          this._updateWrapInfo(children)
        }
      }, 60)
    },


    // 渲染完成后更新内容区域宽度
    _updateWrapInfo(children) {
      wx.nextTick(() => {
        const query = this.createSelectorQuery()
        query.select('.m-tabs__wrap').boundingClientRect()
        query.select('.m-tabs__scroll').scrollOffset()

        query.exec(res => {
          this.data.baseLeft = res[0].left

          const tabWidth = res[0].width     // 选项卡总宽度 
          this.data.tabWidth = tabWidth

          const { activeName } = this.data

          if (activeName) {
            children.forEach((child, index) => {
              if (child.data.name === activeName) {
                child.onClick()
              }
            })
          } else {
            children[0].onClick()
          }

        })
      })
    },


    updateScrollPositon(left, domWidth, lineWidth, name) {

      // 设置选中标签的字体颜色
      const { activeColor } = this.data

      if (activeColor) {
        this.children.forEach((child, index) => {
          let color = child.data.name === name ? activeColor : ''
          child.setData({
            activeColor: color
          })
        })
      }


      const scrollLeft = left - this.data.tabWidth / 2 + domWidth / 2

      const custonLineWidth = Math.floor(parseInt(this.data.lineWidth) * (this.data.tabWidth / 750))

      const activeLineWidth = custonLineWidth ? custonLineWidth <= domWidth ? custonLineWidth : domWidth : lineWidth

      const lineLeft = left + domWidth / 2 - activeLineWidth / 2

      this.setData({
        scrollLeft,
        lineLeft,
        activeLineWidth
      }, () => {
        this.triggerEvent('change', name)
      })
    }
  }
})
