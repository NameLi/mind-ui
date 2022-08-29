Component({
  externalClasses: ['custom-class'],

  properties: {
    disabled: {
      type: Boolean,
      value: false
    },

    value: {
      type: Boolean,
      optionalTypes: [String, Number],
      value: false,

      observer(val) {
        this.setData({ 
          checked: val
        })
      }
    },

    loading: {
      type: Boolean,
      value: false
    },

    activeColor: {
      type: String,
      value: '#1989fa'
    },

    inactiveColor: {
      type: String,
      value: '#fff'
    },

    name: {
      type: String,
      value: ''
    },

    activeValue: {
      type: Boolean,
      optionalTypes: [String, Number],
      value: true
    },
    
    inactiveValue: {
      type: Boolean,
      optionalTypes: [String, Number],
      value: false
    }
  },

  data: {
    checked: false
  },

  methods: {
    onClick() {
      const { activeValue, inactiveValue } = this.data

      if (!this.data.disabled && !this.data.loading) {

        const value = this.data.checked === activeValue

        const checked = value ? inactiveValue : activeValue

        // this.setData({
        //   checked
        // })

        this.triggerEvent('change', checked)
      }
    }

  }
});
