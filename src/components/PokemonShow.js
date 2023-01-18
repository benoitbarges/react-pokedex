import React, { useEffect, useReducer } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import { colors } from '../utils/colors'
import SimpleTabs from './SimpleTabs'
import MovingArtwork from './MovingArtwork'
import Loading from './Loading'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const pokemonReducer = (state, action) => {
  if (action.type === 'success') {
    return {
      ...state,
      pokemon: action.pokemon,
      isLoading: false
    }
  } else if (action.type === 'error') {
    return {
      ...state,
      isLoading: false,
      error: action.error.message
    }
  } else if(action.type === 'loading') {
    return {
      ...state,
      isLoading: true
    }
  } else {
    throw new Error("This action type isn't supported.")
  }
}

export default function PokemonShow({ location }) {
  const { id } = useParams()

  const [state, dispatch] = useReducer(
    pokemonReducer, {
      pokemon: null,
      isLoading: false,
      error: null
    }
  )
  const { pokemon, isLoading, error } = state

  useEffect(() => {
    dispatch({ type: 'loading' })
    axios.get(`http://localhost:3000/pokemons/${id}`)
      .then(response => {
        dispatch({
          type: 'success',
          pokemon: response.data.data.attributes
        })
      })
      .catch(error => dispatch({ type: 'error', error }))
  }, [id])

  const markAsCatched = () => {
    axios.post(`http://localhost:3000/catched_pokemons`, {
      catched_pokemon: { pokemon_id: pokemon.id }
    })
      .then(response => {
        dispatch({
          type: 'success',
          pokemon: response.data.data.attributes
        })
      })
      .catch(error => dispatch({ type: 'error', error }))
  }

  const unmarkAsCatched = () => {
    axios.delete(`http://localhost:3000/catched_pokemons/${pokemon.catched_pokemon.id}`)
      .then(response => {
        dispatch({
          type: 'success',
          pokemon: response.data.data.attributes
        })
      })
      .catch(error => dispatch({ type: 'error', error }))
  }

  if (isLoading) return <Loading />

  if (error) return <div>{error}</div>

  if (pokemon) {
    return (
      <div className='pokemon-show flex bg-light'>
        <div className='show-artwork flex column left-rounded' style={{background: colors[pokemon.types[0]]}}>
          <h1 className='pokemon-name capitalize'>
            <Link
              to={{
                pathname: "/",
                state: { selectedGen: pokemon.generation }
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
          {pokemon.catched_pokemon
            ? <button onClick={unmarkAsCatched} disabled={isLoading} className='btn submit m-auto'>Uncatch!</button>
            : <button onClick={markAsCatched} disabled={isLoading} className='btn submit m-auto'>Catch!</button>}
        </div>
        <div className='show-infos'>
          <SimpleTabs pokemon={pokemon} gen={parseInt(pokemon.generation, 10)}/>
        </div>
      </div>
    )
  } else return null
}
