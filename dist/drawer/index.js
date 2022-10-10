Component({
  externalClasses: ['custom-class'],

  options: {
    addGlobalClass: true,
  },

  properties: {
    visible: {
      type: Boolean,
      value: false
    },

    zIndex: {
      type: Number,
      value: 9
    },

    mask: {
      type: Boolean,
      value: true
    },

    maskClosable: {
      type: Boolean,
      value: true
    },

    position: {
      type: String,
      value: 'bottom' // left right top bottom
    }
  },

  methods: {
    handleMaskClick() {
      if (!this.data.maskClosable) return
      this.triggerEvent('close')
    }
  }
});