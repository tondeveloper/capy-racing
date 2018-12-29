import React from 'react'

class Button extends React.Component {
  render () {
    const { handleClick, mode } = this.props
    return (
      <div
        className='button-group'
        onClick={e => {
          handleClick(e)
        }}
      >
        <div className='start-button'>
          {mode === 'start' ? (
            <span>STOP</span>
          ) : mode === 'finish' ? (
            <span>RESET</span>
          ) : (
            <span>START</span>
          )}
        </div>
      </div>
    )
  }
}

export default Button
