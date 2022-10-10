Component({
  externalClasses: ['custom-class'],

  options: {
    addGlobalClass: true,
  },

  relations: {
    '../checkbox-group/index': {
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
    name: null,
    
    value: {
      type: Boolean,
      value: false
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

    round: {
      type: Boolean,
      value: false
    }
  },

  data: {
    prevent: false, // 在超出可选个数限制时使用
  },

  methods: {
    emitChange(value) {
      // 
      if (this.parent) {
        this.setParentValue(this.parent, value);
      } else {
        this.triggerEvent('input', value);
        this.triggerEvent('change', value);
      }
    },

    toggle() {
      const { disabled, value } = this.data;

      if (!disabled) {
        this.emitChange(!value);
      }
    },

    onClickLabel() {
      const { labelDisabled, disabled, value } = this.data;
      if (!disabled && !labelDisabled) {
        this.emitChange(!value);
      }
    },

    setParentValue(parent, value) {
      const parentValue = parent.data.value.slice();

      const { name } = this.data;
      const { max } = parent.data;

      if (value) {
        if (max && parentValue.length >= max) {
          return
        }
        
        if (parentValue.indexOf(name) === -1) {

          parentValue.push(name)

          parent.triggerEvent('input', parentValue)
          parent.triggerEvent('change', parentValue)
        }

      } else {

        const index = parentValue.indexOf(name)

        if (index !== -1) {
          parentValue.splice(index, 1)
          parent.triggerEvent('input', parentValue)
          parent.triggerEvent('change', parentValue)
        }
      }
    }
  }
})
