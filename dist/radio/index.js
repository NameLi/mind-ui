Component({
  externalClasses: ['custom-class'],

  options: {
    addGlobalClass: true,
  },

  relations: {
    '../radio-group/index': {
      type: 'ancestor',
      linked(target) {
        this.parent = target;
      },
      unlinked() {
        this.parent = null;
      }
    }
  },

  properties: {
    name: {
      type: null
    },
    value: {
      type: null
    },
    disabled: {
      type: Boolean,
      value: false
    },
    checkedColor: {
      type: String,
      value: ''
    },
    labelLeft: {
      type: Boolean,
      value: false
    },
    shape: {
      type: String,
      value: 'round'
    }
  },

  methods: {
    emitChange(value) {

      const instance = this.parent || this;
      
      instance.triggerEvent('input', value);
      instance.triggerEvent('change', value);
    },

    onChange(event) {
      this.emitChange(this.data.name);
    },

    onClickLabel() {
      const { disabled, labelDisabled, name } = this.data;
      if (!disabled && !labelDisabled) {
        this.emitChange(name);
      }
    }
  }
})
