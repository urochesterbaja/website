import "./ResultsBlock.css"

function ResultsBlock({ results }) {
    const award = results.award ? <h3>{results.award}</h3> : null
    return (
        <div className="results-block">
            <div className="results-image-container">
                <img src={results.img}></img>
            </div>
            <div className="results-text-container">
                <h1 className="build-name"><b>{results.build}</b></h1>
                <h3>"{results.nickname}"</h3>
                {award}
                <h3 className="no-margin">{results.year} Results:</h3>
                <div className="comp-results-container">
                    <div className="comp-results-places">
                        <p>{results.place1}</p>
                        <p>{results.place2}</p>
                        <p>{results.place3}</p>
                    </div>
                    <div className="comp-results-locations">
                        <p>{results.location1}</p>
                        <p>{results.location2}</p>
                        <p>{results.location3}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultsBlock;