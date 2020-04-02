Component({
  externalClasses: ['custom-class'],

  properties: {
    // 胶囊样式
    capsule: {
      type: Boolean,
      value: false
    },
    size: {
      type: String,
      value: 'small'
    },
    type: {
      type: String,
      value: ''
    },
    plain: {
      type: Boolean,
      value: false
    },
    color: {
      type: String
    },
    round: {
      type: Boolean,
      value: false
    }
  }
});