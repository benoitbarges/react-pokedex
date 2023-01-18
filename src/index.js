import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './index.css';
import App from './App';
import PokemonShow from './components/PokemonShow';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Signin from './components/Signin'
import Signup from './components/Signup'
import PrivateRoute from './components/PrivateRoute'
import Pokedex from './components/Pokedex'

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'sans-serif'
    ].join(','),
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <div className='container'>
          <Switch>
            <Route path='/sign_up' component={Signup} />
            <Route path='/sign_in' component={Signin} />
            <Route path='/pokedex/:trainerId' component={Pokedex} />
            <PrivateRoute>
              <Route exact path='/' component={App} />
              <Route path='/pokemons/:id' component={PokemonShow} />
              <Redirect from='*' to='/' />
            </PrivateRoute>
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
