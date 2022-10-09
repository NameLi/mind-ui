Component({
  externalClasses: ['custom-class'],

  options: {
    addGlobalClass: true,
  },

  properties: {
    // ghost, primary, info, success, warning, error
    type: {
      type: String,
      value: 'default',
    },
    plain: {
      type: Boolean,
      value: false,
    },
    inline: {
      type: Boolean,
      value: false
    },
    size: {
      type: String,
      value: '',
    },
    round: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    loading: {
      type: Boolean,
      value: false,
    },
    full: {
      type: Boolean,
      value: false
    },
    color: {
      type: String,
      value: ''
    },
    bgcolor: {
      type: String,
      value: ''
    },
    openType: String,
    hoverStopPropagation: Boolean,
    hoverStartTime: {
      type: Number,
      value: 20
    },
    hoverStayTime: {
      type: Number,
      value: 70
    },
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: Boolean
  },

  methods: {
    onTap() {
      if (this.data.disabled) return false
      this.triggerEvent('click')
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
});