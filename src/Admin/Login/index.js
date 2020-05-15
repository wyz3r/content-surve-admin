import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Link } from 'react-router-dom'
import Paper from './Paper'
import './login.css'
import isLogin from '../helpers/isLogin'

class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: false
    }
    this.login = this.login.bind(this)
    this.handlerChange = this.handlerChange.bind(this)
  }

  login (e) {
    e.preventDefault()
    const {email, pass} = this.state
    firebase.auth().signInWithEmailAndPassword(email, pass)
      .then((param) => {
        firebase.auth().currentUser.getIdToken(true).then((idToken) => {
          window.localStorage.idToken = idToken
          window.location.href = '/admin/proyectos'
          // window.location.href = '/admin/quizzes/nuevo'
        }).catch(function (error) {
          console.log({error})
        })
      })
      .catch((error) => {
        console.log(error)
        if (error.code === 'auth/user-not-found' || 'auth/wrong-password') {
          this.setState({error: true})
        }
      })
  }

  handlerChange (e) {
    const {name} = e.target
    this.setState({[name]: e.target.value})
  }

  render () {
    const {error} = this.state
    const { from } = this.props.location.state || { from: { pathname: '/admin/proyectos' } }
    if (!isLogin()) {
      return (
        <div className='loginMain'>
          <Paper
            estilo='login'
            principal='Iniciar sesión'
            secundario='¡Que bueno verte!'
            handlerChange={this.handlerChange}
            handlerSubmit={this.login}
            formModel={[
              {key: 'email', label: 'Email', props: {required: true}},
              {key: 'pass', label: 'Contraseña', type: 'password', props: {required: true}}
            ]}
            submitButton='Iniciar sesión'
            errorText='Ups!, email o contraseña incorrectos.'
            errorStatus={error}>
            <div className='footer-standar'>
              <Link to='/registro'>Crear nueva cuenta</Link>
              <Link className='forget-pass' to='/forgot-password'>¿Olvidaste tu contraseña?</Link>
            </div>
          </Paper>
        </div>
      )
    } else {
      window.location.href = from.pathname
    }
  }
}

export default Index
