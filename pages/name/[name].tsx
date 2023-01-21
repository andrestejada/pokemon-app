import { useRouter } from 'next/router'
import { GetStaticProps, NextPage } from 'next'
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react'

interface Props {
  pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const { query } = useRouter()

  const [isInFavorites, setIsInFavorites] = useState(
    existPokemonFavorites(pokemon.id)
  )
  const onToggleFavorites = () => {
    localFavorites(pokemon.id)
    setIsInFavorites(existPokemonFavorites(pokemon.id))
    if (isInFavorites) return

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0
      }
    })
  }

  useEffect(() => {}, [])

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  '/no-image.png'
                }
                alt={pokemon.name}
                width='100%'
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Text h1 transform='capitalize'>
                {pokemon.name}
              </Text>

              <Button
                color='gradient'
                ghost={!isInFavorites}
                onClick={onToggleFavorites}
              >
                {isInFavorites ? 'Esta en favoritos' : 'Guardar en favoritos'}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>

              <Container direction='row' display='flex' gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}

import { GetStaticPaths } from 'next'
import pokeApi from '../../api/pokeApi'
import { Pokemon } from '../../interfaces/pokemon-full'
import { Layout } from '../../components/layout/Layout'
import { useEffect, useState } from 'react'
import {
  existPokemonFavorites,
  localFavorites
} from '../../utils/localFavorites'
import confetti from 'canvas-confetti'
import { PokemonListResponse } from '../../interfaces/pokemon-list'
import { getPokemonInfo } from '../../utils/getPokemonInfo'

export const getStaticPaths: GetStaticPaths = async ctx => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
  const pokemonNames: string[] = data.results.map(pokemon => pokemon.name)
  return {
    paths: pokemonNames.map(name => ({
      params: { name }
    })),
    fallback: false
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string }

  return {
    props: {
      pokemon: await getPokemonInfo(name)
    }
  }
}

export default PokemonPage
