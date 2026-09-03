import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Detail.css"
import { useNavigate } from "react-router-dom";
import React from "react";
import pokemon_bg from "../Component/pokemon_bg.png";
import pokemon_circle_bg from "../Component/pokemon_circle_bg.png";
function Details({pokemonUrls}) {
  const { id } = useParams();
  const navigate = useNavigate();
const [pokemon, setPokemon] = useState(null);
const [loading, setLoading] = useState(true);

const fetchPokemonDetails = async () => {
  try {
    setLoading(true);

    const details = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );

    const typeResponses = await Promise.all(
      details.data.types.map((t) =>
        axios.get(t.type.url)
      )
    );

    
    const species = await axios.get(
  details.data.species.url
);

// Evolution Chain
const evolution = await axios.get(
  species.data.evolution_chain.url
);

const evo = [];

let current = evolution.data.chain;

while (current) {
  const evoId = current.species.url
    .split("/")
    .filter(Boolean)
    .pop();

  const evoDetails = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${evoId}`
  );

  evo.push({
    id: evoId,
    name: current.species.name,
    image:
      evoDetails.data.sprites.other["official-artwork"].front_default,
    types: evoDetails.data.types.map((t) => t.type.name),
  });

  current = current.evolves_to[0];
}
    const weaknesses = [
      ...new Set(
        typeResponses.flatMap((type) =>
          type.data.damage_relations.double_damage_from.map(
            (d) => d.name
          )
        )
      ),
    ];

    setPokemon({
      weaknesses,
      description: species.data.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
      )?.flavor_text.replace(/\f/g, " "),

      id: details.data.id,
      evolution: evo,
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

      abilities: details.data.abilities.map(
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
    });

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  fetchPokemonDetails();
}, [id]);
const GenderDisplay = ({ genderRate }) => {
  if (genderRate === -1) {
    return <i className="genderless">⚲</i>;
  }

  return (
    <>
      {genderRate < 8 && (
        <i className="male">♂</i>
      )}

      {genderRate > 0 && genderRate < 8 && (
        <i className="divider">/</i>
      )}

      {genderRate > 0 && (
        <i className="female">♀</i>
      )}
    </>
  );
};
useEffect(() => {
  const keyNav = (e) => {
    if (e.key === "ArrowLeft" && Number(id) > 1) {
      navigate(`/pokemon/${Number(id) - 1}`);
    }

    if (e.key === "ArrowRight"  && Number(id) < pokemonUrls.length) {
      navigate(`/pokemon/${Number(id) + 1}`);
    }
  };

  window.addEventListener("keydown", keyNav);

  return () => {
    window.removeEventListener("keydown", keyNav);
  };
}, [id, navigate]);
if (loading || !pokemon) {
  return <h1>Loading...</h1>;
}

const stats = [
  {
    name: "HP",
    value: pokemon.hp,
    color: "hp",
  },
  {
    name: "ATTACK",
    value: pokemon.attack,
    color: "attack",
  },
  {
    name: "DEFENSE",
    value: pokemon.defense,
    color: "defense",
  },
  {
    name: "SP. ATK",
    value: pokemon.specialAttack,
    color: "spatk",
  },
  {
    name: "SP. DEF",
    value: pokemon.specialDefense,
    color: "spdef",
  },
  {
    name: "SPEED",
    value: pokemon.speed,
    color: "speed",
  },
];
const previous = pokemonUrls[id - 2];
const next = pokemonUrls[id];
  return (
    <div className="parent">
      <div className="topp">
        <button className="previous"
       onClick={() => navigate(`/pokemon/${Number(id) - 1}`)}
        >← {pokemon.id -1} {previous?.name}</button> 
        <button className="next"
        onClick={() => navigate(`/pokemon/${Number(id) + 1}`)}
        >{pokemon.id +1} {next?.name} →</button>
        </div>
       <div className="hero-section">
     <div className="left-block">

  <div className="pokemon-info">
    <h3 className="id">#{pokemon.id}</h3>
    <h1 className="namee" >{pokemon.name}</h1>

    <div className="types">
     {pokemon.types.map((type) => (
    <span
      key={type}
      className={`type-pill ${type.toLowerCase()}`}
    >
      {type}
    </span>
  ))}
    </div>

    <div className="info-grid">

      <div className="info-card">
        <span>HEIGHT</span>
        <h3>{pokemon.height} m</h3>
      </div>

      <div className="info-card">
        <span>WEIGHT</span>
        <h3>{pokemon.weight} kg</h3>
      </div>


      <div className="info-card">
        <span>GENDER</span>
        <h3 className="gender">
  <GenderDisplay genderRate={pokemon.genderRate} />
</h3>
          </div>

      <div className="info-card">
        <span>CATEGORY</span>
        <h3>{pokemon.category}</h3>
      </div>

    </div>

    <div className="action-buttons">
      <button className="team-btn">ADD TO TEAM</button>
      <button className="fav">❤ Favourite</button>
    </div>
    <p className="des">{pokemon.description}</p>
</div>
           </div>
   <div className="middle-block">
    <span className="pokemon-id">002</span>
      <img className="img" src={pokemon.image} alt={pokemon.name}/>
      <img className="bg-circle" src={pokemon_circle_bg} alt="Pokemon Background" />
      <img className="dynamic" src={pokemon_bg} alt="Pokemon dynamic" />

  </div>
  <div className="right-block">
    <div className="stats">
      <h3>Base Stats</h3>

      {stats.map((stat) => (
          <div className="stat" key={stat.name}>
            <span>{stat.name}</span>

            <span className="value">{stat.value}</span>

            <div className="progress">
              <div
                className={`fill ${stat.color}`}
                style={{ width: `${(stat.value / 255) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}

        <div className="total">
          <span>Total Best</span>
          <span>
            {stats.reduce((sum, stat) => sum + stat.value, 0)}
          </span>
        </div>
    </div>

        <div className="weakness-block">
          <h3>Weakness</h3>
        <div className="weaknesses">
            {pokemon.weaknesses.map((weakness) => (
              <span
                key={weakness}
                className={`type-pill ${weakness.toLowerCase()}`} 
              >
                {weakness}
              </span>
            ))}
        </div>
        </div>
  </div>
     </div>  
     <div className="evo-pill">
      <h3>Evolution</h3>
     </div>
        <div className="evolution-chain">
  {pokemon.evolution.map((evo, index) => (
    <React.Fragment key={evo.id}>
      <div
        className="evo-card"
        onClick={() => navigate(`/pokemon/${evo.id}`)}
      >
        <div className="evo-image">
          <img src={evo.image} alt={evo.name} />
        </div>

        <span className="evo-id">
          #{String(evo.id).padStart(4, "0")}
        </span>

        <h3>{evo.name}</h3>

        <div className="evo-types">
          {evo.types.map(type => (
            <span key={type} className={`type-pill ${type}`}>
              {type}
            </span>
          ))}
        </div>
      </div>

      {index !== pokemon.evolution.length - 1 && (
        <span className="evo-arrow">❯❯</span>
      )}
    </React.Fragment>
  ))}
</div>
        
        
        </div>
  );
}

export default Details;