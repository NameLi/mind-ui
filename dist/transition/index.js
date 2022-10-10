const getClassNames = (name) => ({
  'enter': `m-${name}-enter m-${name}-enter-active enter-class enter-active-class`,
  'enter-to': `m-${name}-enter-to m-${name}-enter-active enter-to-class enter-active-class`,
  'leave': `m-${name}-leave m-${name}-leave-active leave-class leave-active-class`,
  'leave-to': `m-${name}-leave-to m-${name}-leave-active leave-to-class leave-active-class`,
})


const requestAnimationFrame = (cb) => {
  if (wx.getSystemInfoSync().platform === 'devtools') {
    return setTimeout(() => {
      cb();
    }, 1000 / 60);
  }

  return wx
    .createSelectorQuery()
    .selectViewport()
    .boundingClientRect()
    .exec(() => {
      cb();
    });
}

Component({
  externalClasses: [
    "custom-class",
    "m-enter-class",
    "m-enter-active-class",
    "m-enter-to-class",
    "m-leave-class",
    "m-leave-active-class",
    "m-leave-to-class"
  ],

  options: {
    addGlobalClass: true,
  },

  properties: {
    name: {
      type: String,
      value: 'fade',
    },

    show: {
      type: Boolean,
      value: false,
      observer: 'observeShow',
    },

    duration: {
      type: Number,
      optionalTypes: [Number, String, Object],
      value: 300,
    },
  },

  data: {
    type: '',
    inited: false,
    display: false,
  },

  ready() {
    this.data.show && this.observeShow(true, false);
  },

  methods: {
    observeShow(nVal, oVal) {
      if (nVal === oVal) return;

      nVal ? this._transitionEnter() : this._transitionLeave();
    },

    _transitionEnter() {
      const {
        duration,
        name
      } = this.data;
      const classNames = getClassNames(name);
      const currentDuration = duration.enter || duration;

      this.status = 'enter';
      this.triggerEvent('before-enter');

      requestAnimationFrame(() => {
        if (this.status !== 'enter') return;

        this.triggerEvent('enter');

        this.setData({
          inited: true,
          display: true,
          classes: classNames.enter,
          currentDuration,
        });

        requestAnimationFrame(() => {
          if (this.status !== 'enter') return;

          this.transitionEnded = false;
          this.setData({
            classes: classNames['enter-to']
          });
        });
      });
    },

    _transitionLeave() {
      if (!this.data.display) return;

      const { duration, name } = this.data;
      const classNames = getClassNames(name);
      const currentDuration = duration.leave || duration;

      this.status = 'leave';
      this.triggerEvent('before-leave');

      requestAnimationFrame(() => {
        if (this.status !== 'leave') return;

        this.triggerEvent('leave');

        this.setData({
          classes: classNames.leave,
          currentDuration,
        });

        requestAnimationFrame(() => {
          if (this.status !== 'leave') return;

          this.transitionEnded = false;
          setTimeout(() => this.onTransitionEnd(), currentDuration);

          this.setData({
            classes: classNames['leave-to']
          });
        });
      });
    },

    // 动画结束
    onTransitionEnd() {
      if (this.transitionEnded) return;

      this.transitionEnded = true;
      this.triggerEvent(`after-${this.status}`);

      const {
        show,
        display
      } = this.data;

      if (!show && display) {
        this.setData({
          display: false
        });
      }
    },
  }
});