import React from 'react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { AppContainer } from 'react-hot-loader'
import configureStore from './store'
import Root from './root'
import './root.raw.sass'

injectTapEventPlugin()
const store = configureStore()
const rootEl = document.getElementById('root')

render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>, rootEl)

if (module.hot) {
  module.hot.accept('./root', () => {
    const Next = require('./root').default

    render(
      <AppContainer>
        <Next store={store} />
      </AppContainer>, rootEl)
  })
}
