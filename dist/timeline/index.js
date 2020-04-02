Component({
  relations: {
    '../timeline-item/index': {
      type: 'descendant',

      linked() {
        this._updateChildren()
      },

      linkChanged() {
        this._updateDataChange();
      },

      unlinked() {
        this._updateChildren()
      }
    }
  },

  data: {
    timer: null
  },

  methods: {
    _updateChildren() {

      // 防抖减少重复触发
      if (this.data.timer) {
        clearTimeout(this.data.timer)
        this.data.timer = null
      }

      this.data.timer = setTimeout(() => {
        let children = this.getRelationNodes('../timeline-item/index')
        const len = children.length

        if (len > 0) {
          let lastIndex = len - 1

          children.forEach((child, index) => {
            console.log(index === lastIndex)
            child.setData({
              isLast: index === lastIndex
            })
          })
        }
      }, 60)
    }
  }
})