import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { AppContainer, DetailsFormContainer, DocumentsFormContainer } from 'components/containers'

const routes = (
  <Router history={browserHistory}>
    <Router path='/' component={AppContainer}>
      <IndexRoute component={DetailsFormContainer} />
      <Router path='documents' component={DocumentsFormContainer} />
    </Router>
  </Router>
)

export default routes
