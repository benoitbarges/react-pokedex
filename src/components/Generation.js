import React from 'react'
import PropTypes from 'prop-types'
import startersArtworks from '../utils/startersArtworks'

export default function Generation({ gen, setSelectedGen, closeModal }) {
  const triggerClick = () => {
    setSelectedGen()
    closeModal()
  }

  return (
    <button onClick={triggerClick} className='gen-btn-lg'>
      {startersArtworks[gen].map(src => <img key={src} src={src} alt="starter artwork" className='artwork-mini'/>)}
      <p className='mt-2 mb-0 bold'>Generation {gen}</p>
    </button>
  )
}

Generation.propTypes = {
  gen: PropTypes.number.isRequired,
  setSelectedGen: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
}
