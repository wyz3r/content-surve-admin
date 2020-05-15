import React from 'react'
import Modal from 'react-responsive-modal'

const EmptyMessage = ({size}) => {
  return (
    <div className='empty-message' style={{fontSize: `${size}`}}>No se ha encontrado ningún elemento para mostrar.</div>
  )
}

const ErrorRequest = () => {
  return (
    <div className='error-container'>
      <h1><i className='far fa-sad-tear' /></h1>
      <div className='error-status'>
        <h2>Oops!</h2>
        {/* <h3>Error en solicitud</h3> */}
        {/* <p>Parece que ha ocurrido un error con tu solicitud. Por favor intentalo más tarde.</p> */}
      </div>
    </div>
  )
}

const ErrorSend = ({modalOpen, onCloseModal}) => {
  return (
    <Modal
      open={modalOpen}
      classNames={{ overlay: 'custom-overlay', modal: 'modal-errorSend' }}
      center
      closeOnOverlayClick={false}
      closeOnEsc={false}
      showCloseIcon={false}
      onClose={onCloseModal} >
      <div className='modal-error'>
        <h1 className='iconModal-error'><i className='fas fa-cogs' /></h1>
        <div className='error-status'>
          <h2>Oops!</h2>
          <p>Algo salió mal al intentar guardar tus datos. Intentalo de nuevo, por favor.</p>
        </div>
        <div className='buttonsModal-error'>
          {/* <button className='button dangerButton' onClick={onCloseModal}>Cancelar</button> */}
          <button className='button' onClick={onCloseModal}>Reintentar</button>
        </div>
      </div>
    </Modal>
  )
}

export {EmptyMessage, ErrorRequest, ErrorSend}
