import React from 'react'
import PropTypes from 'prop-types'
import {GeneralButton} from './../Common'

const StepButtons = (props) => (
  <div className='form-footer'>
    {(props.back && props.back !== undefined) ? <GeneralButton content='Anterior' styles={{justifySelf: 'start'}} handleClick={props.back} /> : '' }
    {(props.next && props.next !== undefined) ? <GeneralButton content='Siguiente' styles={{justifySelf: 'end'}} handleClick={props.next} /> : '' }
  </div>
)

StepButtons.propTypes = {
  back: PropTypes.func,
  next: PropTypes.func
}

export {StepButtons}
