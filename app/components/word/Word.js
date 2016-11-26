import React, { PropTypes } from 'react'
import styles from './styles.sass'
import Letter from '../letter'

function Word(props) {
  const {
    exposedLetters,
    secretWord,
  } = props
  const leftpadSecretWord = (`-----------${secretWord}`).slice(-11)

  return (
    <div className={styles.word}>
      {leftpadSecretWord.split('').map((letter, i) => (
        <Letter
          key={i}
          value={letter}
          exposed={exposedLetters.includes(letter)}
          inactive={letter === '-'}
        />
      ))}
    </div>
  )
}

Word.defaultProps = {
  secretWord: '',
  exposedLetters: [],
}

Word.propTypes = {
  exposedLetters: PropTypes.arrayOf(PropTypes.string).isRequired,
  secretWord: PropTypes.string.isRequired,
}

export default Word
