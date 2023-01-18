import './App.css';
import React from 'react'
import PokemonList from './components/PokemonList'
import Signout from './components/Signout'
import ShareButton from './components/ShareButton'

const App = () => {
  return (
    <div className="App">
      <React.Fragment>
        <div className='flex mb-3 px-3 space-between'>
          <ShareButton />
          <h1 className='title bold'>React Pokédex</h1>
          <Signout />
        </div>
        <PokemonList />
      </React.Fragment>
    </div>
  )
}

export default App
