export function fetchPokemons() {
  return fetch('https://pokeapi.co/api/v2/pokemon?&limit=150')
  .then(reponse => reponse.json())
  .then(data => data.results)
}
