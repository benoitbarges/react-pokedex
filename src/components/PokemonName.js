import React from 'react'
import PropTypes from 'prop-types'
import SplitText from 'react-pose-text'

const charPoses = {
  exit: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    delay: ({ charIndex }) => charIndex * 30
  }
};

export default function PokemonName({ name }) {
  return (
    <div className='center-text moving-name'>
      <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
        {name}
      </SplitText>
    </div>
  )
}

PokemonName.propTypes = {
  name: PropTypes.string.isRequired
}
