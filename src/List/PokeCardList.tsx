import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../Store'
import { fetchPokemon } from '../Store/pokemonSlice'
import BallTriangle from './BallTriangle'
import PokeCard from './PokeCard'

export default function PokeCardList() {
  
  const dispatch = useAppDispatch();
  const pokemon = useSelector((state:RootState) => state.pokemon.pokemon)

  // const [pokemon, setPokemon] = useState<PokemonListResponseType>({
  //   count: 0,
  //   next: '',
  //   results: []
  // })


  const [infiniteScroll] = useInfiniteScroll({
    loading: false,
    hasNextPage: pokemon.next !== '',
    onLoadMore: async() => {
      dispatch(fetchPokemon(pokemon.next))
    },
    disabled: false,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: '0px 0px 400px 0px',
  });

  // data 가져오기
  useEffect(() => {
    dispatch(fetchPokemon())

    // (async() => {
    //   const response = await fetchPokemonAPI()
    //   setPokemon(response)
    // })(); // 즉시실행함수
  }, [dispatch])

  

  return (
    <>
    <List>
      {
        pokemon.results.map((pokemon, index) => {
          return (
            <PokeCard key={`${pokemon.name}_${index}`} name={pokemon.name}/>
          )
        })
      }
    </List>
    <div ref={infiniteScroll} style={{display:'flex', justifyContent:'center', marginBottom: '30px'}}>
      <BallTriangle />
    </div>
    </>
  )
}

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
`
