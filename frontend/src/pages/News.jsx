import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NewsBlock from "../components/NewsBlock/NewsBlock";
import { NewsArticles } from "../components/NewsBlock/NewsArticles";

function News () {
    const { hash, pathname } = useLocation();
    
        useEffect(() => {
        if (hash) {
            const el = document.querySelector(hash);
            el?.scrollIntoView({ behavior: "smooth" });
        }
        else {
            window.scrollTo({top : 0, behavior: "smooth"});
        }
        }, [hash, pathname]);

    return (
        <section id="newsletters">
            <NewsBlock newsArticles={ NewsArticles.articles }></NewsBlock>
        </section>
    )
}

export default News;