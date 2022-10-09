Component({
  externalClasses: ['custom-class'],

  options: {
    addGlobalClass: true,
  },

  relations: {
    '../sticky-button/index': {
      type: 'parent',
      linked(target) {
        this.parent = target;
      },
      unlinked() {
        this.parent = null;
      }
    }
  },

  properties: {
    icon: {
      type: String
    },
    iconColor: {
      type: String,
      value: '#fff'
    },
    iconSize: {
      type: Number,
      value: 48
    },
    bgcolor: {
      type: String
    }
  },

  data: {
    style: '',
    toggle: false,
  },

  methods: {
    updateChildStyle(style) {
      this.setData({
        style
      })
    },

    toggle() {
      this.setData({
        toggle: !this.data.toggle
      })
    }
  }
})
