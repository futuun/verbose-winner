import types from './actionTypes'

/**
 * Returns action that setts given key as missed
 *
 * @export
 * @param {string} key Character
 * @returns
 */
export function letterMissed(key) {
  return {
    type: types.letterMissed,
    key,
  }
}

/**
 * Returns action that setts given key as exposed
 *
 * @export
 * @param {string} key Character
 * @returns
 */
export function letterExposed(key) {
  return {
    type: types.letterExposed,
    key,
  }
}

/**
 * Returns action that ends game
 *
 * @export
 * @param {string} theEnd 'lost' || 'won'
 * @returns
 */
export function theEnd(result) {
  return {
    type: types.theEnd,
    theEnd: result,
  }
}

/**
 * Returns action that reset state and setts new word
 *
 * @param {string} word New secret word
 * @returns
 */
function newWord(word) {
  return {
    type: types.newWord,
    word,
  }
}

export function fetchNewWord() {
  return (dispatch) => {
    dispatch({ type: types.wordFetching })
    const uri = 'http://api.wordnik.com:80/v4/words.json/randomWord' +
      '?hasDictionaryDef=true' +
      '&includePartOfSpeech=noun' +
      '&minCorpusCount=0' +
      '&maxCorpusCount=-1' +
      '&minDictionaryCount=1' +
      '&maxDictionaryCount=-1' +
      '&minLength=5' +
      '&maxLength=11' +
      '&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'

    return fetch(uri)
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(res => res.word)
      .then(word => dispatch(newWord(word)))
      .catch(() => dispatch({ type: types.wordFetchingError }))
  }
}
