import React from 'react'
import Stat from './Stat'

export default function PokemonStats({ stats }) {
  return (
    <div>
      <ul>
        {stats.map((stat) => (
          <Stat
            key={stat.name}
            name={stat.name}
            baseStat={stat.base_stat}
          />
        ))}
      </ul>
    </div>
  )
}
