import React, { useEffect, useState, useReducer } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Modal from 'react-modal'
import InfiniteScroll from 'react-infinite-scroller'

import startersArtworks from '../utils/startersArtworks'
import PokemonCard from './PokemonCard'
import Loading from './Loading'
import useHover from '../hooks/useHover'
import Generation from './Generation'

Modal.setAppElement('#root')

const reactModalCustomStyles = {
  content : {
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    transition            : 'all 2s ease-in-out !important',
    display               : 'grid',
    gridTemplateColumns   : '1fr 1fr',
    borderRadius          : '10px'
  }
}

const pokemonsReducer = (state, action) => {
  if (action.type === 'success') {
    return {
      ...state,
      pokemons: action.pokemons,
      generations: action.generations,
      isLoading: false,
      isLoadingMore: false,
      error: null,
      isFiltered: false,
      page: 1,
      hasMore: action.hasMore
    }
  } else if (action.type === 'loadMore') {
    return {
      ...state,
      pokemons: action.pokemons,
      page: action.page,
      isLoadingMore: false,
      hasMore: action.hasMore
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
  } else if(action.type === 'loadingMore') {
    return {
      ...state,
      isLoadingMore: true
    }
  } else if(action.type === 'filter') {
    return {
      ...state,
      filter: action.filter,
      isFiltered: true,
      isLoadingMore: false,
      filteredPokemons: action.filteredPokemons,
      hasMore: action.hasMore,
      page: action.page
    }
  } else if(action.type === 'resetFilter') {
    return {
      ...state,
      filter: null,
      isFiltered: false,
      hasMore: true,
      page: 1
    }
  } else {
    throw new Error("That action type isn't supported.")
  }
}


const PokemonList = () => {
  const location = useLocation()
  const [selectedGen, setSelectedGen] = useState(location.state ? parseInt(location.state.selectedGen, 10) : 1)
  const [state, dispatch] = useReducer(
    pokemonsReducer, {
      pokemons: [],
      generations: [],
      isLoading: false,
      isLoadingMore: false,
      error: null,
      filter: null,
      isFiltered: false,
      hasMore: true
    }
  )
  const { pokemons, filteredPokemons, generations, isLoading, isLoadingMore, error, filter, isFiltered, page, hasMore } = state
  const pokemonsResult = isFiltered ? filteredPokemons : pokemons

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [hovering, attr] = useHover()

  useEffect(() => {
    dispatch({ type: 'loading' })
     axios.get('http://localhost:3000/pokemons', { params: { generation: selectedGen, page: 1 } })
      .then(response => {
        dispatch({
          type: 'success',
          pokemons: response.data.pokemons.data,
          generations: response.data.generations,
          hasMore: response.data.has_more
        })
      })
      .catch(error => dispatch({ type: 'error', error }))
  }, [selectedGen])

  const loadMore = () => {
    if (isLoadingMore || !hasMore) return

    dispatch({ type: 'loadingMore' })
    if (isFiltered) {
      axios.get('http://localhost:3000/pokemons/filter', { params: { generation: selectedGen, filter, page: page + 1 } })
        .then(response => {
          dispatch({
            type: 'filter',
            filter,
            filteredPokemons: filteredPokemons.concat(response.data.filtered_pokemons.data),
            page: page + 1,
            hasMore: response.data.has_more
          })
        })
        .catch(error => dispatch({ type: 'error', error }))
    } else {
      axios.get('http://localhost:3000/pokemons', { params: { generation: selectedGen, page: page + 1 } })
        .then(response => {
          dispatch({
            type: 'loadMore',
            pokemons: pokemons.concat(response.data.pokemons.data),
            page: page + 1,
            hasMore: response.data.has_more
          })
        })
        .catch(error => dispatch({ type: 'error', error }))
    }
  }

  const filterPokemons = (event) => {
    if (event.target.value === 'all') {
      dispatch({ type: 'resetFilter' })
      return
    }

    axios.get('http://localhost:3000/pokemons/filter', { params: { generation: selectedGen, filter: event.target.value, page: 1 } })
      .then(response => {
        dispatch({
          type: 'filter',
          filter: event.target.value,
          filteredPokemons: response.data.filtered_pokemons.data,
          page: 1,
          hasMore: response.data.has_more
        })
      })
      .catch(error => dispatch({ type: 'error', error }))
  }

  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  if (isLoading) return <Loading />
  if (error) return <p className='center-text error'>{error}</p>

  return (
    <React.Fragment>
      <div className='flex mb-3 justify-center gap-2'>
        <button
          onClick={openModal}
          className={`flex justify-center align-center btn ${hovering && 'card-hover'}`}
          {...attr}
        >
         {startersArtworks[selectedGen || 1].map(src => <img key={src} src={src} alt="starter artwork" className='artwork-mini'/>)}
        </button>
        <select
          className='btn'
          name="filters"
          id="filters"
          onChange={filterPokemons}
        >
          <option value="all">No filter</option>
          <option value="catched">Catched</option>
          <option value="notCatched">Not Catched</option>
          <option value="catchedAtASC">Catched at ASC</option>
          <option value="catchedAtDESC">Catched at DESC</option>
        </select>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        closeTimeoutMS={300}
        style={reactModalCustomStyles}
        contentLabel="Gen Modal"
      >
        {generations.map((gen) => (
          <Generation
            key={gen}
            gen={gen}
            setSelectedGen={setSelectedGen}
            closeModal={closeModal}
          />
        ))}
      </Modal>
      {pokemonsResult && (
        <InfiniteScroll
          pageStart={1}
          loadMore={loadMore}
          hasMore={hasMore}
          loader={<Loading key={0} />}
          initialLoad={false}
          className='home-grid space-around'
        >
          {pokemonsResult.map((pokemon) => (
            <PokemonCard
              pokemon={pokemon.attributes}
              key={pokemon.attributes.id}
              asLink
            />
          ))}
        </InfiniteScroll>
      )}
    </React.Fragment>
  )
}

export default PokemonList
