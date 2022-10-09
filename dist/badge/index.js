Component({
  externalClasses: ['custom-class'],

  options: {
    addGlobalClass: true,
  },

  properties: {
    value: {
      type: Number,
      optionalTypes: [Number, String],
      value: '',
      observer: '_valueObserver'
    },
    max: {
      type: Number,
      value: 99
    },
    bgcolor: {
      type: String,
      value: ''
    },
    isDot: {
      type: Boolean,
      value: false
    },
    static: {
      type: Boolean,
      value: false
    }
  },

  data: {
    _value: 0
  },

  methods: {
    _valueObserver() {
      const { value, max } = this.data

      let _value = ''
      if (!isNaN(value)) {
        _value = parseInt(value) > parseInt(max) ? `${max}+` : value
      } else {
        _value = value
      }

      this.setData({
        _value
      })
    }
  }
})
