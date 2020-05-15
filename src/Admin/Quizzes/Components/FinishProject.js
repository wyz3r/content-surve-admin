import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'

class FinishProject extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <div className='add-item'>
        <div>¡Terminado!</div>
        <Link to='/admin/proyectos/agregar'>Finish</Link>
      </div>
    )
  }
}

export default FinishProject

// AddItems.propTypes = {
//   onClick: PropTypes.func.isRequired
// }
