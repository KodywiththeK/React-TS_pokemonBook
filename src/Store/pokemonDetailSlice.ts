import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { fetchPokemonDetailAPI, PokemonDetailType } from '../Service/pokemonService'

// First, create the thunk
export const fetchPokemonDetail = createAsyncThunk(
  'pokemon/fetchPokemonDetail',
  async (name: string) => {
    const response = await fetchPokemonDetailAPI(name)
    // console.log(response)
    return response
  }, {
    condition: (name, { getState }) => {
      // 이미 가져온 API 불필요하게 다시 호출하지 않도록
      const { pokemonDetail } = getState() as RootState
      const pokemon = pokemonDetail.PokemonDetails[name]

      return !pokemon;
    }
  }
)

interface PokemonDetailState {
  PokemonDetails: Record<string, PokemonDetailType>
}

const initialState = {
  PokemonDetails: {}
} as PokemonDetailState

// Then, handle actions in your reducers:
const pokemonDetailSlice = createSlice({
  name: 'pokemonDetail',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPokemonDetail.fulfilled, (state, action:PayloadAction<PokemonDetailType>) => {
      state.PokemonDetails = {
        ...state.PokemonDetails,
        [action.payload.name] : action.payload
      }
    })
  },
})

export const pokemonDetailReducer = pokemonDetailSlice.reducer