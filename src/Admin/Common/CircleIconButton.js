import React from 'react'
import PropTypes from 'prop-types'

const CircleIconButton = ({iconClass, type, typeColor, handleClick, size, textSize}) => {
  console.log(handleClick)
  return (
    <div onClick={handleClick} className={type + ' buttonCircle ' + typeColor} style={{width: size, height: size}}>
      <i className={'fas ' + iconClass} style={{fontSize: textSize}} />

    </div>
  )
}

CircleIconButton.propTypes = {
  iconClass: PropTypes.string.isRequired,
  type: PropTypes.string,
  callback: PropTypes.func,
  size: PropTypes.string,
  textSize: PropTypes.string
}

CircleIconButton.defaultProps = {
  typeColor: 'default',
  type: 'butonFill',
  callback: () => {},
  size: '30px',
  textSize: '20px'
}

export default CircleIconButton
