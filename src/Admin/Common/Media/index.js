import React from 'react'
import PropTypes from 'prop-types'
import checkUrl from './../../helpers/checkUrl'
import {stringSlug} from '../../helpers/stringUtils'
import axios from 'axios'

// Components
import {GeneralButton} from './../../Common'
import UploadFile from './Components/UploadFile'
import FilePreview from './Components/FilePreview'

const domain = process.env.REACT_APP_URL

const ui = {
  height: '2rem',
  width: '120px'
}

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      files: [],
      previewAWS: '',
      pressValue: 0
    }
    this.handleDrop = this.handleDrop.bind(this)
    this.getAwsUrl = this.getAwsUrl.bind(this)
    this.previewUpload = this.previewUpload.bind(this)
    this.deleteImage = this.deleteImage.bind(this)
  }

  handleDrop (acceptedFiles, rejectedFiles) {
    if (acceptedFiles.length > 0) {
      this.setState({
        files: acceptedFiles
      })
      this.getAwsUrl(this.state)
    } else if (rejectedFiles.length > 0) {
      alert('Tu archivo no es compatible.')
    }
  }

  deleteImage (e) {
    e.preventDefault()
    const {closePreview} = this.props
    this.setState({pressValue: 0})
    closePreview()
  }

  getAwsUrl (estado) {
    let {files} = estado
    const cuestionario = JSON.parse(window.localStorage.getItem('cuestionario'))
    const  folder = cuestionario.slug
    const {handleImage} = this.props
    const file = files[0]
    const pureName = file.name.substr(0, file.name.lastIndexOf('.')) || file.name
    const extension = (/[.]/.exec(file.name)) ? /[^.]+$/.exec(file.name)[0] : null
    const name = stringSlug(pureName)
    const paylod = {
      filetype: file.type,
      name: `${name}.${extension}`,
      folder
    }
    axios.post(`${domain}/addMultimedia`, paylod)
      .then(response => {
        const { signedRequest, url } = response.data
        const xhr = new XMLHttpRequest()
        xhr.upload.onprogress = e => {
          if (e.lengthComputable) {
            const percentageCompleted = Math.floor((e.loaded * 100) / e.total)
            this.setState({pressValue: percentageCompleted})
          }
        }
        xhr.open('PUT', signedRequest)
        xhr.send(file)
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              // console.log(url)
              handleImage(url)
            } else {
              console.log('Could not upload file.')
            }
          }
        }
      }).catch(error => {
        console.log(error)
      })
  }

  previewUpload () {
    const {src} = this.props
    return (
      <React.Fragment>
        <FilePreview src={src} />
        <div className='delete-footer'>
          <GeneralButton content='Cancelar'
            handleClick={e => { this.deleteImage(e) }}
            type='dangerButton'
            styles={ui} />
        </div>
      </React.Fragment>
    )
  }

  render () {
    const {handleChange, text, src, requerido} = this.props
    const {pressValue} = this.state
    return (
      <section className='media-container'>
        <label htmlFor='image'>{text}</label>
        {/* <div > */}
        <input
          className='fake-input'
          maxLength='300'
          name='image'
          onChange={handleChange}
          placeholder='Pega la url de tu imagen aquí o, subela aquí abajo'
          type='text'
          value={src}
          required={requerido} />
        {
          (src.length === 0)
            ? null
            : <i className='fas fa-backspace' onClick={e => { this.deleteImage(e) }} />
        }
        {/* </div> */}
        {
          (src.length === 0)
            ? pressValue !== 0
              ? <progress value={pressValue} max='100' />
              : <UploadFile handleDrop={this.handleDrop} />
            : src !== ''
              ? this.previewUpload(src)
              : (checkUrl(src))
                ? this.previewUpload(src)
                : <p className='invalid-feedback'>
                  <i className='fas fa-times' />
                    Tu imagen no es válida
                </p>
        }
        <div className='invalid-feedback' />
      </section>
    )
  }
}

export default Index

Index.propTypes = {
  closePreview: PropTypes.func,
  handleChange: PropTypes.func,
  src: PropTypes.string,
  text: PropTypes.string
}

Index.defaultProps = {
  src: ''
}
