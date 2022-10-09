Component({
  externalClasses: ['custom-class'],

  options: {
    addGlobalClass: true,
  },
  
  properties: {
    disabled: {
      type: Boolean,
      value: false
    },
    useSlot: {
      type: Boolean,
      value: false
    },
    activeColor: String,
    inactiveColor: String,
    max: {
      type: Number,
      value: 100
    },
    min: {
      type: Number,
      value: 0
    },
    step: {
      type: Number,
      value: 1
    },
    value: {
      type: Number,
      value: 0
    },
    height: {
      type: Number,
      value: 6
    }
  },

  data: {
    barStyle: '',
    sliderWitdh: 0,
    deltaX: 0,
    offsetX: 0,
    startX: 0,
    dragStatus: ''
  },

  lifetimes: {
    ready() {
      // 获取滑块dom宽度
      const query = this.createSelectorQuery()
      query.select('.m-slider').boundingClientRect()

      query.exec(res => {
        this.data.sliderWitdh = res[0].width
      })

      this.updateValue(this.data.value);
    }
  },


  methods: {
    onTouchStart(event) {
      if (this.data.disabled) return

      var touch = event.touches[0];
      this.data.deltaX = 0;
      this.data.offsetX = 0;
      this.data.startX = touch.clientX;

      this.data.startValue = this.format(this.data.value);
      this.data.dragStatus = 'start';
    },

    onTouchMove(event) {
      if (this.data.disabled)
        return;
      if (this.data.dragStatus === 'start') {
        this.triggerEvent('drag-start');
      }

      const touch = event.touches[0];
      this.data.deltaX = touch.clientX - this.data.startX;

      this.data.offsetX = Math.abs(this.data.deltaX);

      this.data.dragStatus = 'draging';

      const diff = this.data.deltaX / this.data.sliderWitdh * 100;

      this.data.newValue = this.data.startValue + diff;

      this.updateValue(this.data.newValue, false, true);
    },

    onTouchEnd() {
      if (this.data.disabled)
        return;

      if (this.data.dragStatus === 'draging') {
        this.updateValue(this.data.newValue, true);
        this.triggerEvent('drag-end');
      }
    },

    onClick(event) {
      if (this.data.disabled)
        return;
      const { min } = this.data;

      const query = this.createSelectorQuery()
      query.select('.slider').boundingClientRect()

      query.exec(rect => {
        const value = (event.detail.x - rect[0].left) / this.data.sliderWitdh * this.getRange() + min;
        this.updateValue(value, true);
      })
    },

    updateValue(value, end, drag) {

      value = this.format(value);
      const { height, min } = this.data;
      const width = `${((value - min) * 100) / this.getRange()}%`;
      this.setData({
        value,
        barStyle: `
          width: ${width};
          height: ${height}rpx;
          ${drag ? 'transition: none;' : ''}
        `,
      });

      if (drag) {
        this.triggerEvent('input', value);
      }

      if (end) {
        this.triggerEvent('change', value);
      }
    },

    getRange() {
      const { max, min } = this.data;
      return max - min;
    },

    format(value) {
      const { max, min, step } = this.data;
      return Math.round(Math.max(min, Math.min(value, max)) / step) * step;
    }
  }
})
