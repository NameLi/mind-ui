function getCtx(selector) {
  const pages = getCurrentPages()
  const ctx = pages[pages.length - 1]
  const componentCtx = ctx.selectComponent(selector)

  if (!componentCtx) {
    console.error('无法找到对应的组件，请按文档说明使用组件')
    return null
  }
  return componentCtx
}

const Modal = options => {

  return new Promise((resolve, reject) => {
    const {
      selector = '#modal'
    } = options
    const modal = getCtx(selector)
    modal._reset()

    modal._confirm = resolve
    modal._cancel = reject
    modal._show(options)

    return modal
  })
}

Modal.alert = options => Modal(Object.assign({
  showCancelButton: false
}, options))
Modal.confirm = options => Modal(options)

Modal.close = (selector = '#modal') => {
  const ctx = getCtx(selector)
  ctx.onClose()
}

export default Modal