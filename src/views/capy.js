import React from 'react'

class Capy extends React.Component {
  ref = null
  componentDidUpdate (previousProps) {
    const { animate } = this.props
    if (animate === 'run') {
      this.playRun(previousProps)
    } else if (animate === 'victory') {
      this.playVictory(previousProps)
    } else if (animate === 'defeat') {
      this.playDefeat(previousProps)
    } else if (animate === 'ready') {
      this.playReady()
    }
  }
  playRun (previousProps) {
    const { max, pos } = this.props
    const ref = this.ref
    const current = pos / max * 100
    const last = previousProps.pos / max * 100
    requestAnimationFrame(() => {
      ref.style.transform = `translate(${last}%, ${0}px)`
      requestAnimationFrame(() => {
        ref.style.transform = `translate(${current}%, ${0}px)`
      })
    })
  }
  playVictory (previousProps) {
    const ref = this.ref
    //110% past the finishline
    const current = 110
    requestAnimationFrame(() => {
      ref.style.transform = `translate(${current}%, ${0}px)`
      ref.style.transition = `transform ${`300ms`}`
    })
  }
  playDefeat () {
    const ref = this.ref
    //110% past the finishline
    const current = 110
    requestAnimationFrame(() => {
      ref.style.transform = `translate(${current}%, ${0}px)`
      ref.style.transition = `transform ${`300ms`}`
    })
  }
  playReady () {
    const ref = this.ref
    requestAnimationFrame(() => {
      ref.style.transform = `translate(${0}%, ${0}px)`
      ref.style.transition = `transform ${`300ms`}`
    })
  }
  render () {
    const { color, animate } = this.props
    return (
      <div
        className='horse-placement'
        ref={ref => {
          this.ref = ref
        }}
      >
        <div className='horse-offset'>
          <div className='horse'>
            <div className='head' style={{ background: color }}>
              <div className='eye' />
            </div>

            <div className='body' style={{ background: color }}>
              <div className='leg1'>
                <div
                  className={`leg ${animate === 'run' ? 'animate-1' : ''}`}
                  style={{ background: color }}
                />
              </div>
              <div className='leg2'>
                <div
                  className={`leg ${animate === 'run' ? 'animate-2' : ''}`}
                  style={{ background: color }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Capy
