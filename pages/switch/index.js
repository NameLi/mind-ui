import Modal from '../../dist/modal/modal'

Page({
  data: {
    checked: false,
    checkedAsync: false,
    loading: false
  },

  onChange({
    detail
  }) {
    this.setData({
      checked: detail
    })
  },


  // 异步
  onAsyncChange({ detail }) {

    Modal({
      title: '提示',
      content: '异步切换开关',
      asyncClose: true
    })
    .then(() => {
      Modal.close()

      this.setData({
        loading: true
      })

      setTimeout(() => {
        this.setData({
          loading: false,
          checkedAsync: detail
        })
      }, 2000)

    }).catch(() => {
      Modal.close()
    })
  }
})