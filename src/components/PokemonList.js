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
  8: 'https://pokeapi.co/api/v2/pokemon?offset=809&limit=84'
}

const pokemonsReducer = (state, action) => {
  if (action.type === 'success') {
    return {
      ...state,
      [action.selectedGen]: action.pokemons,
      error: null
    }
  } else if (action.type === 'error') {
    return {
      ...state,
      error: action.error.message
    }
  } else {
    throw new Error("That action type isn't supported.")
  }
}

export default function PokemonList ({ selectedGen }) {
  const [state, dispatch] = React.useReducer(
    pokemonsReducer,
    {error: null}
  )

  const fetchedGens = React.useRef([])

  React.useEffect(() => {
    if (!fetchedGens.current.includes(selectedGen)) {
      fetchedGens.current.push(selectedGen)

      fetchPokemons(urls[selectedGen])
        .then(pokemons => {
          dispatch({ type: 'success', pokemons, selectedGen })
        })
        .catch(error => dispatch({ type: 'error', error }))
    }
  }, [selectedGen, fetchedGens])


  const isLoading = () => !state[selectedGen] && state.error === null

  return (
    <React.Fragment>
      {isLoading() && <h1>Loading...</h1>}

      {state.error && <p className='center-text error'>{state.error}</p>}

      {state[selectedGen] && (
        <div className='home-grid space-around'>
           {state[selectedGen].map((pokemon) => {
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
      )}
    </React.Fragment>
  )
}
