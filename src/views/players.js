import React from 'react'
import Capy from './capy'
import Background from './background'

class Players extends React.Component {
  constructor (props) {
    super()
    this.play = false
    this.fieldLength = 1000
    this.simulateRate = 50
    this.pcount = 0
  }
  componentDidMount () {
    this.draw(this.setState.bind(this, { players: this.props.players }))
  }
  componentDidUpdate (previousProps) {
    const { mode, update, players } = this.props
    if (previousProps.mode === 'ready' && mode === 'start') {
      this.pcount = players.length
      this.play = true
      this.simulate(update)
    }
    if (previousProps.mode === 'start' && mode === 'stop') {
      this.play = false
    }
    if (previousProps.mode === 'stop' && mode === 'start') {
      this.play = true
      this.simulate(update)
    }
    if (mode === 'finish') {
      this.play = false
    }
  }
  simulate (update) {
    const { players } = this.props
    if (this.play) {
      if (this.pcount <= 0) {
        update('finish', players)
      }
      setTimeout(() => {
        const newPlayers = players.map(n => {
          if (n.dist >= this.fieldLength) {
            if (!n.finish) {
              //calculate placement and animation
              n.dist = this.fieldLength + this.pcount
              n.animate = this.pcount === players.length ? 'victory' : 'defeat'
              n.finish = 1
              this.pcount = this.pcount - 1
            }
          } else {
            n.dist = n.dist + Math.floor(Math.random() * 10)
            n.animate = 'run'
          }
          return n
        })
        update('order', newPlayers)
        this.simulate(update)
      }, this.simulateRate)
    }
  }
  draw (updater) {
    const updateFn = updater
    const fps = 60
    const interval = 1000 / fps

    let now = null
    let then = Date.now()
    let delta = null

    const paint = () => {
      now = Date.now()
      delta = now - then
      if (delta > interval) {
        then = now - delta % interval
        updateFn()
      }
      requestAnimationFrame(paint)
    }
    paint()
  }
  render () {
    const { players } = this.props
    return (
      <div className='player'>
        {players.map(n => {
          return (
            <div className='single-track' key={n.id} {...n}>
              <div className='start' />
              <div className='middle'>
                <Background pos={n.dist} max={this.fieldLength} divide={10} />
                <Capy
                  animate={n.animate}
                  max={this.fieldLength}
                  pos={n.dist}
                  color={n.color}
                />
              </div>
              <div className='end' />
            </div>
          )
        })}
      </div>
    )
  }
}

export default Players
