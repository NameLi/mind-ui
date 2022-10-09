Component({
  externalClasses: ['custom-class'],

  options: {
    addGlobalClass: true,
  },

  relations: {
    '../index/index': {
      type: 'parent'
    }
  },

  properties: {
    name: {
      type: String,
      value: ''
    }
  },

  data: {
    top: 0,
    height: 0,
    currentName: ''
  },

  methods: {
    updateDataChange() {
      const className = '.m-index-item'
      const query = wx.createSelectorQuery().in(this)
      
      query.select(className).boundingClientRect((res) => {
        this.data.top = res.top
        this.data.height = res.height
        this.data.currentName = this.data.name

        // this.setData({
        //   top: res.top,
        //   height: res.height,
        //   currentName: this.data.name
        // })
      }).exec()
    }
  }
})