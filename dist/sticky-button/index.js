Component({
  externalClasses: ['custom-class'],

  relations: {
    '../sticky-button-item/index': {
      type: 'child',
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
    offset: {
      type: Number,           // 扇面偏移角，默认是四分之π，配合默认方向lt
      value: Math.PI/4,
      observer: '_updateChildren'
    },

    direction: {
      type: String,
      value: 'lb',           // lt t rt this.radius rb b lb l 取值有8个方向，左上、上、右上、右、右下、下、左下、左，默认为左上
      observer: '_updateChildren'
    },

    radius: {
      type: Number,
      value: 200,
      observer: '_updateChildren'
    },

    icon: {
      type: String,
      value: 'plus'
    },

    iconSize: {
      type: Number,
      value: 48
    },

    iconColor: {
      type: String,
      value: '#fff'
    },

    bgcolor: {
      type: String,
      value: ''
    },

    subIconSize: {
      type: Number,
      value: ''
    },

    subColor: {
      type: String,
      observer: '_updateChildren'
    },

    subBgcolor: {
      type: String,
      observer: '_updateChildren'
    },

  },

  data: {
    toggle: false,
    nodes: []
  },

  methods: {
    _updateChildren() {
      // 防抖减少重复触发
      if (this.data.timer) {
        clearTimeout(this.data.timer)
        this.data.timer = null
      }

      this.data.timer = setTimeout(() => {

        const nodes = this.getRelationNodes('../sticky-button-item/index')
        this.data.nodes = nodes

        const len = nodes.length

        const direction_arc = Math.PI * (3 + Math.max(['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l'].indexOf(this.data.direction), 0)) / 4

        nodes.forEach((child, i) => {
          let arc = (Math.PI - this.data.offset * 2) / (len - 1) * i + this.data.offset + direction_arc
          let x = (Math.cos(arc) * this.data.radius).toFixed(2)
          let y = (Math.sin(arc) * this.data.radius).toFixed(2)

          let styles = [
            `transform: translate(${ x }rpx, ${ y }rpx) rotate(360deg)`,
            `transition-delay: ${0.03 * i}s`
          ]

          child.setData({
            iconColor: child.data.iconColor || this.data.subIconColor,
            bgcolor: child.data.bgcolor || this.data.subBgcolor,
            iconSize: this.data.subIconSize || child.data.iconSize
          })

          child.updateChildStyle(styles.join(";"))
        })

      }, 60)
    },

    toggle(event) {
      const { toggle } = this.data

      this.setData({
        toggle: !toggle
      })

      this.data.nodes.forEach((child, i) => {
        child.toggle()
      })

      this.triggerEvent('toggle', !toggle)
    },
  }
})
