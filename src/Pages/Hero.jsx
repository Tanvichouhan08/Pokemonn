import "./Hero.css";
import Card from "../Component/Card";
import axios from "axios";
import { useState, useEffect,useMemo,useRef } from "react";

  const Hero = ({ favorites, setFavorites, pokemonList, handleLoadMore, totalPokemon, isLoading, selectedType, setSelectedType }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300); // show after scrolling 300px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
 

const displayedPokemon = useMemo(() => {
  let data = [...pokemonList];

  // Type Filter
  if (selectedType !== "all") {
    data = data.filter((pokemon) =>
      pokemon.types.includes(selectedType)
    );
  }
 

  return data;
}, [
  pokemonList,
  selectedType,
  favorites,
]);

  if (pokemonList.length === 0) {
    return <h1 color="white">Loading...</h1>;
  }

  const types = [
    { name: "all", emoji: "" },
    { name: "normal", emoji: "⚪" },
    { name: "fire", emoji: "🔥" },
    { name: "water", emoji: "💧" },
    { name: "electric", emoji: "⚡" },
    { name: "grass", emoji: "🌿" },
    { name: "ice", emoji: "❄️" },
    { name: "fighting", emoji: "🥊" },
    { name: "poison", emoji: "☠️" },
    { name: "ground", emoji: "🟤" },
    { name: "flying", emoji: "🕊️" },
    { name: "psychic", emoji: "🌀" },
    { name: "bug", emoji: "🐛" },
    { name: "rock", emoji: "🪨" },
    { name: "ghost", emoji: "👻" },
    { name: "dragon", emoji: "🐉" },
    { name: "dark", emoji: "🌑" },
    { name: "steel", emoji: "⚙️" },
    { name: "fairy", emoji: "🧚" },
  ];


  return (
    <div className="hero">
      {showScrollTop && (
        <button className="srollToTop" onClick={scrollToTop}>
          ↑
        </button>
      )}

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
        <input type="text" placeholder="Search Pokémon..."
  onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/* FILTERS TAB */}
      <div className="filters">
        {types.map((type) => (
          <button
            key={type.name}
            className={selectedType === type.name ? "active" : ""}
            onClick={() => setSelectedType(type.name)}
          >
            {type.emoji} {type.name}
          </button>
        ))}
      </div>

      <div className="section-header">
        <div className="section-title">Pokémon</div>
        <div className="section-count" id="countLabel">
          Showing 20 of 40
        </div>
      </div>

      <div className="cards">
        {displayedPokemon.map((pokemon) => (
          <Card
            key={pokemon.id}
            pokemon={pokemon}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        ))}
      </div>

      {pokemonList.length < totalPokemon && (
        <button className="load-more" onClick={handleLoadMore} disabled={isLoading}>
          {isLoading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default Hero;
