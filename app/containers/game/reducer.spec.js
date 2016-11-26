import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './actions'
import types from './actionTypes'
import reducer, { initialState } from './reducer'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Game reducer: ', () => {
  it(`creates ${types.newWord} when fetchNewWord has been done`, () => {
    const expectedActions = [
      { type: types.wordFetching },
      { type: types.newWord, word: 'kopytko' },
    ]
    const store = mockStore({ game: [] })

    fetch.mockResponseOnce(JSON.stringify({ word: 'kopytko' }))

    return store.dispatch(actions.fetchNewWord())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it(`creates ${types.wordFetchingError} when fetchNewWord has failed`, () => {
    const expectedActions = [
      { type: types.wordFetching },
      { type: types.wordFetchingError },
    ]
    const store = mockStore({ game: [] })

    return store.dispatch(actions.fetchNewWord())
      .then(() => {
        expect(store.getActions())
          .toEqual(expectedActions)
      })
  })

  it(`creates ${types.wordFetchingError} when fetchNewWord has failed due to status code`, () => {
    const expectedActions = [
      { type: types.wordFetching },
      { type: types.wordFetchingError },
    ]
    const store = mockStore({ game: [] })

    fetch.mockResponseOnce('{}', { status: 404 })

    return store.dispatch(actions.fetchNewWord())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it(`creates ${types.wordFetchingError}`, () => {
    expect(reducer({}, { type: types.wordFetchingError }))
      .toEqual({
        fetchingError: true,
      })
  })

  it(`creates ${types.letterExposed} and expose new letter`, () => {
    const key = 'a'
    const expectedAction = [
      { type: types.letterExposed, key }
    ]
    const store = mockStore({ game: [] })
    const currentAction = actions.letterExposed(key)

    store.dispatch(currentAction)
    expect(store.getActions()).toEqual(expectedAction)
    expect(reducer(initialState, currentAction)).toEqual({
      missedLetters: [],
      exposedLetters: [key],
      wordFetching: false,
    })
  })

  it(`creates ${types.letterMissed} and adds new missed letter`, () => {
    const key = 'a'
    const expectedAction = [
      { type: types.letterMissed, key }
    ]
    const store = mockStore({ game: [] })
    const currentAction = actions.letterMissed(key)

    store.dispatch(currentAction)
    expect(store.getActions()).toEqual(expectedAction)
    expect(reducer(initialState, currentAction)).toEqual({
      missedLetters: [key],
      exposedLetters: [],
      wordFetching: false,
    })
  })
})
