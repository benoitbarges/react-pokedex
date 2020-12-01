import React from 'react'
import { lightColors } from '../utils/colors'
import useHover from '../hooks/useHover'
import { Link } from 'react-router-dom'

export default function Evolution({ name, id, types }) {
  const [hovering, attr] = useHover()

  const src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  return (
    <Link
      to={`/pokemons?id=${id}`}
      className='circle-sm'
      style={{background: lightColors[types[0]]}}
    >
      <img
        className={`artwork-sm ${hovering && 'move-up'}`}
        src={src} alt={`artwork of ${name}`}
        {...attr}
      />
    </Link>
  )
}
