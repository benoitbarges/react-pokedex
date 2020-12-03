import React from 'react'
import Stat from './Stat'
import PropTypes from 'prop-types'

export default function PokemonStats({ stats }) {
  const total = () => {
    return stats.reduce((sum, stat) => sum += stat.base_stat, 0)
  }

  const maxStat = (stat) => {
    return stat.name === "hp"
      ? Number(stat.base_stat) * 2 + 204
      : (Number(stat.base_stat) * 2 + 99) * 1.1
  }

  const maxTotal = () => {
    let sum = 0
    stats.forEach(stat => sum += maxStat(stat))
    return sum.toFixed()
  }

  return (
    <div>
      <ul>
        {stats.map((stat) => (
          <Stat
            key={stat.name}
            name={stat.name}
            baseStat={stat.base_stat}
            maxStat={maxStat(stat)}
          />
        ))}
      </ul>
      <div className='grid grid-cols-5'>
        <span className='text-gray font-medium'>Total</span>
        <span className='bold font-medium'>{total()}</span>
        <span></span>
        <span className='bold font-medium'>{maxTotal()}</span>
      </div>
    </div>
  )
}

PokemonStats.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.object).isRequired
}
