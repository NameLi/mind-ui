const defaults_data = {
  visible: false,
  mask: false,
  ghost: true,
  message: '',
  position: 'middle', //top middle bottom
  duration: 2000,
  image: '',
  icon: '',
  iconColor: '#fff',
  iconSize: 80,
  type: '',
  zIndex: 2001
}

Component({
  externalClasses: ['custom-class'],

  data: {
    ...defaults_data,
    timer: null
  },

  methods: {
    handleShow(options) {
      const {
        type = '', 
        icon = '', 
        image = '', 
        duration = 2000, 
        position = 'middle', 
        mask = false, 
        ghost = true,
        zIndex = 2001
      } = options

      this.setData({
        ...options,
        type,
        icon,
        image,
        mask,
        ghost,
        position,
        visible: true,
        zIndex
      })

      if (this.data.timer) clearTimeout(this.data.timer)

      if (duration) {
        this.data.timer = setTimeout(() => {
          this.onClose()
          this.data.timer = null
        }, duration)
      }
    },

    handleHide() {

    },

    onClose() {
      this.setData({
        ...defaults_data
      })
    }
  }
})