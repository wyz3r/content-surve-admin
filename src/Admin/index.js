import React from 'react'
import firebase from 'firebase/app'
import {Route, Switch, Redirect} from 'react-router-dom'
import isLogin from './helpers/isLogin'

// Components
import HeaderMenu from './HeaderMenu'
import Projects from './Projects'
import Quizzes from './Quizzes'
// import QuizzList from './Quizzes/QuizzList'
// import QuizzDetail from './Quizzes/QuizzDetail'
import './Styles/index.css'

class Index extends React.Component {
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
    const {match, location} = this.props
    if (isLogin()) {
      return (
        <div className='admin-content'>
          <HeaderMenu />
          <Switch>
            <Route
              path={`${match.url}`}
              exact >
              <Redirect to={{pathname: '/admin/proyectos'}} />
            </Route>
            <Route
              path={`${match.url}/proyectos`}
              component={Projects} />
            <Route
              path={`${match.url}/quizzes`}
              component={Quizzes} />
            {/* <Route
            path={`${match.url}/quizz/:idQuizz`}
            exact
            component={QuizzDetail} />
            <Route
              path={`${match.url}/proyecto/:projectid`}
              component={QuizzList} /> */}
            
          </Switch>
        </div>
      )
    } else {
      return (
        <Redirect to={{
          pathname: '/',
          state: { from: location }
        }} />
      )
    }
  }
}

export default Index
