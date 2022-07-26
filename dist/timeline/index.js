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

  methods: {
    _updateChildren() {

      // 防抖减少重复触发
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }

      this.timer = setTimeout(() => {
        let children = this.getRelationNodes('../timeline-item/index')
        const len = children.length

        if (len > 0) {
          let lastIndex = len - 1

          children.forEach((child, index) => {
            child.setData({
              isLast: index === lastIndex
            })
          })
        }
      }, 60)
    }
  }
})