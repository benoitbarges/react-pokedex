import React from 'react'
import queryString from 'query-string'
import { fetchPokemon } from '../utils/api'
import colors from '../utils/colors'
import SimpleTabs from './SimpleTabs'

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

  const { pokemon, loading } = state
  const src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`


  if (loading) {
    return <h1>Loading...</h1>
  }

  return(
    <div className='pokemon-show flex bg-light'>
      <div className='show-artwork flex column left-rounded' style={{background: colors[pokemon.types[0]]}}>
        <h1 className='header-lg capitalize'>
          {pokemon.name}
        </h1>
        <img className='artwork margin-auto' src={src} alt={`artwork of ${pokemon.name}`} />
      </div>
      <div className='show-infos'>
        <SimpleTabs />
      </div>
    </div>
  )
}


const datas = {
  "id": 1,
  "name": "bulbasaur",
  "types": [
    "grass",
    "poison"
  ],
  "abilities": [
    "overgrow",
    "chlorophyll"
  ],
  "base_experience": 64,
  "height": 7,
  "weight": 69,
  "base_happiness": 70,
  "capture_rate": 45,
  "color": "green",
  "description": "A strange seed was\nplanted on its\nback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.",
  "egg_groups": [
    "monster",
    "plant"
  ],
  "genus": "Seed Pokémon",
  "habitat": "grassland",
  "legendary": false,
  "mythical": false,
  "shape": "quadruped",
  "stats": {
    "hp": 45,
    "attack": 49,
    "defense": 49,
    "special-attack": 65,
    "special-defense": 65,
    "speed": 45
  }
}
