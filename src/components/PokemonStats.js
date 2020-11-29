import React from 'react'
import Stat from './Stat'

export default function PokemonStats({ stats }) {
  return (
    <div>
      <ul>
        {stats.map((name, value) => (
          <Stat
            key={name}
            name={name}
            value={value}
          />
        ))}
      </ul>
    </div>
  )
}
