import React from 'react'

class AnimateParent extends React.Component {
  constructor () {
    super()
    this.oldList = null
    this.newList = {}
  }
  componentDidMount () {
    //Initialize first children positions
    if (this.oldList === null) {
      this.oldList = Object.assign({}, this.newList)
    }
  }
  componentDidUpdate (previousProps) {
    const { animationSpeed } = this.props
    const oldKeys = Object.keys(this.oldList)
    oldKeys.forEach(key => {
      let newKey = this.newList[key]
      let oldKey = this.oldList[key]
      if (newKey) {
        const newBox = newKey.rect
        const oldBox = oldKey.rect
        const deltaX = oldBox.left - newBox.left
        const deltaY = oldBox.top - newBox.top
        requestAnimationFrame(() => {
          newKey.dom.style.transform = `translate(${deltaX}px, ${deltaY}px)`
          newKey.dom.style.transition = 'transform 0s'
          //quickly position to last place and let it ride out
          requestAnimationFrame(() => {
            newKey.dom.style.transform = ''
            newKey.dom.style.transition = `transform ${animationSpeed ||
              `10ms`}`
          })
        })
      }
    })
    this.oldList = Object.assign({}, this.newList)
    this.newList = {}
  }

  register = (id, dom) => {
    if (dom) {
      this.newList[id] = { dom: dom, rect: dom.getBoundingClientRect() }
    }
  }
  render () {
    const { children } = this.props
    return children({ register: this.register })
  }
}

class AnimateChild extends React.Component {
  render () {
    const { children, api, id } = this.props
    return (
      <div
        className='child'
        ref={ref => {
          api.register(id, ref)
        }}
      >
        {children}
      </div>
    )
  }
}

export { AnimateParent, AnimateChild }
