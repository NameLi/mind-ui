Component({
  properties: {
    duration: {
      type: Number,
      value: 300
    },
    visible: {
      type: Boolean,
      value: false
    }
  },

  data: {
    contentHeight: 0,   // 内容区域高度
    isReady: false
  },

  observers: {
    visible(val) {
      if (val && this.data.isReady) {
        this.getContainerHeight()
      } else {
        this.setData({
          contentHeight: 0
        })
      }
    }
  },

  lifetimes: {
    ready() {
      this.data.isReady = true

      if (this.data.visible) {
        this.getContainerHeight()
      }
    }
  },

  methods: {
    getContainerHeight() {
      const query = this.createSelectorQuery()
      query.select('.m-collapse__content').boundingClientRect()

      query.exec(res => {
        const contentHeight = res[0].height

        this.setData({
          contentHeight
        })

      })
    },

    onTransitionEnd() {
      this.triggerEvent('on-change', this.data.visible)
    }
  }
});
