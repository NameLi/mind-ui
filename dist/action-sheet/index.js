Component({
  externalClasses: ['custom-class', 'custom-mask-class', 'custom-header-class'],

  options: {
    multipleSlots: true
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
    maskClosable: {
      type: Boolean,
      value: true
    },
    showCancel: {
      type: Boolean,
      value: false
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    actions: {
      type: Array,
      value: []
    }
  },

  methods: {

    // 点击遮罩
    handleMaskClick() {
      if (!this.data.maskClosable) return
      this.handleCancelClick()
    },

    // 点击事件
    handleItemClick({ currentTarget = {}}) {
      const dataset = currentTarget.dataset || {}
      const { index } = dataset

      const item = this.data.actions[index]

      if(item.loading || item.disabled) return

      this.triggerEvent('click', {
        index
      })
    },

    // 取消
    handleCancelClick() {
      this.triggerEvent('cancel')
    },


    getuserinfo({
      detail = {}
    } = {}) {
      this.triggerEvent('getuserinfo', detail)
    },
    contact({
      detail = {}
    } = {}) {
      this.triggerEvent('contact', detail)
    },
    getphonenumber({
      detail = {}
    } = {}) {
      this.triggerEvent('getphonenumber', detail)
    },
    error({
      detail = {}
    } = {}) {
      this.triggerEvent('error', detail)
    }
  }
})