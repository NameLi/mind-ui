Component({
  
  options: {
    addGlobalClass: true,
  },

  relations: {
    '../timeline/index': {
      type: 'ancestor'
    }
  },

  properties: {
    icon: {
      type: String
    },
    text: {
      type: String,
    },
    color: {
      type: String
    }
  },

  data: {
    isLast: false
  }
})