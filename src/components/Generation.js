import React from 'react'
import PropTypes from 'prop-types'

export default function Generation({ gen, setSelectedGen }) {
  return (
    <div onClick={setSelectedGen}>
      {gen}
    </div>
  )
}

Generation.propTypes = {
  gen: PropTypes.number.isRequired,
  setSelectedGen: PropTypes.func.isRequired
}
