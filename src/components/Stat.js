import React from 'react'
import PropTypes from 'prop-types'

export default function Stat({ name, baseStat, maxStat }) {
  return (
    <li className='grid grid-cols-5 mb-3'>
      <span className='text-gray font-medium'>{name}</span>
      <span className='font-medium'>{baseStat}</span>
      <div className='flex align-center stat-bar-div'>
        <div className='stat-bar' style={{width: `${(baseStat / maxStat) * 100}%`}}></div>
      </div>
      <span className='font-medium'>{maxStat.toFixed()}</span>
    </li>
  )
}

Stat.propTypes = {
  name: PropTypes.string.isRequired,
  baseStat: PropTypes.number.isRequired,
  maxStat: PropTypes.number.isRequired
}
