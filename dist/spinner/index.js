Component({
  externalClasses: ['custom-class'],

  options: {
    addGlobalClass: true,
  },

  properties: {
    // small || default || large
    size: {
        type: String,
        value: 'default'
    },
    type: {
        type: String,
        value: 'snake'
    },
    color: {
      type: String
    }
  },

  data: {
    colors: []
  },

  lifetimes: {
    attached() {
      // triple 可以传多个颜色字符串，逗号分隔
      if (this.data.type === 'triple') {
        const color = this.data.color
        let colors
        
        if (color.split(',').length === 3) {
          colors = color.split(',')
        } else {
          colors = [color, color, color]
        }
        this.setData({
          colors
        })
      }
    }
  }
});
