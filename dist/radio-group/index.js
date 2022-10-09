Component({
  externalClasses: ['custom-class'],

  options: {
    addGlobalClass: true,
  },
  
  relations: {
    '../radio/index': {
      type: 'descendant',

      linked(target) {
        this._updateChildren()
      },

      linkChanged() {
        this._updateChildren()
      },

      unlinked(target) {
        this._updateChildren()
      }
    }
  },

  properties: {
    value: {
      type: null,
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

        let children = this.getRelationNodes('../radio/index')

        const len = children.length

        if (len > 0) {
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
        checkedColor: child.data.checkedColor || checkedColor,
        value,
        labelLeft: child.data.labelLeft || labelLeft,
        disabled: disabled || child.data.disabled
      });
    }
  }
})