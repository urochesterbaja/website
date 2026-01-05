import "./SponsorBlock.css"

function SponsorBlock ({tier, imgList}) {
    return (
        <div className="sponsor-block">
            <h2><i>{tier} SPONSORS</i></h2>
            <div className="img-container">
                {imgList.map((item, index) => (
                    <a key={index} href={item.url} target="_blank" rel="noreferrer"><img src={item.img}></img></a>
                ))}
            </div>
        </div> 
    );
};

export default SponsorBlock;
