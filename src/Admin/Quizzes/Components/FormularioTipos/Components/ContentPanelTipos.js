import React from 'react'
import PropTypes from 'prop-types'
// Components
import {GeneralButton, DeleteConfirmation} from './../../../../Common'
import UploadFile from './../../../../Common/Media'

const Panel = ({name, panel, saveItem}) => {
  return (
    <div className='title-panel'>
      <input className='h3'
        name='name'
        onChange={(e) => saveItem(e, panel)}
        onClick={e => e.stopPropagation()}
        placeholder='El nombre del tipo de resultado.'
        type='text' value={name}
        required />
      <div className='invalid-feedback' />
    </div>
  )
}

class PanelDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false
    }
    this.onOpenModal = this.onOpenModal.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleImage = this.handleImage.bind(this)
  }

  onOpenModal (e) {
    e.preventDefault()
    this.setState({ modalOpen: true })
  }

  onCloseModal () {
    this.setState({ modalOpen: false })
  }

  handleDelete () {
    const {deleteItem, panel} = this.props
    this.onCloseModal()
    deleteItem(panel)
  }

  handleImage (image) {
    const {updateImage, panel} = this.props
    updateImage(image, panel)
  }

  render () {
    const {saveItem, respuesta, panel, deleteImage} = this.props
    const {description, key, image} = respuesta
    const {modalOpen} = this.state
    
    return (<React.Fragment>
      <div className='uno'>
        <div className='text-type'>
          <textarea name='description'
            onChange={(e) => saveItem(e, panel)}
            placeholder='La descripción del tipo de resultado.'
            row='10'
            required
            value={description} />
          <div className='invalid-feedback' />
          <p>
            {`Tipo: `}
            <input className='h3'
              name='key'
              onChange={(e) => saveItem(e, panel)}
              type='text'
              required
              value={key} />
          </p>
          <div className='invalid-feedback' />
        </div>
        <div className='img-type'>
          <UploadFile
            closePreview={() => deleteImage(panel)}
            handleChange={(e) => saveItem(e, panel)}
            handleImage={this.handleImage}
            src={image}
            text='Imagen para tu resultado'
            requerido />
          <div className='invalid-feedback' />
        </div>
      </div>
      <div className='dos'>
        <GeneralButton content='Eliminar resultado' handleClick={(e) => { this.onOpenModal(e) }} type='dangerButton' />
        <DeleteConfirmation
          handleDelete={this.handleDelete}
          modalOpen={modalOpen}
          onCloseModal={this.onCloseModal}
          text={'este resultado'} />
      </div>
    </React.Fragment>)
  }
}

Panel.propTypes = {
  name: PropTypes.string,
  panel: PropTypes.string,
  saveItem: PropTypes.func
}

PanelDetail.propTypes = {
  deleteImage: PropTypes.func,
  deleteItem: PropTypes.func,
  panel: PropTypes.string,
  respuesta: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    key: PropTypes.string,
    name: PropTypes.string
  }),
  saveItem: PropTypes.func,
  updateImage: PropTypes.func
}

export {Panel, PanelDetail}
