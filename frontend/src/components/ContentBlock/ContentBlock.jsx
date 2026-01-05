import "./ContentBlock.css"

function ContentBlock({title, imgURL = null, content, content2 = null, flip= false, buttonText = null, buttonLink = null}) {
    const hasImage = Boolean(imgURL)
    const img = hasImage ? <div className="image-container"><img src={imgURL}></img></div> : null
    const button = buttonText ? <div className="button-container"><button>{buttonText}</button></div> : null

    const textClass = hasImage
        ? "text-container"
        : "text-container text-centered"
    const flippedTextClass = hasImage
        ? "text-container-flipped"
        : "text-container-flipped text-centered"

    if (!flip) {
        return (
            <div className="content-block">
                <div className="content-row">
                    {img}
                    <div className={textClass}>
                        <h2>{title}</h2>
                        <p>{content}</p>
                        <p>{content2}</p>
                    </div>
                </div>
                {button}
            </div>
        );
    }
    if (flip) {
        return (
            <div className="content-block">
                <div className="content-row">
                    <div className={flippedTextClass}>
                        <h2>{title}</h2>
                        <p>{content}</p>
                        <p>{content2}</p>
                    </div>
                    {img}
                </div>
                {button}
            </div>
        )
    }
}

export default ContentBlock;
