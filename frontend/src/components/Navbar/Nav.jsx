import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react"
import "./Nav.css";

function Navbar() {
  // scroll functionality, changes height and transparency when scrolling to match background 
  const [scrolled, setScrolled] = useState(false);

  const [partnerPageContent, setPartnerPageContent] = useState([]); // pull donate link from sponsor page db

  useEffect(() => {
        fetch("/.netlify/functions/getPartnerPageContent")
            .then(res => res.json())
            .then(data => setPartnerPageContent(data))
            .catch(err => console.error("Failed to fetch partnerPageContent", err))
    }, []);

  useEffect(() => {
    const handleScroll = () => {
      // the X in "window.scrollY > X" is the value that dictates when the navbar collapses
      // higher value --> more scrolling before navbar collapses
      setScrolled(window.scrollY > 260);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  {/* this bit sets up the mobile menu when you press the hamburger */}
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
  if (menuOpen) {
    document.body.classList.add("nav-open");
  } else {
    document.body.classList.remove("nav-open");
  }

  // cleanup in case component unmounts
  // shouldn't ever unmount but good practice
  return () => {
    document.body.classList.remove("nav-open");
  };
  }, [menuOpen]);
  
  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <h1 className="logo">
        <NavLink to="/" end onClick={closeMenu}> {/* link logo to homepage */}
          <img src="/Logotrans.png"></img>
          <i>YELLOWJACKET RACING</i>
        </NavLink>
      </h1>

      {/* Hamburger button (mobile only via CSS) */}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
        ☰
      </button>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        {/* The dropdown links are nested in a dropdown class with a NavLink being the "main" button and a unordered list with dropdown menu class for the extras */}
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
        
        <li className="dropdown"><NavLink to="/results" onClick={closeMenu}>Results</NavLink></li>

        <li className="dropdown">
          <NavLink to="/sponsorship" onClick={closeMenu}>Sponsorship</NavLink>
          <ul className="dropdown-menu">
            <li><NavLink to="/sponsorship#partners" onClick={closeMenu}>Sponsors</NavLink></li>
            <li><NavLink to="/sponsorship#donate" onClick={closeMenu}>Donate</NavLink></li>
            </ul>
          </li>

        <li className="dropdown"><NavLink to="/contact" onClick={closeMenu}>Contact Us</NavLink></li>

        {// wait to render donate button until sponsor db pull
        partnerPageContent?.[1] && <li className="dropdown"><a id="donate-button" href={partnerPageContent[1].buttonLink} target="_blank" rel="noopener noreferrer"><i>Donate</i></a></li>}
      </ul>
    </nav>
  );
}

export default Navbar;