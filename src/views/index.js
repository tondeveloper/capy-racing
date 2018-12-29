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
  boardThrottleFn = throttle(500, this.calcBoard.bind(this))
  players = [
    { id: 1, dist: 0, finish: 0, name: 'HoboJoe', color: '#F44336' },
    { id: 2, dist: 0, finish: 0, name: 'AlasCanDo', color: '#4caf50' },
    { id: 3, dist: 0, finish: 0, name: 'MerryBelle', color: '#00bcd4' },
    { id: 4, dist: 0, finish: 0, name: 'FintelSpline', color: '#ffc107' },
    { id: 5, dist: 0, finish: 0, name: 'NotAnother', color: '#3f51b5' },
    { id: 6, dist: 0, finish: 0, name: 'DownWithRaces', color: '#e91e63' }
  ]
  componentDidMount () {
    this.calcBoard(this.players)
  }
  calcBoard (players) {
    let board = [...players]
    board = board.sort((a, b) => a.dist - b.dist)
    this.board = board.reverse()
    this.setState({ board: this.board })
  }
  update = (type, data) => {
    if (type === 'finish') {
      this.setState({ mode: 'finish' })
      return
    }
    this.boardThrottleFn(data)
  }
  handleClick = () => {
    if (this.state.mode === 'ready') {
      this.setState({ mode: 'start' })
    }
    if (this.state.mode === 'start') {
      this.setState({ mode: 'stop' })
    }
    if (this.state.mode === 'stop') {
      this.setState({ mode: 'start' })
    }
    if (this.state.mode === 'finish') {
      this.players.map(n => {
        n.dist = 0
        n.finish = 0
        n.animate = 'ready'
        return n
      })
      this.setState({ mode: 'ready' })
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
