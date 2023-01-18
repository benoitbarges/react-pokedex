import React from 'react'
import PropTypes from 'prop-types'
import useHover from '../hooks/useHover'
import { Link } from 'react-router-dom'
import { colors } from '../utils/colors'

export default function PokemonCard({ pokemon, asLink }) {
  const [hovering, attr] = useHover()
  const { id, name, image_url: imageUrl, types } = pokemon

  const formatId = (id) => {
    if (id < 10) {
      return `00${id}`
    } else if (id < 100) {
      return `0${id}`
    }
    return id
  }

  const renderContent = () => (
    <React.Fragment>
      <div>
        <h1 className='margin-auto pokemon-id'>
          #{formatId(id)}
        </h1>
        <img className='artwork' src={imageUrl} alt={`artwork of ${name}`} />
      </div>
      <div className='bg-light bottom-rounded py-15'>
        <h1 className='header-lg capitalize margin-auto'>
          {name}
        </h1>
        <div className='flex justify-center space-evenly mt-3'>
          {types.map((type) => (
            <p className='pokemon-type'key={type} style={{background: colors[type]}}>{type}</p>
          ))}
        </div>
      </div>
    </React.Fragment>
  )

  if (asLink) {
    return (
      <Link
        to={`/pokemons/${id}`}
        className={`pokemon-card flex column ${hovering && 'card-hover'}`}
        style={{background: colors[types[0]]}}
        {...attr}
      >
        {renderContent()}
      </Link>
    )
  } else {
    return (
      <div
        className='pokemon-card flex column'
        style={{background: colors[types[0]]}}
      >
        {renderContent()}
      </div>
    )
  }

}

PokemonCard.propTypes = {
  pokemon: PropTypes.object.isRequired,
  asLink: PropTypes.bool.isRequired
}
