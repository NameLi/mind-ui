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


const Toast = options => {
  const {
    selector = '#toast'
  } = options
  const ctx = getCtx(selector)

  if (typeof options === "string") {
    options = {
      message: options,
      position: 'bottom'
    }
  }
  ctx.handleShow(options)

  ctx.close = ctx.onClose
  return ctx
}

Toast.close = (selector = '#toast') => {
  const ctx = getCtx(selector)
  ctx.onClose()
}

export default Toast