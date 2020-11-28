import React from 'react'
import queryString from 'query-string'
import { fetchPokemon } from '../utils/api'

const pokemonReducer = (state, action) => {
  if (action.type === 'success') {
    return {
      ...state,
      pokemon: action.pokemon,
      loading: false
    }
  } else if (action.type === 'error') {
    return {
      ...state,
      error: action.error.message
    }
  } else {
    throw new Error("This action type isn't supported.")
  }
}

export default function PokemonShow({ location }) {
  const { id } = queryString.parse(location.search)
  const [state, dispatch] = React.useReducer(
    pokemonReducer,
    { pokemon: null, loading: true, error: null}
  )

  React.useEffect(() => {
    fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(pokemon => dispatch({type: 'success', pokemon}))
      .catch(error => dispatch({type: 'error', error}))
  }, [id])

  return(
    <div>
      <pre>{JSON.stringify(state.pokemon, null, 2)}</pre>
    </div>
  )
}
