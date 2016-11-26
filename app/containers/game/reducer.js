import update from 'immutability-helper'
import types from './actionTypes'

const initialState = {
  missedLetters: [],
  exposedLetters: [],
  wordFetching: false,
}

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case types.wordFetching:
      return update(state, {
        wordFetching: { $set: true },
      })
    case types.wordFetchingError:
      return {
        fetchingError: true,
      }
    case types.letterMissed:
      return update(state, {
        missedLetters: { $push: [action.key] },
      })
    case types.letterExposed:
      return update(state, {
        exposedLetters: { $push: [action.key] },
      })
    case types.newWord:
      return update(initialState, {
        secretWord: { $set: action.word.toUpperCase() },
      })
    default:
      return state
  }
}

export { initialState }
