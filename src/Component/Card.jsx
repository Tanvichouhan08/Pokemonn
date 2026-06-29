import "./Cardd.css";
import { useNavigate } from "react-router-dom";
const Card = ({ pokemon,favorites,setFavorites}) => {
  
  const navigate = useNavigate();
  const isFav = favorites.includes(pokemon.id);
  const toggleFavorite = () => {
  if (isFav) {
    setFavorites(
      favorites.filter(
        (id) => id !== pokemon.id
      )
    );
  } else {
    setFavorites([
      ...favorites,
      pokemon.id
    ]);
  }
};

return (
    <div className="card"  onClick={() => navigate(`/pokemon/${pokemon.id}`)}>
      <div className="top">
        <h2 className="hpp">
          <span>HP</span>{pokemon.hp}
        </h2>
      </div>

      <div className="image-box">
        <img
          src={pokemon.image}
          alt={pokemon.name}
        />
      </div>
     <div className="namefav">
       <h1 className="name">{pokemon.name}</h1>
      <button
       onClick={(e) => {
    e.stopPropagation();   
    toggleFavorite();
  }}
    className={`fav-btn ${isFav ? "active" : ""}`}
    
  >
    ♡
  </button>
  </div>
<div className="types">
  {pokemon.types.map((type) => (
    <span
      key={type}
      className={`type-pill ${type.toLowerCase()}`}
    >
      {type}
    </span>
  ))}
  
     {/* </div>
      <div className="hw">
        <div className="height">Height<br></br>{pokemon.height}</div>
        <div className="weight">Weight<br></br>{pokemon.weight}</div>
      </div>

    <div className="stats">
  {pokemon.stats.map((stat) => (
    <div className="stat-row" key={stat.name}>
      <span className="stat-name">{stat.name}</span>

      <div className="stat-bar">
        <div
          className="stat-fill"
          style={{
            width: `${(stat.value / 255) * 100}%`
          }}
        ></div>
      </div> */}

      {/* <span className="stat-value">
        {stat.value}
      </span>
    </div>
  ))} */}
</div>
    </div>
  );
};

export default Card;

