import "./Nav.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
      <nav className="nav">
      <h1 className="logo">PokéDex</h1>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li> 
        <li><Link to="/favorites">FAVOURITES</Link></li>
        <li><Link to="/myteam">MY TEAM</Link></li>
        <li><Link to="/random">RANDOM</Link></li>
      </ul>

      <div className="nav-actions">
       <Link to="/surprise">
         <button className="surprise-btn">🎲 Surprise Me</button>
        </Link>
      </div>
    </nav>  
  );
};
export default Navbar;