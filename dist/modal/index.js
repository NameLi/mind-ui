Component({
  externalClasses: ['custom-class', 'custom-mask-class', 'custom-body-class'],

  options: {
    addGlobalClass: true,
  },

  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: ''
    },
    content: {
      type: String,
      value: ''
    },
    closeOnClickModal: {
      type: Boolean,
      value: true
    },
    showConfirmButton: {
      type: Boolean,
      value: true
    },
    showCancelButton: {
      type: Boolean,
      value: true
    },
    confirmButtonText: {
      type: String,
      value: '确定'
    },
    cancelButtonText: {
      type: String,
      value: '取消'
    },
    confirmTextColor: {
      type: String,
      value: '#409EFF'
    },
    loading: {
      type: Boolean,
      value: false
    },
    asyncClose: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    _reset() {
      this.setData({
        title: '',
        content: '',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmTextColor: '#409EFF',
        loading: false,
        asyncClose: false
      })
    },

    // 确定
    onConfirm() {
      // 异步
      if (this.data.asyncClose) {
        this.setData({
          loading: true
        })
        if (this._confirm) {
          this._confirm()
        }
      } else {
        if (this._confirm) {
          this.close()
        }
      }
      this.triggerEvent('confirm')
    },

    onCancel() {
      if (this.data.loading) return

      this.setData({
        visible: false
      })
      this.triggerEvent('cancel')

      if (this._cancel) {
        this._cancel()
        this.close()
      }
    },

    onMaskClick() {
      if (!this.data.closeOnClickModal) return;
      this.close()
    },

    _show(options) {
      this.setData({
        ...options,
        visible: true
      })
    },

    // 关闭并重置默认参数
    close() {
      this.setData({
        visible: false
      })

      this.triggerEvent('close')
    }
  }
})