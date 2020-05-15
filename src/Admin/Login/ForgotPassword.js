import React from 'react'
import firebase from 'firebase/app'
import { Link } from 'react-router-dom'
import Paper from './Paper'
import SuccessNotice from './SuccessNotice'

class ForgotPassword extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      error: false,
      errorText: '',
      sucess: false
    }
    this.handlerChange = this.handlerChange.bind(this)
    this.handlerSubmit = this.handlerSubmit.bind(this)
  }

  handlerChange (e) {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  handlerSubmit (e) {
    e.preventDefault()
    const {email} = this.state
    firebase.auth().sendPasswordResetEmail(email)
      .then((resp) => {
        this.setState({sucess: true})
      })
      .catch((error) => {
        console.log(error)
        if (error.code === 'auth/invalid-email') {
          this.setState({
            errorText: 'Por favor, ingresa un email válido.',
            error: true})
        } if (error.code === 'auth/user-not-found') {
          this.setState({
            errorText: 'Ups, usuario no encontrado.',
            error: true})
        }
      })
  }

  render () {
    const {error, errorText, sucess} = this.state
    return (
      <div className='forget-pass-content'>
        {/* <SuccessNotice
          title='¡Revisa tu Inbox!'
          paragraph='Hemos enviado un email con instrucciones para que puedas recuperar tu contraseña.' /> */}
        {
          sucess
            ? <SuccessNotice
              title='¡Revisa tu Inbox!'
              paragraph='Hemos enviado un email con instrucciones para que puedas recuperar tu contraseña.' />
            : <Paper
              estilo='passwords'
              principal='Recuperar contraseña'
              secundario='¿Olvidaste tu contraseña?'
              handlerChange={this.handlerChange}
              handlerSubmit={this.handlerSubmit}
              formModel={[
                {key: 'email', label: 'Email', type: 'email', props: {required: true}}
              ]}
              submitButton='Recuperar'
              errorText={errorText}
              errorStatus={error}>
              <div className='footer-standar'>
                <Link to='/'>Cancelar</Link>
              </div>
            </Paper>
        }
      </div>
    )
  }
}

export default ForgotPassword
