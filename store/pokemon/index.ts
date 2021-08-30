import axios from 'axios'
import Pokemon from '@/data/models/Pokemon';

export const state = () => ({
  pokemons: [],
  pokemon: {},
  totalPokemons: 0,
  allPokemons: []
})

export const getters = {
  getPokemons: state => state.pokemons,
  getAllPokemons: state => state.allPokemons,
  getPokemon: state => state.pokemon,
  getTotalPokemons: state => state.totalPokemons
}

export const actions = {
  fetchAllPokemons: async ({ state, commit }) => {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=9999`
    let pokemons = await axios.get(url)

    let pokemon
    for (pokemon of pokemons.data.results) {
      let url = pokemon.url.slice(1, -1)
      let splitUrl = url.split("/")
      pokemon.id = splitUrl[splitUrl.length - 1]
    }

    commit('setAllPokemons', pokemons.data.results)
  },
  fetchPokemons: async ({ state, commit }, index: 1) => {
    // clear pokemons
    commit('clearPokemons')

    let offset = (index - 1) * 32
    let url = `https://pokeapi.co/api/v2/pokemon?limit=32&offset=${offset}`
    let pokemons = await axios.get(url)

    // set total
    if (state.totalPokemons == 0) {
      commit('setTotalPokemons',pokemons.data.count)
    }

    let pokemon
    for (pokemon of pokemons.data.results) {
      let url = pokemon.url.slice(1, -1)
      let splitUrl = url.split("/")
      pokemon.id = splitUrl[splitUrl.length - 1]
    }

    commit('addPokemons', pokemons.data.results)
  },
  fetchPokemon: async ({ state, commit }, id) => {
    let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokemonData = response.data

    // Set abilities
    let abilities = []
    pokemonData.abilities.forEach(pokemon => abilities.push(pokemon.ability))

    // Set types
    let types = []
    let damageRelations = {}
    let pokemonType
    for (pokemonType of pokemonData.types) {
      types.push(pokemonType.type)
      const typeData = await axios.get(pokemonType.type.url)
      Object.keys(typeData.data.damage_relations).forEach(key => {
        // Get damage relations
        if (damageRelations[key] === undefined) {
          damageRelations[key] = typeData.data.damage_relations[key]
        } else {
          damageRelations[key].push(...typeData.data.damage_relations[key])
        }
      })
    }

    // Remove duplicate items
    Object.keys(damageRelations).forEach(key => {
      damageRelations[key] = damageRelations[key].filter((damage, index, array) => 
        index === array.findIndex(item => item.name == damage.name)
      )
    })

    // Get species and evolution chain
    let evolutions = []
    try {
      let speciesData = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}/`)
      let evolutionChain = await axios.get(speciesData.data.evolution_chain.url) as any
      evolutionChain = evolutionChain.data.chain
      
      // Set evolutions
      let hasEvolutionChain = true
      while(hasEvolutionChain) {
        evolutions.push(evolutionChain.species)
        if (evolutionChain.evolves_to.length > 0) {
          evolutionChain = evolutionChain.evolves_to[0]
        } else {
          hasEvolutionChain = false
        }
      }
    } catch(e) {
      console.log("Pokemon has no evolution")
    }

    const pokemon = {
      name: pokemonData.name,
      weight: pokemonData.weight,
      image: pokemonData.sprites.front_default,
      stats: pokemonData.stats,
      moves: pokemonData.moves,
      abilities: abilities,
      types: types,
      evolutions: evolutions,
      damageRelations: damageRelations
    } as Pokemon

    console.log("Pokemon Data", pokemon)
    commit('setPokemon', pokemon)
  },
}

export const mutations = {
  setTotalPokemons: (state, total: number) => {
    state.totalPokemons = total
  },
  setAllPokemons: (state, pokemons: []) => {
    state.allPokemons = pokemons
  },
  addPokemons: (state, pokemons: []) => {
    state.pokemons.push(...pokemons)
  },
  clearPokemons: (state) => {
    state.pokemons = []
  },
  setPokemon: (state, pokemon: Pokemon) => {
    state.pokemon = pokemon
  },
  clearPokemon: (state) => {
    state.pokemon = {}
  }
}