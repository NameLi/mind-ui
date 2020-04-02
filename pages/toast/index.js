import Toast from '../../dist/toast/toast'

Page({
  // 基础文字提示
  handleToast() {
    Toast('simple toast')
  },

  // 不同位置
  handleTextTop() {
    Toast({
      message: 'toast top',
      position: 'top'
    })
  },

  handleTextMiddle() {
    Toast({
      message: 'toast middle',
      position: 'middle'
    })
  },

  handleTextBottom() {
    Toast({
      message: 'toast bottom',
      position: 'bottom'
    })
  },

  // 加载中
  handleLoading() {
    Toast({
      message: '加载中',
      type: 'loading'
    })
  },

  // 内置图标
  handleIcon() {
    Toast({
      message: '使用内置的图标',
      icon: 'love',
      iconColor: '#f56c6c'
    })
  },

  // 自定义图片
  handleImage() {
    Toast({
      message: '使用自定义图片',
      image: 'https://note-file.ixook.com/FkwInL0tWpqDeRNtYHMfmaHlioTq',
    })
  },

  // 开启蒙层
  handleMask() {
    const toast = Toast({
      message: '5 秒后自动关闭',
      duration: 0,
      mask: true
    })

    let sec = 5
    let timer = setInterval(() => {
      sec--
      if (sec) {
        toast.setData({
          message: `${sec} 秒后自动关闭`
        })
      } else {
        clearInterval(timer)
        toast.close()
      }
    }, 1000)
  }
});