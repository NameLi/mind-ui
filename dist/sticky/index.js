Component({
  externalClasses: ['custom-class'],

  options: {
    addGlobalClass: true,
  },

  relations: {
    '../sticky-item/index': {
      type: 'child',
      linked() {
        this._updateChildren();
      },
      linkChanged() {
        this._updateChildren();
      },
      unlinked() {
        this._updateChildren();
      }
    }
  },

  properties: {
    useSticky: {
      type: Boolean,
      value: false
    },

    // 吸顶时与顶部的距离
    offsetTop: {
      type: Number,
      optionalTypes: [Number, String],
      value: 0,
      observer(val) {
        this._updateAbsOffsetTop(val)
      }
    },

    // 滚动距离顶部距离
    scrollTop: {
      type: Number,
      value: 0,
      observer(val) {
        this._updateScrollTopChange();
      }
    },

    // 层叠
    zIndex: {
      type: Number,
      value: 9
    }
  },

  data: {
    itemLength: 0,
    children: [],
    childLength: 0,
    absOffsetTop: 0
  },

  methods: {

    // 换算距离顶部高度为 px
    _updateAbsOffsetTop(val) {

      if (!parseInt(val)) return

      let absOffsetTop = 0

      if(val.includes('rpx') || !val.includes('px')) {

        const winWidth = wx.getSystemInfoSync().windowWidth()
        absOffsetTop = parseInt(val) / windowWidth

      } else if (val.includes('px')) {
        absOffsetTop = parseInt(val)
      } else {
        absOffsetTop = 0
      }
      
      this.data.absOffsetTop = absOffsetTop
    },

    // 页面滚动
    _updateScrollTopChange() {
      if (this.data.useSticky) return

      if (this.data.childLength) {
        this.data.children.forEach(child => {
          child.updateScrollTopChange(this.data.scrollTop)
        })
      }
    },

    // 更新子组件数据
    _updateChildren() {
      if (this.data.useSticky) return


      // 防抖减少重复触发
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }

      this.timer = setTimeout(() => {
        const { zIndex } = this.data

        const children = this.getRelationNodes('../sticky-item/index')
        const len = children.length

        this.data.children = children
        this.data.childLength = len

        if (len > 0) {
          children.forEach((child, index) => {
            child.updateRect(zIndex, index)
          })
        }
      }, 60)
    }
  }
})