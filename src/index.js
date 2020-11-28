import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import PokemonShow from './components/PokemonShow';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div className='container'>
        <Switch>
          <Route exact path='/' component={App} />
          <Route path='/pokemons' component={PokemonShow} />
        </Switch>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
