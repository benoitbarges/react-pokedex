import React from 'react'
import { lightColors } from '../utils/colors'

export default function Evolution({ name, id, types }) {
  const src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  return (
    <div className='circle-sm' style={{background: lightColors[types[0]]}}>
      <img
        className='artwork-sm'
        src={src} alt={`artwork of ${name}`}
      />
    </div>
  )
}
