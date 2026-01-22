import "./SponsorBlock.css"

function SponsorBlock ({tier, imgList}) {
    return (
        <div className="sponsor-block">
            <h2 className="sponsor-heading"><i>{tier} SPONSORS</i></h2>
            <div className="img-container">
                {imgList.map((item, index) => {
                    const imageElement = item.img ? <img src={item.img}></img> : <h2 className="logo-replacement">{item.name}</h2>
                    return(
                    <a key={index} href={item.url} target="_blank" rel="noreferrer">
                        {imageElement}
                    </a>
                    )
                })}
            </div>
        </div> 
    );
};

export default SponsorBlock;
