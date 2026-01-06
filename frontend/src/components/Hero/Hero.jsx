import "./Hero.css";
import { useState, useEffect } from "react";

function Hero({title, subtitle, bgImgURL, bgHeight}) {
  const [fadeIn, setfadeIn] = useState(false)

  useEffect(() => {
    setfadeIn(false);
    const timer = setTimeout(() => setfadeIn(true), 10);
    return() => clearTimeout(timer);
  }, []);

  return (
    <section className="hero" style={{ backgroundImage: `url(${bgImgURL})`, height: bgHeight}}>
        <div className="hero-overlay">  {/* "dims" the image for readability */}
            <div className={`hero-content ${fadeIn ? "fade-in" : ""}`}>
                <h1>{ title }</h1>
                <p>{ subtitle }</p>
                {/* <button className="hero-button">Find out more!</button> */}
                </div>
        </div>
    </section>
  );
};

export default Hero;