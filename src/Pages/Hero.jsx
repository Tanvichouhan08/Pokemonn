import "./Hero.css";
import Card from "../Component/Card";  
import axios from "axios";
import { useState, useEffect } from "react";

// const pokemon = {
//     id: 1,
//     name: "Bulbasaur",
//     hp: 80,
//     image:
//       "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
//     types: ["Grass", "Poison"],
//     height:20,
//     weight:50
    
//   };
//   const stats = [
//   { name: "Attack", value: 49 },
//   { name: "Defense", value: 65 },
//   { name: "Speed", value: 45 }
// ];
const Hero = ({ favorites, setFavorites, pokemonList }) => {

 
  if (pokemonList.length === 0) {
  return <h1 color="white">Loading...</h1>;
  }
// const pokemonData = {
//   name: pokemon.name,
//   hp: pokemon.stats.find((s) => s.stat.name === "hp")?.base_stat,
//   attack: pokemon.stats.find((s) => s.stat.name === "attack")?.base_stat,
//   defense: pokemon.stats.find((s) => s.stat.name === "defense")?.base_stat,
//   image: pokemon.sprites.other["official-artwork"].front_default,
//   types: pokemon.types.map((t) => t.type.name),

//     stats: pokemon.stats
//     .filter((stat) =>
//       [ "attack", "defense", "speed"].includes(
//         stat.stat.name
//       )
//     )
//     .map((stat) => ({
//       name: stat.stat.name,
//       value: stat.base_stat,
//     })),
// };
// setPokemonList(pokemonData);
//   console.log(pokemon.name);
  return (
    
    <div className="hero">
        <h1 className="gotta">Gotta Catch</h1>
        <h1 className="em">'Em All</h1>
        <p>Explore over 1,000 Pokémon. Search, filter, build your team.</p>
        
        <div className="pokeball-divider">
  <div className="pb-line"></div>
  <div className="pb-ball">
    <div className="pb-divider-line"></div>
  </div>
  <div className="pb-line right"></div>
</div>
{/* STAT STRIP */}
    <div className="stats-strip">
  <div className="stat-block">
    <span className="stat-num">1025</span>
    <span className="stat-label">Pokémon</span>
  </div>

  <div className="stat-block">
    <span className="stat-num">18</span>
    <span className="stat-label">Types</span>
  </div>

  <div className="stat-block">
    <span className="stat-num">9</span>
    <span className="stat-label">Generations</span>
  </div>

  <div className="stat-block">
    <span className="stat-num">∞</span>
    <span className="stat-label">Adventures</span>
  </div>
</div>
{/* SEARCH BAR */}

    <div className="search-bar">
      <span className="search-icon">🔍</span>
  <input
    type="text"
    placeholder="Search Pokémon..."
  />
</div>
{/* FILTERS TAB */}
<div className="filters">
  <button className="active">All</button>
  <button className="fire">🔥 Fire</button>
  <button className="water">💧 Water</button>
  <button className="grass">🌿 Grass</button>
  <button className="electric">⚡ Electric</button>
  <button className="psychic">🌀 Psychic</button>
  <button className="ghost">👻 Ghost</button>
  <button className="dragon">🐉 Dragon</button>
</div>
<div className="section-header">
  <div className="section-title">Pokémon</div>
  <div className="section-count" id="countLabel">Showing 20 of 40</div>
</div>
  <div className="cards">
  {pokemonList.map((pokemon) => (
    <Card key={pokemon.id} 
    pokemon={pokemon} 
    favorites={favorites}
    setFavorites={setFavorites}/>
  ))}
</div>
    </div>
    
  )
}

export default Hero
