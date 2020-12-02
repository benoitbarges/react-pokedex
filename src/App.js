import './App.css';
import React from 'react'
import PokemonList from './components/PokemonList'
import Generation from './components/Generation'
import Modal from 'react-modal';
import startersArtworks from './utils/startersArtworks'

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

function App() {
  const [modalIsOpen,setIsOpen] = React.useState(false);
  const [selectedGen, setSelectedGen] = React.useState(1)

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  return (
    <div className="App">
      <button
        onClick={openModal}
        className="flex justify-center align-center gen-btn"
      >
       {startersArtworks[selectedGen].map(src => <img key={src} src={src} alt="starter artwork" className='artwork-mini'/>)}
      </button>

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
