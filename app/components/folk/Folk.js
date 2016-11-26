import React, { PropTypes } from 'react'
import classNames from 'classnames'
import styles from './styles.sass'

function Folk(props) {
  const { missedLetters } = props
  const flow = [
    'head',
    'neck',
    'corpus',
    'right-arm',
    'left-arm',
    'right-hand',
    'left-hand',
    'right-leg',
    'left-leg',
    'right-foot',
    'left-foot',
  ]

  return (
    <div className={styles.folk}>
      <div className={classNames(styles.img, styles.bar)} />
      {missedLetters.map((val, i) => (
        <div key={i} className={classNames(styles.img, styles[flow[i]])} />
      ))}
    </div>
  )
}

Folk.defaultProps = {
  missedLetters: [],
}

Folk.propTypes = {
  missedLetters: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Folk
