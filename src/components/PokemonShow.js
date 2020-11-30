import React from 'react'
import queryString from 'query-string'
import { fetchPokemon } from '../utils/api'
import colors from '../utils/colors'
import SimpleTabs from './SimpleTabs'
import { gsap } from 'gsap'

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
  } else if (action.type === 'setPosition') {
    return {
      ...state,
      position: {
        x: action.box.left + (action.box.width * 0.5),
        y: action.box.top + (action.box.height * 0.5),
        height: action.box.height,
        width: action.box.width
      }
    }
  } else if (action.type === 'resetPosition') {
    return {
      ...state,
      position: {
        x: 0,
        y: 0
      }
    }
  } else {
    throw new Error("This action type isn't supported.")
  }
}

export default function PokemonShow({ location }) {
  const imageRef = React.useRef()

  const [hover, setHover] = React.useState(false)

  const { id } = queryString.parse(location.search)

  const [state, dispatch] = React.useReducer(
    pokemonReducer,
    { pokemon: null, loading: true, error: null, position: {x: 0, y:0} }
  )

  React.useEffect(() => {
    fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(pokemon => dispatch({type: 'success', pokemon}))
      .catch(error => dispatch({type: 'error', error}))
  }, [id])

  const { pokemon, loading } = state
  const src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  const handleMouseMove = (e) => {
    const box = imageRef.current.getBoundingClientRect();
    dispatch({type: 'setPosition', box})

    let x = e.clientX - state.position.x;
    let y = e.clientY - state.position.x;


    let hoverArea = (hover ? 0.3 : 0.4);
    let distance = Math.sqrt( x*x + y*y );
    if (distance < (state.position.width * hoverArea)) {
      setHover(true)
    }

    if (hover) {
      onMouseOver(x, y)
    }
  }

  const onMouseOver = (x, y) => {
    gsap.to(imageRef.current,  {
      x: x * 0.4,
      y: y * 0.4,
      scale: 1.15,
      ease: 'power2.out',
      duration: 0.2
    });
  }

  const handleMouseOut = (e) => {
    dispatch({type: 'resetPosition'})
    gsap.to(imageRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      ease: 'elastic.out(1.2, 0.4)',
      duration: 0.7
    });
    setHover(false)
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  return(
    <div className='pokemon-show flex bg-light'>
      <div className='show-artwork flex column left-rounded' style={{background: colors[pokemon.types[0]]}}>
        <h1 className='pokemon-name capitalize'>
          {pokemon.name}
        </h1>
        <img
          className='artwork artwork-lg margin-auto'
          src={src} alt={`artwork of ${pokemon.name}`}
          onMouseMove={handleMouseMove}
          onMouseOut={handleMouseOut}
          ref={imageRef}
        />
      </div>
      <div className='show-infos'>
        <SimpleTabs pokemon={state.pokemon}/>
      </div>
    </div>
  )
}
