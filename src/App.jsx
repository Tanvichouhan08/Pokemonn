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
  const [pokemonUrls, setPokemonUrls] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loadedCount, setLoadedCount] = useState(24);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("all");
  const fetchPokemonList = async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=1200"
      );

      setPokemonUrls(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const loadPokemonBatch  = async (start, count) => {
    try {
      const batch = pokemonUrls.slice(start, start + count);

      const pokemonCardDetails = await Promise.all(
        batch.map(async (pokemon) => {
          const details = await axios.get(pokemon.url);

          return {
            id: details.data.id,
            name: details.data.name,

            hp: details.data.stats.find(
              (s) => s.stat.name === "hp"
            )?.base_stat,

            image:
              details.data.sprites.other[
                "official-artwork"
              ].front_default,

            types: details.data.types.map(
              (t) => t.type.name
            ),
          };
        })
      );

      setPokemonList((prev) => [...prev, ...pokemonCardDetails]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadMore = async () => {
    if (isLoading) return;

    setIsLoading(true);

    await loadPokemonBatch(loadedCount, 24);

    setLoadedCount((prev) => prev + 24);

    setIsLoading(false);
  };

  
  useEffect(() => {
    fetchPokemonList();
  }, []);

  useEffect(() => {
    if (pokemonUrls.length > 0) {
      loadPokemonBatch(0, 24);
    }
  }, [pokemonUrls]);

  

  return (
    <div>
      <Navbar />
      <Routes>
        { /* HOME */ }
        <Route path="/" element={<Hero 
        pokemonUrls={pokemonUrls}
       favorites={favorites}
       setFavorites={setFavorites}  
       pokemonList={pokemonList}
       handleLoadMore={handleLoadMore}
      totalPokemon={pokemonUrls.length}
       isLoading={isLoading}
       selectedType={selectedType}
       setSelectedType={setSelectedType}
      />} />
      {/* FAVS */}
        <Route path="/favorites" element={<Favs 
        favorites={favorites} 
        pokemonList={pokemonList}
        setFavorites={setFavorites}
        />} />
         <Route path="/pokemon/:id" element={<Details pokemonUrls={pokemonUrls}/>} />
      </Routes>
      
    </div>
  );
}

export default App;
