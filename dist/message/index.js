const defaults_data = {
  visible: false,
  message: '',
  duration: 2000,
  zIndex: 2000
}

let timer = null

Component({
  externalClasses: ['custom-class'],

  data: defaults_data,

  methods: {
    open(options) {
      const { 
        type = 'primary', 
        duration = 2000, 
        zIndex = 2000,
        showClose = false 
      } = options

      this.setData({
        ...options,
        type,
        duration,
        zIndex,
        showClose,
        visible: true
      })

      if (timer) clearTimeout(timer)
        
      if (duration) {
        timer = setTimeout(() => {
          this.close()
          timer = null
        }, duration)
      }
    },

    onClose() {
        this.setData({
          ...defaults_data
        })
    }
  }
})