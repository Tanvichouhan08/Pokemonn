import React from 'react'
import Card from "../Component/Card";
import "./Favs.css";
const Favs = ({
  pokemonList,
  favorites,
  setFavorites,
}) => {
  const favPokemon = pokemonList.filter((pokemon) =>
  favorites.includes(pokemon.id)
);
if (favPokemon.length === 0) {
  return (
    <div className="empty-favs">
      <h1>No Favorites Yet ❤️</h1>
      <p>
        Click the heart on a Pokémon to add it here.
      </p>
    </div>
  );
}
  return (
    <div className='favor'>
      <div className="fav-header">
  <div className="fav-title">Favorites</div>
  <div className="fav-count" id="countLabel">Showing 20 of 40</div>
</div>

      <div className="fav-cards">
  {favPokemon.map((pokemon) => (
    <Card
      key={pokemon.id}
      pokemon={pokemon}
      favorites={favorites}
      setFavorites={setFavorites}
    />
  ))}
    </div>
    </div>
  )
}

export default Favs
