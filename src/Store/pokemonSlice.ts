import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchPokemonAPI, PokemonListResponseType } from '../Service/pokemonService'

// First, create the thunk
export const fetchPokemon = createAsyncThunk(
  'pokemon/fetchPokemon',
  async (nextUrl?: string) => {
    const response = await fetchPokemonAPI(nextUrl)
    return response
  }
)

interface PokemonState {
  pokemon: PokemonListResponseType
}

const initialState = {
  pokemon: {
    count: 0,
    next: '',
    results: []
  }
} as PokemonState

// Then, handle actions in your reducers:
const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPokemon.fulfilled, (state, action:PayloadAction<PokemonListResponseType>) => {
      if(state.pokemon.results.length> 0) {
        state.pokemon = {
          ...action.payload,
          results: [...state.pokemon.results, ...action.payload.results]
        }
      } else {
        state.pokemon = action.payload
      }
    })
  },
})

export const pokemonReducer = pokemonSlice.reducer