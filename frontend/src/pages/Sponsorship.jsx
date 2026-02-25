import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLoading } from "../LoadingContext"

import PartnerBlock from "../components/PartnerBlock/PartnerBlock";
import ContentBlock from "../components/ContentBlock/ContentBlock"


export default function Sponsorship() {
    const {startLoading, stopLoading} = useLoading();
    const { hash, pathname } = useLocation();
    const [partnerPageContent, setPartnerPageContent] = useState([]);
    const [partners, setPartners] = useState([])

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
        fetch("/.netlify/functions/getPartnerPageContent")
            .then(res => res.json())
            .then(data => setPartnerPageContent(data))
            .catch(err => console.error("Failed to fetch partnerPageContent", err))
            .finally(() => stopLoading());
    }, []);

    useEffect(() => {
        startLoading();
        fetch("/.netlify/functions/getPartners")
            .then(res => res.json())
            .then(data => setPartners(data))
            .catch(err => console.error("Failed to fetch partners", err))
            .finally(() => stopLoading());
    }, []);

    return (
        <div className="page-container">
            {partnerPageContent?.[1] && <ContentBlock 
                                    title={partnerPageContent[0].title} 
                                    content={partnerPageContent[0].content} 
                                    content2={partnerPageContent[0].content2} 
                                    imgURL={partnerPageContent[0].img} 
                                    flip={partnerPageContent[0].flip} 
                                    buttonText={partnerPageContent[0].buttonText}
                                    buttonLink={partnerPageContent[0].buttonLink}/>}
            <section id="partners">
                {partners.map((item) => (
                    <PartnerBlock
                        key={item.tier}
                        tier={item.tier.toUpperCase()} 
                        imgList={item.partners}  
                    />
                ))}
            </section>
            <section id="donate">
                {partnerPageContent?.[1] && <ContentBlock 
                    title={partnerPageContent[1].title} 
                    content={partnerPageContent[1].content} 
                    conten2={partnerPageContent[1].content2}
                    imgURL={partnerPageContent[1].img}
                    flip={partnerPageContent[1].flip}
                    buttonText={partnerPageContent[1].buttonText} 
                    buttonLink={partnerPageContent[1].buttonLink}>
                </ContentBlock> }
            </section>
        </div>
    );
};