Component({
  externalClasses: ['custom-class'],
  properties: {
    loading: {
      type: Boolean,
      value: true
    },
    spinner: {
      type: Boolean,
      value: false
    },
    loadingContent: {
      type: String,
      value: '加载中'
    },
    loadEndContent: {
      type: String,
      value: '没有更多数据了'
    },
    color: {
      type: String,
      value: ''
    }
  }
})