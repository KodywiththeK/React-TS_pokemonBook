import styled from '@emotion/styled'
import React, { useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../Store';
import { fetchPokemonDetail } from '../Store/pokemonDetailSlice';


export default function PokemonDetail() {

  const { name } = useParams();
  // const [pokemon, setPokemon] = useState<PokemonDetailType | null>(null)
  const imageType = useSelector((state: RootState) => state.imageType.type)
  const { PokemonDetails } = useSelector((state: RootState) => state.pokemonDetail)
  const pokemon = name ? PokemonDetails[name] : null;
  const dispatch = useAppDispatch();


  useEffect(() => {
    if(!name) return;
    dispatch(fetchPokemonDetail(name))
    // (async() => {
    //   const response = await fetchPokemonDetailAPI(name)
    //   setPokemon(response)
    // })(); // 즉시실행함수
  }, [dispatch, name])

  if(!name || !pokemon) {
    return (
      <Container>
      <ImageContainer >
        <span style={{ margin: '150px 0', fontSize:'30px', color:'blue', fontWeight:'700'}}>로딩중 입니다...</span>
      </ImageContainer>
      <Footer>
        <Chip>
          <Text>Pokémon</Text>
        </Chip>
      </Footer>
    </Container>
    )
  }

  return (
    <Container>
      <ImageContainer >
        <Image src={pokemon.images[imageType]} alt={pokemon.name}/>
      </ImageContainer>
      <Divider />
      <Body>
        <h2>기본 정보</h2>
        <Table>
          <tbody>
            <TableRow>
              <TableHeader>번호</TableHeader>
              <td>{pokemon.id}</td>
            </TableRow>
            <TableRow>
              <TableHeader>이름</TableHeader>
              <td>{`${pokemon.koreanName} (${pokemon.name})`}</td>
            </TableRow>
            <TableRow>
              <TableHeader>타입</TableHeader>
              <td>{pokemon.types.join(', ')}</td>
            </TableRow>
            <TableRow>
              <TableHeader>키</TableHeader>
              <td>{pokemon.height} m</td>
            </TableRow>
            <TableRow>
              <TableHeader>몸무게</TableHeader>
              <td>{pokemon.weight} kg</td>
            </TableRow>
          </tbody>
        </Table>
        <h2>능력치</h2>
        <Table>
          <tbody>
            {pokemon.baseStats.map(stat => {
              return (
                <TableRow key={stat.name}>
                  <TableHeader>{stat.name}</TableHeader>
                  <td>{stat.value}</td>
                </TableRow>
              )
            })}
          </tbody>
        </Table>
      </Body>
      <Footer>
        <Chip>
          <Text>Pokémon</Text>
        </Chip>
      </Footer>
    </Container>
  )
}

const Container = styled.section`
  border: 1px solid #c0c0c0;
  margin: 16px 32px;
  border-radius: 16px;
  box-shadow: 1px 1px 3px 1px #c0c0c0;
`

const ImageContainer = styled.section`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
  min-height: 350px;
`

const Image = styled.img`
  width: 350px;
  height: 350px;
`

const Divider = styled.hr`
  margin: 32px;
  border-style: none;
  border-top: 1px dashed #d3d3d3;
`

const Body = styled.section`
  margin: 0 32px;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 0 auto 16px;

  th, td {
    padding: 6px 12px;
  }
`
const TableRow = styled.tr`
  border-width: 1px 0;
  border-style: solid;
  border-color: #f0f0f0;
`
const TableHeader = styled.th`
  width: 1px;
  white-space: nowrap;
  text-align: left;
  font-weight: normal;
  font-size: 14px;
  color: #a0a0a0;
`

const Footer = styled.section`
  display: flex;
  flex-direction: row;
  margin: 32px 16px;
`
const Chip = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  margin-left: auto;
  margin-right: 16px;

  border: 1px solid #c0c0c0;
  border-radius: 16px;

  font-size: 14px;
  font-weight: bold;
  box-shadow: 0.5px 0.5px 0 0 #c0c0c0;
`

const Text = styled.label`
  padding: 4px 8px 4px 8px;
`
