import './App.css';
import React from 'react'
import PokemonList from './components/PokemonList'
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

function App() {
  const [modalIsOpen,setIsOpen] = React.useState(false);

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
          <div>I am a modal</div>
        </Modal>
      <PokemonList />
    </div>
  );
}

export default App;
