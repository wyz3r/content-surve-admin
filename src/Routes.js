import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import firebase from 'firebase/app'
import 'firebase/firestore'



// import BuzzForm from './App/BuzzForm/'
// import SliderMain from './App/dragDrop'
// import Index from './App/'
import Admin from './Admin'
import Login from './Admin/Login'
import SignUp from './Admin/Login/SignUp'
import ForgotPassword from './Admin/Login/ForgotPassword'
import ResetPassword from './Admin/Login/ResetPassword'
const settings = {timestampsInSnapshots: true}


const config = {
  apiKey: "AIzaSyA3vb5TOO912GmDzpd0EAkuHQkXkOwswds",
    authDomain: "content-surveydemo.firebaseapp.com",
    databaseURL: "https://content-surveydemo.firebaseio.com",
    projectId: "content-surveydemo",
    storageBucket: "content-surveydemo.appspot.com",
    messagingSenderId: "188638993620",
    appId: "1:188638993620:web:170a586666915961"
}

firebase.initializeApp(config)
firebase.firestore().settings(settings);



class Routes extends Component {
  componentDidMount () {
    this.calcHeight()

    window.addEventListener('resize', () => {
      this.calcHeight()
    })
  }

  calcHeight () {
    const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    document.querySelector('#root').style['min-height'] = height + 'px'
  }

  render () {
    return (
      <Router>
        <div className='mainContainer'>
          <Route exact path='/' component={Login} />
          <Route path='/admin' component={Admin} />
          <Route path='/reset-password' component={ResetPassword} />
          <Route exact path='/registro' component={SignUp} />
          <Route exact path='/forgot-password' component={ForgotPassword} />

          {/* <Route path={`/login`} exact component={Login} /> */}
          {/* 
          <Route path='/quizz/:id' component={BuzzForm} />
          <Route path='/puzzle/:id' component={SliderMain} /> */}
        </div>
      </Router>
    )
  }
}

export default Routes
