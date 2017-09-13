import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { AppContainer, DetailsFormContainer, UploadsFormContainer } from 'components/containers'

const routes = (
  <Router history={hashHistory}>
    <Router path='/' component={AppContainer}>
      <IndexRoute component={DetailsFormContainer} />
      <Router path='upload' component={UploadsFormContainer} />
    </Router>
  </Router>
)

export default routes
