import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Loading from './Loading'
import PokemonCard from './PokemonCard'

const Pokedex = () => {
  const { trainerId } = useParams()
  const [pokemons, setPokemons] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:3000/pokemons/pokedex/${trainerId}`)
      .then((response) => {
        setPokemons(response.data.data)
      })
      .catch(error => setError(error.message))
    setIsLoading(false)
  }, [trainerId])

  if (isLoading) return <Loading />
  if (error) return <p className='center-text error'>{error}</p>

  return (
    <React.Fragment>
      <h1 className='flex justify-center'>Trainer #{trainerId} pokedex</h1>
      <div className='home-grid space-around'>
        {pokemons.length === 0
          ? <p className='center-text'>No pokemons</p>
          : pokemons.map((pokemon) => (
            <PokemonCard
              pokemon={pokemon.attributes}
              key={pokemon.attributes.id}
              asLink={false}
            />
        ))}
      </div>
    </React.Fragment>
  )
}

export default Pokedex
