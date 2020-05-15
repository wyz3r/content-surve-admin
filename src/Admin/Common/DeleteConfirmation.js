import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-responsive-modal'

// Components
import {GeneralButton} from './GeneralButton'

const cancel = {
  height: '2rem',
  width: '6rem'
}

const acept = {
  height: '2rem',
  width: '6rem'
}

class DeleteConfirmation extends React.Component {
  render () {
    const {handleDelete, modalOpen, onCloseModal, text} = this.props
    return (
      <Modal
        open={modalOpen}
        classNames={{ overlay: 'custom-overlay', modal: 'custom-modal' }}
        center
        closeOnOverlayClick={false}
        closeOnEsc={false}
        showCloseIcon={false}
        onClose={onCloseModal} >
        <div>
          <p>{`¿Estás seguro que deseas eliminar ${text}?`}</p>
          <div className='delete-footer'>
            <GeneralButton content='Cancelar' handleClick={onCloseModal} type='dangerButton' styles={cancel} />
            <GeneralButton content='Aceptar' handleClick={handleDelete} styles={acept} />
          </div>
        </div>
      </Modal>
    )
  }
}

export {DeleteConfirmation}

DeleteConfirmation.propTypes = {
  handleDelete: PropTypes.func,
  modalOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}
