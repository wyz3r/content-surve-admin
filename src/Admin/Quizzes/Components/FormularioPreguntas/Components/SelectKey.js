import React from 'react'
import PropTypes from 'prop-types'

class SelectKey extends React.Component {
  constructor (props) {
    super(props)
    this.dataRespuestas = JSON.parse(window.localStorage.getItem('respuestas'))
  }

  render () {
    const {type, saveItem, respIndex} = this.props
    return (
      <div className='content-select'>
        <select className='key-panel'
          name='key'
          onChange={(e) => saveItem(e, respIndex)}
          value={type}
          required>
          <option value=''>Elige...</option>
          {
            Object.values(this.dataRespuestas).map((id, index) => {
              const key = id.key
              return <option key={index} value={key}>{key}</option>
            })
          }
        </select>
        <div className='invalid-feedback' />
      </div>
    )
  }
}

export default SelectKey

SelectKey.propTypes = {
  respIndex: PropTypes.number,
  saveItem: PropTypes.func,
  type: PropTypes.string
}
