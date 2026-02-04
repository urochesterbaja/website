import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NewsBlock from "../components/NewsBlock/NewsBlock";
import { NewsArticles } from "../components/NewsBlock/NewsArticles";
import GalleryBlock from "../components/GalleryBlock/GalleryBlock";
import { PhotoGallery } from "../components/GalleryBlock/PhotoGallery.js"

function News () {
    const { hash, pathname } = useLocation();
    
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

    return (
        <>
        <section id="newsletters">
            <NewsBlock newsArticles={ NewsArticles.articles }></NewsBlock>
        </section>
        <section id="gallery">
            {Object.values(PhotoGallery).map((item, index) => (
            <GalleryBlock key={index} gallery={item} />
            ))}
        </section>
        </>
    )
}

export default News;