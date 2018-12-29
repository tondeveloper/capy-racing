import React from 'react'
import Capy from './capy'
import Background from './background'

class Players extends React.Component {
  constructor (props) {
    super()
    this.players = props.players
    this.play = false
    this.fieldLength = 1000
  }
  componentDidMount () {
    this.draw(this.setState.bind(this, { players: this.players }))
  }
  componentDidUpdate (previousProps) {
    const { mode } = this.props
    if (previousProps.mode === 'ready' && mode === 'start') {
      this.counter = this.props.players.length
      this.play = true
      this.simulate(this.props.update)
    }
    if (previousProps.mode === 'start' && mode === 'stop') {
      this.play = false
    }
    if (previousProps.mode === 'stop' && mode === 'start') {
      this.play = true
      this.simulate(this.props.update)
    }
    if (mode === 'finish') {
      this.play = false
    }
  }
  simulate (update) {
    if (this.play) {
      if (this.counter <= 0) {
        update('finish', this.players)
      }
      setTimeout(() => {
        const players = this.players
        const newPlayers = players.map(n => {
          if (n.dist >= this.fieldLength) {
            if (n.finish === 0) {
              //finisher get + placement points to determine winner
              //incase of tie player with lowest index get the prize
              n.dist = this.fieldLength + this.counter
              this.counter = this.counter - 1
              n.finish = `1-${Date.now()}`
              n.animate = n.finish === 1 ? 'victory' : 'defeat'
            }
          } else {
            n.dist = n.dist + Math.floor(Math.random() * 10)
            n.animate = 'run'
          }
          return n
        })
        update('order', newPlayers)
        //run the simulation again
        this.simulate(update)
      }, 50)
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
