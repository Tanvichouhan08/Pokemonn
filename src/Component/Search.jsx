import "./Hero.css";
import Card from "../Component/Card";
import axios from "axios";
import { useState, useEffect, useMemo, useRef } from "react";

const Hero = ({
  favorites,
  setFavorites,
  pokemonList,
  pokemonUrls,
  handleLoadMore,
  totalPokemon,
  isLoading,
  selectedType,
  setSelectedType,
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]); // fetched-on-demand details for search matches
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Extract the Pokédex id from a PokeAPI url like
  // "https://pokeapi.co/api/v2/pokemon/25/"
  const getIdFromUrl = (url) => {
    const match = url.match(/\/pokemon\/(\d+)\//);
    return match ? parseInt(match[1], 10) : null;
  };

  // All name/url matches across the FULL 1025+ list, not just what's loaded
  const nameMatches = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return [];

    return pokemonUrls.filter((p) => {
      const id = getIdFromUrl(p.url);
      return p.name.toLowerCase().includes(query) || id?.toString() === query;
    });
  }, [search, pokemonUrls]);

  // Debounced fetch: only pull full details for matches we don't already have
  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      const alreadyLoadedIds = new Set(pokemonList.map((p) => p.id));
      const needsFetch = nameMatches.filter(
        (p) => !alreadyLoadedIds.has(getIdFromUrl(p.url))
      );

      // Cap how many we fetch at once so a broad query (e.g. "a")
      // doesn't fire off hundreds of requests
      const toFetch = needsFetch.slice(0, 30);

      if (toFetch.length === 0) return;

      setIsSearching(true);
      try {
        const details = await Promise.all(
          toFetch.map(async (p) => {
            const res = await axios.get(p.url);
            return {
              id: res.data.id,
              name: res.data.name,
              hp: res.data.stats.find((s) => s.stat.name === "hp")?.base_stat,
              image: res.data.sprites.other["official-artwork"].front_default,
              types: res.data.types.map((t) => t.type.name),
            };
          })
        );
        setSearchResults((prev) => {
          const merged = [...prev, ...details];
          // de-dupe by id in case of overlapping fetches
          const unique = Array.from(
            new Map(merged.map((p) => [p.id, p])).values()
          );
          return unique;
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsSearching(false);
      }
    }, 400); // debounce delay

    return () => clearTimeout(debounceRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, nameMatches, pokemonList]);

  const displayedPokemon = useMemo(() => {
    const query = search.trim().toLowerCase();

    let data;
    if (query) {
      // Merge already-loaded pokemon (that match) with freshly fetched search results
      const matchedIds = new Set(nameMatches.map((p) => getIdFromUrl(p.url)));
      const loadedMatches = pokemonList.filter((p) => matchedIds.has(p.id));
      const merged = [...loadedMatches, ...searchResults];
      data = Array.from(new Map(merged.map((p) => [p.id, p])).values());
    } else {
      data = [...pokemonList];
    }

    if (selectedType !== "all") {
      data = data.filter((pokemon) => pokemon.types.includes(selectedType));
    }

    return data.sort((a, b) => a.id - b.id);
  }, [pokemonList, selectedType, search, nameMatches, searchResults]);

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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="search-clear" onClick={() => setSearch("")}>
            ✕
          </button>
        )}
      </div>

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
          {isSearching
            ? "Searching..."
            : `Showing ${displayedPokemon.length} result${
                displayedPokemon.length !== 1 ? "s" : ""
              }`}
        </div>
      </div>

      {displayedPokemon.length === 0 && !isSearching ? (
        <p className="no-results">No Pokémon found for "{search}"</p>
      ) : (
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
      )}

      {!search && pokemonList.length < totalPokemon && (
        <button className="load-more" onClick={handleLoadMore} disabled={isLoading}>
          {isLoading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default Hero;