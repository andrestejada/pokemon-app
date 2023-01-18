import pokeApi from '../api/pokeApi'
import { Layout } from '../components/layout/Layout'
import { GetStaticProps, NextPage } from 'next'
import { PokemonListResponse, SmallPokemon } from '../interfaces/pokemon-list'
import { PropsWithChildren } from 'react'
import { Grid } from '@nextui-org/react'
import { PokemonCard } from '../components/pokemons/PokemonCard'

interface Props extends PropsWithChildren {
  pokemons: SmallPokemon[]
}

export default function Home ({ pokemons }: Props) {
  return (
    <>
      <Layout title='Listado de pokemons'>
      {  <Grid.Container gap={ 2 } justify='flex-start'>
        {
          pokemons.map( ( pokemon ) => (
            <PokemonCard key={ pokemon.id } pokemon={ pokemon } />
          ))
        }
      </Grid.Container>}
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ctx => {
  const res = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
  const pokemons: SmallPokemon[] = res.data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      i + 1
    }.svg`
  }))
  return {
    props: {
      pokemons
    }
  }
}
