import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import styles from './styles.sass'
import * as actionsToBind from './actions'
import Folk from '../../components/folk'

export class Game extends Component {
  /**
   * Will dispatch char if pressed key was letter.
   * Character will always be uppercase.
   *
   * @param {Event} e An event
   * @return {string} Character if it was letter or null
   * @memberOf Game
   */
  static getLetterFromKeyEvent(e) {
    const charCode = e.which || e.keyCode

    if (charCode >= 65 && charCode <= 90) {
      return String.fromCharCode(charCode)
    } else if (charCode >= 97 && charCode <= 122) {
      return String.fromCharCode(charCode - 32)
    }

    return null
  }

  constructor(props) {
    super(props)

    this.checkIfCharExist = ::this.checkIfCharExist
    this.handleKeyUpEvent = ::this.handleKeyUpEvent
  }

  componentWillMount() {
    document.addEventListener('keyup', this.handleKeyUpEvent, true)
    this.props.fetchNewWord()
  }

  handleKeyUpEvent(e) {
    if (this.props.data.theEnd) return null

    const letter = Game.getLetterFromKeyEvent(e)
    if (letter) {
      return this.checkIfCharExist(letter)
    }

    return null
  }

  /**
   * Checks if character should be addeded to any array.
   *
   * @param {string} char A test character
   * @returns {function|false} Function if should be added
   * @memberOf Game
   */
  checkIfCharExist(char) {
    const {
      data: {
        missedLetters,
        exposedLetters,
        secretWord,
      },
      letterExposed,
      letterMissed,
    } = this.props

    if (secretWord.includes(char)) {
      if (!exposedLetters.includes(char)) {
        return letterExposed(char)
      }
    } else if (!missedLetters.includes(char)) {
      return letterMissed(char)
    }

    return false
  }

  render() {
    const {
      exposedLetters,
      secretWord,
      missedLetters,
    } = this.props.data

    return (
      <div className={styles.game}>
        <div className={styles.board}>
          <div className={styles.missed}>
            <Folk missedLetters={missedLetters} />
            {JSON.stringify(secretWord || '')}<br />
            {JSON.stringify(exposedLetters || '')}<br />
          </div>
        </div>
      </div>
    )
  }
}

Game.propTypes = {
  letterExposed: PropTypes.func.isRequired,
  letterMissed: PropTypes.func.isRequired,
  fetchNewWord: PropTypes.func.isRequired,
  data: PropTypes.shape({
    missedLetters: PropTypes.arrayOf(PropTypes.string),
    exposedLetters: PropTypes.arrayOf(PropTypes.string),
    secretWord: PropTypes.string,
    theEnd: PropTypes.bool,
  }).isRequired,
}

function select(state) {
  return {
    data: state.game,
  }
}

export default connect(select, actionsToBind)(Game)
