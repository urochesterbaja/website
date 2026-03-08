import "./ResultsBlock.css"

function ResultsBlock({ results }) {
    const award = results.award ? <h3>{results.award}</h3> : null //allow functionality for no award
    return (
        <div className="results-block">

            <div className="results-image-container">
                <img src={results.img}></img>
            </div>

            <div className="results-text-container">

                <h1 className="build-name"><b>{results.buildName}</b></h1>

                <h3>"{results.nickname}"</h3>

                {award}

                <h3 className="no-margin">{results.year} Results:</h3>
                <div className="comp-results-container">
                    <div className="comp-results-places">
                        {Object.values(results.results).map((item) => (
                            <p>{item.place}</p>
                        ))}
                    </div>
                    <div className="comp-results-locations">
                        {Object.values(results.results).map((item) => (
                            <p>{item.location}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultsBlock;