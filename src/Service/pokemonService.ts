import axios from "axios"

// https://pokeapi.co/api/v2/{endpoint}/

export interface PokemonListResponseType {
  count: number,
  next: string,
  results: {
    name: string,
    url: string
  }[]
}

const remote = axios.create()

export const fetchPokemonAPI = async(nextUrl?:string) => {
  const pokemonUrl = nextUrl ? nextUrl : 'https://pokeapi.co/api/v2/pokemon'
  const response = await remote.get<PokemonListResponseType>(pokemonUrl)
  return response.data
}

export interface PokemonDetailResponseType {
  id: number,
  weight: number,
  height: number,
  name: string,
  types: {
    type: {
      name: string
    }
  }[],
  sprites: {
    front_default: string,
    other: {
      dream_world: {
        front_default: string
      }
      'official-artwork': {
        front_default: string
      }
    }
  }
  stats: {
    base_stat: number,
    stat: {
      name: string
    }
  }[]
}

export interface PokemonSpeciesResponseType {
  color: {
    name: string
  },
  names: {
    name: string,
    language: {
      name: string
    }
  }[]
}

export interface PokemonDetailType {
  id: number,
  weight: number,
  height: number,
  color: string,
  name: string,
  koreanName: string,
  types: string[],
  images: {
    front_default: string,
    dreamWorldFront:string,
    officialArtworkFront: string
  },
  baseStats: {
    name: string,
    value: number
  }[]
}

export const fetchPokemonDetailAPI = async(name: string):Promise<PokemonDetailType> => {
  const pokemonDetailUrl = `https://pokeapi.co/api/v2/pokemon/${name}`
  const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${name}`

  const response = await remote.get<PokemonDetailResponseType>(pokemonDetailUrl)
  const speciesResponse = await remote.get<PokemonSpeciesResponseType>(pokemonSpeciesUrl)

  const detail = response.data
  const species = speciesResponse.data

  return {
    id: detail.id,
    name: detail.name,
    color: species.color.name,
    koreanName: species.names.find(name => name.language.name==='ko')?.name ?? detail.name,
    height: detail.height / 10,
    weight: detail.weight / 10,
    types: detail.types.map(item => item.type.name),
    images: {
      front_default: detail.sprites.front_default,
      dreamWorldFront: detail.sprites.other.dream_world.front_default,
      officialArtworkFront: detail.sprites.other["official-artwork"].front_default
    },
    baseStats: detail.stats.map(item => {
      return {
        name: item.stat.name,
        value: item.base_stat
      }
    })
  }
}