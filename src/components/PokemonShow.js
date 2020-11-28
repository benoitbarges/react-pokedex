import React from 'react'
import queryString from 'query-string'

const pokemonReducer = (state, action) => {
  if (action.type === 'success') {
    return {
      ...state,
      post: action.pokemon,
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


  return(
    <div>
      show
    </div>
  )
}
