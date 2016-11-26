import React, { PropTypes } from 'react'
import classNames from 'classnames'
import styles from './styles.sass'

function Letter(props) {
  const {
    value,
    exposed,
    inactive,
  } = props

  const letterClass = classNames(
    styles.letter,
    { [styles.inactive]: inactive },
  )

  return (
    <div className={letterClass}>
      {exposed ? value : null}
    </div>
  )
}

Letter.defaultProps = {
  value: '',
  exposed: false,
  inactive: false,
}

Letter.propTypes = {
  value: PropTypes.string.isRequired,
  exposed: PropTypes.bool.isRequired,
  inactive: PropTypes.bool.isRequired,
}

export default Letter
