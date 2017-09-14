import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import routes from 'config/routes'
import * as reducers from 'store'

import 'style/main.scss'

export const store = createStore(combineReducers(reducers),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
)

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('app')
)
