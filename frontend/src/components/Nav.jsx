import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react"
import "./Nav.css";

function Navbar() {
  {/*scroll functionality, changes style when scrolling to match background */}
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 260);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <h1 className="logo">
        <NavLink to="/" end>
          YELLOWJACKET RACING
        </NavLink>
      </h1>

      <ul className="nav-links">

        {/* The dropdown links are nested in a dropdown class with a NavLink being the "main" button and a dropdown menu for the extras */}
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