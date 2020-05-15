import React from 'react'
import PropTypes from 'prop-types'

class SimplePanel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  static getDerivedStateFromProps (props, state) {
    if (props.isOpn !== state.isOpen) {
      return {
        isOpen: props.isOpn
      }
    }
    return null
  }

  render () {
    const { isOpen } = this.state
    return (
      <form className='type-card'>
        <div className='panel' onClick={() => this.props.handleShow(this.props.panel)} >
          {this.props.children[0]}
          {isOpen
            ? <i className='fas fa-angle-up ' />
            : <i className='fas fa-angle-down' />}
        </div>
        <div className={`panel-detail ${isOpen}`}>
          {this.props.children[1]}
        </div>
      </form>
    )
  }
}

export {SimplePanel}

SimplePanel.propTypes = {
  handleShow: PropTypes.func,
  isOpn: PropTypes.bool,
  panel: PropTypes.number
}
