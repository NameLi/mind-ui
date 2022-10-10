Component({
  externalClasses: ['custom-class'],

  options: {
    addGlobalClass: true,
  },

  properties: {
    height: {
      type: String,
      value: '100vh'
    }
  },

  relations: {
    '../index-item/index': {
      type: 'child',
      linked() {
        this._updateChildren()
      },
      linkChanged() {
        this._updateChildren()
      },
      unlinked() {
        this._updateChildren()
      }
    }
  },

  data: {
    scrollTop: 0,       // 滚动距离
    indexData: [],      // 索引数据
    startTop: 0,        // 索引距离顶部距离
    indexHeight: 0,     // 索引每格高度
    currentIndex: 0,    // 当前项索引
    currentName: '',    // 当前项名称
    children: [],       // 当前所有子组件集合
    childLength: 0,     // 子组件个数
    isTouches: false,
  },

  methods: {

    _updateChildren() {

      // 防抖减少重复触发
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }

      this.timer = setTimeout(() => {

        const children = this.getRelationNodes('../index-item/index')
        const len = children.length

        this.data.children = children
        this.data.childLength = len

        if (len > 0) {

          let indexData = []

          children.forEach((child, index) => {
            if (child.data.name && indexData.indexOf(child.data.name) === -1) {
              indexData.push(child.data.name)
              child.updateDataChange()
            }
          })

          this.setData({
            indexData
          })

          //组件加载完成之后重新设置顶部高度
          this.setTouchStartVal();
        }
      }, 60)
    },


    // 滚动
    onScroll({ detail }) {
      const scrollTop = detail.scrollTop

      this.data.children.forEach((child, index) => {

        this.data.currentIndex = index

        let { top, height, currentName } = child.data

        let offset = top + height

        if (scrollTop < offset && scrollTop >= top) {

          this.setData({
            currentName
          })
        }
      })
    },

    triggerCallback(options) {
      this.triggerEvent('change', options)
    },

    onClick(ev) {
      const { index, current } = ev.currentTarget.dataset

      const currentChildData = this.data.children[index].data // 当前选中的 child 数据

      this.setData({
        scrollTop: currentChildData.top,
        currentName: currentChildData.currentName,
        isTouches: true
      })

      this.triggerCallback({
        index,
        current: currentChildData.currentName
      })
    },

    // 
    onTouchMove(ev) {
      const data = this.data
      const touches = ev.touches[0] || {}
      const pageY = touches.pageY

      let index = Math.floor((pageY - data.startTop) / data.indexHeight)

      if (index < 0 || index >= data.childLength) return

      let { name, top } = this.data.children[index].data

      if (this.data.currentName === name) return

      this.setData({
        isTouches: true,
        scrollTop: top,
        currentName: name
      })

      this.triggerCallback({
        index: index,
        current: name
      })
    },

    // 
    onTouchEnd() {
      this.setData({
        isTouches: false
      })
    },

    // 索引起始位置
    setTouchStartVal() {
      const className = '.m-index__fixed'
      const query = wx.createSelectorQuery().in(this)

      query.select(className).boundingClientRect((res) => {
        this.data.indexHeight = res.height / this.data.childLength
        this.data.startTop = res.top
      }).exec()
    }
  }
})