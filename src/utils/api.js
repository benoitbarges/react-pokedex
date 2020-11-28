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
        types: data.types.map(type => type.type.name)
      }
    ))
}

function fetchName(url) {
  return fetch(url)
  .then(reponse => reponse.json())
  .then(data => {
    return data.names
  })
}

export function FetchWithId(id) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(data => data)
}
