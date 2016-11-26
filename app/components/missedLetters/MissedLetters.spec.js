import React from 'react'
import renderer from 'react-test-renderer'
import MissedLetters from './MissedLetters'

test('MissedLetters: empty', () => {
  const component = renderer.create(
    <MissedLetters />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('MissedLetters: one letter', () => {
  const component = renderer.create(
    <MissedLetters
      letters={['x']}
    />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('MissedLetters: more than one letter', () => {
  const component = renderer.create(
    <MissedLetters
      letters={['a', 'b', 'c', 'd']}
    />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
