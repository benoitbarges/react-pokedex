import React from 'react'
import { fetchPokemons } from '../utils/api'
import PokemonCard from './PokemonCard'

const urls = {
  1: 'https://pokeapi.co/api/v2/pokemon?&limit=151',
  2: 'https://pokeapi.co/api/v2/pokemon?offset=151&limit=100',
  3: 'https://pokeapi.co/api/v2/pokemon?offset=251&limit=135',
  4: 'https://pokeapi.co/api/v2/pokemon?offset=386&limit=107',
  5: 'https://pokeapi.co/api/v2/pokemon?offset=493&limit=156',
  6: 'https://pokeapi.co/api/v2/pokemon?offset=649&limit=72',
  7: 'https://pokeapi.co/api/v2/pokemon?offset=721&limit=88',
  8: 'https://pokeapi.co/api/v2/pokemon?offset=809&limit=89'
}

const pokemonsReducer = (state, action) => {
  if (action.type === 'success') {
    return {
      pokemons: action.pokemons,
      loading: false,
      error: null
    }
  } else if (action.type === 'error') {
    return {
      ...state,
      loading: false,
      error: action.error.message
    }
  } else if(action.type === 'loading') {
    return {
      ...state,
      loading: true
    }
  } else {
    throw new Error("That action type isn't supported.")
  }
}

export default function PokemonList ({ selectedGen }) {
  const [state, dispatch] = React.useReducer(
    pokemonsReducer,
    {error: null, pokemons: [], loading: true}
  )

  React.useEffect(() => {
    dispatch({type: 'loading'})
    fetchPokemons(urls[selectedGen])
      .then(pokemons => {
        dispatch({ type: 'success', pokemons })
      })
      .catch(error => dispatch({ type: 'error', error }))
  }, [selectedGen])

  if (state.loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className='home-grid space-around'>
       {state.pokemons.map((pokemon) => {
        return (
          <PokemonCard
            pokemon={pokemon}
            name={pokemon.name}
            key={pokemon.id}
            id={pokemon.id}
            types={pokemon.types}
          />
        )
       })}
    </div>
  )
}
