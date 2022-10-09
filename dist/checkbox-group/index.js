Component({
  options: {
    addGlobalClass: true,
  },

  relations: {
    '../checkbox/index': {
      type: 'descendant',
      linked() {
        this._updateChildren()
      },
      unlinked() {
        this._updateChildren()
      }
    }
  },

  properties: {
    max: Number,
    round: {
      type: Boolean,
      value: false
    },
    value: {
      type: Array,
      observer: '_updateChildren'
    },
    disabled: {
      type: Boolean,
      observer: '_updateChildren'
    },
    checkedColor: {
      type: String,
      value: ''
    },

    labelLeft: {
      type: Boolean,
      value: false
    },
  },

  methods: {
    _updateChildren() {

      // 防抖减少重复触发
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }

      this.timer = setTimeout(() => {

        let children = this.getRelationNodes('../checkbox/index')
        const len = children.length

        if (len > 0) {
          // let lastIndex = len - 1

          children.forEach((child, index) => {
            this._updateChild(child)
          })
        }
      }, 60)
    },

    _updateChild(child) {
      const {
        checkedColor,
        value,
        labelLeft,
        disabled
      } = this.data

      child.setData({
        value: value.indexOf(child.data.name) > -1,
        checkedColor: child.data.checkedColor || checkedColor,
        labelLeft: child.data.labelLeft || labelLeft,
        disabled: disabled || child.data.disabled,
        round: this.data.round || child.data.round,
        prevent: this.data.max && value.length >= this.data.max
      })
    }
  }
})
