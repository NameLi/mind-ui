Component({
  externalClasses: ['custom-class'],

  options: {
    addGlobalClass: true,
  },

  relations: {
    '../cell-group/index': {
      type: 'ancestor'
    }
  },

  properties: {
    icon: {
      type: String
    },

    image: {
      type: String
    },

    title: {
      type: String
    },

    value: {
      type: String
    },

    border: {
      type: Boolean,
      value: false
    },

    iconColor: {
      type: String,
      value: ''
    },

    // 链接类型，可选值为 navigateTo，redirectTo，switchTab
    linkType: {
      type: String,
      value: 'navigateTo'
    },

    url: {
      type: String
    }
  },


  methods: {
    updateCellBorder(border) {
      this.setData({
        border
      })
    },

    onClick() {
      this.triggerEvent('click')

      const url = this.data.url
      if (!url) return

      wx[this.data.linkType].call(wx, {
        url
      })
    }
  }
});