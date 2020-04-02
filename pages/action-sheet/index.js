import Message from '../../dist/message/message'

Page({
  data: {
    visible1: false,
    actions1: [{
        name: '选项1'
      },
      {
        name: '选项2',
        loading: true
      },
      {
        name: '选项3',
        icon: 'love',
        color: '#EE5C42',
        disabled: true
      },
      {
        name: 'getUserInfo',
        openType: 'getUserInfo'
      },
      {
        name: '禁用',
        disabled: true
      }
    ],

    visible2: false,
    actions2: [{
      name: '删除',
      color: '#ed3f14'
    }],

    visible3: false,
    actions3: [
      {
        name: '确定'
      }, {
        name: '关闭'
      }
    ]
  },


  getuserinfo(e) {
    console.log(e)
  },

  handleOpen1() {
    this.setData({
      visible1: true
    });
  },

  handleCancel1() {
    this.setData({
      visible1: false
    });
  },

  handleOpen2() {
    this.setData({
      visible2: true
    });
  },

  handleCancel2() {
    this.setData({
      visible2: false
    });
  },

  handleOpen3() {
    this.setData({
      visible3: true
    });
  },

  handleCancel3() {
    this.setData({
      visible3: false
    });
  },

  handleClickItem1({
    detail
  }) {
    const index = detail.index + 1;

    Message({
      content: '点击了选项' + index
    });
  },

  handleClickItem2() {
    const action = [...this.data.actions2]
    action[0].loading = true

    this.setData({
      actions2: action
    });

    setTimeout(() => {
      action[0].loading = false
      this.setData({
        visible2: false,
        actions2: action
      });

      Message({
        content: '删除成功！',
        type: 'success'
      });
    }, 2000)
  },


  handleClickItem3({
    detail
  }) {
    const index = detail.index + 1;
    
    this.setData({
      visible3: false
    })
  }
})