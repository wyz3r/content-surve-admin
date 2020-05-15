import React from 'react'
import PropTypes from 'prop-types'
import {DeleteConfirmation} from './../../../../Common'
import SelectKey from './SelectKey'

class InputText extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false,
      current: ''
    }
    this.onOpenModal = this.onOpenModal.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  onOpenModal (e) {
    const current = e.target.parentNode.getAttribute('iresp')
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

  render () {
    const {modalOpen} = this.state
    const {respuestas, saveItem} = this.props
    return (
      <React.Fragment>
        {
          respuestas.length > 0
            ? respuestas.map((respuesta, index) => {
              return (
                <div className='input-text' key={index} iresp={index}>
                  <SelectKey
                    type={respuesta.key}
                    saveItem={saveItem}
                    respIndex={index} />
                  <div className='input-resp'>
                    <input className='text-panel'
                      maxLength='200'
                      name='text'
                      onChange={(e) => saveItem(e, index)}
                      placeholder='Escribe una respuesta'
                      required
                      type='text'
                      value={respuesta.text} />
                    <div className='invalid-feedback' />
                  </div>
                  <DeleteConfirmation
                    index={index}
                    handleDelete={(e) => this.deleteItem(e)}
                    modalOpen={modalOpen}
                    onCloseModal={this.onCloseModal}
                    text={'esta respuesta'} />
                  <i className='fas fa-minus-circle' onClick={this.onOpenModal} />
                </div>
              )
            })
            : 'No puedes crear respuestas si no creas resultados :C'
        }
      </React.Fragment >)
  }
}

InputText.propTypes = {
  deleteAnswer: PropTypes.func,
  respuestas: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      key: PropTypes.string,
      text: PropTypes.string
    })
  ),
  saveItem: PropTypes.func
}

export default InputText
