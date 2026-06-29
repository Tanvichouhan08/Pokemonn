import { useParams } from "react-router-dom";

import "./Detail.css"
import pokemon_bg from "../Component/pokemon_bg.png";
import pokemon_circle_bg from "../Component/pokemon_circle_bg.png";
function Details({ pokemonDetails }) {
  const { id } = useParams();
  const pokemon = pokemonDetails.find(
  (p) => p.id === Number(id)
);
if (!pokemon) {
  return <h1>Loading...</h1>;
}



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

const stats = [
  { name: "HP", value: pokemon.hp, color: "hp" },
  { name: "ATTACK", value: pokemon.attack, color: "attack" },
  { name: "DEFENSE", value: pokemon.defense, color: "defense" },
  { name: "SP. ATK", value: pokemon.specialAttack, color: "spatk" },
  { name: "SP. DEF", value: pokemon.specialDefense, color: "spdef" },
  { name: "SPEED", value: pokemon.speed, color: "speed" },
];
  return (
    <div className="parent">
      <div className="topp"> </div>
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
     {/* hero-sec-endss */}


{/* <p>{pokemon.height} m</p>
<p>{pokemon.weight} kg</p>

<p>{pokemon.category}</p>

<p>{pokemon.ability.join(", ")}</p>

<p>{pokemon.hp}</p>
<p>{pokemon.attack}</p>
<p>{pokemon.defense}</p>
<p>{pokemon.specialAttack}</p>
<p>{pokemon.specialDefense}</p>
<p>{pokemon.speed}</p>   */}
        {/* <div>
  {pokemon.weaknesses.map((type) => (
    <span key={type}>
      {type}
    </span>
  ))}
</div>     */}
          
        
        </div>
  );
}

export default Details;