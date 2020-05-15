import React, { Component } from 'react'
import firebase from 'firebase/app'

class HeaderMenu extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  userSignOut () {
    firebase.auth().signOut()
      .then(resp => {
        console.log(resp)
        window.localStorage.removeItem('idToken')
        window.location.href = '/'

      })
      .catch(error => {
        console.log(error)
        alert('No pudimos cerrar tu sesión, intentalo de nuevo')
      })
  }

  render () {
    return (
      <nav className='nav-headermenu'>
        <div className='nav-wrapper'>
          <ul className=''>
            <a href='/admin/proyectos'>
             <li>QuickLearning</li>
            </a>
            <li className='logout' onClick={this.userSignOut}>Cerrar sesión</li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default HeaderMenu
