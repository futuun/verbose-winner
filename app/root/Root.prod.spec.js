import React from 'react'
import renderer from 'react-test-renderer'
import configureStore from '../store'
import Root from './Root.prod'

const store = configureStore()

test('Root: initialize app', () => {
  fetch.mockResponse(JSON.stringify({ word: 'kopytko' }))

  const component = renderer.create(
    <Root store={store} />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
