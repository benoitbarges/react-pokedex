export function fetchPokemons() {
  return fetch('https://pokeapi.co/api/v2/pokemon?&limit=151')
    .then(reponse => reponse.json())
    .then(data => Promise.all(data.results.map(result => fetchPokemon(result.url))))
}

export function fetchPokemon(url) {
  return fetch(url)
    .then(response => response.json())
    .then(async data => {
      const results = await fetchSpecies(data.species.url)
      const stats = []
      data.stats.forEach(s => stats.push({name: s.stat.name, base_stat: s.base_stat}))
      return {
        id: data.id,
        name: data.name,
        types: data.types.map(type => type.type.name),
        abilities: data.abilities.map(a => a.ability.name),
        base_experience: data.base_experience,
        height: data.height,
        weight: data.weight,
        ...results,
        stats: stats
      }
    })
}

function fetchSpecies(url) {
  return fetch(url)
    .then(reponse => reponse.json())
    .then(async data => {
      const evolutionChain = await fetchEvolutionChain(data.evolution_chain.url)
      console.log(evolutionChain)
      return {
        base_happiness: data.base_happiness,
        capture_rate: data.capture_rate,
        color: data.color.name,
        description: data.flavor_text_entries.filter(text => text.language.name === "en")[0].flavor_text,
        egg_groups: data.egg_groups.map(group => group.name),
        species: data.genera.find(genus => genus.language.name === "en").genus,
        legendary: data.is_legendary,
        mythical: data.is_mythical,
        shape: data.shape.name,
        gender_rate: data.gender_rate,
        growth_rate: data.growth_rate.name,
        jap_name: data.names.filter(name => name.language.name === "ja")[0].name,
        ...evolutionChain
      }
    })
}


function fetchEvolutionChain(url) {
  return fetch(url)
    .then(response => response.json())
    .then(async data => {
      const evolutions = []
      evolutions.push(await fetchNameId(data.chain.species.url))
      if (data.chain.evolves_to.length !== 0) {
        evolutions.push(await fetchNameId(data.chain.evolves_to[0].species.url))
        if (data.chain.evolves_to[0].evolves_to.length !== 0) {
          data.chain.evolves_to[0].evolves_to.forEach(async evo => {
            evolutions.push(await fetchNameId(evo.species.url))
          })
        }
      }
      return {
        evolutions
      }
    })
}

function fetchNameId(url) {
  return fetch(url)
    .then(response => response.json())
    .then((data) => {
      return {
        id: data.id,
        name: data.name
      }
    })
}
