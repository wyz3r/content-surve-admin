import React from 'react'
import firebase from 'firebase/app'
import { Link } from 'react-router-dom'
import Paper from './Paper'
import SuccessNotice from './SuccessNotice'

class SignUp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      confirm: '',
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
    const {email, password} = this.state
    e.preventDefault()
    if (this.validatePassword(password)) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(resp => {
          console.log(resp)
          const user = firebase.auth().currentUser
          user.sendEmailVerification()
            .then((param) => {
              console.log(param)
              this.setState({
                error: false,
                sucess: true
              })
            })
            .catch((error) => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
          if (error.code === 'auth/invalid-email') {
            this.setState({
              errorText: 'Por favor, ingresa un email válido.',
              error: true})
          } if (error.code === 'auth/weak-password') {
            this.setState({
              errorText: 'La contraseña debe tener más de 6 caracteres.',
              error: true})
          } if (error.code === 'auth/email-already-in-use') {
            this.setState({
              errorText: 'Ups, el email se encuentra asociado a otra cuenta.',
              error: true})
          }
        })
    } else {
      this.setState({
        error: true,
        errorText: 'Las contraseñas no coinciden.'
      })
    }
  }

  validatePassword () {
    const {password, confirm} = this.state
    const isValid = password === confirm
    return isValid
  }

  render () {
    const {error, errorText, sucess} = this.state
    return <div className='register-content'>
      {
        sucess
          ? <SuccessNotice
            title='¡Listo!'
            paragraph='Tu cuenta ha sido creada correctamente.' />
          : <Paper
            estilo='register'
            principal='Registro'
            secundario='Crea tu cuenta'
            handlerChange={this.handlerChange}
            handlerSubmit={this.handlerSubmit}
            formModel={[
              {key: 'email', label: 'Email', props: {required: true}},
              {key: 'password', label: 'Contraseña', type: 'password', props: {required: true}},
              {key: 'confirm', label: 'Confirmar contraseña', type: 'password', props: {required: true}}
            ]}
            submitButton='Crear cuenta'
            errorText={errorText}
            errorStatus={error}>
            <div className='footer-standar'>
              <p>¿Ya tienes cuenta con nosotros? <Link to='/'>Inicia sesión aquí</Link></p>
            </div>
          </Paper>
      }
    </div>
  }
}

export default SignUp
