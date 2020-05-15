import React from 'react'
import PropTypes from 'prop-types'

const FilePreview = (props) => (
  <div className='preview-file'>
    <div className='file'>
      <img width='100%' height='auto' src={props.src} alt='file-upload' />
    </div>
  </div>
)

export default FilePreview

FilePreview.propTypes = {
  src: PropTypes.string.isRequired
}
