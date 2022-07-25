Page({
  data: {
    texts: ['极差', '较差', '一般', '不错', '很棒']
  },

  onChange({ detail }) {
    console.log(detail)
  },
})