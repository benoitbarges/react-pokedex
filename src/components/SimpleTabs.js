import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PokemonStats from './PokemonStats'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs({ pokemon }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className='tab-bar'>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
          <Tab label="Biography" {...a11yProps(0)} className='tab' />
          <Tab label="Stats" {...a11yProps(1)} className='tab' />
          <Tab label="Evolutions" {...a11yProps(2)} className='tab' />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <h4 className='mb-4'>Pokémon Data</h4>
        <p className="text-gray mb-4">{pokemon.description}</p>

        <ul>
          <li className='grid grid-cols-2 mb-3'>
            <span className="text-gray font-medium">Species</span><span>{pokemon.species}</span>
          </li>

          <li className='grid grid-cols-2 mb-3'>
            <span className="text-gray font-medium">Height</span><span>{`${pokemon.height / 10}m`}</span>
          </li>

          <li className='grid grid-cols-2 mb-3'>
            <span className="text-gray font-medium">Weight</span><span>{`${pokemon.weight / 10}kg`}</span>
          </li>

          <li className='grid grid-cols-2 mb-3'>
            <span className="text-gray font-medium">Abilities</span>
            <span>
              <ol>
                {pokemon.abilities.map(ability => <li className='capitalize' key={ability}>{ability}</li>)}
              </ol>
            </span>
          </li>

          <li className='grid grid-cols-2 mb-3'>
            <span className="text-gray font-medium">Gender</span>
            {
              pokemon.gender_rate === -1
                ? <span>Genderless</span>
                : <span className='flex'>
                    <div className='flex'>
                      <img className='gender-logo' src="male.png" alt="male" />
                      <p className='margin-auto mx-2'>{100 - pokemon.gender_rate * 12.5}%</p>
                    </div>
                    <div className='flex'>
                      <img className='gender-logo' src="female.png" alt="female" />
                       <p className='margin-auto mx-2'>{pokemon.gender_rate * 12.5}%</p>
                    </div>
                  </span>
            }
          </li>
        </ul>

        <h4 className='mb-4 mt-4'>Training</h4>
        <ul>
          <li className='grid grid-cols-2 mb-3'>
            <span className="text-gray font-medium">Base Exp</span><span>{pokemon.base_experience}</span>
          </li>

          <li className='grid grid-cols-2 mb-3'>
            <span className="text-gray font-medium">Base Happiness</span><span>{pokemon.base_happiness}</span>
          </li>

          <li className='grid grid-cols-2 mb-3'>
            <span className="text-gray font-medium">Capture Rate</span><span>{((pokemon.capture_rate / 255) * 100).toFixed(1)}%</span>
          </li>

          <li className='grid grid-cols-2 mb-3'>
            <span className="text-gray font-medium">Growth Rate</span><span>{pokemon.growth_rate}</span>
          </li>
        </ul>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <h4 className='mb-4'>Base Stats</h4>
        <PokemonStats stats={pokemon.stats}/>
      </TabPanel>

      <TabPanel value={value} index={2}>
       <h4 className='mb-4'>Evolutions</h4>
      </TabPanel>
    </div>
  );
}
