import React from 'react'
import PropTypes from 'prop-types'

export default function Generation({ gen, setSelectedGen }) {
  return (
    <button onClick={setSelectedGen}>
      {gen}
    </button>
  )
}

Generation.propTypes = {
  gen: PropTypes.number.isRequired,
  setSelectedGen: PropTypes.func.isRequired
}
