import './App.css';
import React from 'react'
import PokemonList from './components/PokemonList'
import Generation from './components/Generation'
import Modal from 'react-modal';
import startersArtworks from './utils/startersArtworks'
import useHover from './hooks/useHover'

Modal.setAppElement('#root')

const customStyles = {
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
};

const generations = [1, 2, 3, 4, 5, 6, 7, 8]

function App({ location }) {
  const [modalIsOpen,setIsOpen] = React.useState(false);
  const [selectedGen, setSelectedGen] = React.useState(
    location.state ? parseInt(location.state.selectedGen, 10) : 1
  )

  const [hovering, attr] = useHover()

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  return (
    <div className="App">
      <div className='flex mb-3'>
        <h1 className='title bold'>React Pokédex</h1>
        <button
          onClick={openModal}
          className={`flex justify-center align-center gen-btn ${hovering && 'card-hover'}`}
          {...attr}
        >
         {startersArtworks[selectedGen].map(src => <img key={src} src={src} alt="starter artwork" className='artwork-mini'/>)}
        </button>
      </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          closeTimeoutMS={300}
          style={customStyles}
          contentLabel="Gen Modal"
        >
          {generations.map((gen) => (
            <Generation
              key={gen}
              gen={gen}
              setSelectedGen={() => setSelectedGen(gen)}
              closeModal={closeModal}
            />
          ))}
        </Modal>
      <PokemonList selectedGen={selectedGen}/>
    </div>
  );
}

export default App;
