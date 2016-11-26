import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import DevTools from '../tools/DevTools'
import Main from '../containers'

export default function Root(props) {
  const { store } = props

  return (
    <Provider store={store}>
      <div style={{ height: '100%' }}>
        <DevTools />
        <Main />
      </div>
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
    ]),
  ).isRequired,
}
