import { NavLink } from "react-router-dom";
import "./Nav.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">
        <NavLink to="/" end>
          YELLOWJACKET RACING
        </NavLink>
      </h1>

      <ul className="nav-links">

        <li className="dropdown">
          <NavLink to="/" end>About</NavLink>
          <ul className="dropdown-menu">
            <li><NavLink to="our-team">Our Team</NavLink></li>
            <li><NavLink to="subsystems">Subsystems</NavLink></li>
          </ul>
        </li>

        <li className="dropdown">
          <NavLink to="/news">News</NavLink>
          <ul className="dropdown-menu">
            <li><NavLink to="newsletters">Newsletters</NavLink></li>
            <li><NavLink to="gallery">Gallery</NavLink></li>
          </ul>
        </li>
        
        <li><NavLink to="/results">Results</NavLink></li>
        <li><NavLink to="/sponsorship">Sponsorship</NavLink></li>
        <li><NavLink to="/contact">Contact Us</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;