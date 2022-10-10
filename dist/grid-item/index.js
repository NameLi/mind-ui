Component({
  options: {
    addGlobalClass: true,
  },

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
      type: String,
      optionalTypes: [Number, String],
      value: ''
    },
    text: {
      type: String,
      value: ''
    },
    useSlot: {
      type: Boolean,
      value: false
    },

    // 链接类型，可选值为 navigateTo，redirectTo，switchTab
    linkType: {
      type: String,
      value: 'navigateTo'
    },
    url: {
      type: String,
      value: ''
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
