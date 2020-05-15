import React from 'react'
import Modal from 'react-responsive-modal'
import Input from './input'

const modalDatos = (props) => (
  <Modal
    open={props.modalOpen}
    classNames={{ overlay: 'custom-overlay', modal: 'custom-modal' }}
    center
    closeOnOverlayClick={false}
    closeOnEsc={false}
    showCloseIcon={false}
    onClose={() => {}}
  >
    <h2>Ingresa tus datos</h2>
    <div className='formModal'>
      <Input typetype='text' handleChange={props.handleChange} name={'name'} label={'Nombre'} />
      <Input typetype='text' handleChange={props.handleChange} name={'empresa'} label={'Empresa'} />
      <Input typetype='email' handleChange={props.handleChange} name={'email'} label={'Email'} />
      { props.modalError ? <div className='modalError'>{props.modalError}</div> : '' }
      <div className='btn btnEnviar' onClick={props.send}>Enviar</div>
    </div>
  </Modal>
)

export default modalDatos
