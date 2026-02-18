import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLoading } from "../LoadingContext"

import ResultsBlock from "../components/ResultsBlock/ResultsBlock";

function Results () {
    const {startLoading, stopLoading} = useLoading();
    const { hash, pathname } = useLocation();
    const [resultsList, setResultsList] = useState([]);

    //this bit is copied into most of the pages, it handles the smooth scrolling when you select a dropdown in the navbar
    //it's also why the pages are divided into <section> tags, so the sections are clearly laid out
    useEffect(() => {
    if (hash) {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: "smooth" });
    }
    else {
        window.scrollTo({top : 0, behavior: "smooth"});
    }
    }, [hash, pathname]);

    useEffect(() => {
        startLoading();
        fetch("/.netlify/functions/getResults")
            .then(res => res.json())
            .then(data => setResultsList(data))
            .catch(err => console.error("Failed to fetch results", err))
            .finally(stopLoading);
    }, []);

    return (
        <>
            {resultsList.map((item, index) => (
                <ResultsBlock key={index} results={item} />
            ))}
        </>
    )
}

export default Results;