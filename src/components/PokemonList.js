import React from 'react'
import { fetchPokemons } from '../utils/api'
import PokemonCard from './PokemonCard'

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
  } else {
    throw new Error("That action type isn't supported.")
  }
}

export default function PokemonList () {
  const [state, dispatch] = React.useReducer(
    pokemonsReducer,
    {error: null, pokemons: {}, loading: true}
  )

  React.useEffect(() => {
    fetchPokemons()
      .then(pokemons => dispatch({ type: 'success', pokemons }))
      .catch(error => dispatch({ type: 'error', error }))
  }, [])


  return (
    <div>
      {state.pokemons.map((pokemon) => <PokemonCard name={pokemon.name} />)}
    </div>
  )
}
