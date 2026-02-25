import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLoading } from "../LoadingContext"
import NewsBlock from "../components/NewsBlock/NewsBlock";
import GalleryBlock from "../components/GalleryBlock/GalleryBlock";

function News () {
    const [photoGallery, setPhotoGallery] = useState([]);
    const [newsArticles, setNewsArticles] = useState([]);
    const { hash, pathname } = useLocation();
    const { startLoading, stopLoading } = useLoading();
    
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
        fetch("/.netlify/functions/getPhotoGallery")
            .then(res => res.json())
            .then(data => setPhotoGallery(data))
            .catch(err => console.error("Failed to fetch photoGallery", err))
            .finally(stopLoading);
    }, []);

    useEffect(() => {
        startLoading();
        fetch("/.netlify/functions/getNewsArticles")
            .then(res => res.json())
            .then(data => setNewsArticles(data))
            .catch(err => console.error("Failed to fetch newsArticles", err))
            .finally(stopLoading);
    }, []);
    

    return (
        <>
        <section id="newsletters">
            {newsArticles.map((item, index) => (
                <NewsBlock newsArticles={ item }></NewsBlock>
            ))}
        </section>

        <section id="gallery">
            {photoGallery.map((item, index) => (
            <GalleryBlock key={index} gallery={item} />
            ))}
        </section>
        </>
    )
}

export default News;