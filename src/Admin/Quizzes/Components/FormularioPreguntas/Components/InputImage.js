import React from 'react'
// import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import UploadFile from './../../../../Common/Media'
import {DeleteConfirmation} from './../../../../Common'
import SelectKey from './SelectKey'

class InputImage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false,
      current: ''
    }
    this.onOpenModal = this.onOpenModal.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.handleImage = this.handleImage.bind(this)
  }

  onOpenModal (e) {
    const current = e.target.parentNode.parentNode.getAttribute('iresp')
    e.preventDefault()
    this.setState({
      modalOpen: true,
      current: parseInt(current, 10)
    })
  }

  onCloseModal () {
    this.setState({ modalOpen: false })
  }

  deleteItem (e) {
    e.preventDefault()
    const {current} = this.state
    const {deleteAnswer} = this.props
    this.onCloseModal()
    deleteAnswer(current)
  }

  handleImage (image, index) {
    // console.log(image, index)
    const {updateImage} = this.props
    updateImage(image, index)
  }

  render () {
    const {modalOpen} = this.state
    const {respuestas, saveItem, deleteImage} = this.props
    return (
      <div className='content-input'>
        {
          respuestas.length > 0
            ? respuestas.map((resp, index) => {
              return (
                <div className='input-image' key={index} iresp={index}>
                  <div className='input-container'>
                    <DeleteConfirmation
                      index={index}
                      handleDelete={(e) => this.deleteItem(e)}
                      modalOpen={modalOpen}
                      onCloseModal={this.onCloseModal}
                      text={'esta respuesta'} />
                    <i className='fas fa-minus-circle' onClick={this.onOpenModal} />
                    <SelectKey
                      type={resp.key}
                      saveItem={saveItem}
                      respIndex={index} />
                    <div className='input-resp'>
                      <input className='text-panel'
                        maxLength='200'
                        name='text'
                        onChange={(e) => saveItem(e, index)}
                        placeholder='Escribe una respuesta'
                        // required
                        type='text'
                        value={resp.text} />
                      <div className='invalid-feedback' />
                    </div>
                  </div>
                  <UploadFile
                    closePreview={() => { deleteImage(index) }}
                    handleChange={(e) => saveItem(e, index)}
                    handleImage={(e) => this.handleImage(e, index)}
                    src={resp.image}
                    text=''
                    reference='preguntas'
                    requerido />
                  <div className='invalid-feedback' />

                </div>)
            })
            : 'No puedes crear respuestas si no creas resultados :C'
        }
      </div>
    )
  }
}

export default InputImage

InputImage.propTypes = {
  deleteImage: PropTypes.func,
  respuetas: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      key: PropTypes.string,
      text: PropTypes.string
    })
  ),
  saveItem: PropTypes.func,
  updateImage: PropTypes.func
}
