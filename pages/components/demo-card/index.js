Component({
  externalClasses: ['custom-class', 'custom-content-class'],

  options: {
    multipleSlots: true
  },

  properties: {
    title: {
      type: String
    },
    desc: {
      type: String,
      optionalTypes: [Number, Boolean],
      value: ''
    }
  },
})
