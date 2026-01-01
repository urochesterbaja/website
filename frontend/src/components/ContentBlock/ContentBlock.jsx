import "./ContentBlock.css"

function ContentBlock({title, imgURL, content, content2, flip= "false"}) {
    if (flip == "false") {
        return (
            <div className="content-block">
                <div className="image-container">
                    <img src= {imgURL}></img>
                </div>
                <div className="text-container">
                    <h2>{title}</h2>
                    <p>{content}</p>
                    <p>{content2}</p>
                </div>
            </div>
        )
    }
    if (flip == "true") {
        return (
            <div className="content-block">
                <div className="text-container-flipped">
                    <h2>{title}</h2>
                    <p>{content}</p>
                    <p>{content2}</p>
                </div>
                <div className="image-container">
                    <img src= {imgURL}></img>
                </div>
            </div>
        )
    }
}

export default ContentBlock;
