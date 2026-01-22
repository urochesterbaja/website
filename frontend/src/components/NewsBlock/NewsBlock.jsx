import "./NewsBlock.css"

function NewsBlock ({ newsArticles }) {
    return (
        <div className="news-block">
            <h1>Newsletters</h1>
            <p>here i think you wanted to put a blurb containing more info about the team...</p>
            <div className="news-container">
                {newsArticles.map((item, index) => (
                    <div key={index} className="news-article">
                        <h2>{item.title}</h2>
                        <p>{item.summary}</p>
                        <a className = "news-button" href={item.link} target="_blank" rel="noreferrer"><i>Read the full story</i></a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewsBlock;