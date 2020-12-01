import './App.css';
import React from 'react'
import PokemonList from './components/PokemonList'
import Generation from './components/Generation'
import Modal from 'react-modal';

Modal.setAppElement('#root')

const customStyles = {
  content : {
    top                   : '5%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    transition: 'all 2s ease-in-out !important'
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
      <button onClick={openModal}>Open Modal</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          closeTimeoutMS={300}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button onClick={closeModal}>close</button>
          {generations.map((gen) => (
            <Generation
              key={gen}
              gen={gen}
              setSelectedGen={() => setSelectedGen(gen)}
            />
          ))}
        </Modal>
      <PokemonList selectedGen={selectedGen}/>
    </div>
  );
}

export default App;
