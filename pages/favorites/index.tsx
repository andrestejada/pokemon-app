import { useEffect, useState } from 'react'
import { Layout } from '../../components/layout/Layout'
import { NoFavorites } from '../../components/ui/NoFavorites'
import { pokemons } from '../../utils/localFavorites'
import { FavoritePokemons } from '../../components/pokemons/FavoritePokemons'

export default function FavoritePage () {
  const [favorites, setFavorites] = useState<number[]>([])
  useEffect(() => {
    setFavorites(pokemons())
  }, [])

  return (
    <Layout>
      
      {
          favorites.length === 0 
            ? ( <NoFavorites /> )
            : ( <FavoritePokemons pokemons={favorites} /> )
              }
    </Layout>
  )
}
