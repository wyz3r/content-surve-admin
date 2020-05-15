import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Paper from './Paper'
import SucessNotice from './SuccessNotice'

class ResetPassword extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      password: '',
      confirm: '',
      error: false,
      sucess: false,
      oobCode: '',
      apiKey: ''
    }
    this.handlerChange = this.handlerChange.bind(this)
    this.handlerSubmit = this.handlerSubmit.bind(this)
    this.validatePassword = this.validatePassword.bind(this)
  }

  componentWillMount () {
    let oobCode = this.getParameterByName('oobCode', window.location)
    let apiKey = this.getParameterByName('apiKey', window.location)
    this.setState({
      oobCode,
      apiKey
    })
  }

  getParameterByName (name, href) {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]')
    var regexS = '[\\?&]' + name + '=([^&#]*)'
    var regex = new RegExp(regexS)
    var results = regex.exec(href)
    if (results == null) {
      return ''
    } else {
      return decodeURIComponent(results[1].replace(/\+/g, ' '))
    }
  }

  handlerChange (e) {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  handlerSubmit (e) {
    e.preventDefault()
    const {oobCode, apiKey, password} = this.state
    const body = {
      oobCode,
      newPassword: password
    }
    if (this.validatePassword()) {
      axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/resetPassword?key=${apiKey}`, body)
        .then((res) => {
          console.log(res)
          this.setState({sucess: true, error: false})
        })
        .catch((error) => {
          console.log(error)
          this.setState({
            error: true,
            errorText: 'La solicitud caducó o ya se usó el vínculo.'
          })
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
    const { error, errorText, sucess } = this.state
    return (
      <div className='reset-pass-content'>
        {
          sucess
            ? <SucessNotice
              title='¡Listo!'
              paragraph='Tu contraseña ha sido actualizada. Ya puedes iniciar sesión.' />
            : <Paper
              estilo='passwords'
              principal='Recuperar contraseña'
              secundario='Registra una nueva contraseña'
              handlerChange={this.handlerChange}
              handlerSubmit={this.handlerSubmit}
              formModel={[
                {key: 'password', label: 'Nueva contraseña', type: 'password', props: {required: true}},
                {key: 'confirm', label: 'Confirmar contraseña', type: 'password', props: {required: true}}

              ]}
              submitButton='Restablecer'
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

export default ResetPassword
