import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'
import { imageTypeReducer } from "./imageTypeSlice";
import { pokemonDetailReducer } from "./pokemonDetailSlice";
import { pokemonReducer } from "./pokemonSlice";

export const store = configureStore({
  reducer: {
    imageType: imageTypeReducer,
    pokemon: pokemonReducer,
    pokemonDetail: pokemonDetailReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()