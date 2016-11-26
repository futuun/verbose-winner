import React from 'react'
import renderer from 'react-test-renderer'
import TestUtils from 'react-addons-test-utils'
import { Game } from './Game'
import * as actions from './actions'

const initialState = {
  missedLetters: ['A'],
  exposedLetters: ['Y'],
  wordFetching: false,
  secretWord: 'KOPYTKO',
}

test('Initial state snapshot', () => {
  fetch.mockResponse(JSON.stringify({ word: 'kopytko' }))

  const component = renderer.create(
    <Game data={initialState} {...actions} />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

describe('Game: theEnd set to true (returns null for every input)', () => {
  const view = TestUtils.renderIntoDocument(
    <Game {...actions} data={{ theEnd: true }} />
  )

  it('Key `s`', () => {
    const result = view.handleKeyUpEvent({ key: 's', keyCode: 83, which: 83 })
    expect(result).toBeNull()
  })

  it('Empty call', () => {
    const result = view.handleKeyUpEvent()
    expect(result).toBeNull()
  })
})

describe('Game: handleKeyUpEvent', () => {
  const view = TestUtils.renderIntoDocument(
    <Game
      {...actions}
      letterExposed={() => 'letterExposed'}
      letterMissed={() => 'letterMissed'}
      fetchNewWord={() => 'fetchNewWord'}
      data={initialState}
    />
  )

  it('should pass S to letterMissed', () => {
    const result = view.handleKeyUpEvent({ key: 's', keyCode: 83, which: 83 })
    expect(result).toEqual('letterMissed')
  })

  it('Should do nothing', () => {
    const result = view.handleKeyUpEvent({ key: 'shift', keyCode: 16, which: 16 })
    expect(result).toBeNull()

    const result2 = view.handleKeyUpEvent('y')
    expect(result2).toBeNull()

    const result3 = view.handleKeyUpEvent('a')
    expect(result3).toBeNull()

    const result4 = view.handleKeyUpEvent({ key: 'A', keyCode: 97, which: 97 })
    expect(result4).toEqual(false)
  })

  it('Should add to missed', () => {
    const result = view.handleKeyUpEvent({ key: 'q', keyCode: 81, which: 81 })
    expect(result).toEqual('letterMissed')
  })

  it('Should add to exposed', () => {
    const result = view.handleKeyUpEvent({ key: 'o', keyCode: 79, which: 79 })
    expect(result).toEqual('letterExposed')
  })
})

describe('Game: getLetterFromKeyEvent', () => {
  it('Should return `S`', () => {
    const result = Game.getLetterFromKeyEvent({ key: 's', keyCode: 83, which: 83 })
    expect(result).toEqual('S')
  })

  it('Should return `A`', () => {
    const result = Game.getLetterFromKeyEvent({ key: 'A', keyCode: 97, which: 97 })
    expect(result).toEqual('A')
  })

  it('Should return null', () => {
    const result = Game.getLetterFromKeyEvent({ key: 'Shift', keyCode: 16, which: 16 })
    expect(result).toBeNull()
  })
})

describe('Game: checkIfCharExist', () => {
  const view = TestUtils.renderIntoDocument(
    <Game
      {...actions}
      letterExposed={() => 'letterExposed'}
      letterMissed={() => 'letterMissed'}
      fetchNewWord={() => 'fetchNewWord'}
      data={initialState}
    />
  )

  it('Shouldn\'t add', () => {
    const result = view.checkIfCharExist('A')
    expect(result).toEqual(false)

    const result2 = view.checkIfCharExist('Y')
    expect(result2).toEqual(false)
  })

  it('Should add to missed', () => {
    const result = view.checkIfCharExist('Q')
    expect(result).toEqual('letterMissed')
  })

  it('Should add to exposed', () => {
    const result = view.checkIfCharExist('O')
    expect(result).toEqual('letterExposed')
  })
})
