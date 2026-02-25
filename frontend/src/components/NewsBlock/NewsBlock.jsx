import "./NewsBlock.css"

function NewsBlock ({ newsArticles }) {
    return (
        <div className="news-block">
            <h1>{newsArticles.title}</h1>
            <p>{newsArticles.blurb}</p>
            <div className="news-container">
                {Object.values(newsArticles.Articles).map((item, index) => (
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