import "./PartnerBlock.css"

function PartnerBlock ({tier, imgList = []}) {
    return (
        <div className="partner-block">
            <h2 className="partner-heading"><i>{tier}</i></h2>
            <div className="img-container">
                {imgList.map((item, index) => {
                    const imageElement = item.img ? <img src={item.img} alt={item.name}></img> : <h2 className="logo-replacement">{item.name}</h2>
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

export default PartnerBlock;
