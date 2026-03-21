import "./NewsBlock.css"

function NewsBlock ({ newsArticles }) {
    //sort articles by date field
    const articleList = newsArticles.Articles.slice();
    articleList.sort(function(a,b){
        return b.date.localeCompare(a.date)
    })

    return (
        <div className="news-block">
            <h1>{newsArticles.title}</h1>
            <p>{newsArticles.blurb}</p>
            <div className="news-container">
                {Object.values(articleList).map((item, index) => (
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