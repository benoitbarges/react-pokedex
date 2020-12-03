import React from 'react'
import { lightColors } from '../utils/colors'
import useHover from '../hooks/useHover'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function Evolution({ name, id, types, setPokemonName }) {
  const [hovering, attr] = useHover()

  const src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  const handleOver = () => setPokemonName()

  return (
    <Link
      to={`/pokemons?id=${id}`}
      className='circle-sm'
      style={{background: lightColors[types[0]]}}
      onMouseOver={handleOver}
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
  setPokemonName: PropTypes.func.isRequired
}
