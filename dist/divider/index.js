Component({
  externalClasses: ['custom-class'],

  options: {
    addGlobalClass: true,
  },
  
  properties: {
    content: {
      type: String,
      value: ''
    },
    color: {
      type: String,
      value: ''
    }
  }
});