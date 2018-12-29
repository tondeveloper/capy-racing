import React from 'react'

import Players from './players'
import Board from './board'
import Button from './button'

const throttle = (delay, fn) => {
  let lastCall = 0
  return (...args) => {
    const now = Date.now()
    if (now - lastCall < delay) {
      return
    }
    lastCall = now
    return fn(...args)
  }
}

class view extends React.Component {
  state = {
    board: [],
    mode: 'ready'
  }
  board = []
  boardThrottleFn = throttle(500, this.calcPlacement.bind(this))
  players = [
    { id: 1, name: 'HoboJoe', color: '#F44336' },
    { id: 2, name: 'AlasKCanDo', color: '#4caf50' },
    { id: 3, name: 'LazyPalls', color: '#00bcd4' },
    { id: 4, name: 'FingAround', color: '#ffc107' },
    { id: 5, name: 'NotAnotherO', color: '#3f51b5' },
    { id: 6, name: 'DownWithRaces', color: '#e91e63' }
  ]
  componentDidMount () {
    this.resetBoard()
  }
  calcPlacement (players) {
    let board = [...players]
    board = board.sort((a, b) => a.dist - b.dist)
    this.board = board.reverse()
    this.setState({ board: this.board })
  }
  resetBoard () {
    this.players = this.players.map((n, i) => {
      n.dist = 0
      n.finish = 0
      n.animate = 'ready'
      return n
    })
    this.setState({ board: this.players })
  }
  update = (type, players) => {
    if (type === 'finish') {
      this.setState({ mode: 'finish' })
    }
    if (type === 'order') {
      this.boardThrottleFn(players)
    }
  }
  setMode (mode) {
    this.setState({ mode: mode })
  }
  handleClick = () => {
    switch (this.state.mode) {
      case 'ready':
        this.setMode('start')
        break
      case 'start':
        this.setMode('stop')
        break
      case 'stop':
        this.setMode('start')
        break
      case 'finish':
        this.setMode('ready')
        this.resetBoard()
      default:
        return
    }
  }
  render () {
    return (
      <div className='canvas'>
        <Button handleClick={this.handleClick} mode={this.state.mode} />
        <Players
          players={this.players}
          update={this.update}
          mode={this.state.mode}
        />
        <Board players={this.state.board} />
      </div>
    )
  }
}

export default view
