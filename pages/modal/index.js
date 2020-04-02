import Message from '../../dist/message/message'
import Modal from '../../dist/modal/modal'

Page({
  data: {
    visible1: false,
    visible2: false,
    visible3: false,
    visible4: false,
    loading: false,
  },

  // 组件调用
  handleOpen1() {
    this.setData({
      visible1: true
    });
  },

  handleClose1() {
    this.setData({
      visible1: false
    });
  },

  handleOpen2() {
    this.setData({
      visible2: true
    });
  },

  handleClose2() {
    this.setData({
      visible2: false
    });
  },

  handleOpen3() {
    this.setData({
      visible3: true
    });
  },

  handleClose3() {
    this.setData({
      visible3: false
    });
  },

  handleOpen4() {
    this.setData({
      visible4: true
    });
  },

  handleClose4() {
    this.setData({
      loading: true
    })

    setTimeout(() => {
      this.setData({
        visible4: false,
        loading: false
      });
      Message({
        content: '删除成功！',
        type: 'success'
      })
    }, 2000);
  },

  // js 调用
  handleOpen6() {
    let modal = Modal.alert({
        title: '提示',
        content: '操作成功！'
      })
      .then(() => {
        Message({
          content: '确认回调',
          type: 'success'
        })
      })
  },

  handleOpen7() {
    Modal.confirm({
        title: '提示',
        content: '操作成功！'
      })
      .then(() => {
        Message({
          content: '确认回调',
          type: 'success'
        })
      }).catch(() => {
        Message({
          content: '取消回调',
          type: 'warning'
        })
      })
  },

  handleOpen8() {
    Modal({
        title: '异步操作',
        content: '异步操作',
        confirmTextColor: "red",
        confirmButtonText: "删除",
        asyncClose: true
      })
      .then(() => {
        setTimeout(() => {
          Message({
            content: '删除成功！',
            type: 'success'
          })
          Modal.close()
        }, 1200);
      }).catch(() => {
        Message({
          content: '取消回调',
          type: 'warning'
        })
        Modal.close()
      })
  }
})