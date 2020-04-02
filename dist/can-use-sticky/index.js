Component({
  lifetimes: {
    ready() {
      const className = '.sticky-check-dom'

      const query = wx.createSelectorQuery().in(this)

      query.select(className).boundingClientRect(rect => {
        console.log(rect.top)
        if (rect.top === 0) {
          this.triggerEvent('canUseCssSticky', true)
        } else {
          this.triggerEvent('canUseCssSticky', false)
        }
      }).exec()
    }
  }
})
