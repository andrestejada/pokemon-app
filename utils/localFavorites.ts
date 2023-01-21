const localFavorites = (id: number) => {
  let favorites: number[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );

  if (favorites.includes(id)) {
    favorites = favorites.filter((favorite) => favorite !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const existPokemonFavorites = (id: number) => {
  if (typeof window === "undefined") {
    return false;
  }
  let favorites: number[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );

  return favorites.includes(id);
};

const pokemons = () => {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};

export { localFavorites, existPokemonFavorites, pokemons };
