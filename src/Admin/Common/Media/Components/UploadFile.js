import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'

const UploadFile = (props) => (
  <div className='dropzone'>
    <Dropzone accept=' .jpeg, .jpg, .gif, .png, .webp, .svg'
      className='drop'
      onDrop={props.handleDrop}
      disabled={props.disabled === ''}>
      <i className='fas fa-upload' />
      <p>Arrastra tu archivo aquí para subirlo</p>
      <div className='file-button'>o, seleccionalo</div>
    </Dropzone>
  </div>
)

export default UploadFile

UploadFile.propTypes = {
  handleDrop: PropTypes.func
}
