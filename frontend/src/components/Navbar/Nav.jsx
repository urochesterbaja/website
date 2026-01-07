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

  {/*mobile menu stuff*/}
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
  if (menuOpen) {
    document.body.classList.add("nav-open");
  } else {
    document.body.classList.remove("nav-open");
  }

  // cleanup in case component unmounts
  return () => {
    document.body.classList.remove("nav-open");
  };
  }, [menuOpen]);
  
  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <h1 className="logo">
        <NavLink to="/" end onClick={closeMenu}>
          <i>YELLOWJACKET RACING</i>
        </NavLink>
      </h1>

      {/* Hamburger button (mobile only via CSS) */}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
        ☰
      </button>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        {/* The dropdown links are nested in a dropdown class with a NavLink being the "main" button and a dropdown menu for the extras */}
        <li className="dropdown">
          <NavLink to="/" onClick={closeMenu}>About</NavLink>
          <ul className="dropdown-menu">
            <li><NavLink to="/#our-team" onClick={closeMenu}>Our Team</NavLink></li>
            <li><NavLink to="/#subsystems" onClick={closeMenu}>Subsystems</NavLink></li>
          </ul>
        </li>

        <li className="dropdown">
          <NavLink to="/news" onClick={closeMenu}>News</NavLink>
          <ul className="dropdown-menu">
            <li><NavLink to="/news#newsletters" onClick={closeMenu}>Newsletters</NavLink></li>
            <li><NavLink to="/news#gallery" onClick={closeMenu}>Gallery</NavLink></li>
          </ul>
        </li>
        
        <li><NavLink to="/results" onClick={closeMenu}>Results</NavLink></li>

        <li className="dropdown">
          <NavLink to="/sponsorship" onClick={closeMenu}>Sponsorship</NavLink>
          <ul className="dropdown-menu">
            <li><NavLink to="/sponsorship#sponsors" onClick={closeMenu}>Sponsors</NavLink></li>
            <li><NavLink to="/sponsorship#donate" onClick={closeMenu}>Donate</NavLink></li>
            </ul>
          </li>

        <li><NavLink to="/contact" onClick={closeMenu}>Contact Us</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;