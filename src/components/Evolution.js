import React from 'react'
import { lightColors } from '../utils/colors'
import useHover from '../hooks/useHover'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function Evolution({ name, id, types, setPokemonName, unsetPokemonName, gen }) {
  const [hovering, attr] = useHover()

  const src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  const handleOver = () => setPokemonName()

  const handleOut = () => unsetPokemonName()

  return (
    <Link
      to={`/pokemons?id=${id}&gen=${gen}`}
      className='circle-sm'
      style={{background: lightColors[types[0]]}}
      onMouseOver={handleOver}
      onMouseOut={handleOut}
    >
      <img
        className={`artwork-sm ${hovering && 'move-up'}`}
        src={src} alt={`artwork of ${name}`}
        {...attr}
      />
    </Link>
  )
}

Evolution.propTypes = {
  name: PropTypes.string.isRequired,
  types: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  gen: PropTypes.number.isRequired,
  setPokemonName: PropTypes.func.isRequired,
  unsetPokemonName: PropTypes.func.isRequired
}
