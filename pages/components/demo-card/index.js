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
      type: [String, Number, Boolean],
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
