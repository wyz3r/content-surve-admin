import React from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'

import ProjectList from './ProjectList'
import AddProject from './AddProject'

const Index = ({match}) => {
  console.log(match.path)
  return (
    <div className='project-content'>
      <Switch>
        <Route
          path={`${match.path}`}
          exact
          component={ProjectList} />
        <Route
          path={`${match.path}/nuevo`}
          exact
          component={AddProject} />
      </Switch>
    </div>
  )
}

export default Index
