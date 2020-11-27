import React from 'react'
import PropTypes from 'prop-types'

export default function PokemonCard({ name, id, types }) {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

PokemonCard.propTypes = {
  name: PropTypes.string.isRequired,
  types: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
}
