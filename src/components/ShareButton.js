import React from 'react'

const ShareButton = () => {
  const url = `${window.location.origin}/pokedex/${localStorage.getItem('currentTraineId')}`

  return (
    <button className='btn submit share-btn' onClick={() => navigator.clipboard.writeText(url)}>
      Copy pokedex link
    </button>
  )
}

export default ShareButton
