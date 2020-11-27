export function fetchPokemons() {
  return fetch('https://pokeapi.co/api/v2/pokemon?&limit=150')
    .then(reponse => reponse.json())
    .then(data => Promise.all(data.results.map(result => fetchPokemon(result.url))))
}

function fetchPokemon(url) {
  return fetch(url)
    .then(response => response.json())
    .then(data => (
       {
        id: data.id,
        name: data.name,
        types: data.types
      }
    ))
}
