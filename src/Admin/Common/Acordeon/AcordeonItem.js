import React from 'react'
import PropTypes from 'prop-types'

class AcordeonItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      formData: [],
      name: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.toggleAcoordeon = this.toggleAcoordeon.bind(this)
  }

  handleChange (e) {
    const {name, value} = e.target
    this.setState({[name]: value})
  }

  toggleAcoordeon (e, id) {
    e.stopPropagation()
    this.props.toggleItem(id)
  }

  render () {
    const {placeholder, id, isOpen} = this.props
    const {name} = this.state

    return (
      <div className={'type-card ' + (isOpen ? 'isOpen' : '')} >
        <div className='panel' onClick={(e) => this.toggleAcoordeon(e, id)}>
          <input className='h3'
            name='name'
            onChange={this.handleChange}
            onClick={e => e.stopPropagation()}
            placeholder={placeholder}
            type='text' value={name} />
          {
            isOpen
              ? <i className='fas fa-angle-up ' />
              : <i className='fas fa-angle-down' />
          }
        </div>
        <div className='acordeonHidden'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

AcordeonItem.propTypes = {
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  toggleItem: PropTypes.func.isRequired
}

AcordeonItem.defaultProps = {
  isOpen: false
}

export default AcordeonItem
