import React from 'react'
import PropTypes from 'prop-types'

const GeneralButton = ({disabled, handleClick, styles, type, content}) => (
  <button
    disabled={disabled}
    onClick={handleClick}
    style={styles}
    className={'general-button ' + type}
  >
    {content}
  </button>
)

const BackButton = (props) => {
  return (
    <button className='back-button' onClick={props.handleClick}>
      <i className='fas fa-angle-left' />
      <div>Regresar</div>
    </button>
  )
}

GeneralButton.propTypes = {
  content: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  styles: PropTypes.object
}

GeneralButton.defaultProps = {
  disabled: false,
  handleClick: () => {},
  type: 'default',
  styles: {}
}

export { GeneralButton, BackButton }
