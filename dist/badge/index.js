Component({
  externalClasses: ['custom-class'],

  properties: {
    value: {
      type: [Number, String],
      value: '',
      observer: '_value'
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
    _value() {
      const { value, max } = this.data

      let _value = ''
      if(Number(value)) {
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
