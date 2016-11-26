import React from 'react'
import renderer from 'react-test-renderer'
import Letter from './Letter'

test('Letter: unexposed, active', () => {
  const component = renderer.create(
    <Letter
      value="A"
      exposed={false}
      inactive={false}
    />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Letter: exposed, active', () => {
  const component = renderer.create(
    <Letter
      value="A"
      exposed
      inactive={false}
    />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Letter: inactive', () => {
  const component = renderer.create(
    <Letter inactive />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
