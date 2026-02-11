import "./Hero.css";
import { useState, useEffect } from "react";

function Hero({ heroInfo }) {  
  const [fadeIn, setfadeIn] = useState(false)

  //this bit sets the "fade" for when a page changes
  useEffect(() => {
    setfadeIn(false);
    const timer = setTimeout(() => setfadeIn(true), 10);
    return() => clearTimeout(timer);
  }, [heroInfo]);

  if (!heroInfo) {
      return <div className="hero-loading" />;
  }

  return (
    <section className="hero" style={{ backgroundImage: `url(${heroInfo.bgImgURL})`, height: heroInfo["bgHeight"]}}>
        <div className="hero-overlay">  {/* "dims" the image for readability */}
            <div className={`hero-content ${fadeIn ? "fade-in" : ""}`}>
                <h1><i>{ heroInfo["title"] }</i></h1>
                <p>{ heroInfo["subtitle"] }</p>
                {/* <button className="hero-button">Find out more!</button> */}
                </div>
        </div>
    </section>
  );
};

export default Hero;