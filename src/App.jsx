import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "./Component/Card";
import "./App.css";
import Navbar from "./Component/Nav";
import Hero from "./Pages/Hero";
import Favs from "./Pages/Favs";

import { Routes, Route } from "react-router-dom";
function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [favorites, setFavorites] = useState([]);
   const getData = async () => {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=50"
    );

    const pokemonDetails = await Promise.all(
      response.data.results.map(async (pokemon) => {
        const details = await axios.get(pokemon.url);
       
        return {
          id: details.data.id,
          name: details.data.name,

          hp: details.data.stats.find(
            (s) => s.stat.name === "hp"
          )?.base_stat,

          attack: details.data.stats.find(
            (s) => s.stat.name === "attack"
          )?.base_stat,

          defense: details.data.stats.find(
            (s) => s.stat.name === "defense"
          )?.base_stat,

          image:
            details.data.sprites.other[
              "official-artwork"
            ].front_default,

          types: details.data.types.map(
            (t) => t.type.name
          ),

          stats: details.data.stats
            .filter((stat) =>
              ["attack", "defense", "speed"].includes(
                stat.stat.name
              )
            )
            .map((stat) => ({
              name: stat.stat.name,
              value: stat.base_stat,
            })),
        };
      })
    );

    setPokemonList(pokemonDetails);
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Navbar />
      <Routes>
        { /* HOME */ }
        <Route path="/" element={<Hero 
        favorites={favorites}
       setFavorites={setFavorites}
       pokemonList={pokemonList}

      />} />
      {/* FAVS */}
        <Route path="/favorites" element={<Favs 
        favorites={favorites} 
        pokemonList={pokemonList}
        setFavorites={setFavorites}
        />} />
      </Routes>
    </div>
  );
}

export default App;
