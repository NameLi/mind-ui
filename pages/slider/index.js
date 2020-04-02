Page({
  data: {
    value1: 0,
    value2: 50,
    value3: 0,
    value4: 0,
    value5: 0,
    value6: 0,
  },

  onChange1({ detail }) {
    this.setData({
      value1: detail
    })
  },

  onChange2({ detail }) {
    this.setData({
      value2: detail
    })
  },

  onChange3({ detail }) {
    this.setData({
      value3: detail
    })
  },

  onChange4({ detail }) {
    this.setData({
      value4: detail
    })
  },

  onChange5({ detail }) {
    this.setData({
      value5: detail
    })
  },

  onChange6({ detail }) {
    this.setData({
      value6: detail
    })
  },
})