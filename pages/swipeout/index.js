import Message from '../../dist/message/message'
import Toast from '../../dist/toast/toast'

Page({
  data: {
    list: [
      {
        id: 1,
        name: '盖',
        title: '德玛西亚之力-盖伦',
        desc: '人在塔在！',
        time: '下午5:01',
      }, {
        id: 2,
        name: '赵',
        title: '德邦总管-赵信',
        desc: '一点寒芒先到，随后枪出如龙。',
        time: '下午5:01'
      }, {
        id: 3,
        name: '嘉',
        title: '德玛西亚皇子-嘉文四世',
        time: '下午5:01'
      }, {
        id: 4,
        name: '泰',
        title: '蛮族之王-泰达米尔',
        time: '昨天'
      }, {
        id: 5,
        name: '凯',
        title: '皮城女警-凯瑟琳',
        desc: '真抱歉，少年们，我把真皮手套忘在家里了。',
        time: '星期五'
      },
    ],
    instance: null
  },

  handleChange({ detail }) {
    this.data.instance = detail
  },

  handleUp(e) {
    let id = e.currentTarget.dataset.id
    Message(`tap ID: ${id}`)
  },

  handleDelete(e) {
    let id = e.currentTarget.dataset.id

    Toast({
      message: '删除中',
      type: 'loading'
    })

    setTimeout(()=> {
      Toast.close()

      this.data.instance.close()

      let data = this.data.list

      let index = data.findIndex(item => item.id === id)
      data.splice(index, 1)
   
      this.setData({
        list: data
      })

      Toast('删除成功')
    }, 1200)
    
    this.setData({
      hideButton: this.data.hideButton ? true : false
    })
  },

  // 
  handleClick(e) {
    const id = e.currentTarget.dataset.id
    Message(`click ID: ${id}`)
  }
})