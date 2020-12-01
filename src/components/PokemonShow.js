import React from 'react'
import queryString from 'query-string'
import { fetchPokemon } from '../utils/api'
import { colors } from '../utils/colors'
import SimpleTabs from './SimpleTabs'
import MovingArtwork from './MovingArtwork'

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
      loading: false,
      error: action.error.message
    }
  } else {
    throw new Error("This action type isn't supported.")
  }
}

export default function PokemonShow({ location }) {

  const { id } = queryString.parse(location.search)
  console.log(id)

  const [state, dispatch] = React.useReducer(
    pokemonReducer,
    { pokemon: null, loading: true, error: null }
  )

  React.useEffect(() => {
    fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(pokemon => dispatch({type: 'success', pokemon}))
      .catch(error => dispatch({type: 'error', error}))
  }, [id])

  const { pokemon, loading, error } = state

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (state.error) {
    return <div>{error}</div>
  }

  return(
    <div className='pokemon-show flex bg-light'>
      <div className='show-artwork flex column left-rounded' style={{background: colors[pokemon.types[0]]}}>
        <h1 className='pokemon-name capitalize'>
          {pokemon.name}
        </h1>
        <h1 className='jap-name bold'>{pokemon.jap_name}</h1>
        <MovingArtwork
          name={pokemon.name}
          id={pokemon.id}
          types={pokemon.types}
        />
      </div>
      <div className='show-infos'>
        <SimpleTabs pokemon={state.pokemon}/>
      </div>
    </div>
  )
}
