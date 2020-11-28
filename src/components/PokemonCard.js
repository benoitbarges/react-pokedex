import React from 'react'
import PropTypes from 'prop-types'
import useHover from '../hooks/useHover'
import { Link } from 'react-router-dom'
import colors from '../utils/colors'

export default function PokemonCard({ name, id, types }) {
  const [hovering, attr] = useHover()

  const src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  const formatId = (id) => {
    if (id < 10) {
      return `00${id}`
    } else if (id < 100) {
      return `0${id}`
    }
    return id
  }

  return (
    <Link
      to={`/pokemons?id=${id}`}
      className={`pokemon-card flex column ${hovering && 'card-hover'}`}
      style={{background: colors[types[0]]}}
      {...attr}
    >
      <div>
        <h1 className='header-lg margin-auto pokemon-id'>
          #{formatId(id)}
        </h1>
        <img className='artwork' src={src} alt={`artwork of ${name}`} />
      </div>
      <div className='bg-light bottom-rounded py-15'>
        <h1 className='header-lg capitalize margin-auto'>
          {name}
        </h1>
        <div className='flex justify-center space-evenly'>
          {types.map((type) => (
            <p className='pokemon-type'key={type} style={{background: colors[type]}}>{type}</p>
          ))}
        </div>
      </div>
    </Link>
  )
}

PokemonCard.propTypes = {
  name: PropTypes.string.isRequired,
  types: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
}
