import React from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'
// import QuizzList from './QuizzList'
import AddQuizz from './AddQuizz'
// import FinishProject from './Components/FinishProject'

const Index = ({match}) => {
  // console.log(match.path)
  return (
    <div className='quizz-content'>
      <Switch>
        {/* <Route
          path={`${match.path}`}
          exact
          component={QuizzList} /> */}
        {/* <Route
          path={`${match.path}/:projectid/nuevo`}
          component={AddQuizz} />
        <Route
          path={`${match.path}/final`}
          component={FinishProject}
        /> */}
        <Route
          path={`${match.path}/:idsurvey`}
          component={AddQuizz}
          exact
        />
        
      </Switch>
    </div>
  )
}

export default Index
