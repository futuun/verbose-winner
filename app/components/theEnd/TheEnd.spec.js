import React from 'react'
import renderer from 'react-test-renderer'
import TheEnd from './TheEnd'

test('TheEnd: loading', () => {
  const component = renderer.create(
    <TheEnd loading />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('TheEnd: game over', () => {
  const component = renderer.create(
    <TheEnd loading={false} />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
