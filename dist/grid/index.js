Component({
  relations: {
    '../grid-item/index': {
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
    height: {
      type: String,
      value: 'auto',
      observer: '_updateChildren'
    },

    columnCount: {
      type: Number,
      value: 4,
      observer: '_updateChildren'
    },

    border: {
      type: Boolean,
      value: false,
      observer: '_updateChildren'
    }
  },

  data: {
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

        let children = this.getRelationNodes('../grid-item/index')
        const len = children.length

        const width = `${100 / this.data.columnCount}%`;

        if (len > 0) {
          let lastIndex = len - 1

          children.forEach((child, index) => {
            child.setData({
              width,
              height: this.data.height,
              border: this.data.border
            })
          })
        }
      }, 60)
    }
  }
})
