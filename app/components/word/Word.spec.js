import React from 'react'
import renderer from 'react-test-renderer'
import Word from './Word'

test('Word: no exposed letters', () => {
  const component = renderer.create(
    <Word
      secretWord="kopytko"
      exposedLetters={[]}
    />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Word: 1 letter exposed, 2 occurrences', () => {
  const component = renderer.create(
    <Word
      secretWord="kopytko"
      exposedLetters={['k']}
    />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Word: multiple exposed letters', () => {
  const component = renderer.create(
    <Word
      secretWord="kopytko"
      exposedLetters={['k', 'y', 'o']}
    />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
