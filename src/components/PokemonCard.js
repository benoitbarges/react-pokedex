import React from 'react'
import PropTypes from 'prop-types'
import useHover from '../hooks/useHover'
import { Link } from 'react-router-dom'

const colors = {
  "normal": "rgb(196, 196, 164)",
  "fighting": "rgb(192, 48, 40)",
  "flying": "rgb(168, 144, 240)",
  "poison": "rgb(160, 64, 160)",
  "ground": "rgb(224, 192, 104)",
  "rock": "rgb(184, 160, 56)",
  "bug": "rgb(168, 184, 32)",
  "ghost": "rgb(112, 88, 152)",
  "steel": "rgb(184, 184, 208)",
  "fire": "rgb(240, 128, 48)",
  "water": "rgb(104, 144, 240)",
  "grass": "rgb(120, 200, 80)",
  "electric": "rgb(248, 208, 48)",
  "psychic": "rgb(248, 88, 136)",
  "ice": "rgb(152, 216, 216)",
  "dragon": "rgb(112, 56, 248)",
  "dark": "rgb(112, 88, 72)",
  "fairy": "rgb(238, 153, 172)"
}

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
        <h1 className='header-lg pokemon-id'>
          #{formatId(id)}
        </h1>
        <img className='artwork' src={src} alt={`artwork of ${name}`} />
      </div>
      <div className='bg-light bottom-rounded py-15'>
        <h1 className='header-lg capitalize'>
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
