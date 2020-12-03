import React from 'react'
import queryString from 'query-string'
import { fetchPokemon } from '../utils/api'
import { colors } from '../utils/colors'
import SimpleTabs from './SimpleTabs'
import MovingArtwork from './MovingArtwork'
import Loading from './Loading'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
  } else if(action.type === 'loading') {
    return {
      ...state,
      loading: true
    }
  } else {
    throw new Error("This action type isn't supported.")
  }
}

export default function PokemonShow({ location }) {

  const { id, gen } = queryString.parse(location.search)

  const [state, dispatch] = React.useReducer(
    pokemonReducer,
    { pokemon: null, loading: true, error: null }
  )

  React.useEffect(() => {
    dispatch({type: 'loading'})
    fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(pokemon => dispatch({type: 'success', pokemon}))
      .catch(error => dispatch({type: 'error', error}))
  }, [id])

  const { pokemon, loading, error } = state

  if (loading) {
    return <Loading />
  }

  if (state.error) {
    return <div>{error}</div>
  }

  return (
    <div className='pokemon-show flex bg-light'>
      <div className='show-artwork flex column left-rounded' style={{background: colors[pokemon.types[0]]}}>
        <h1 className='pokemon-name capitalize'>
          <Link
            to={{
              pathname: "/",
              state: { selectedGen: gen }
            }}
            className='go-back bold'
          >
            <ArrowBackIcon />
          </Link>
          {pokemon.name}
        </h1>
        <h1 className='jap-name bold mx-auto'>{pokemon.jap_name}</h1>
        <MovingArtwork
          name={pokemon.name}
          id={pokemon.id}
          types={pokemon.types}
        />
      </div>
      <div className='show-infos'>
        <SimpleTabs pokemon={state.pokemon} gen={parseInt(gen, 10)}/>
      </div>
    </div>
  )
}
