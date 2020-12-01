import React from 'react'
import { gsap } from 'gsap'
import { lightColors } from '../utils/colors'

const positionReducer = (state, action) => {
  if (action.type === 'setPosition') {
    return {
      ...state,
      positionX: action.box.left + (action.box.width * 0.5),
      positionY: action.box.top + (action.box.height * 0.5),
      height: action.box.height,
      width: action.box.width
    }
  } else if (action.type === 'resetPosition') {
    return {
      ...state,
      positionX: 0,
      positionY: 0
    }
  } else {
    throw new Error("This action type isn't supported.")
  }
}

export default function MovingArtwork({ name, id, types}) {
  const [state, dispatch] = React.useReducer(
    positionReducer,
    {positionX: 0, positionY: 0}
  )

  const imageRef = React.useRef()

  const [hover, setHover] = React.useState(false)

  const src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  const handleMouseMove = (e) => {
    const box = imageRef.current.getBoundingClientRect();
    dispatch({type: 'setPosition', box})

    let x = e.clientX - state.positionX;
    let y = e.clientY - state.positionY;


    let hoverArea = (hover ? 0.3 : 0.4);
    let distance = Math.sqrt( x*x + y*y );
    if (distance < (state.width * hoverArea)) {
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

  return (
    <React.Fragment>
      <img
        className='artwork artwork-lg margin-auto'
        src={src} alt={`artwork of ${name}`}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
        ref={imageRef}
      />
      <div
        className='circle'
        style={{background: lightColors[types[0]]}}
      >
      </div>
    </React.Fragment>
  )
}
