import "./ContentBlock.css"

function ContentBlock({title, imgUrl, content}) {
    return (
        <div className="content-block">
            <div className="image-container">
                <img src="/banner_image_temp.png"></img>
            </div>
            <div className="text-container">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias fugiat possimus voluptatibus odit autem quaerat harum atque, maiores magnam exercitationem aperiam ipsam eaque consectetur minima consequatur illo explicabo expedita esse!</p>
            </div>
        </div>
    )
}

export default ContentBlock;
