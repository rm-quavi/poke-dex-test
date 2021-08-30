import { actions } from '@/store/pokemon/index'
import MockData from './mockdata/MockData'
let mockError = false

jest.mock("axios", () => ({
  get: () => { 
    return new Promise((resolve) => {
      if (mockError) 
        throw Error("API Error occurred.")

      resolve(MockData.pokemons)
    })
  }
}))

describe("Store Actions", () => {
  let commit
  let state 

  beforeEach(() => {
    commit = jest.fn()
    state = { totalPokemons: 0 }
  })

  it("Fetch Pokemons", async () => {
    await actions.fetchPokemons({ state, commit }, 1)

    let results = MockData.pokemons.data.results
    let pokemon
    for (pokemon of results) {
      let url = pokemon.url.slice(1, -1)
      let splitUrl = url.split("/")
      pokemon.id = splitUrl[splitUrl.length - 1]
    }

    expect(commit).toHaveBeenCalledWith("clearPokemons")
    expect(commit).toHaveBeenCalledWith("setTotalPokemons",MockData.pokemons.data.count)
    expect(commit).toHaveBeenCalledWith("addPokemons",results)
  })

  it("Catches an error", async () => {
    mockError = true
    await expect(actions.fetchPokemons({ commit: jest.fn() }, {}))
      .rejects.toThrow("API Error occurred.")
  })
})