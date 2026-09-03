import "./Nav.css";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
      <nav className="nav">
      <h1 className="logo">PokéDex</h1>

      <ul className="nav-links">
        <li><NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>Home</NavLink></li>
        <li><NavLink to="/favorites" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>FAVOURITES</NavLink></li>
        <li><NavLink to="/myteam" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>MY TEAM</NavLink></li>
        <li><NavLink to="/random" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>RANDOM</NavLink></li>
      </ul>

      <div className="nav-actions">
       <NavLink to="/surprise">
         <button className="surprise-btn">🎲 Surprise Me</button>
        </NavLink>
      </div>
    </nav>  
  );
};
export default Navbar;
