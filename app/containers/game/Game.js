import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import styles from './styles.sass'
import * as actionsToBind from './actions'
import Folk from '../../components/folk'
import MissedLetters from '../../components/missedLetters'
import Word from '../../components/word'
import TheEnd from '../../components/theEnd'

export class Game extends Component {
  /**
   * Return uppercased letter from event
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

  componentWillUpdate(nextProps) {
    if (nextProps.data.theEnd) return

    if (nextProps.data.missedLetters.length > 10) {
      this.props.theEnd('lost')
    } else if (nextProps.data.exposedLetters.length === this.props.data.uniqLetters) {
      this.props.theEnd('won')
    }
  }

  /**
   * Handles key up events
   *
   * @param {Event} e The keyUp event
   * @returns {function|null} Function if letter was given
   * @memberOf Game
   */
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
      wordFetching,
      theEnd,
    } = this.props.data

    const zoom = window.innerWidth < 1920
      ? -1920 + window.innerWidth
      : window.innerWidth - 1920

    return (
      <div className={styles.game}>
        <div className={styles.board} style={{ transform: `translate3d(0, 0, ${zoom}px)` }}>
          <div className={styles.missed}>
            <Folk missedLetters={missedLetters} />
            <MissedLetters letters={missedLetters} />
          </div>
          <Word
            exposedLetters={exposedLetters}
            secretWord={secretWord}
          />
          {theEnd || wordFetching ? (
            <TheEnd
              loading={wordFetching}
              newWord={this.props.fetchNewWord}
            />
          ) : null}
        </div>
      </div>
    )
  }
}

Game.propTypes = {
  letterExposed: PropTypes.func.isRequired,
  letterMissed: PropTypes.func.isRequired,
  fetchNewWord: PropTypes.func.isRequired,
  theEnd: PropTypes.func.isRequired,
  data: PropTypes.shape({
    missedLetters: PropTypes.arrayOf(PropTypes.string),
    exposedLetters: PropTypes.arrayOf(PropTypes.string),
    secretWord: PropTypes.string,
    theEnd: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
    wordFetching: PropTypes.bool,
    uniqLetters: PropTypes.number,
  }).isRequired,
}

function select(state) {
  return {
    data: state.game,
  }
}

export default connect(select, actionsToBind)(Game)
