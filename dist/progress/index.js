Component({
  externalClasses: ['custom-class'],
  properties: {
    type: {
      type: String,
      value: 'primary'
    },

    percent: {
      type: Number,
      value: 0
    },

    pointText: {
      type: String,
      value: ''
    },
    pointColor: {
      type: String,
      value: ''
    },

    activeColor: {
      type: String,
      value: ''
    },

    pointVisible: {
      type: Boolean,
      value: true
    },

    textColor: {
      type: String,
      value: '#fff'
    },

    barHeight: {
      type: Number,
      optionalTypes: [String],
      value: 6
    }
  }
})
