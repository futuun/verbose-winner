import React, { PropTypes } from 'react'
import styles from './styles.sass'

function TheEnd(props) {
  if (props.loading) {
    return (
      <div className={styles.theEnd}>
        <span className={styles.title}>LOADING</span>
      </div>
    )
  }

  return (
    <div className={styles.theEnd}>
      <span className={styles.title}>GAME OVER</span>
      <button
        className={styles.btn}
        onClick={props.newWord}
        autoFocus
      >
        NEW WORD
      </button>
    </div>
  )
}

TheEnd.defaultProps = {
  newWord: () => false,
  loading: true,
}

TheEnd.propTypes = {
  newWord: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default TheEnd
