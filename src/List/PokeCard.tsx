import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { useIntersectionObserver } from 'react-intersection-observer-hook'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState, useAppDispatch } from '../Store'
import { fetchPokemonDetail } from '../Store/pokemonDetailSlice'


interface PokeCardProps {
  name: string
}

export default function PokeCard(props:PokeCardProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const imageType = useSelector((state: RootState) => state.imageType.type)
  const pokemonDetails = useSelector((state:RootState) => state.pokemonDetail.PokemonDetails)
  
  const [ref, {entry}] = useIntersectionObserver();
  const isVisible = entry && entry?.isIntersecting;

  const pokemon = pokemonDetails[props.name]



  useEffect(() =>  {
    if(!isVisible) return;
    dispatch(fetchPokemonDetail(props.name))

    // (async() => {
    //   const response = await fetchPokemonDetailAPI(props.name)
    //   setPokemon(response)
    // })(); // 즉시실행함수
  }, [dispatch, props.name, isVisible])



  if(!pokemon) {
    return (
      <Item ref={ref} color={'turquoise'}>
        <Header>
        <Chip>
          <Number style={{ backgroundColor: `turquoise`}}>000</Number> 
          <Text>포켓몬</Text>
        </Chip>
      </Header>
      <Body>
        <span>로딩중 입니다...</span>
      </Body>
      <Footer>
        <Chip>
          <Text>Pokémon</Text>
        </Chip>
      </Footer>
      </Item>
    )
  }

  return (
    <Item ref={ref} onClick={() => {return navigate(`/pokemon/${pokemon.name}`)}} color={pokemon.color}>
      <Header>
        <Chip>
          <Number style={{ backgroundColor: `${pokemon.color} `}}>{String(pokemon.id).padStart(3,'0')}</Number> 
          <Text>{pokemon.koreanName}</Text>
        </Chip>
      </Header>
      <Body>
        <Image src={pokemon.images[imageType]} alt={pokemon.name}/>
      </Body>
      <Footer>
        <Chip>
          <Text>Pokémon</Text>
        </Chip>
      </Footer>
    </Item>
  )
}
const Item = styled.li<{color: string}>`
  display: flex;
  flex-direction: column;
  
  box-sizing: border-box;
  padding: 8px 8px 8px 16px;

  border: 1px solid #c0c0c0;
  width: 250px;
  height: 300px;

  box-shadow: 1px 1px 3px 1px #c0c0c0;

  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.07)
  }

  &:active {
    background-color: ${props => props.color};
    opacity: 0.8;
    transition: background-color 0.1s;
  }
`

const Header = styled.section`
  display: flex;
  flex-direction: row;
  margin: 8px 0;
`

const Chip = styled.div`
  display: flex;
  align-items: center;
  height: 20px;

  border: 1px solid #c0c0c0;
  border-radius: 16px;

  font-size: 14px;
  font-weight: bold;
  box-shadow: 0.5px 0.5px 0 0 #c0c0c0;
  background-color: #FFFFFF;
`

const Number = styled.label`
  padding: 1px 6px;
  opacity: 80%;
  background-color: green;
  height: 100%;
  border-radius: 16px
`

const Text = styled.label`
  padding: 4px 8px 4px 8px;
  `


const Body = styled.section`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
`
const Image = styled.img`
  width: 160px;
  height: 160px;
`

const Footer = styled.section`
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 8px;
  margin-right: 8px;
  align-items: center;
`