function SponsorBlock ({tier, imgList}) {
    return (
        <div>
            <h2>{tier}</h2>
            {imgList.map((item, index) => (
                <a key={index} href={item.url} target="_blank" rel="noreferrer"><img src={item.img}></img></a>
            ))}
        </div> 
    );
};

export default SponsorBlock;