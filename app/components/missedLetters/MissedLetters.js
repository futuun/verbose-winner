import React, { Component, PropTypes } from 'react'
import styles from './styles.sass'

class MissedLetters extends Component {
  render() {
    const { letters } = this.props

    if (!letters.length) return null

    return (
      <div className={styles.missedLetters}>
        <div className={styles.title}>YOU MISSED:</div>
        <div className={styles.letters}>
          {letters.map((char, i) => (
            <span key={i}>{char}</span>
          ))}
        </div>
      </div>
    )
  }
}

MissedLetters.defaultProps = {
  letters: []
}

MissedLetters.propTypes = {
  letters: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default MissedLetters
