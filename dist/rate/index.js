Component({
  properties: {
    max: {
      type: Number,
      value: 5,
    },
    step: {
      type: Number,
      value: 1
    },
    step: {
      type: Number,
      value: 1
    },
    size: {
      type: Number,
      value: 40
    },
    value: {
      type: Number,
      value: 0
    },
    readonly: {
      type: Boolean,
      value: false
    },
    icon: {
      type: String,
      value: 'star-fill'
    },
    voldIcon: {
      type: String,
      value: 'star-fill'
    },
    voidColor: {
      type: String,
      value: '#eee'
    },
    color: {
      type: String,
      value: '#F7BA2A'
    },
    allowHalf: {
      type: Boolean,
      value: false
    },
    showScore: {
      type: Boolean,
      value: false
    },
    textColor: {
      type: String,
      value: '#F7BA2A'
    },
    texts: {
      type: Array,
      value: ['极差', '较差', '一般', '不错', '很棒']
    },
    showText: {
      type: Boolean,
      value: false
    },
    animation: {
      type: Boolean,
      value: true
    }
  },

  data: {
    starNum: 5,
    tValue: 0,
    actived: -1,
    text: ''
  },

  observers: {
    'max, step': function (max, step) {
      this.setData({
        starNum: Math.ceil(max / step)
      })
    },

    value: function (value) {
      this.setData({
        tValue: parseInt(value) / this.data.step
      })
      this._setShowText();
    }
  },

  methods: {
    _setShowText() {
      let score = this.data.tValue

      if (score > 0 && (this.data.showScore || this.data.showText)) {
        let text = score
        let textLen = this.data.texts.length

        if (this.data.showText) {
          if (score > textLen) {
            text = this.data.texts[textLen - 1]
          } else {
            if (this.data.allowHalf) {
              text = this.data.texts[Math.floor(score - .5)]
            } else {
              text = this.data.texts[Math.floor(score) - 1]
            }
          }
        }

        this.setData({
          text
        })
      }
    },

    handleClick(e) {
      if (this.data.readonly) return

      let score = e.currentTarget.dataset.score

      this.setData({
        actived: -1
      })

      setTimeout(() => {
        this.setData({
          tValue: score,
          actived: Math.floor(score - .5)
        })

        this._setShowText()
      }, 20)

      this.triggerEvent('change', score * this.data.step)
    },
  }
})