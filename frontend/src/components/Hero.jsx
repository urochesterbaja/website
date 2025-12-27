import "./Hero.css";

function Hero({title, subtitle, bgImgURL}) {
  return (
    <section className="hero" style={{ backgroundImage: `url(${bgImgURL})` }}>
        <div className="hero-overlay">  {/* Overlay "dims" the image for readability */}
            <div className="hero-content">
                <h1>{ title }</h1>
                <p>{ subtitle }</p>
                {/* <button className="hero-button">Find out more!</button> */}
                </div>
        </div>
    </section>
  );
};

export default Hero