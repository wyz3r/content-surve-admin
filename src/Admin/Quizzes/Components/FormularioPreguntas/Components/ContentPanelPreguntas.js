import React from 'react'
import PropTypes from 'prop-types'

// Components
import {GeneralButton, DeleteConfirmation} from './../../../../Common'
import InputText from './InputText'
import InputImage from './InputImage'

const ui = {
  fontSize: '0.8rnpm em',
  height: '2rem',
  width: '150px'
}

const Panel = ({name, saveItem, panel}) => {
  return (
    <div className='title-panel'>
      <input className='h3'
        name='pregunta'
        onChange={(e) => saveItem(e, panel)}
        onClick={e => e.stopPropagation()}
        placeholder='Escribe tu pregunta'
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
      modalOpen: false,
    }
    this.onOpenModal = this.onOpenModal.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  onOpenModal (e) {
    e.preventDefault()
    this.setState({ modalOpen: true })
  }

  onCloseModal () {
    this.setState({ modalOpen: false })
  }

  handleDelete (e) {
    e.preventDefault()
    const {deleteItem} = this.props
    this.onCloseModal()
    deleteItem()
  }

  render () {
    const {modalOpen} = this.state
    const {saveItem, saveRespuesta, pregunta, deleteImage, updateImage, showFormAnswer, deleteAnswer, panel} = this.props
    const {type, respuestas, mode} = pregunta
    return (<React.Fragment>
      {
        type === '' && <div className='select-type'>
          <p>Selecciona el tipo de pregunta:</p>
          <div className='radio-content'>
            <input type='radio' id='type1' name='type' value='text' onChange={(e) => saveItem(e, panel)} />
            <label htmlFor='type1'>Texto</label>
          </div>
          <div className='radio-content'>
            <input type='radio' id='type2' name='type' value='image' onChange={(e) => saveItem(e, panel)} />
            <label htmlFor='type2'>Imagen</label>
          </div>
        </div>
      }
      {
        type === 'text' && <div className='respuestas-texto'>
          <InputText
            respuestas={respuestas}
            saveItem={saveRespuesta}
            deleteAnswer={deleteAnswer} />
          <div className='actions'>
            <GeneralButton content='Eliminar pregunta' styles={ui} type='dangerButton' handleClick={(e) => this.onOpenModal(e)} />
            <DeleteConfirmation
              handleDelete={this.handleDelete}
              modalOpen={modalOpen}
              onCloseModal={this.onCloseModal}
              text={'esta pregunta'} />
            <i className='fas fa-plus-circle' onClick={showFormAnswer} />
          </div>
        </div>
      }
      {
        type === 'image' && <div className='respuestas-image'>
          <InputImage
            respuestas={respuestas}
            saveItem={saveRespuesta}
            deleteImage={deleteImage}
            updateImage={updateImage}
            deleteAnswer={deleteAnswer} />
          <div className='actions'>
            <GeneralButton content='Eliminar pregunta' styles={ui} type='dangerButton' handleClick={(e) => this.onOpenModal(e)} />
            <DeleteConfirmation
              handleDelete={this.handleDelete}
              modalOpen={modalOpen}
              onCloseModal={this.onCloseModal}
              text={'esta pregunta'} />
            <i className='fas fa-plus-circle' onClick={showFormAnswer} />
          </div>
        </div>
      }
      <div className='content-select'>
        <select className='key-panel'
          name='mode '
          onChange={(e) => saveItem(e, panel)}
          value={mode}
          required>
          <option value='Simple'>Simple</option>
          <option value='multiple'>Multiple</option>
        </select>
        <div className='invalid-feedback' />
      </div>
      
    </React.Fragment>)
  }
}

Panel.propTypes = {
  name: PropTypes.string,
  saveItem: PropTypes.func
}

PanelDetail.proptypes = {
  deleteAnswer: PropTypes.func,
  deleteImage: PropTypes.func,
  deleteItem: PropTypes.func,
  pregunta: PropTypes.shape({
    pregunta: PropTypes.string,
    respuestas: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
        key: PropTypes.string,
        text: PropTypes.string
      })
    ),
    type: PropTypes.string
  }),
  saveItem: PropTypes.func,
  saveRespuesta: PropTypes.func,
  showFormAnswer: PropTypes.func,
  updateImage: PropTypes.func
}

export {Panel, PanelDetail}
