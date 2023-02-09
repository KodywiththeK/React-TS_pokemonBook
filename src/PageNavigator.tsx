import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PokemonDetail from './Detail/PokemonDetail'
import PokeCardList from './List/PokeCardList'

export default function PageNavigator() {
  return (
    <>
    <Routes>
      <Route path="/" element={<PokeCardList />} />
      <Route path="/pokemon/:name" element={<PokemonDetail />} />
    </Routes>
    </>
  )
}
