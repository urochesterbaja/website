import ResultsBlock from "../components/ResultsBlock/ResultsBlock";
import {ResultsList} from "../components/ResultsBlock/ResultsList";

function Results () {
    return (
        Object.values(ResultsList).map((item, index) => (
            <ResultsBlock key={index} results={item} />
        ))
    )
}

export default Results;