import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "./Component/Card";
import "./App.css";
import Navbar from "./Component/Nav";
import Hero from "./Pages/Hero";
import Favs from "./Pages/Favs";
import Details from "./Pages/Detail";

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
        const typeResponses = await Promise.all(
  details.data.types.map((t) =>
    axios.get(t.type.url)
  )
);
const weaknesses = [
  ...new Set(
    typeResponses.flatMap((type) =>
      type.data.damage_relations.double_damage_from.map(
        (d) => d.name
      )
    )
  ),
];
       const species = await axios.get(
        details.data.species.url
          );
       
        return {
          weaknesses,
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
          category: species.data.genera.find(
            (g) => g.language.name === "en"
          )?.genus,
          height: details.data.height / 10,
          weight: details.data.weight / 10,
          ability: details.data.abilities.map(
          (a) => a.ability.name
           ),
           genderRate: species.data.gender_rate,
           specialAttack: details.data.stats.find(
            (s) => s.stat.name === "special-attack"
          )?.base_stat,
          specialDefense: details.data.stats.find(
            (s) => s.stat.name === "special-defense"
          )?.base_stat,
          speed: details.data.stats.find(
          (s) => s.stat.name === "speed"
           )?.base_stat,
          
           genderRate: species.data.gender_rate,

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
         <Route path="/pokemon/:id" element={<Details pokemonDetails={pokemonList} />} />
      </Routes>
      
    </div>
  );
}

export default App;
