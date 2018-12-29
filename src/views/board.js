import React from 'react'
import { AnimateParent, AnimateChild } from './animation'

class Item extends React.Component {
  render () {
    const { name, index, color } = this.props
    return (
      <div className='player-list'>
        <div className='player-order' style={{ background: color }}>
          {index + 1}
        </div>
        <div className='player-name'>{name}</div>
      </div>
    )
  }
}

class Board extends React.Component {
  render () {
    const { players } = this.props
    return (
      <div className='board'>
        <AnimateParent animationSpeed={`${500}ms`}>
          {api => {
            return players.map((n, i) => {
              return (
                <AnimateChild key={n.id} id={n.id} api={api}>
                  <Item {...n} index={i} />
                </AnimateChild>
              )
            })
          }}
        </AnimateParent>
      </div>
    )
  }
}

export default Board
