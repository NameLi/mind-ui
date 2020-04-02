Component({
  relations: {
    '../grid/index': {
      type: 'parent'
    }
  },

  properties: {
    icon: {
      type: String,
      value: ''
    },
    iconColor: {
      type: String,
      value: ''
    },
    iconSize: {
      type: Number,
      value: 48
    },
    badgeDot: {
      type: Boolean,
      value: false
    },
    badgeValue: {
      type: [Number, String]
    },
    text: {
      type: String,
      value: ''
    },
    useSlot: Boolean,

    // 链接类型，可选值为 navigateTo，redirectTo，switchTab
    linkType: {
      type: String,
      value: 'navigateTo'
    },
    url: {
      type: String
    }
  },

  data: {
    width: '',
    height: '',
    border: false
  },

  methods: {
    onClick() {
      this.triggerEvent('click')

      const url = this.data.url
      if (!url) return


      wx[this.data.linkType].call(wx, {
        url
      })
    }
  }
})
