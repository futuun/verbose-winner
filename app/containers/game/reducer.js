import update from 'immutability-helper'
import types from './actionTypes'

const initialState = {
  missedLetters: [],
  exposedLetters: [],
  wordFetching: false,
}

/**
 * Count unique letters in string
 *
 * @param {string} word String to test
 * @returns {number} number of unique letters
 */
function countUniq(word) {
  let uniq = ''
  for (let i = 0; i < word.length; i++) {
    if (word[i] !== '-' && !uniq.includes(word[i])) {
      uniq += word[i]
    }
  }

  return uniq.length
}

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case types.wordFetching:
      return update(initialState, {
        wordFetching: { $set: true },
      })
    case types.wordFetchingError:
      return { fetchingError: true }
    case types.letterMissed:
      return update(state, {
        missedLetters: { $push: [action.key] },
      })
    case types.letterExposed:
      return update(state, {
        exposedLetters: { $push: [action.key] },
      })
    case types.newWord:
      return update(initialState, { $merge: {
        secretWord: action.word.toUpperCase(),
        uniqLetters: countUniq(action.word),
      } })
    case types.theEnd:
      return update(state, { $merge: {
        theEnd: action.theEnd,
      } })
    default:
      return state
  }
}

export { initialState }
