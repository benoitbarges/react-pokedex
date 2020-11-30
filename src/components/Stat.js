import React from 'react'

export default function Stat({ name, baseStat }) {
  const maxStat = () => {
    return name === "hp"
      ? Number(baseStat) * 2 + 204
      : (Number(baseStat) * 2 + 99) * 1.1
  }

  return (
    <li className='grid grid-cols-5 mb-3'>
      <span className='text-gray font-medium'>{name}</span>
      <span className='font-medium'>{baseStat}</span>
      <div className='flex align-center stat-bar-div'>
        <div className='stat-bar' style={{width: `${(baseStat / maxStat()) * 100}%`}}></div>
      </div>
      <span className='font-medium'>{maxStat().toFixed()}</span>

    </li>
  )
}
