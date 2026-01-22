import "./ContentBlock.css"

function ContentBlock({title, imgURL = null, content, content2 = null, flip= false, buttonText = null, buttonLink = null, dark = false}) {
    const hasImage = Boolean(imgURL)

    //this line sets the image element to either null or the image that was input (defaults to null)
    const img = hasImage ? <div className="image-container"><img src={imgURL}></img></div> : null

    //this line does the same but with button
    const button = buttonText ? <div className="button-container"><a className="big-button" href={buttonLink} target="_blank" rel="noopener noreferrer"><i>{buttonText}</i></a></div> : null

    //and this line the same for whether or not there's a second paragraph
    const content2Node = content2 ? <p>{content2}</p> : null

    //these two adjust the centering property of the text container depending on if there's an image
    //if there is an image, text is left/right aligned (depending on flip) and no image centers text
    const textClass = hasImage
        ? "text-container"
        : "text-container text-centered"
    const flippedTextClass = hasImage
        ? "text-container-flipped"
        : "text-container-flipped text-centered"

    //if the text box is not flipped, return with image on the left
    if (!flip) {
        return (
            <div className={`content-block ${dark ? "dark-scheme" : null}`}>
                <div className={`content-row ${hasImage ? "has-image" : "no-image"} ${flip ? "flipped" : null}`}>
                    {img}
                    <div className={textClass}>
                        <h2>{title}</h2>
                        <p>{content}</p>
                        {content2Node}
                    </div>
                </div>
                {button}
            </div>
        );
    }
    //if the text box is flipped, return with image on the right
    if (flip) {
        return (
            <div className="content-block">
                <div className={`content-row ${hasImage ? "has-image" : "no-image"} ${flip ? "flipped" : null}`}>
                    <div className={flippedTextClass}>
                        <h2>{title}</h2>
                        <p>{content}</p>
                        {content2Node}
                    </div>
                    {img}
                </div>
                {button}
            </div>
        )
    }
}

export default ContentBlock;
